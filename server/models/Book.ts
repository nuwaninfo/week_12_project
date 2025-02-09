import mongoose, { Document, Schema, Model } from "mongoose"

interface IBook extends Document {
  author: string
  name: string
  pages: number
}

const BookSchema: Schema = new Schema<IBook>({
  author: { type: String, required: true },
  name: { type: String, required: true },
  pages: { type: Number, required: true },
})

const Book: Model<IBook> = mongoose.model<IBook>("Book", BookSchema)

export { Book, IBook }
