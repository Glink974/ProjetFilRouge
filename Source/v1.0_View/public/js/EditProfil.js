function editProfil() {



    var nomSasie = document.getElementById("Champs_Nom_Util");
    var prenomSasie = document.getElementById("Champs_Prenom_Util");
    var villeSasie = document.getElementById("Champs_Ville_Util");
    var buttonModif = document.getElementById("modif");


    nomSasie.addEventListener('input', function () {

    
        if (nomSasie.value.length>2) {      
            buttonModif.disabled = false;
        }

        
        if (nomSasie.value.length<2) {
           
            buttonModif.disabled = true;
        }

    });

    prenomSasie.addEventListener('input', function () {
         
        if (prenomSasie.value.length>2) {      
            buttonModif.disabled = false;
        }

        
        if (prenomSasie.value.length<2) {
           
            buttonModif.disabled = true;
        }

    });

    villeSasie.addEventListener('input', function () {
       
        buttonModif.disabled = false;

    });


}
