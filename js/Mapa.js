class Mapa {
    #map;
    #currentLon;
    #currentLat;

    constructor() {
        const mapCenter = [41.3851, 2.1734]; // Coordenadas de Barcelona
        const zoomLevel = 13; 

        this.#map = L.map('map').setView(mapCenter, zoomLevel);

        const tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { 
            attribution: '&copy; OpenStreetMap contributors' 
            }); 
        tileLayer.addTo(this.#map); 
    }

    // Método para obtener la posición actual
    #getPosicioActual() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    this.#currentLat = position.coords.latitude;
                    this.#currentLon = position.coords.longitude;

                    L.marker([this.#currentLat, this.#currentLon])
                        .addTo(this.#map)
                        .bindPopup("Estás aquí")
                        .openPopup();

                    this.#map.setView([this.#currentLat, this.#currentLon], 13);
                },
                (error) => {
                    console.error("Error en la geolocalización:", error);
                }
            );
        } else {
            console.error("La geolocalización no está disponible en este navegador.");
        }
    }
}
