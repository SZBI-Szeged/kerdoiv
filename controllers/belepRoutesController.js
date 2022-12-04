const fsPromises = require('fs').promises;
const path = require('path');

const listaPath = path.join(__dirname, '..', 'public', 'lista.txt');

exports.getBelep = (req, res) => {
    const { nev, statusz } = req.app.locals;

    if (nev) {
        const tomb = nev.split('_');

        if (statusz == 't') {
            req.app.locals.osztaly = tomb[0].slice(0, 2);
        }

        res.render('folap', { nev, statusz });
    } else {
        res.render('belep');
    }
};

exports.postBelep = async (req, res) => {
    const { nev, jelszo } = req.app.locals;

    try {
        const adat = await fsPromises.readFile(listaPath, 'utf-8');
        const tomb = adat.split('\n');
        let vanE = false;
        let statusz = '';

        tomb.forEach((elem) => {
            const name = elem.trim().split('_')[0];
            const status = elem.trim().split('_')[1];
            const password = elem.trim().split('_')[2];

            if (name == nev && password == jelszo) {
                vanE = true;
                statusz = status;
                req.app.locals.statusz = status;

                const tomb = nev.split('_');

                if (statusz == 't') {
                    req.app.locals.osztaly = tomb[0].slice(0, 2);
                }

                console.log(req.app.locals);
            }
        });

        if (vanE) {
            res.render('folap', { nev, statusz });
        } else {
            res.render('belep');
        }
    } catch (error) {
        console.log(error.message);
    }
};
