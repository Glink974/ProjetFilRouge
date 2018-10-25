var mySqlClient;



//------------------------------------- Connexion -----------------------------------------------

function connexionBD(mysql) {

    mySqlClient = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "gestionevent"
    });

    console.log("connexion réussi");


}



//------------------------------------- Ajout Utilisateur--------------------------------------------

function ajouterUtilisateur(utilisateur) {

    var selectQuery = "INSERT INTO `gestionevent`.`utilisateur` (`Nom`, `Prenom`, `Email`, `Ville`, `Mot_de_passe`, `IdRole`) VALUES  ?";


    var value = [[utilisateur.getNom(), utilisateur.getPrenom(), utilisateur.getEmail(), utilisateur.getVille(), utilisateur.getMots_de_passe(), 1]];

    mySqlClient.query(selectQuery, [value], function (err, result) {
        if (err) throw err;
    });

    console.log(" ajout effectuer !");

}



//------------------------------------- Affiche Top --------------------------------------------

function afficherTop(nombre) {

    var res = [];
    var selectQuery = "SELECT Nom_evenement,Nombre_de_participants,Liens FROM evenement ORDER BY Nombre_de_participants DESC  LIMIT ? ";

    return new Promise((resolve, reject) =>
        mySqlClient.query(selectQuery, [nombre], function select(error, results, fields) {

            if (error) {
                mySqlClient.end();
                reject(error);
            }

            if (results.length > 0) {
                
               
                
                for (var i = 0; i < results.length; i++) {
                    var result = results[i];

                     var evenement = new Evenement();

                    var nomEvenement = result['Nom_evenement'];
                    var participants = result['Nombre_de_participants'];
                    var lien = result['Liens'];

                    evenement.setNom(nomEvenement);
                    evenement.setParticipants(participants);
                    evenement.setLien(lien);


                    res.push(evenement);

                }
            }
        
            resolve(res);

        })
    );

}


//----------------------------------- Connexion Utilisateur-------------------------------------

function connexionUtilisateur(iden) {


    var utilisateur = new Utilisateur();
    var prenomTrouver = '';
    var mdpTrouver = '';

    utilisateur.setPrenom(prenomTrouver);
    utilisateur.setMots_de_passe(mdpTrouver);


    var selectQuery = "SELECT Prenom,Mot_de_passe FROM gestionevent.utilisateur WHERE Email= ?";

    return new Promise((resolve, reject) =>
        mySqlClient.query(selectQuery, [iden], function select(error, results, fields) {

            if (results.length > 0) {
                var result = results[0];

                prenomTrouver = result['Prenom'];
                mdpTrouver = result['Mot_de_passe'];


                utilisateur.setPrenom(prenomTrouver);
                utilisateur.setMots_de_passe(mdpTrouver);


            }
            if (error) {

                mySqlClient.end();
                reject(error);

            }

            resolve(utilisateur);
        })

    );



}
