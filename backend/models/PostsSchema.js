import { model, Schema } from "mongoose";

const postSchema = new Schema(
  {
    // categoria del post,
    category: {
      type: String,
      required: true,
    },
    // titolo del post,
    title: {
      type: String,
      required: true,
    },
    // link dell'immagine,
    cover: {
      type: String,
    },
    readTime: {
      // numero,
      value: Number,
      // unità di misura
      unit: String,
    },
    // id dell'autore del post,
    author: {
       type: Schema.Types.ObjectId,
       ref: 'Author'
      // required: true,
    },
    // HTML dell'articolo
    content: {
      type: String,
      required: true,
    },
  },
  { collection: "posts" }
);
export default model("Post", postSchema);