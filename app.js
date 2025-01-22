const express = require('express');
//let mysql = require('mysql');
//const fileUpload = require('express-fileupload');
const app = express();
const path = require('path');
/*const mysql = require('mysql')
const connection = mysql.createConnection({
    host: 'localhost',
    user: '38',
    password: 'x9qVUh7tj7jfOE0c',
    database: 'adivitya_38'
})

connection.connect()

connection.query('SELECT 1 + 1 AS solution', (err, rows, fields) => {
    if (err) throw err

        console.log('The solution is: ', rows[0].solution)
        console.log(rows.length, fields.length, err)
})

connection.end()
*/

app.use('/assets', express.static(path.join(__dirname, 'assets')));
//app.use(fileUpload());

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

/*app.post('/talent/register', (req, res) => {
    console.log(req.query);
    let uploadedFile = req.files.resume;
    console.log(`File Name: ${uploadedFile.name}`);
    console.log(`File Size: ${uploadedFile.size}`);
    /*let fpath = 'assets/pfps/' + Math.random().toString(36).substring(2,10);
    req.files.resume.mv(fpath, (err) => {
        console.log(err);
        if (err) throw err;
    });*/
    /*res.redirect('/');
});*/

app.post('/talent/register/submit', (req, res) => {
    res.redirect('/');
});

app.listen(8000, () => console.log('app listening on port 8000'));
