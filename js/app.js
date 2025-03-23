const dropZoneObj = document.querySelector(".dropZone");
let fitxer = [];
let puntInteres = [];

// Per guardar els tipus de dades del fitxer úniques .csv
const tipusSet = new Set();

// No tenim id en el constructor ==> Per cada iteració crearem un auto-incremental
let numId = 0;

dropZoneObj.addEventListener("dragover", function(event){
    event.preventDefault();
    console.log("dragover");
});


dropZoneObj.addEventListener("drop", function(event){
    event.preventDefault();
    console.log("drop (fitxer desplegat)");
    const files = event.dataTransfer.files;
    loadFile(files);
})  


// Funció per carregar els fixers
const loadFile = function(files){
    if(files && files.length > 0){
        const file = files[0];
        const extensio = file.name.split(".")[1];
        if(extensio.toLowerCase() === FILE_EXTENSION){
            readCsv(file);
            console.log("El fitxer té un format correcte.");
            console.log(file);
        }else{
            alert("El fitxer no té un format csv.");
        }
    }
}

// Funció per llegir els fitxers (.csv)
const readCsv = function (file){
    const reader = new FileReader();
    reader.onload = () => {
        fitxer = reader.result.trim().split("\n").slice(1);
        loadData(fitxer);
        console.log(fitxer);
    };
    reader.onerror = () => {
        showMessage("Error reading the file. Please try again.", "error");
    };
    reader.readAsText(file, "UTF-8");
    // console.log("El fitxer ha començat a carregar-se");
}   

const loadData = function(fitxer){
    // Iterem sobre les linies del fitxer CSV
    fitxer.forEach((liniaCSV) => {
        numId++;

        // Dividim les línies en columnes
        const dades = liniaCSV.split(CHAR_CSV);
        
        // Validem que el camp TIPUS no estigui buit o undefined
        if (!dades[TIPUS]) {
            console.error("Error: La línia CSV no té un tipus definit.", liniaCSV);
            alert("S'ha detectat una línia sense tipus. Revisa el fitxer CSV.");
            return;
        }

        // Obtenim el tipus i l'afegim al Set
        const tipus = dades[TIPUS].trim().toLowerCase();
        tipusSet.add(tipus);

        switch (tipus) {
            case "espai":
                console.log("Instancia objecte PuntInteres");
                const espaiObj = new PuntInteres(numId, false, dades[PAIS], dades[CIUTAT], dades[NOM], dades[DIRECCIO], tipus, dades[LAT], dades[LON], dades[PUNTUACIO]);
                puntInteres.push(espaiObj);
                break;

            case "museu":
                console.log("Instancia objecte Museu");
                const museuObj = new Museu(numId, false, dades[PAIS], dades[CIUTAT], dades[NOM], dades[DIRECCIO], tipus, dades[LAT], dades[LON], dades[PUNTUACIO],
                    dades[HORARIS], dades[PREU], dades[MONEDA], dades[DESCRIPCIO]);
                puntInteres.push(museuObj);
                break;

            case "atraccio":
                console.log("Instancia objecte Atraccio");
                const atraccioObj = new Atraccio(numId, false, dades[PAIS], dades[CIUTAT], dades[NOM], dades[DIRECCIO], tipus, dades[LAT], dades[LON], dades[PUNTUACIO],
                    dades[HORARIS], dades[PREU], dades[MONEDA]);
                puntInteres.push(atraccioObj);
                break;

            default:
                console.error(`Tipus desconegut: "${tipus}" a la línia:`, liniaCSV);
                alert(`Tipus desconegut trobat: "${tipus}". Revisa el fitxer CSV.`);
                break;
        }
    });

    // Mostrem els tipus únics per consola
    console.log("Tipus trobats:", tipusSet);

    // Actualitzem el menú desplegable amb els tipus trobats
    actualitzarMenuTipus();

    // Agafem el span (inicialment val 0) 
    span.textContent = puntInteres.length;

};

// ACTUALITZAR MENÚ DESPLEGABLE
const actualitzarMenuTipus = function () {
    const menuTipus = document.getElementById("tipus-opcions");

    // Netejem totes les opcions excepte "Tots"
    menuTipus.innerHTML = '<option value="tots">Tots</option><br>';

    // Afegim cada tipus únic com una nova opció al menú
    tipusSet.forEach((tipus) => {
        const option = document.createElement("option");
        option.value = tipus;
        option.textContent = tipus.charAt(0).toUpperCase() + tipus.slice(1); // Capitalitzem la primera lletra
        menuTipus.appendChild(option);
    });
    document.getElementById("tipus-opcions").addEventListener("change", filtrarPerTipus);
};

// FILTRAR PUNTS INTERES
const filtrarPerTipus = function () {
    const tipusSeleccionat = document.getElementById("tipus-opcions").value;

    // Filtrar la llista de punts d'interès
    const puntsFiltrats = puntInteres.filter((punt) => {
        if (tipusSeleccionat === "tots") {
            return true; // Mostrar tots els punts
        } else {
            return punt.tipus.toLowerCase() === tipusSeleccionat;
        }
    });

    // Renderitzar la llista de punts filtrats
    renderitzarLlista(puntsFiltrats);
};

// Afegim l'esdeveniment 'change' al menú desplegable
document.getElementById("tipus-opcions").addEventListener("change", filtrarPerTipus);

// Funcio per mostar museus (esta per fer)
const pintarMuseu = function(obj){
    
}

// Funció per renderitzar la llista de punts d'interès
const renderitzarLlista = function (llista) {
    const sectMostrarInfo = document.querySelector(".sect-mostrar-info");
    sectMostrarInfo.innerHTML = ""; // Netejem el contingut anterior

    llista.forEach((punt) => {
        const divPunt = document.createElement("div");
        divPunt.textContent = `${punt.nom} (${punt.tipus}) - ${punt.direccio}`;
        sectMostrarInfo.appendChild(divPunt);
    });
};

// Carregar info del país
async function obtenirInfoPais(codiPais) {
    try {
        const resposta = await fetch(`https://restcountries.com/v3.1/alpha/${codiPais}`);
        const dades = await resposta.json();

        if (!dades || dades.length === 0) {
            console.error("No s'ha trobat informació per al país:", codiPais);
            return null;
        }

        const paisInfo = dades[0]; // Primer element de la resposta
        return {
            bandera: paisInfo.flags?.png || paisInfo.flags?.svg || "", // Bandera
            latitud: paisInfo.latlng[0], // Latitud
            longitud: paisInfo.latlng[1] // Longitud
        };
    } catch (error) {
        console.error("Error en obtenir la informació del país:", error);
        return null;
    }
}


// const renderitzarLlista = function (llista){
//     fitxer.forEach((obj)=>
//         {
//             switch(Object.tipus){
//                 // Condicio que mostri en aquest cas ('espai')
//                 case "espai":
//                     pintarEspai(obj)
//                     break;

//                 case "museu":
//                     console.log("Instancia objecte Museu");
//                     const museuObj = new Museu()
//                     puntInteres.push(museuObj)
//                     break;

//                 case "atraccio":
//                     console.log("Instancia objecte Atraccio");
//                     const atraccioObj = new Atraccio()
//                     puntInteres.push(atraccioObj)
//                     break;
                
//                 default:
//                     throw new Error(()=>{
//                         alert("Has afegit un tipus que no és correcte");
//                     });
//             }
//     });

// }