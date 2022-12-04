const fs = require('fs');
const path = require('path');

exports.getErtekel = (req, res) => {
    const utvonal = path.join(__dirname, '..', 'kerdoivek');
    const fileok = fs.readdirSync(utvonal, 'utf-8');

    const kerdoivNevek = [];

    fileok.forEach((elem) => {
        const nev = path.parse(elem).name;
        const ut = path.join(__dirname, '..', 'eredmenyek', `${nev}`);

        if (fs.existsSync(ut)) {
            kerdoivNevek.push(nev);
        }
    });

    req.app.locals.kerdoivNevek = kerdoivNevek;

    res.render('ertekel', { kerdoivNevek });
};
