const index =
    function (req, res, next) {
        res.render('index', { title: 'Indigo Book Store' });
    };

module.exports = {
    index
};