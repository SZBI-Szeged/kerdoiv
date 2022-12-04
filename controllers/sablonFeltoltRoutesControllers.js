exports.postSablonFeltolt = (req, res) => {
    const { kerdes, valasz } = req.body;
    // req.body.adat.kerdes = { kerdes };
    // req.body.adat.valasz = { valasz };
    // console.log(req.body);

    res.render('sablonFeltolt', { kerdes, valasz });
};
