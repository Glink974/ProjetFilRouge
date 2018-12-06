//--------------------- Constructeur---------------------------------
function Evenement(nom,lieu,date,participants,lien,type){
    this.nom=nom;
    this.lieu=lieu;
    
    this.date=date;
    this.participants=participants;
    
    this.lien=lien;
    this.type=type;
    
}

//--------------------- Constructeur sans argument -------------------------------

function Evenement(){
    this.nom='';
    this.lieu='';

    this.date= '';
    this.participants=[];

    this.lien='';
    this.type='';

}

//-------------------- Getter --------------------------------------

Evenement.prototype.getNom=function(){
    return this.nom;
}

Evenement.prototype.getLieu=function(){
    return this.lieu;
}

Evenement.prototype.getDate=function(){
    return this.date;
}

Evenement.prototype.getParticipants=function(){
    return this.participants;
}

Evenement.prototype.getLien=function(){
    return this.lien;
}

Evenement.prototype.getType=function(){
    return this.type;
}


//-------------------- Setter --------------------------------------

Evenement.prototype.setNom=function(nom){
    this.nom=nom;
}

Evenement.prototype.setLieu=function(lieu){
    this.lieu= lieu;
}

Evenement.prototype.setDate=function(date){
    this.date=date;
}

Evenement.prototype.setParticipants=function(participants){
    this.participants =participants;
}

Evenement.prototype.setLien=function(lien){
    this.lien=lien;
}

Evenement.prototype.setType=function(type){
    this.type=type;
}
