-- CreateTable
CREATE TABLE "Proprietaire" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "civilite" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "date_naissance" DATETIME NOT NULL,
    "profession" TEXT NOT NULL,
    "lieu_travail" TEXT NOT NULL,
    "nature_piece" TEXT NOT NULL,
    "numero_piece" TEXT NOT NULL,
    "date_delivrance" DATETIME NOT NULL,
    "date_expiration" DATETIME NOT NULL,
    "lieu_delivrance" TEXT NOT NULL,
    "adresse" TEXT NOT NULL,
    "ville" TEXT NOT NULL,
    "quertie" TEXT NOT NULL,
    "telephone" TEXT NOT NULL,
    "nom_personne_cas_urgence" TEXT NOT NULL,
    "prenom_personne_cas_urgence" TEXT NOT NULL,
    "telephone_personne_cas_urgence" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "courriel" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Proprietaire_email_key" ON "Proprietaire"("email");
