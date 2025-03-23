class PuntInteres {
    // Propietats privades
    #id;
    #esManual;
    
    // Propietats estàtiques
    static #totalTasques = 0; 
    
    // Constructor
    constructor(id, esManual, pais, ciutat, nom, direccio, tipus, latitud, longitud, puntuacio) {
        this.#id = id;
        this.#esManual = esManual;
        this.pais = pais;
        this.ciutat = ciutat;
        this.nom = nom;
        this.direccio = direccio;
        this.tipus = tipus;
        this.latitud = latitud;
        this.longitud = longitud;
        this.puntuacio = puntuacio;

        // Contador. Cada instància creada, incrementa
        PuntInteres.#totalTasques++;
    }

    // ----------------------------------------------- Getters y Setters -----------------------------------------------
    // ----------------------------------------------- ID -----------------------------------------------      
    get id() {
        return this.#id;
    }

    set id(newId) {
        this.#id = newId;
    }
    
    // ----------------------------------------------- esManual ----------------------------------------------
    get esManual() {
        return this.#esManual;
    }

    set esManual(newEsManual) {
        this.#esManual = newEsManual;
    }

    // Métode estàtic per obtenir el total d'elements creats
    static obtenirTotalElements() {
        return PuntInteres.#totalTasques;
    }

}