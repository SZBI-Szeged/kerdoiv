const fs = require('fs');
const path = require('path');

exports.postKiertekel = (req, res) => {
    const valaszErtekek = req.body.valaszok;
    const osztaly = req.app.locals.osztaly;
    const cim = req.app.locals.cim;
    const okt = req.app.locals.okt;
    const kerdesek = req.app.locals.kerdesek;
    const valaszok = req.app.locals.valaszok;

    let kiirando = '\ufeff';

    for (let i = 0; i < valaszErtekek.length; i++) {
        if (i != valaszErtekek.length - 1) {
            kiirando += `\n${i + 1};${kerdesek[i]};${
                valaszok[valaszErtekek[i]]
            };${valaszErtekek[i]}`;
        } else {
            kiirando += `\n${i + 1};${kerdesek[i]};${
                valaszok[valaszErtekek[i]]
            };${valaszErtekek[i]}`;
        }
    }

    let utKonyvtar = '';
    let utOsztaly = '';
    let utIskola = '';

    if (okt) {
        utKonyvtar = path.join(__dirname, '..', 'eredmenyek', `${cim} ${okt}`);

        utOsztaly = path.join(
            __dirname,
            '..',
            'eredmenyek',
            `${cim} ${okt}`,
            `${osztaly}.csv`
        );

        utIskola = path.join(
            __dirname,
            '..',
            'eredmenyek',
            `${cim} ${okt}`,
            'iskola.csv'
        );
    } else {
        utKonyvtar = path.join(__dirname, '..', 'eredmenyek', `${cim}`);

        utOsztaly = path.join(
            __dirname,
            '..',
            'eredmenyek',
            `${cim}`,
            `${osztaly}.csv`
        );

        utIskola = path.join(
            __dirname,
            '..',
            'eredmenyek',
            `${cim}`,
            'iskola.csv'
        );
    }

    if (!fs.existsSync(utKonyvtar)) {
        fs.mkdirSync(utKonyvtar);
        fs.writeFileSync(utOsztaly, kiirando, {
            encoding: 'utf-8',
            flag: 'a',
        });
        fs.writeFileSync(utIskola, kiirando, {
            encoding: 'utf-8',
            flag: 'a',
        });
    } else {
        fs.writeFileSync(utOsztaly, kiirando, {
            encoding: 'utf-8',
            flag: 'a',
        });
        fs.writeFileSync(utIskola, kiirando, {
            encoding: 'utf-8',
            flag: 'a',
        });
    }

    // res.json({ message: kiirando });
    res.redirect('/kerdoivek');
};
