exports.getKilep = (req, res) => {
    const { nev, jelszo } = req.app.locals;
    console.log(req.app.locals);
    res.redirect('/');
};
