const request = require('request');
const apiOptions = {
    server: 'http://localhost:3000'
};

const books = (req, res) => {
  const path = '/api/books';
  const requestOptions = {
    url: apiOptions.server + path,
    method: 'GET',
    json: {}
  };
  request(
    requestOptions,
    (err, response, body) => {
        _renderHomepage(req, res, body);
    }
  )
};

const _renderHomepage = function(req, res, responseBody) {
  let message = null;
  if(!(responseBody instanceof Array)) {
      message = "API looup error.";
      responseBody = [];
  } 
  else {
      if(!responseBody.length) {
          message = "No Book found.";
      }
  }

  res.render('list-display', {
      Data : responseBody,
      title: "Book list",
      message: message
  });
};

const _renderDetailPage = (req, res, responseBody) => {
    res.render('book-info', {
        currentBook: responseBody
    });
};

const bookInfo = (req, res) => {
    const path = `/api/books/${req.params.bookid}`;
    const requestOptions = {
        url: apiOptions.server + path,
        method: 'GET',
        json: {}
    };
    request(
        requestOptions,
        (err, response, body) => {
            _renderDetailPage(req, res, body);
        }
    )
};


const _renderCreatepage = function(req, res) {
    res.render('add-book',{
        title: "Create New Book"
    });
};

const addNewBook = function(req, res) {
    _renderCreatepage(req,res);
};

const doAddNewBook = function(req,res){
    const path =  '/api/books';
    const postdata = {
        img: req.body.img,
        name: req.body.name,
        author: req.body.author,
        price: req.body.price,
        views: req.body.views,
    };
    const requestOptions = {
      url: apiOptions.server + path,
      method: 'POST',
      json: postdata
    };
    request(
        requestOptions,
        (err, response, body) => {
            if(response.statusCode === 201){
              res.redirect('/list');
            }
        }
    );
  };

const book =
    function (req, res, next) {
        res.render('display', { title: ' Display Book' });
    };
module.exports = {
    books, book,addNewBook,bookInfo,doAddNewBook
};
