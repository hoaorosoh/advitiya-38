let express = require('express');
//let mysql = require('mysql');
let app = express();
let path = require('path');
/*const mysql = require('mysql')
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'dbuser',
    password: 's3kreee7',
    database: 'my_db'
})

connection.connect()

connection.query('SELECT 1 + 1 AS solution', (err, rows, fields) => {
    if (err) throw err

        console.log('The solution is: ', rows[0].solution)
})

connection.end()
*/

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
