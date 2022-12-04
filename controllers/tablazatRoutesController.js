const fs = require('fs');
const path = require('path');

exports.getTablazat = (req, res) => {
    const mappa = req.app.locals.cim;
    const cim = req.query.name;
    const mappa_cim = mappa;

    const ut = path.join(
        __dirname,
        '..',
        'eredmenyek',
        `${mappa}`,
        `${cim}.csv`
    );

    const nyersAdatok = fs.readFileSync(ut, 'utf-8');
    let kerdoivAdatok = nyersAdatok.trim().split('\n');

    const kerdesek = req.app.locals.kerdesek;
    const valaszok = req.app.locals.valaszok;

    const vegsoSzamok = [];

    for (let i = 0; i < kerdesek.length; i++) {
        let valaszTomb = [];

        for (let j = 0; j < valaszok.length; j++) {
            valaszTomb.push(0);
        }

        for (let k = 0; k < valaszok.length; k++) {
            for (let n = 0; n < kerdoivAdatok.length; n++) {
                const kerdoivAdatokTomb = kerdoivAdatok[n].split(';');
                let kerdes = kerdoivAdatokTomb[1];
                let valasz = kerdoivAdatokTomb[2];
                if (valaszok[k] == valasz && kerdesek[i] == kerdes) {
                    valaszTomb[k]++;
                }
            }
        }
        vegsoSzamok.push(valaszTomb);
    }

    const letoltesUtMappa = path.join(
        __dirname,
        '..',
        'eredmenyek',
        `${mappa}_letolt`
    );

    const letoltesUt = path.join(
        __dirname,
        '..',
        'eredmenyek',
        `${mappa}_letolt`,
        `${cim}_letolt.csv`
    );

    let letoltesTartalom = '\ufeff;';
    // let letoltesTartalom = ';';

    for (let i = 0; i < valaszok.length; i++) {
        if (i != valaszok.length - 1) {
            letoltesTartalom += `${valaszok[i]};`;
        } else {
            letoltesTartalom += `${valaszok[i]}\n`;
        }
    }

    for (let j = 0; j < kerdesek.length; j++) {
        letoltesTartalom += `${kerdesek[j]};`;
        for (let n = 0; n < vegsoSzamok[j].length; n++) {
            if (j != kerdesek.length - 1) {
                if (n != vegsoSzamok[j].length - 1) {
                    letoltesTartalom += `${vegsoSzamok[j][n]};`;
                } else {
                    letoltesTartalom += `${vegsoSzamok[j][n]}\n`;
                }
            } else {
                if (n != vegsoSzamok[j].length - 1) {
                    letoltesTartalom += `${vegsoSzamok[j][n]};`;
                } else {
                    letoltesTartalom += `${vegsoSzamok[j][n]}`;
                }
            }
        }
    }

    if (!fs.existsSync(letoltesUtMappa)) {
        fs.mkdirSync(letoltesUtMappa);
        fs.writeFileSync(letoltesUt, letoltesTartalom);
    } else {
        fs.writeFileSync(letoltesUt, letoltesTartalom);
    }

    res.render('tablazat', {
        cim,
        mappa_cim,
        vegsoSzamok,
        kerdesek,
        valaszok,
        letoltesTartalom,
    });
};
