var http = require('http');
var express = require('express');


var fs = require('fs');
var vm = require('vm');


var io = require('socket.io');

var bodyParser = require('body-parser');
var mysql = require('mysql');

var io = require('socket.io');






var session = require("express-session")({
    secret: 'secret',
    resave: true,
    saveUninitialized:true
});







var sharedsession = require("express-socket.io-session");



var utilisateurService = require('./UtilisateurService');


var urlencodedParser = bodyParser.urlencoded({
    extended: true
});



//----------------------------------- Appel de fichier -----------------------------------------




var contentBD = fs.readFileSync('./Persistence.js');
var contentModel = fs.readFileSync('../Model/Evenement.js');
var contentModelUtilisateur = fs.readFileSync('../Model/Utilisateur.js');



//---------------------------------- Configuration -------------------------------------------

var app = express();

var server = http.createServer(app);

io = io(server);





app.use(session)


io.use(sharedsession(session));

app.set('socketio',io);








app.use(function (req, res, next) {

    if (typeof (req.session.prenomUtilisateurConnecter) == 'undefined') {
        req.session.prenomUtilisateurConnecter = 'p';
    }


    if (typeof (req.resultsTop) == 'undefined') {
        req.resultsTop = [];
    }

    session.io = io;
    


    next();


});

//--------------------------------------- Page d'accueil -------------------------------------------

app.get('/', async function (req, res) {

    vm.runInThisContext(contentBD);
    connexionBD(mysql);

    req.session.erreurs = [""];
    vm.runInThisContext(contentModel);


    var resultsTop = await afficherTop(5);


    res.render('../../v1.0_View/html/Accueil.ejs', {
        resultsTop: resultsTop,
        prenom: req.session.prenomUtilisateurConnecter
        //mdp: req.session.mdpUtilisateurConnecter
    });



});

//---------------------------------------------------------------------------------------------------


app.use(express.static('../v1.0_View/public'));

app.use('/Utilisateur', utilisateurService);

server.listen('8080');

