import Author from "../models/AuthorsSchema.js";
import Post from "../models/PostsSchema.js";

export const getAuthors = async (req, res) => {
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
};

export const getSingleAuthor = async (req, res) => {
  const { id } = req.params;
  try {
    const author = await Author.findById(id);
    res.status(200).send(author);
  } catch (error) {
    res.status(404).send({ message: "Not Found" });
  }
};

export const createAuthor = async (req, res) => {
  const author = new Author(req.body);
  author.avatar = author.avatar ? author.avatar : "https://picsum.photos/40";
  try {
    const newAuthor = await author.save();
    res.status(200).send(newAuthor);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const editAuthor = async (req, res) => {
  const { id } = req.params;
  try {
    const author = await Author.findByIdAndUpdate(id, req.body, { new: true });
    await author.save();
    res.status(200).send(author);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const deleteAuthor = async (req, res) => {
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
};

export const patchAuthor = async (req, res) => {
  //uso patch per modificare il contenuto sul server di una risorsa gia esistente
  const { authorId } = req.params;
  try {
    const author = await Author.findByIdAndUpdate(
      authorId,
      { avatar: req.file.path },
      { new: true }
    );
    await author.save();
    res.status(200).send(author);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

export const getSingleAuthorPosts = async (req,res) =>{
  const {id} = req.params
  try {
  const authorExists = await AuthorR.findById(id)
  if(!authorExists){
      return res.status(404).send({message: 'Author not found'})
  }
  const postBySingleAuthor = await Post.find({author: id}) 
  res.send(postBySingleAuthor)

  } catch (error) {
      res.status(400).send(error)
  }
}