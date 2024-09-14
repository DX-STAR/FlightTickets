document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('flight-search');
    const tabs = document.querySelectorAll('.tab-button');
    
    // Handle tab switching
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            // You can add logic here to change the form based on the selected tab
        });
    });
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const from = document.getElementById('from').value;
        const to = document.getElementById('to').value;
        const depart = document.getElementById('depart').value;
        const passengers = document.getElementById('passengers').value;
        
        // Create a query string with the search parameters
        const searchParams = new URLSearchParams({
            from,
            to,
            depart,
            passengers
        });
        
        // Redirect to the search results page with the query string
        window.location.href = `search-results.html?${searchParams.toString()}`;
    });
    
    // Set minimum date for departure
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('depart').min = today;
});