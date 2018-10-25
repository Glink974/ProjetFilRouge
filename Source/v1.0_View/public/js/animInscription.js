var precedent = document.getElementById("Precedent");
var suivant = document.getElementById("Suivant");


var nom = document.getElementById("NomInscription");
var prenom = document.getElementById("PrenomInscription");
var email = document.getElementById("emailInscription");
var ville = document.getElementById("villeInscription");
var mdp = document.getElementById("parapheMdp");
var confirm = document.getElementById("parapheConfirm");
var valider = document.getElementById("Valider");



suivant.addEventListener('click', function () {

    mdp.style.display = "block";
    confirm.style.display = "block";

    precedent.style.display = "block";
    valider.style.display = "block";

    nom.style.display = "none";
    prenom.style.display = "none";
    email.style.display = "none";
    ville.style.display = "none";
    suivant.style.display = "none";


});




precedent.addEventListener('click', function () {

    mdp.style.display = "none";
    confirm.style.display = "none";
    precedent.style.display = "none";
    valider.style.display = "none";


    suivant.style.display = "block";
    nom.style.display = "block";
    prenom.style.display = "block";
    email.style.display = "block";
    ville.style.display = "block";



});
