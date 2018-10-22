#------------------------------------------------------------
#        Script MySQL.
#------------------------------------------------------------


#------------------------------------------------------------
# Table: Evenement
#------------------------------------------------------------

CREATE TABLE Evenement(
        IdEvenement            Int  Auto_increment  NOT NULL ,
        Nom_evenement          Varchar (120) NOT NULL ,
        Lieu                   Varchar (120) NOT NULL ,
        Date_et_heure          Date NOT NULL ,
        Nombre_de_participants Integer NOT NULL ,
        Participants           Varchar (10000) ,
        Liens                  Varchar (120) NOT NULL ,
        Type_d_evenement       Varchar(80) NOT NULL,
		Description            Varchar (10000)
	,CONSTRAINT Evenement_PK PRIMARY KEY (IdEvenement)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: Role
#------------------------------------------------------------

CREATE TABLE Role(
        IdRole Int  Auto_increment  NOT NULL ,
        Nom    Varchar (100) NOT NULL
	,CONSTRAINT Role_PK PRIMARY KEY (IdRole)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: Utilisateur
#------------------------------------------------------------

CREATE TABLE Utilisateur(
        IdUtilisateur       Int  Auto_increment  NOT NULL ,
        Nom                 Varchar (120) NOT NULL ,
        Prenom              Varchar (120) NOT NULL ,
        Email               Varchar (50) NOT NULL ,
        Ville               Varchar (120) NOT NULL ,
        Mot_de_passe        Varchar (60) NOT NULL ,
        Evenement_participe Varchar (50) ,
        IdRole              Int NOT NULL
	,CONSTRAINT Utilisateur_PK PRIMARY KEY (IdUtilisateur)

	,CONSTRAINT Utilisateur_Role_FK FOREIGN KEY (IdRole) REFERENCES Role(IdRole)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: Consulter
#------------------------------------------------------------

CREATE TABLE Consulter(
        IdUtilisateur Int NOT NULL ,
        IdEvenement   Int NOT NULL
	,CONSTRAINT Consulter_PK PRIMARY KEY (IdUtilisateur,IdEvenement)

	,CONSTRAINT Consulter_Utilisateur_FK FOREIGN KEY (IdUtilisateur) REFERENCES Utilisateur(IdUtilisateur)
	,CONSTRAINT Consulter_Evenement0_FK FOREIGN KEY (IdEvenement) REFERENCES Evenement(IdEvenement)
)ENGINE=InnoDB;

