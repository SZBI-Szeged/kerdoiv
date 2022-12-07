const fs = require('fs');
const path = require('path');

exports.getKerdoiv = (req, res) => {
    const cim = req.query.name;

    const ut = path.join(__dirname, '..', 'kerdoivek', `${cim}.txt`);

    const nyersAdatok = fs.readFileSync(ut, 'utf-8');
    const kerdoivAdatok = nyersAdatok.trim().split('\n');
    const hossz = kerdoivAdatok.length;

    const kerdesSzam = +kerdoivAdatok[hossz - 1].split(';')[0];
    const valaszSzam = +kerdoivAdatok[hossz - 1].split(';')[1];

    const kerdesek = [];
    const valaszok = [];

    for (let i = 0; i < hossz - 1; i++) {
        if (i < kerdesSzam) {
            kerdesek.push(kerdoivAdatok[i]);
        } else {
            valaszok.push(kerdoivAdatok[i]);
        }
    }

    req.app.locals.cim = cim;
    req.app.locals.kerdesek = kerdesek;
    req.app.locals.valaszok = valaszok;

    res.render('kerdoiv', { cim, kerdesSzam, kerdesek, valaszSzam, valaszok });
};

exports.deleteKerdoiv = (req, res) => {
    const cim = req.query.name;

    const ut = path.join(__dirname, '..', 'kerdoivek', `${cim}.txt`);
    fs.unlinkSync(ut);

    res.json({ msg: 'Töröltem az elemet!' });
};

exports.getModositKerdoiv = (req, res) => {
    const cim = req.query.name;
    console.log('Ezt fogom módosítani: ' + cim);
    const ut = path.join(__dirname, '..', 'kerdoivek', `${cim}.txt`);

    const nyersAdatok = fs.readFileSync(ut, 'utf-8');
    const kerdoivAdatok = nyersAdatok.trim().split('\n');
    const hossz = kerdoivAdatok.length;

    const kerdesSzam = +kerdoivAdatok[hossz - 1].split(';')[0];
    const valaszSzam = +kerdoivAdatok[hossz - 1].split(';')[1];

    const kerdesek = [];
    const valaszok = [];

    for (let i = 0; i < hossz - 1; i++) {
        if (i < kerdesSzam) {
            kerdesek.push(kerdoivAdatok[i]);
        } else {
            valaszok.push(kerdoivAdatok[i]);
        }
    }

    req.app.locals.cim = cim;
    req.app.locals.kerdesek = kerdesek;
    req.app.locals.valaszok = valaszok;

    res.render('modosit', { cim, kerdesSzam, kerdesek, valaszSzam, valaszok });
};
