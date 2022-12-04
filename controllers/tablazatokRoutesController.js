const fs = require('fs');
const path = require('path');

exports.getTablazatok = (req, res) => {
    const cim = req.query.name;

    const ut = path.join(__dirname, '..', 'kerdoivek', `${cim}.txt`);

    const nyersAdatok = fs.readFileSync(ut, 'utf-8');
    let kerdoivAdatok = nyersAdatok.trim().split('\n');
    const hossz = kerdoivAdatok.length;

    const kerdesSzam = +kerdoivAdatok[hossz - 1].split(';')[0];
    const valaszSzam = +kerdoivAdatok[hossz - 1].split(';')[1];

    const kerdesek = [];
    const valaszok = [];

    for (let i = 0; i < hossz - 1; i++) {
        let keyErtek = kerdoivAdatok[i];
        if (i < kerdesSzam) {
            kerdesek.push(keyErtek);
        } else {
            valaszok.push(keyErtek);
        }
    }

    const utOsztaly = path.join(__dirname, '..', 'eredmenyek', `${cim}`);

    const fileok = fs.readdirSync(utOsztaly, 'utf-8');
    console.log(fileok);

    const ujFileok = fileok.map((elem) => path.parse(elem).name);

    const vegsoSzamok = [];

    fileok.forEach((elem) => {
        let tomb = [];
        for (let i = 0; i < valaszSzam; i++) {
            tomb.push(0);
        }

        const nyersAdatok = fs.readFileSync(
            path.join(utOsztaly, elem),
            'utf-8'
        );

        const kerdoivAdatok = nyersAdatok.trim().split('\n');

        for (let i = 0; i < kerdoivAdatok.length; i++) {
            const kerdoivAdatokTomb = kerdoivAdatok[i].split(';');
            console.log(kerdoivAdatokTomb);
            for (let k = 0; k < valaszSzam; k++) {
                console.log(valaszok[k]);
                if (kerdoivAdatokTomb[2] == valaszok[k]) {
                    console.log('van');
                    tomb[k]++;
                }
            }
        }

        vegsoSzamok.push(tomb);
    });

    req.app.locals.cim = cim;
    req.app.locals.kerdesek = kerdesek;
    req.app.locals.valaszok = valaszok;

    res.render('tablazatok', { vegsoSzamok, kerdesek, valaszok, ujFileok });
};
