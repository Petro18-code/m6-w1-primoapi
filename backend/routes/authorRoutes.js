import express from "express";
import Author from "../models/AuthorsSchema.js";
import uploadCloudinary from "../middleware/uploadCloudinary.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const totalResults = await Author.countDocuments();
    const page = req.query.page || 1;
    const perPage = req.query.perPage || totalResults;
    const totalPages = Math.ceil(totalResults / perPage);
    const allAuthors = await Author.find()
      .collation({ locale: "it" })
      .sort({ name: 1, surname: 1 })
      .skip((page - 1) * perPage)
      .limit(perPage);
    res.send({
      data: allAuthors,
      totalResults,
      totalPages,
      page,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.get("/:id", async (req,res)=>{
  const {id} =req.params
  try {
      const author = await Author.findById(id)
      res.status(200).send(author) 
  } catch (error) {
      res.status(404).send({message: 'Not Found'}) 
  }
  
})

router.post("/", async (req,res)=>{
  const author = new Author (req.body)
  author.avatar = author.avatar ? author.avatar : "https://picsum.photos/40"
  try {
      const newAuthor = await author.save()
      res.status(200).send(newAuthor)
  } catch (error) {
      res.status(400).send(error)
  }
})

router.put("/:id", async (req,res)=>{
  const {id} =req.params
  try {
      const author = await Author.findByIdAndUpdate(id, req.body, {new:true})
      await author.save();
      res.status(200).send(author)
  } catch (error) {
      res.status(400).send(error)
  }
  
})

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    if (await Author.exists({ _id: id })) {
      await Author.findByIdAndDelete(id);
      res.status(200).send(`Ho eliminato l'autore con id: ${id}`);
    } else {
      res.status(404).send({ message: `ID ${id} not found` });
    }
  } catch (error) {
    res.status(404).send({ message: `ID ${id} not found` });
  }
});

router.patch(
  "/:authorId/avatar",
  uploadCloudinary.single("avatar"),
  async (req, res) => {
    //uso patch per modificare il contenuto sul server di una risorsa gia esistente
    const { authorId } = req.params;
    try {
      const author = await Author.findByIdAndUpdate(authorId, { avatar: req.file.path }, { new: true });
      await author.save();
      res.status(200).send(author);
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  }
);

export default router;