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

    vm.runInThisContext(contentModel);

    if (typeof (req.session.erreurs) == 'undefined') {
        req.session.erreurs = [""];
    }

    if (typeof (req.session.afficherRechNom) == 'undefined') {
        req.session.afficherRechNom = 'false' ;
    }

    if (typeof (req.session.prenomUtilisateurConnecter) == 'undefined') {
        req.session.prenomUtilisateurConnecter = 'p';
    }

    if (typeof (req.session.evenement) == 'undefined') {
        var event = new Evenement();
        req.session.evenement = event;
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

//-------------------------------------- Page Rechercher Par Nom ------------------------------------------

router.post('/RechercherParNom', urlencodedParser, async function (req, res) {



    var nom = req.body.Nom_Event;

    console.log(nom);

    vm.runInThisContext(contentBD);
    connexionBD(mysql);

    vm.runInThisContext(contentModel);


    req.session.erreurs = [""];

    var evenement = await rechercherParNom(nom);
    req.session.evenement = evenement;


    console.log(req.session.evenement);
    console.log(nom);

    if (nom === evenement.getNom()) {

        req.session.afficherRechNom = 'true';
        req.session.afficherRechDate = 'false';

        req.session.erreurRechNom = 'false';
        req.session.erreurRechDate = 'false';

        res.redirect('/Utilisateur/PageUser');

    }else if (nom !== evenement.getNom()){

        req.session.afficherRechNom = 'false';

        req.session.erreurRechNom = 'true';
        req.session.erreurRechDate = 'false';

        console.log('ERREUR DE SAISIE');

        res.redirect('/Utilisateur/PageUser');

//Penser à gérer la recherche vide
    }else {



        console.log("Erreur dans le chargment du résultat de la recherche  !!!!");

        res.redirect('/Utilisateur/PageUser');

    }

});


//-------------------------------------- Page Rechercher Par DATE ------------------------------------------

router.post('/RechercherParDate', urlencodedParser, async function (req, res) {



    var date = req.body.Date_Event;


    console.log(date);

    vm.runInThisContext(contentBD);
    connexionBD(mysql);

    vm.runInThisContext(contentModel);


    req.session.erreurs = [""];

    var evenement = await rechercherParDate(date);
    req.session.evenement = evenement;

    console.log(req.session.evenement);

    if (date === evenement.getDate()) {

        req.session.afficherRechDate = 'true';
        req.session.afficherRechNom = 'false';

        req.session.erreurRechDate = 'false';
        req.session.erreurRechNom = 'false';

        res.redirect('/Utilisateur/PageUser');

    }else if (date !== evenement.getDate()){

        req.session.afficherRechDate = 'false';

        req.session.erreurRechDate = 'true';
        req.session.erreurRechNom = 'false';

        console.log('ERREUR DE SAISIE');

        res.redirect('/Utilisateur/PageUser');

    //Penser à gérer la recherche vide
    }else {

        console.log("Erreur dans le chargment du résultat de la recherche  !!!!");

        res.redirect('/Utilisateur/PageUser');

    }

});



module.exports = router;
