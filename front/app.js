import express from 'express';
import handlebars from 'express-handlebars';
import bodyParser  from 'body-parser';
import fetch from 'node-fetch';

const app = express();

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

/**
 * Config
 */
//handlebars
app.engine('handlebars', handlebars.engine()); 
app.set('view engine', 'handlebars');
app.set('views', './views');
// bodyparser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// static
app.use(express.static(__dirname + '/public'));
/**
 * Config
 */

// routes
app.get('/', (req, res) => {
    fetch('http://localhost:3000/clientes', {method: "GET"})
    .then(resposta => resposta.json()
    .then(resposta => res.render('home', {dados: resposta})));    
});

app.post('/cadastrar', (req, res) => {
    const name = req.body.name;
    const idade = req.body.idade;
    const data = {
        "name": name,
        "idade": idade
    };
    fetch('http://localhost:3000/clientes', {
        method: "POST",
        body: JSON.stringify(data),
        headers: {'Content-Type': 'application/json'}
    })
    .then(res.redirect('/'));
});

app.get('/selecionar/:id', (req, res) => {
    const id = req.params.id;

    fetch('http://localhost:3000/clientes/'+id, {method: "GET"})
    .then(resposta => resposta.json()
    .then(resposta => res.render('selecionar', {dados: resposta})));
});

app.post('/editar', (req, res) => {
    const name = req.body.name;
    const idade = req.body.idade;
    const id = req.body.id;

    const data = {
        "name": name,
        "idade": idade
    };

    fetch('http://localhost:3000/clientes/' + id, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {'Content-Type': 'application/json'}
    })
    .then(res.redirect('/'));
});

app.get('/remover/:id', (req, res) => {
    const id = req.params.id;

    fetch('http://localhost:3000/clientes/'+id, {method: 'DELETE'})
    .then(res.redirect('/'));
});

app.listen(3021, () => console.log("Server running at port", 3021));