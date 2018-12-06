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
var Cryptr = require('cryptr');
var async = require('async');


var ent = require('ent');


//Mailing

var nodemailer = require('nodemailer');



//---------------------------------- Configuration -------------------------------------------









var urlencodedParser = bodyParser.urlencoded({
    extended: true
});




var contentBD = fs.readFileSync('./Persistence.js');
var contentModelUtilisateur = fs.readFileSync('../Model/Utilisateur.js');



var cryptr = new Cryptr('mySecretKey');






var transporter = nodemailer.createTransport({
    service: 'gmail',
    //port: 587,
    //secure: false,
    auth: {
        user: 'gillessilotia@gmail.com',
        pass: ''
    }
});









router.use(function (req, res, next) {

    vm.runInThisContext(contentBD);
    connexionBD(mysql);

    if (typeof (req.session.erreurs) == 'undefined') {
        req.session.erreurs = [""];
    }


    if (typeof (req.session.prenomUtilisateurConnecter) == 'undefined') {
        req.session.prenomUtilisateurConnecter = 'p';
    }


    if (typeof (req.session.nomUtilisateurConnecter) == 'undefined') {
        req.session.nomUtilisateurConnecter = 'p';
    }
    if (typeof (req.session.villeUtilisateurConnecter) == 'undefined') {
        req.session.villeUtilisateurConnecter = 'p';
    }


    if (typeof (req.session.afficherRechNom) == 'undefined') {
        req.session.afficherRechNom = 'false' ;
    }

    if (typeof (req.session.erreurRechNom) == 'undefined') {
        req.session.erreurRechNom = 'false' ;
    }

    if (typeof (req.session.afficherRechDate) == 'undefined') {
        req.session.afficherRechDate = 'false' ;
    }

    if (typeof (req.session.erreurRechDate) == 'undefined') {
        req.session.erreurRechDate = 'false' ;
    }






    server = req.app.get('server');

    io = req.app.get('socketio');

    io = require("socket.io")(server),
        session = req.app.get('session');
    session.io = io;

    if (typeof (req.session.evenement) == 'undefined') {
        var event = new Evenement();
        req.session.evenement = event;
    }

    next();
});



router.use(session);



//-------------------------------------- Page d'inscription ------------------------------------------


router.get('/Inscription', function (req, res) {

    res.render('../../v1.0_View/html/Inscription.ejs', {
        erreurs: req.session.erreurs
    });
});




router.post('/traitementInscription', urlencodedParser, function (req, res) {

    vm.runInThisContext(contentBD);
    connexionBD(mysql);


    vm.runInThisContext(contentModelUtilisateur);


    req.session.erreurs.pop();

    var nom = req.body.nomSaisie;
    var prenom = req.body.prenomSaisie;
    var email = req.body.emailSaisie;
    var mdp = req.body.mdpSaisie;
    var confirm = req.body.confirmSaisie;
    var ville = req.body.villeSaisie;

    if (nom.length < 3) {
        req.session.erreurs.push("Nom incorrect");
    }

    if (prenom.length < 3) {
        req.session.erreurs.push("Prenom incorrect");
    }

    if (mdp.length < 6) {
        req.session.erreurs.push("Mots de passe trop court, 6 caractère mininum");
    }
    if (mdp != confirm) {
        req.session.erreurs.push("Le mots de passe et la sa confirmation ne sont pas identique");
    }

    mdp = cryptr.encrypt(mdp);


    var utilisateur = new Utilisateur(nom, prenom, email, mdp, ville);

    if (req.session.erreurs.length == 0) {
        ajouterUtilisateur(utilisateur);

        //Envoie du mail

        var testMessage = 'Félicitation ' + nom + ', votre compte a bien été creer ! '
        var mailOptions = {
            from: 'gillessilotia@gmail.com',
            to: email,
            subject: 'Confirmation Email using Node.js ',
            text: testMessage
        };




        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email envoyé: ' + info.response);
            }
        });

        transporter.close();
    }


    res.redirect('/Utilisateur/Inscription');


});


//-------------------------------------------- Connexion --------------------------------------------




router.post('/TraitementConnexion', urlencodedParser, async function (req, res) {

    vm.runInThisContext(contentBD);
    connexionBD(mysql);



    vm.runInThisContext(contentModelUtilisateur);


    var iden = req.body.identifiant;
    var mdp = req.body.pass;



    var utilisateur = await connexionUtilisateur(iden);


    var mdpRenvoyer = utilisateur.getMots_de_passe();



    if (mdpRenvoyer != '') {
        mdpRenvoyer = cryptr.decrypt(mdpRenvoyer);
    }

    if (iden == '' || mdp == '' || utilisateur.getPrenom() == '' || mdp != mdpRenvoyer) {
        req.session.prenomUtilisateurConnecter = '';
        res.redirect('/');

    } else {
        req.session.prenomUtilisateurConnecter = utilisateur.getPrenom();
        req.session.nomUtilisateurConnecter = utilisateur.getNom();
        req.session.villeUtilisateurConnecter = utilisateur.getVille();
        res.redirect('/Utilisateur/PageUser');

    }


});


//------------------------------------- Page Utilisateur-----------------------------------------

router.get('/PageUser', async function (req, res) {

    var prenom = req.session.prenomUtilisateurConnecter;
    var nom = req.session.nomUtilisateurConnecter;
    var ville = req.session.villeUtilisateurConnecter;

    var resultsEvent = await afficherEvent();

    res.render('../../v1.0_View/html/Accueil_user.ejs', {
        prenom: prenom,
        nom: nom,
        ville: ville,
        evenement: req.session.evenement,
        boolRech: req.session.afficherRechNom,
        errRech: req.session.erreurRechNom,
        boolRechD: req.session.afficherRechDate,
        errRechD: req.session.erreurRechDate,
        resultsEvent: resultsEvent

    });


    io.use(sharedsession(session));



    io.on('connection', function (socket) {

        // 2)Reception de l'identifiant
        socket.on("login", function (userdata) {
            socket.handshake.session.userdata = userdata;
            socket.handshake.session.save();

            console.log(socket.handshake.session.userdata + " vient de se connecter !");

            //3)envoie message aux autres clients
            socket.broadcast.emit('nouveau_Utilisateur', {
                prenom: socket.handshake.session.userdata,
                message: " a rejoint le chat "
            });

        });



        //6)Reception message et renvoie partout
        socket.on('message', function (data) {


            var message = ent.encode(data.message);
            var prenom = ent.encode(data.prenom);
            console.log(prenom + ' me parle ! Il me dit : ' + message);


            socket.broadcast.emit('message', {
                prenom: prenom,
                message: message
            });

        });

        //9)Reception du message de deconnexion
        socket.on('discon', function (message) {
            message = ent.encode(message);
            console.log(message);
            socket.broadcast.emit('deco', message);
        });


    });

});


//---------------------------------------- Traitement Profil -----------------------------------------------



router.get('TraitementProfil', function (req, res) {


    vm.runInThisContext(contentBD);
    connexionBD(mysql);

    var nouvNom = req.body.Champs_Nom_Util;
    var nouvPrenom = req.body.Champs_Prenom_Util;
    var nouvVille = req.body.Champs_Ville_Util;

    updateProfil(nouvNom, nouvPrenom, nouvVille);


});









//---------------------------------------- Deconnexion -----------------------------------------------

router.get('/TraitementDeco', function (req, res) {

    req.session.prenomUtilisateurConnecter = 'undefined';

    res.redirect('/');

});


module.exports = router;
