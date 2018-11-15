var express = require('express');
var http = require('http');

var router = express.Router();

var server;

var io;

var session = require("express-session")({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
});


var sharedsession = require("express-socket.io-session");

var bodyParser = require('body-parser');

var fs = require('fs');


var vm = require('vm');

var mysql = require('mysql');
var async = require('async');


var ent = require('ent');



//---------------------------------- Configuration -------------------------------------------


var urlencodedParser = bodyParser.urlencoded({
    extended: true
});




var contentBD = fs.readFileSync('./Persistence.js');
var contentModel = fs.readFileSync('../Model/Evenement.js');


router.use(function (req, res, next) {

    if (typeof (req.session.erreurs) == 'undefined') {
        req.session.erreurs = [""];
    }


    if (typeof (req.session.prenomUtilisateurConnecter) == 'undefined') {
        req.session.prenomUtilisateurConnecter = 'p';
    }

    /*server = req.app.get('server');

    io = req.app.get('socketio');

    io = require("socket.io")(server),
    session = req.app.get('session');
    session.io = io;*/



    next();
});


router.use(session);

//-------------------------------------- Page Consulter événements ------------------------------------------


router.get('/Consulter', async function (req, res) {

    vm.runInThisContext(contentBD);
    connexionBD(mysql);

    vm.runInThisContext(contentModel);

    req.session.erreurs = [""];

    
    
    var resultsEvent = await afficherEvent();
    res.render('../../v1.0_View/html/ConsulterEvent.ejs', {
        resultsEvent: resultsEvent,
        prenom: req.session.prenomUtilisateurConnecter
    });

});



module.exports = router;
