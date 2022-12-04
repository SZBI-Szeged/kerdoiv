const fs = require('fs');
const path = require('path');

exports.postLetrehoz = (req, res) => {
    const test = req.body;
    const cim = req.body.cim;
    let szoveg = '';
    let kerdesSzam = 0;
    let valaszSzam = 0;
    for (const key in test) {
        if (key.includes('kerdes_')) {
            szoveg += `${test[key]}\n`;
            kerdesSzam++;
        } else if (key.includes('valasz_')) {
            // valaszok.push(test[key]);
            szoveg += `${test[key]}\n`;
            valaszSzam++;
        }
    }

    szoveg += `${kerdesSzam};${valaszSzam}`;

    const utvonal = path.join(__dirname, '..', 'kerdoivek', `${cim}.txt`);
    console.log(utvonal);

    fs.writeFileSync(utvonal, szoveg);

    res.redirect('/kerdoivek');
};
