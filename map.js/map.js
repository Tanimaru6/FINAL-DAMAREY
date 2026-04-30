// 1. Créer la carte Leaflet
var map = L.map('map').setView([46.5, 2.5], 6); // centre approximatif de la France

// 2. Ajouter une couche "fond de carte" (ici OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// 3. Définir les données de déférés par CRC et par année
var deferes = [
    {name: "CRC Île-de-France", coords: [48.8566, 2.3522], year: 2023, info: "Exemple déféré 2023"},
    {name: "CRC Auvergne-Rhône-Alpes", coords: [45.75, 4.85], year: 2024, info: "Exemple déféré 2024"},
    {name: "CRC Bretagne", coords: [48.1173, -1.6778], year: 2025, info: "Exemple déféré 2025"},
    // Tu peux ajouter toutes tes chambres ici
];

// 4. Créer un tableau pour stocker les marqueurs
var markers = [];

// 5. Fonction pour afficher les marqueurs filtrés
function showMarkers(year) {
    // Supprimer tous les marqueurs existants
    markers.forEach(marker => map.removeLayer(marker));
    markers = [];

    // Filtrer les déférés selon l'année
    deferes.forEach(def => {
        if (year === "all" || def.year == year) {
            var marker = L.marker(def.coords).addTo(map)
                .bindPopup("<b>" + def.name + "</b><br>" + def.info + "<br>Année: " + def.year);
            markers.push(marker);
        }
    });
}

// 6. Afficher tous les marqueurs au départ
showMarkers("all");

// 7. Ajouter les événements sur les boutons de filtre
document.querySelectorAll('.year-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        showMarkers(btn.dataset.year);
    });
});
