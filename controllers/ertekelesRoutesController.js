const fs = require('fs');
const path = require('path');

exports.getErtekel = (req, res) => {
    const utvonal = path.join(__dirname, '..', 'eredmenyek');
    const fileok = fs.readdirSync(utvonal, 'utf-8');
    console.log(fileok);

    const kerdoivNevek = [];

    fileok.forEach((elem) => {
        if (elem.split('_').length < 2) {
            kerdoivNevek.push(elem);
        }
    });

    req.app.locals.kerdoivNevek = kerdoivNevek;
    console.log(kerdoivNevek);
    res.render('ertekel', { kerdoivNevek });
};
