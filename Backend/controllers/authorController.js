const Author = require("../models/author");

console.log(Author);

// Create a new Author
exports.createAuthor = async (req, res) => {
  try {
    const author = await Author.create(req.body);
    res.status(201).json(author);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all Author
exports.getAllAuthors = async (req, res) => {
  try {
    const authors = await Author.findAll();
    res.json(authors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a Author by ID
exports.getAuthorById = async (req, res) => {
  try {
    const author = await Author.findByPk(req.params.id);
    console.log(author);
    if (author) {
      res.json(author);
    } else {
      res.status(404).json({ error: "Author not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a Author
exports.updateAuthor = async (req, res) => {
  try {
    const [updated] = await Author.update(req.body, {
      where: { author_id: req.params.id },
    });
    console.log("updated", updated);
    if (updated) {
      const updatedAuthor = await Author.findByPk(req.params.id);
      res.json(updatedAuthor);
    } else {
      res.status(404).json({ error: "Author not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a Author
exports.deleteAuthor = async (req, res) => {
  try {
    const deleted = await Author.destroy({
      where: { author_id: req.params.id },
    });
    console.log("deleted", deleted);
    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ error: "Author not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};