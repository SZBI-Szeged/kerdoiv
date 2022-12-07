const fs = require('fs');
const path = require('path');

exports.getKerdoivek = (req, res) => {
    const { nev, statusz, jelszo, osztaly } = req.app.locals;
    const utvonal = path.join(__dirname, '..', 'kerdoivek');
    const fileok = fs.readdirSync(utvonal, 'utf-8');
    // console.log(fileok, nev, statusz, jelszo);

    const kerdoivNevek = [];

    fileok.forEach((elem) => {
        kerdoivNevek.push(path.parse(elem).name);
    });

    res.render('kerdoivek', { kerdoivNevek, statusz, osztaly });
};
