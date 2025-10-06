const Book = require('../models/Book');

exports.getAllBooks = async (req, res, next) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    next(error);
  }
};

exports.getBookById = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'Book not found'
      });
    }

    res.json(book);
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        error: 'Not Found',
        message: 'Book not found'
      });
    }
    next(error);
  }
};

exports.createBook = async (req, res, next) => {
  try {
    const { title, author, year } = req.body;

    const book = new Book({
      title,
      author,
      year
    });

    const savedBook = await book.save();
    res.status(201).json(savedBook);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        error: 'Validation Error',
        message: error.message
      });
    }
    next(error);
  }
};

exports.updateBook = async (req, res, next) => {
  try {
    const { title, author, year } = req.body;

    const book = await Book.findByIdAndUpdate(
      req.params.id,
      { title, author, year },
      { new: true, runValidators: true }
    );

    if (!book) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'Book not found'
      });
    }

    res.json(book);
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        error: 'Not Found',
        message: 'Book not found'
      });
    }
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        error: 'Validation Error',
        message: error.message
      });
    }
    next(error);
  }
};

exports.deleteBook = async (req, res, next) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);

    if (!book) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'Book not found'
      });
    }

    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        error: 'Not Found',
        message: 'Book not found'
      });
    }
    next(error);
  }
};
