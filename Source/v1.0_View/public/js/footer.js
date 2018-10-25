function footer() {


    var footer = document.getElementById("footer");

    var blocPage = document.getElementById("bloc_page");




    var photosEvent = document.createElement("div");
    photosEvent.id = "photosEvents_passees";


    var h1 = document.createElement("h1");
    var titre_h1 = document.createTextNode("Evénements passés");
    h1.appendChild(titre_h1);

   


    var p = document.createElement("p");

    var img1 = document.createElement("img");
    img1.src = "../contenu/images/photo1.jpg";
    img1.alt = "Photographie";

    var img2 = document.createElement("img");
    img2.src = "../contenu/images/photo2.jpg";
    img2.alt = "Photographie";

    var img3 = document.createElement("img");
    img3.src = "../contenu/images/photo3.jpg";
    img3.alt = "Photographie";


    p.appendChild(img1);
    p.appendChild(img2);
    p.appendChild(img3);
    
    photosEvent.appendChild(h1);
    photosEvent.appendChild(p);



    var contact = document.createElement("div");
    contact.id = "contact";

    var a1 = document.createElement("a");
    a1.href = "#";
    a1.title = "Ciquez pour y accéder";

    var strong1 = document.createElement("strong");
    var textContact = document.createTextNode("contact");


    strong1.appendChild(textContact);
    a1.appendChild(strong1);
    contact.appendChild(a1);

    var propos = document.createElement("div");
    propos.id = "a_propos";

    var a2 = document.createElement("a");
    a2.href = "#";
    a2.title = "Ciquez pour y accéder";

    var strong2 = document.createElement("strong");
    var textPropos = document.createTextNode("a propos");


    strong2.appendChild(textPropos);
    a2.appendChild(strong2);
    propos.appendChild(a2);


   
    footer.appendChild(photosEvent);
    footer.appendChild(contact);
    footer.appendChild(propos);




}
