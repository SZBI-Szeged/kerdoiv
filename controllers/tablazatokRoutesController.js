const fs = require('fs');
const path = require('path');

exports.getTablazatok = (req, res) => {
    let cim = req.query.name;
    let okt = '';
    console.log(cim);

    if (cim.split(' ')[0] == 'Oktató') {
        for (let i = 1; i < cim.split(' ').length; i++) {
            if (i < cim.split(' ').length - 1) {
                okt += cim.split(' ')[i] + ' ';
            } else {
                okt += cim.split(' ')[i];
            }
        }
        cim = 'Oktató';
        req.app.locals.okt = okt;
    }

    console.log(okt);

    const ut = path.join(__dirname, '..', 'kerdoivek', `${cim}.txt`);

    const nyersiAdatok = fs.readFileSync(ut, 'utf-8');
    let kerdoivAdatok = nyersiAdatok.trim().split('\n');
    const hossz = kerdoivAdatok.length;

    const kerdesSzam = +kerdoivAdatok[hossz - 1].split(';')[0];
    const valaszSzam = +kerdoivAdatok[hossz - 1].split(';')[1];

    const kerdesek = [];
    const valaszok = [];

    for (let i = 0; i < hossz - 1; i++) {
        let keyErtek = kerdoivAdatok[i];
        if (i < kerdesSzam) {
            kerdesek.push(keyErtek.trim());
        } else {
            valaszok.push(keyErtek.trim());
        }
    }

    let utOsztaly = '';

    if (okt) {
        utOsztaly = path.join(__dirname, '..', 'eredmenyek', `${cim} ${okt}`);
    } else {
        utOsztaly = path.join(__dirname, '..', 'eredmenyek', `${cim}`);
    }

    const fileok = fs.readdirSync(utOsztaly, 'utf-8');
    // console.log(fileok);

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
            // console.log(kerdoivAdatokTomb);
            for (let k = 0; k < valaszSzam; k++) {
                // console.log(valaszok[k]);
                if (kerdoivAdatokTomb[2] == valaszok[k]) {
                    // console.log('van');
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
