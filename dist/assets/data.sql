CREATE TABLE Statistique (
    sujet VARCHAR(255),
    CONSTRAINT PK_Statistique PRIMARY KEY(sujet)
);

CREATE TABLE Element (
    label VARCHAR(255),
    deElement VARCHAR(255),
    deDimension VARCHAR(255),
    CONSTRAINT PK_Element PRIMARY KEY(label),
    CONSTRAINT FK_Element_deElement FOREIGN KEY (deElement) REFERENCES Element (label),  
    CONSTRAINT FK_Element_deDimension FOREIGN KEY (deDimension) REFERENCES Dimension (nom),  
);

CREATE TABLE Dimension (
    nom VARCHAR(255),
    _type VARCHAR(255),
    nomDimensionFils VARCHAR(255),
    CONSTRAINT FK_Dimension_nomDimensionFils FOREIGN KEY (nomDimensionFils) REFERENCES Dimension (nom),  
    CONSTRAINT PK_Dimension PRIMARY KEY(nom)
);


CREATE TABLE Savoir (
    sujet VARCHAR(255),
    enchenments VARCHAR(255),
    nombre INTEGER(12),
);

'population'

INSERT INTO Statistique VALUES
('Population');


/*Dimension*/
INSERT INTO Dimension VALUES
('Année','Temps',null),
('Pays','Geo','Année'),
('Governorate','Geo','Pays'),
('Delegation','Geo','Governorate'),
('Genre','Enum','Delegation'),
('Age','Enum','Genre');

/*Element de la dimension Année*/
INSERT INTO Element VALUES
('2000',null',Année'),
('2001',null',Année'),
('2002',null',Année'),
('2003',null',Année'),
('2004',null',Année'),
('2005',null',Année'),
('2006',null',Année'),
('2007',null',Année'),
('2008',null',Année'),
('2009',null',Année'),
('2010',null',Année'),
('2011',null',Année'),
('2012',null',Année'),
('2013',null',Année'),
('2014',null',Année'),
('2015',null',Année'),
('2016',null',Année'),
('2017',null',Année'),
('2018',null',Année');

INSERT INTO Savoir VALUES
('Population','2000',7000000),
('Population','2000',7000000),

('Population','2000,Tunisia',1111111),
('Population','2000,Tunisia,Sousse',111111),
('Population','2000,Tunisia,Sousse,M''saken',111111),




/*Element de la dimension Pays*/
INSERT INTO Element VALUES
('Tunisia','2000','Pays'),
('Tunisia','2001','Pays'),
('Tunisia','2002','Pays'),
('Tunisia','2003','Pays'),
('Tunisia','2004','Pays'),
('Tunisia','2005','Pays'),
('Tunisia','2006','Pays'),
('Tunisia','2007','Pays'),
('Tunisia','2008','Pays'),
('Tunisia','2009','Pays'),
('Tunisia','2010','Pays'),
('Tunisia','2011','Pays'),
('Tunisia','2012','Pays'),
('Tunisia','2013','Pays'),
('Tunisia','2014','Pays'),
('Tunisia','2015','Pays'),
('Tunisia','2016','Pays'),
('Tunisia','2017','Pays'),
('Tunisia','2018','Pays'),

('Algeria','2000','Pays'),
('Algeria','2001','Pays'),
('Algeria','2002','Pays'),
('Algeria','2003','Pays'),
('Algeria','2004','Pays'),
('Algeria','2005','Pays'),
('Algeria','2006','Pays'),
('Algeria','2007','Pays'),
('Algeria','2008','Pays'),
('Algeria','2009','Pays'),
('Algeria','2010','Pays'),
('Algeria','2011','Pays'),
('Algeria','2012','Pays'),
('Algeria','2013','Pays'),
('Algeria','2014','Pays'),
('Algeria','2015','Pays'),
('Algeria','2016','Pays'),
('Algeria','2017','Pays'),
('Algeria','2018','Pays');


/*Element de laPays Année*/
INSERT INTO Element VALUES
('Ariana','Tunisia','Governorate'),
('Béja','Tunisia','Governorate'),
('Bizerte','Tunisia','Governorate'),
('Gabès','Tunisia','Governorate'),
('Gafsa','Tunisia','Governorate'),
('Jendouba','Tunisia','Governorate'),
('Kairouan','Tunisia','Governorate'),
('Kassérine','Tunisia','Governorate'),
('Kebili','Tunisia','Governorate'),
('Le Kef','Tunisia','Governorate',),
('Médenine','Tunisia','Governorate'),
('Mahdia','Tunisia','Governorate'),
('Manubah','Tunisia','Governorate'),
('Monastir','Tunisia','Governorate'),
('Nabeul','Tunisia','Governorate'),
('Sfax','Tunisia','Governorate'),
('Sidi Bou Zid','Tunisia','Governorate'),
('Siliana','Tunisia','Governorate'),
('Sousse','Tunisia','Governorate'),
('Tataouine','Tunisia','Governorate'),
('Tozeur','Tunisia','Governorate'),
('Tunis','Tunisia','Governorate'),
('Zaghouan','Tunisia','Governorate');



