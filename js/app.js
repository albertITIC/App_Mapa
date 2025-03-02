const dropZone = document.querySelector('.dropZone');

// S'arrossega per pantalla
dropZone.addEventListener('dragover', function(event){    
    event.preventDefault();
    console.log('dragover');

});

// Es borra
dropZone.addEventListener('drop', function(event){
    event.preventDefault();
    console.log('drop');
    const file = event.dataTransfer.files;
    console.log(file);
});


const mapa = new Mapa();



// // Step 1: Define the map starting position (latitude, longitude) 
// const mapCenter = [41.3851, 2.1734]; // Coordinates for Barcelona, Spain 

// // Step 2: Define the initial zoom level (higher means closer) 
// const zoomLevel = 13; // Més petit = més lluny. Més gran == més aprop 

// // Step 3: Create the map object and attach it to the ID ("map") div 
// const map = L.map('map').setView(mapCenter, zoomLevel); 

// // Step 4: Add a tile layer (this is the visual map style) 
// const tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '&copy; OpenStreetMap contributors' }); tileLayer.addTo(map); 

// // Step 5: Define the marker position 
// const markerPosition = [41.3870, 2.1699]; // Example point in Barcelona (langitud i latitud)

// // Step 6: Create a marker and add it to the map  
// const marker = L.marker(markerPosition).addTo(map); 

// // Step 7: Add a popup to the marker

// // const popupText = "This is a marker in Barcelona!"; 
// const popupText = `<h3>Títol</h3>  
//                     <h4>Descripció</h4>`;

// marker.bindPopup(popupText).openPopup();            // Apliquem el text dins de les coordenades


// // Important
// // makret = posar punt 
// // openPopUp = aplica un text sobre les coordenades
// // add to mark = renderitza al mapa