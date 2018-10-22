console.log("C'est parti !");


var nomSaisie = document.getElementById('nomSaisie');
var erreurNom = document.getElementById('erreurNom');

var prenomSaisie = document.getElementById('prenomSaisie');
var erreurPrenom = document.getElementById('erreurPrenom');


var text3 = document.createTextNode(" 3 caractère mininum");

var mdpSaisie = document.getElementById('mdpSaisie');
var erreurmdp = document.getElementById('erreurmdp');

var confirmSaisie = document.getElementById('confirmSaisie');
var erreurconfirm = document.getElementById('erreurconfirm');




var faible = document.createTextNode('niveau faible');
var moyen = document.createTextNode('niveau moyen');
var forte = document.createTextNode('niveau forte');



function colorie() {

    if (erreurmdp.textContent == 'niveau faible') {
        erreurmdp.style.color = "red";
    }

    if (erreurmdp.innerHTML == 'niveau moyen') {
        erreurmdp.style.color = "orangered";
    }
    
    
    if (erreurmdp.innerHTML == 'niveau forte') {
        erreurmdp.style.color = "green";
    }
}





//--------------------------------------- Nom -------------------------------------------------

nomSaisie.addEventListener('focus', function () {

    if (!erreurNom.hasChildNodes()) {
        erreurNom.appendChild(text3);
        
        colorie();
    }

});


nomSaisie.addEventListener('blur', function () {

    if (erreurNom.hasChildNodes()) {
        erreurNom.removeChild(text3);

    }

});


nomSaisie.addEventListener('keypress', function () {

    if (nomSaisie.value.length >= 2 && erreurNom.hasChildNodes()) {
        erreurNom.removeChild(text3);

    }

    if (nomSaisie.value.length < 2 && !(erreurNom.hasChildNodes())) {
        erreurNom.appendChild(text3);
        colorie();
    }

});

//------------------------------------ Prenom -------------------------------------------

prenomSaisie.addEventListener('focus', function () {
    if (!erreurPrenom.hasChildNodes()) {
        erreurPrenom.appendChild(text3);

    }

});


prenomSaisie.addEventListener('blur', function () {
    if (erreurPrenom.hasChildNodes()) {
        erreurPrenom.removeChild(text3);

    }

});


prenomSaisie.addEventListener('keypress', function () {

    if (prenomSaisie.value.length >= 2 && erreurPrenom.hasChildNodes()) {
        erreurPrenom.removeChild(text3);

    }

    if (prenomSaisie.value.length < 2 && !(erreurPrenom.hasChildNodes())) {
        erreurPrenom.appendChild(text3);
        colorie();
    }

});

//--------------------------------- Mots de passe----------------------------------------------


mdpSaisie.addEventListener('focus', function () {

    if (!(erreurmdp.hasChildNodes())) {
        erreurmdp.appendChild(faible);
        colorie();
    }

});



mdpSaisie.addEventListener('blur', function () {
    if (erreurmdp.hasChildNodes()) {
        erreurmdp.removeChild(erreurmdp.childNodes[0]);
    }

});



mdpSaisie.addEventListener('keyup', function () {


    if (mdpSaisie.value.length <= 4 && (erreurmdp.hasChildNodes())) {
        erreurmdp.removeChild(erreurmdp.childNodes[0]);
        erreurmdp.appendChild(faible);
        colorie();

    }
    if ((4 < mdpSaisie.value.length) && (mdpSaisie.value.length <= 8) && !(erreurPrenom.hasChildNodes())) {
        erreurmdp.removeChild(erreurmdp.childNodes[0]);
        erreurmdp.appendChild(moyen);
        colorie();

    }
    if ((mdpSaisie.value.length > 8) && !(erreurPrenom.hasChildNodes())) {
        erreurmdp.removeChild(erreurmdp.childNodes[0]);
        erreurmdp.appendChild(forte);
        colorie();
    }

});
