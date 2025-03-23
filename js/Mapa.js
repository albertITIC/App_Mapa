class Mapa{
    // Propietats de la classe
    #map = null;
    // Propietats de BCN
    #currentLat = 41.3870; 
    #currentLong = 2.1699; 
    // Configuració del mapa
    constructor(){
        this.#getPosicioActual();
        const mapCenter = [this.#currentLat,this.#currentLong]; // Coordenades de Barcelona, Espanya 
        const zoomLevel = 12;
        this.#map = L.map('map').setView(mapCenter, zoomLevel);
        const tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '&copy; OpenStreetMap contributors' });
        tileLayer.addTo(this.#map); 
        const markerPosition = [41.3870, 2.1699];
        // Step 6: Create a marker and add it to the map
        const marker = L.marker(markerPosition).addTo(this.#map); 
        // Step 7: Add a popup to the marker
        const popupText = "Estàs aquí!"; 
        marker.bindPopup(popupText).openPopup(); 
    }
    // Mètode que mostrarà la posició del mapa inicial.
    mostrarPuntInicial(){
        return console.log('Punt inicial: \nLatitud:', this.#currentLat, ' \nLongitud', this.#currentLong)
    }
    
    // Mètode que actualitzarà la posició del mapa.
    actualitzarPosInitMapa(new_lat, new_lon){
        // Canvio les posicions antigues per les noves
        this.#currentLat = new_lat;
        this.#currentLong = new_long;
        // Tornem a crear les noves coordenades:
        this.#map.setView([new_lat, new_lon], 13);
        return console.log('Les noves coordenades actualitzades, són: ', new_lat, ' i ', new_lon);
                
    }
    mostrarPunt(lat,long,desc=""){
    
    }
    borrarPunt(){
    }
    
    #getPosicioActual() {
        // Valors predeterminats de Barcelona
        let lat = 41.3870;
        let lon = 2.1699; 
    
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                lat = position.coords.latitude;
                lon = position.coords.longitude;
    
                // Actualiza les coordenades actuals
                this.#currentLat = lat;
                this.#currentLong = lon;
    
                // Centrem el mapa en l'ubicació actual
                this.#map.setView([lat, lon], 13);
    
                // Coloca un marcador en l'ubicació actual
                L.marker([lat, lon]).addTo(this.#map)
                    .bindPopup("Estás aquí").openPopup();
            }, (error) => {
                console.error("Error en la geolocalizació:", error);
            });
        } else {
            console.error("La geolocalizació no es disponible en aquest navegador.");
        }
    
        this.#currentLat = lat;
        this.#currentLong = lon;
    }
}

// Creo una instància de Mapa
const map1 = new Mapa();    