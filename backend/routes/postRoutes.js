import express from "express";
import Post from "../models/PostsSchema.js";
import uploadCloudinary from '../middleware/uploadCloudinary.js';
import transport from "../services/mailService.js";

const router = express.Router();

/** GET /authors/:id/blogPosts/ => ricevi tutti i blog post di uno specifico autore dal corrispondente ID */
router.get("/", async (req, res) => {
  try {
    const totalResults = await Post.countDocuments();
    const PAGE = req.query.page || 1;
    const PERPAGE = req.query.perPage || 8;
    const totalPages = Math.ceil(totalResults / PERPAGE);
    const allBlogPosts = await Post.find(
      req.query.title
        ? { title: { $regex: req.query.title, $options: "i" } }
        : {}
    )
      .collation({ locale: "it" })
      .sort({ title: 1, category: 1 })
      .skip((PAGE - 1) * PERPAGE)
      .limit(PERPAGE);
    res.send({
      dati: allBlogPosts,
      totalResults,
      totalPages,
      PAGE,
    });
  } catch (err) {
    res.status(404).send({ message: "Not Found" });
  }
});

router.get("/:id", async (req,res)=>{
  const {id} =req.params
  try {
      const post = await Post.findById(id)
      res.send(post) 
  } catch (error) {
      res.status(404).send({message: 'Not Found'})
  }

})

router.post("/", async (req,res)=>{
  const post = new Post (req.body)
  try {
      const newPost = await post.save()
      await transport.sendMail({
          from: 'noreply@epicoders.com',
          to: newPost.author,
          subject: "New Post",
          text: "You have created a new blog post.",
          html: "<b>You have created a new blog post.</b>"
      })
      res.send(newPost)
  } catch (error) {
      res.status(400).send(error)
  }
})

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const EditPost = await Post.findByIdAndUpdate(id, req.body, {new: true});
    await EditPost.save();
    res.status(200).send(EditPost);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.delete("/:id", async (req,res)=>{
  const {id} =req.params
  try {
      if (await Post.exists({_id:id})){
          await Post.findByIdAndDelete(id)
          res.status(200).send(`ho eliminato il post con id: ${id}`)
      }else{res.status(404).send({message: `ID ${id} not found`})}   
  } catch (error) {
      res.status(404).send({message: `ID ${id} not found`})
  }
  
});

router.patch('/:blogPostId/cover', uploadCloudinary.single('cover'),async (req,res)=>{
  const {blogPostId} =req.params
  try {
      const post = await Post.findByIdAndUpdate(blogPostId, {cover: req.file.path}, {new:true})
      await post.save();
      res.status(200).send(post)
  } catch (error) {
      res.status(400).send(error)
  }
  
})

export default router;
