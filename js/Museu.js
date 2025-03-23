class Museu extends PuntInteres{
    horaris; 
    preu;
    moneda;
    descripcio; 

    constructor(id, esManual, pais, ciutat, nom, direccio, tipus, latitud, longitud, puntuacio, horaris, preu, moneda, descripcio){
        // Creo el constructor de la classe heredada
        super(id, esManual, pais, ciutat, nom, direccio, tipus, latitud, longitud, puntuacio)
        
        // Assigno d'aquest classe els seus camps
        this.horaris = horaris;
        this.preu = preu;
        this.moneda = moneda;
        this.descripcio = descripcio
        

    }


    
    // ----------------------------------------------- Mètode de la classe -----------------------------------------------      
    // ----------------------------------------------- get preuIva (la mateixa que atració) -----------------------------------------------      
    get preuIva() {
        if (this.preu === 0) {
            return "Entrada gratuïta";
        }

        // Busca l'IVA del país
        const iva = Atraccio.IVA_PAISOS.get(this.pais); 

        if (iva) {
            // Calcula el preu amb IVA
            const preuAmbIva = (this.preu * iva).toFixed(2); // .toFixed -> extreu 2 decimals
            return preuAmbIva + this.moneda + " (IVA)";
        } else {
            
            return this.preu.toFixed(2) + this.moneda + " (nox IVA)";
        }
    }

}