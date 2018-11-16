function Menu(prenom) {

    //---------- DECLARATION DES BALISES ----------
    var menu = document.getElementById("menu");

    var h1 = document.createElement("h1");

    var titre_h1 = document.createTextNode("MENU");
    h1.appendChild(titre_h1);


    var navigation = document.createElement("nav");

    var ul = document.createElement("ul");
    ul.id = "liste";

    var li_rechNom = document.createElement("li");
    li_rechNom.id = "rechNom";

    var a_rechNom = document.createElement("a");
    var text_rechNom = document.createTextNode("Rechercher par Nom");

    a_rechNom.href = "#";

    a_rechNom.appendChild(text_rechNom);

    li_rechNom.appendChild(a_rechNom);

    var li_rechDate = document.createElement("li");
    li_rechDate.id = "rechDate";


    var a_rechDate = document.createElement("a");
    var text_rechDate = document.createTextNode("Rechercher par Date");

    a_rechDate.href = "#";

    a_rechDate.appendChild(text_rechDate);

    li_rechDate.appendChild(a_rechDate);



    //---------- CONSULTER ----------

    var li_consulter = document.createElement("li");
    li_consulter.id = "consulter";
    var a_consulter = document.createElement("a");
    var text_consulter = document.createTextNode("Consulter les événements");

    a_consulter.href = "/Evenement/Consulter";

    a_consulter.appendChild(text_consulter);

    li_consulter.appendChild(a_consulter);



    /*
    //---------- RETOUR ----------

    var li_retour = document.createElement("li");
    li_retour.id = "retour";

    var a_retour = document.createElement("a");
    var text_retour = document.createTextNode("Retour à l'Accueil");

    a_retour.href = "/";

    a_retour.appendChild(text_retour);
    li_retour.appendChild(a_retour);

    ul.appendChild(li_retour);*/

    console.log(prenom);
    
    if (prenom == 'p' || prenom == '') {



        //---------- CONSULTER ----------

        ul.appendChild(li_consulter);



        //---------- S'INSCRIRE ----------
        var li_inscrire = document.createElement("li");
        li_inscrire.id = "inscrire";

        var a_inscrire = document.createElement("a");
        var text_inscrire = document.createTextNode("S'inscrire");

        a_inscrire.href = "/Utilisateur/Inscription";

        a_inscrire.appendChild(text_inscrire);

        li_inscrire.appendChild(a_inscrire);

        ul.appendChild(li_inscrire);



        var suppRechNom = document.getElementById('rechNom');
        var suppRechDate = document.getElementById('rechDate');

        console.log(ul.childNodes[1]);
        console.log(ul.childNodes[2]);

        for (var i = 0; i < ul.childElementCount; i++) {
            var enfant= ul.childNodes[i];
            
            if (enfant== suppRechNom) {

                console.log('Vous êtes ici !!!!!');
                ul.removeChild(ul.childNodes[i]);
            

            }
             if (enfant== suppRechDate) {

                console.log('Vous êtes ici !!!!!');
                ul.removeChild(ul.childNodes[i]);
            

            }
            
            
            
            
        }
        /*
    if ( (ul.childNodes[1] == suppRechNom)) {
        
        console.log('Vous êtes ici !!!!!');

        suppRechNom.parentNode.removeChild(suppRechNom);

        //ul.removeChild(ul.childNodes[1]);
        //ul.removeChild(ul.childNodes[1]);


    }

*/
    }




    //---------- IF -----------------------------------------------



    if (prenom != 'p' && prenom != '') {


        //---------- CONSULTER ----------

        ul.appendChild(li_consulter);


        //---------- RECHERCHER PAR NOM ----------


        ul.appendChild(li_rechNom);


        //---------- RECHERCHER PAR DATE ----------


        ul.appendChild(li_rechDate);



    }



    navigation.appendChild(h1);
    navigation.appendChild(ul);

    menu.appendChild(navigation);



}
