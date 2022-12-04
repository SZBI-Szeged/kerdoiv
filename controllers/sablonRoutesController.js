exports.getSablon = (req, res) => {
    res.render('sablon', { statusz: req.app.locals.statusz });
};
