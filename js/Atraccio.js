class Atraccio extends PuntInteres {
    constructor(id, esManual, pais, ciutat, nom, direccio, tipus, latitud, longitud, puntuacio, horaris, preu, moneda) {
        super(id, esManual, pais, ciutat, nom, direccio, tipus, latitud, longitud, puntuacio);
        this.horaris = horaris;
        this.preu = preu;
        this.moneda = moneda;
    }

    
    // ----------------------------------------------- Mètodes de la classe -----------------------------------------------      
    // ----------------------------------------------- get preuIva -----------------------------------------------      
    get preuIva() {
        if (this.preu === 0) {
            return "Entrada gratuïta";
        }

        const iva = PuntInteres.IVA_PAISOS.get(this.pais) || 1;  
        const preuAmbIva = (this.preu * iva).toFixed(2);
        return preuAmbIva + this.moneda + " (IVA)";
    }
}
