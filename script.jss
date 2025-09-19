document.getElementById('fare-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const start = document.getElementById('start').value;
    const end = document.getElementById('end').value;

    if (start && end) {
        calculateFare(start, end);
    } else {
        alert('Please enter both start and destination addresses.');
    }
});

function calculateFare(start, end) {
    // For demonstration, using static values
    const baseFare = 100;
    const distanceFare = 140;
    const waitingTime = 16.67;
    const totalFare = baseFare + distanceFare + waitingTime;

    document.getElementById('fare-breakdown').style.display = 'block';
    document.querySelector('#fare-breakdown p:nth-child(2)').textContent = `Base Fare: ₹${baseFare}`;
    document.querySelector('#fare-breakdown p:nth-child(3)').textContent = `Distance Fare: ₹${distanceFare}`;
    document.querySelector('#fare-breakdown p:nth-child(4)').textContent = `Waiting Time: ₹${waitingTime}`;
    document.querySelector('#fare-breakdown p:nth-child(5)').textContent = `Total Fare: ₹${totalFare}`;

    initMap(start, end);
}

function initMap(start, end) {
    const map = L.map('map').setView([25.5941, 85.1376], 13); // Centered on Patna

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    const startMarker = L.marker([25.5941, 85.1376]).addTo(map).bindPopup('Start: ' + start);
    const endMarker = L.marker([25.5951, 85.1386]).addTo(map).bindPopup('End: ' + end);

    L.Routing.control({
        waypoints: [
            L.latLng(25.5941, 85.1376),
            L.latLng(25.5951, 85.1386)
        ],
        routeWhileDragging: true
    }).addTo(map);
}
