require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3500;

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

appLocalsBeallit = (req, res, next) => {
    const { nev, jelszo } = req.body;
    app.locals.nev = nev;
    app.locals.jelszo = jelszo;
    next();
};

app.use('/', require('./routes/mainRoutes'));
app.use('/belep', appLocalsBeallit, require('./routes/belepRoutes'));
app.use('/sablon', require('./routes/sablonRoutes'));
app.use('/sablonFeltolt', require('./routes/sablonFeltoltRoutes'));
app.use('/kerdoivek', require('./routes/kerdoivekRoutes'));
app.use('/kerdoiv', require('./routes/kerdoivRoutes'));
app.use('/letrehoz', require('./routes/letrehozRoutes'));
app.use('/kiertekel', require('./routes/kiertekelRoutes'));
app.use('/ertekel', require('./routes/ertekelesRoutes'));
app.use('/tablazatok', require('./routes/tablazatokRoutes'));
app.use('/tablazat', require('./routes/tablazatRoutes'));
app.use('/kilep', require('./routes/kilepRoutes'));

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
