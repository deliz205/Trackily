document.getElementById('trackLocation').addEventListener('click', function() {
    if (navigator.geolocation) {
        // Start watching the position
        navigator.geolocation.watchPosition(showPosition, showError, {
            enableHighAccuracy: true,
            timeout: 3600000,
            maximumAge: 0
        });
    } else {
        document.getElementById('coords').innerHTML = "Geolocation is not supported by this browser.";
    }
});

function showPosition(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    var timestamp = new Date(position.timestamp);

    document.getElementById('coords').innerHTML = "Latitude: " + latitude + 
    "<br>Longitude: " + longitude + 
    "<br>Last updated: " + timestamp.toLocaleTimeString();

    document.getElementById('status').innerHTML = "Location updated.";

    console.log(`Location updated: Latitude = ${latitude}, Longitude = ${longitude}, Timestamp = ${timestamp}`);
 
    const childId = localStorage.getItem('child_id')
    const parent_id = localStorage.getItem('childparent_id')
    // Send the data to the server
    fetch('http://localhost:3000/updateLocation', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            latitude: latitude,
            longitude: longitude,
            timestamp: timestamp,
            child_id: childId,
            parent_id: parent_id
        })
    }).then(response => response.json())
      .then(data => console.log('Server response:', data))
      .catch((error) => console.error('Error:', error));
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            document.getElementById('coords').innerHTML = "User denied the request for Geolocation.";
            break;
        case error.POSITION_UNAVAILABLE:
            document.getElementById('coords').innerHTML = "Location information is unavailable.";
            break;
        case error.TIMEOUT:
            document.getElementById('coords').innerHTML = "The request to get user location timed out.";
            break;
        case error.UNKNOWN_ERROR:
            document.getElementById('coords').innerHTML = "An unknown error occurred.";
            break;
    }
    document.getElementById('status').innerHTML = "Error occurred.";
}