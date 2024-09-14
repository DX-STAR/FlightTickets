document.addEventListener('DOMContentLoaded', () => {
    const searchParams = new URLSearchParams(window.location.search);
    const searchSummary = document.getElementById('search-summary');
    const resultsList = document.getElementById('results-list');

    // Display search summary
    searchSummary.innerHTML = `
        <p><strong>From:</strong> ${searchParams.get('from')}</p>
        <p><strong>To:</strong> ${searchParams.get('to')}</p>
        <p><strong>Depart:</strong> ${searchParams.get('depart')}</p>
        <p><strong>Return:</strong> ${searchParams.get('return') || 'N/A'}</p>
        <p><strong>Passengers:</strong> ${searchParams.get('passengers')}</p>
    `;

    // Generate mock flight results
    const flights = generateMockFlights(searchParams);

    // Display flight results
    flights.forEach(flight => {
        const flightCard = document.createElement('div');
        flightCard.className = 'flight-card';
        flightCard.innerHTML = `
            <div class="flight-info">
                <div class="flight-time">
                    <span><strong>Departure:</strong> ${flight.departureTime}</span>
                    <span><strong>Arrival:</strong> ${flight.arrivalTime}</span>
                </div>
                <div class="flight-duration">
                    <span><strong>Duration:</strong> ${flight.duration}</span>
                    <span><strong>Flight:</strong> ${flight.flightNumber}</span>
                </div>
            </div>
            <div class="flight-price">
                <span><strong>Price:</strong> $${flight.price}</span>
                <button class="book-button">Book Now</button>
            </div>
        `;
        resultsList.appendChild(flightCard);
    });
});

function generateMockFlights(searchParams) {
    const flights = [];
    const numFlights = Math.floor(Math.random() * 5) + 3; // Generate 3-7 flights

    for (let i = 0; i < numFlights; i++) {
        const departureTime = generateRandomTime();
        const duration = Math.floor(Math.random() * 5) + 1; // 1-5 hours
        const arrivalTime = addHoursToTime(departureTime, duration);

        flights.push({
            departureTime,
            arrivalTime,
            duration: `${duration}h ${Math.floor(Math.random() * 60)}m`,
            flightNumber: `SK${Math.floor(Math.random() * 9000) + 1000}`,
            price: Math.floor(Math.random() * 300) + 100 // $100-$399
        });
    }

    return flights.sort((a, b) => a.price - b.price); // Sort by price
}

function generateRandomTime() {
    const hours = Math.floor(Math.random() * 24).toString().padStart(2, '0');
    const minutes = Math.floor(Math.random() * 60).toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}

function addHoursToTime(time, hours) {
    const [h, m] = time.split(':').map(Number);
    const newHours = (h + hours) % 24;
    return `${newHours.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
}
