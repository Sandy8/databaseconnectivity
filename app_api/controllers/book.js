const mongoose = require('mongoose');
const book = mongoose.model('Book');


const getBook = function (req, res) {
    book.find().exec(function (err, bookdata) {
        if (err) {
          res
            .status(404)
            .json(err);
          return;
        }
        else{
          res
            .status(200)
            .json(bookdata);
        }
      });
};
const CreateBook = function (req, res) {
    
  book.create({
    img: req.body.img,
    name: req.body.name,
    author: req.body.author,
    price: req.body.price,
    views: req.body.views
  }, (err, bookdata) => {
    if (err) {  
        res
          .status(400)
          .json(err);
    } else {
        res
          .status(201)
          .json(bookdata);
    }
});
};
const getSingleBook = function (req, res) {
    book
    .findById(req.params.bookid)
    .exec((err, book) => {
      res
      .status(200)
      .json(book);
    });
};
const updateBook = function (req, res) {
    if (!req.params.bookid) {
        res
            .status(404)
            .json({
                "message": "Not found, bookid is required"
            });
        return;
      }
      book.findById(req.params.bookid)
        .exec((err, bookdata) => {
          if (!bookdata) {
            res
                .status(404)
                .json({
                    "message": "bookid not found"
                });
            return;
          } else if (err) {
            res
                .status(400)
                .json(err);
            return;
          }
          bookdata.img = req.body.img;
          bookdata.name = req.body.name
          bookdata.author = req.body.author;
          bookdata.price = req.body.price;
          bookdata.views = req.body.views;
    
          bookdata.save((err, bookdata) => {
            if (err) {
              res
                .status(404)
                .json(err);
            } else {
              res
                .status(200)
                .json(bookdata);
            }
          });
        }
      );
};
const deleteBook = function (req, res) {
    const bookid = req.params.bookid;
    if (bookid) {
      book
        .findByIdAndRemove(bookid)
        .exec((err, bookdata) => {
          if (err) {
            res
              .status(404)
              .json(err);
            return;
          }
          res
            .status(204)
            .json(null);
        });
    } else {
      res
        .status(404)
        .json({ "message": "No bookid" });

    }
};

module.exports = {
    getBook,
    CreateBook,
    getSingleBook,
    updateBook,
    deleteBook
};