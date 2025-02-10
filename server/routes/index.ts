import { Request, Response, Router } from "express"
import { Book, IBook } from "../models/Book"
const router: Router = Router()

router.post("/api/book", async (req: Request, res: Response) => {
  try {
    const existingBook: IBook | null = await Book.findOne({
      name: req.body.name,
    })

    if (existingBook) {
      res.status(403).json({ message: "Book already exists" })
    }

    const book: IBook = new Book({
      name: req.body.name,
      author: req.body.author,
      pages: req.body.pages,
    })
    const savedBook: IBook = await book.save()
    console.log("Book saved!")
    res
      .status(201)
      .json({ data: savedBook, message: "Book saved successfully" })
  } catch (error: any) {
    console.error(`Error while saving book: ${error}`)
    res.status(500).json({ message: "Internal server error" })
  }
}) // End add()

export default router
