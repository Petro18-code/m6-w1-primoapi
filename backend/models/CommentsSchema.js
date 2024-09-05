import { Schema, model } from "mongoose"

const commentsSchema = new Schema(
  {
    content: {
        type: String,
        minLength: 2,
        maxLength: 100,
        required: true,
        trim: true,
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
    },
},
  { collection: "comments",
    timestamps: true
   }
)

export default model("Comments", commentsSchema)
