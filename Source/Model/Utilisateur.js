function Utilisateur(nom,prenom,email,mots_de_passe,ville){
    
    this.nom=nom;
    this.prenom=prenom;
    this.email=email;
    this.mots_de_passe=mots_de_passe;
    this.ville=ville;  
    
}





Utilisateur.prototype.getNom=function(){
    return this.nom;
}


Utilisateur.prototype.setNom=function(nom){
    this.nom=nom;
}

Utilisateur.prototype.getPrenom=function(){
    return this.prenom;
}


Utilisateur.prototype.setPrenom=function(prenom){
    this.prenom=prenom;
}



Utilisateur.prototype.getEmail=function(){
    return this.email;
}


Utilisateur.prototype.setEmail=function(email){
     this.email=email;
}





Utilisateur.prototype.getMots_de_passe=function(){
    return this.mots_de_passe;
}


Utilisateur.prototype.setMots_de_passe=function(mots_de_passe){
      this.mots_de_passe=mots_de_passe;
}





Utilisateur.prototype.getEvenement_participe=function(){
    return evenement_participe;
}


Utilisateur.prototype.setEvenement_participe=function(evenement_participe){
    this.evenement_participe=evenement_participe;
}



Utilisateur.prototype.getVille=function(){
    return this.ville;
}


Utilisateur.prototype.setVille=function(role){
    this.ville=ville;
}



Utilisateur.prototype.getRole=function(){
    return this.role;
}


Utilisateur.prototype.setRole=function(role){
    this.role=role;
}




