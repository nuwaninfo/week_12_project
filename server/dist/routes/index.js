"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Book_1 = require("../models/Book");
const router = (0, express_1.Router)();
router.post("/api/book", async (req, res) => {
    try {
        const existingBook = await Book_1.Book.findOne({
            name: req.body.name,
        });
        if (existingBook) {
            res.status(403).json({ message: "Book already exists" });
        }
        const book = new Book_1.Book({
            name: req.body.name,
            author: req.body.author,
            pages: req.body.pages,
        });
        const savedBook = await book.save();
        console.log("Book saved!");
        res
            .status(201)
            .json({ data: savedBook, message: "Book saved successfully" });
    }
    catch (error) {
        console.error(`Error while saving book: ${error}`);
        res.status(500).json({ message: "Internal server error" });
    }
}); // End add()
exports.default = router;
