// Fitxer que conté els excels i afegir les dades i tenir-ho hardcodeja't
const CURRENT_LAT = 41.3051;
const CURRENT_LNG = 2.1734;

// Variable que especifica l'extensió del fitxer
const FILE_EXTENSION = "csv";

const CHAR_CSV = ";";

// Columnes del fitxer csv (com si fos un diccionari)
const PAIS = 0;
const CODI = 1;
const CIUTAT = 2;
const TIPUS = 3;
const NOM = 4;
const DIRECCIO = 5;
const LAT = 6;
const LON = 7;
const HORARIS = 8;
const PREU = 9;
const DESCRIPCIO = 10;
const PUNTUACIO = 11;
const MONEDA = 12;

const IVA_PAISOS = 0.21;
const iva_ESP = 0.21;

// De l'html extreiem el contingut del span (contador del total de fitxers)
const span = document.getElementById("span")

// Seleccionem el botó "Neteja tot"
const btnNetejar = document.querySelector(".btnNetejar");