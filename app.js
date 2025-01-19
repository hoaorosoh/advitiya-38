let express = require('express');
let mysql = require('mysql');
let app = express();
let path = require('path');

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.render('index', {foo: "FOO"});
});

app.get('/talent', (req, res) => {
    res.render('ClientBrowse', {foo: "FOO"});
});

app.get('/talent/browse', (req, res) => {
    res.render('ClientBrowse', {foo: "FOO"});
});

app.get('/talent/register', (req, res) => {
    res.render('TalentRegistration', {foo: "FOO"});
});

app.listen(8000, () => console.log('app listening on port 8000'));
