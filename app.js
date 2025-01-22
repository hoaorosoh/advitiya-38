const express = require('express');
//let mysql = require('mysql');
//const fileUpload = require('express-fileupload');
const app = express();
const path = require('path');
const mysql = require('mysql')
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

app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use(express.urlencoded({ extended: true }));
//app.use(fileUpload());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.render('index', {foo: "FOO"});
});

app.get('/talent', (req, res) => {
    res.redirect('/talent/browse');
});

app.get('/talent/browse', (req, res) => {
    connection.query("SELECT * FROM Talent", (err, result, fields) => {
        if (err) throw err;

        console.log(fields);
        console.log(result);
        res.render('ClientBrowse', {result});
    });
});

app.get('/talent/register', (req, res) => {
    res.render('TalentRegistration', {foo: "FOO"});
});

app.get('/client/register', (req, res) => {
    res.render('ClientRegistration', {foo: "FOO"});
});

app.post('/client/register', (req, res) => {
    console.log(req.body);


    /*let uploadedFile = req.files.resume;
     c onsole.log(`File *Name: ${uploadedFile.name}`);
console.log(`File Size: ${uploadedFile.size}`);
/*lest fpath = 'assets/pfps/' + Math.random().toString(36).substring(2,10);
 r eq.files.resume.m*v(fpath, (err) => {
 console.log(err);
if (err) throw err;
});*/

let nextID;
connection.query("SELECT TalentID FROM Talent", (err, result, fields) => {
    if (err) throw err;

    nextID = result.length + 1;
    console.log(nextID);
})

let query = `
INSERT INTO Talent (Name, Phone, Email)
VALUES (?, ?, ?)
`;

const values = [
    req.body.name,
    req.body.number,
    req.body.email
];

connection.query(query, values, (err) => {
    if (err) throw err;
    console.log(`Added one talent: ${req.body.name}`);
});


res.redirect('/');
});

app.post('/talent/register', (req, res) => {
    console.log(req.body);
    let nextID;
    connection.query("SELECT TalentID FROM Talent", (err, result, fields) => {
        if (err) throw err;

        nextID = result.length + 1;
        console.log(nextID);
    })

    let query = `
    INSERT INTO Talent (Name, Phone, Email, Skills)
    VALUES (?, ?, ?, ?)
    `;

    const values = [
         req.body.name,
         req.body.number,
         req.body.email,
         req.body.skills
    ];

    connection.query(query, values, (err) => {
        if (err) throw err;
        console.log(`Added one client: ${req.body.name}`);
    });


    res.redirect('/');
});

app.post('/talent/register/submit', (req, res) => {
    res.redirect('/');
});

app.listen(8000, () => console.log('app listening on port 8000'));
