const Book = require('../models/Book');



//I HAVE USED POSTMAN TO FIRST CHECK ALL API ,  ENDPOINSTSS, HENCE HAVE ADDED STATUS CODE TO KNOW ERRORRSs
exports.addBook = async (req, res) => {
  try {
    const { title, author } = req.body;
    if (!title || !author)
      return res.status(400).json({ message: 'All Required' });

    const book = new Book({ title, author, userId: req.userId });
    await book.save();
    res.status(201).json(book);
  } catch (err) {
    res.status(500).json({ message: 'ServerSide error' });
  }
};

exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find({ userId: req.userId });
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: 'ServerSidde error' });
  }
};

exports.searchBooks = async (req, res) => {
  try {
    const { query } = req.query;
    const books = await Book.find({ userId: req.userId });

    const filteredOne = books.filter(
      (b) =>
        b.title.toLowerCase().includes(query.toLowerCase()) ||
        b.author.toLowerCase().includes(query.toLowerCase())
    );
    res.json(filteredOne);
  } catch (err) {
    res.status(500).json({ message: 'ServerSdie error' });
  }
};