function displayOutput(content) {
    const output = document.getElementById("output");
    output.innerHTML = content;
}

function viewBookings() {
    const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
    if (bookings.length === 0) {
        displayOutput("<p>No rooms are currently booked.</p>");
        return;
    }

    let content = "<h2>Booked Rooms</h2>";
    bookings.forEach((booking, index) => {
        content += `<p>Room ${booking.roomNumber} - Guest: ${booking.guestName}, Contact: ${booking.guestContact}, Stay: ${booking.stayDuration} days, Total Charges: $${booking.totalCharges || 0}</p>`;
        content += `<button onclick="addCharges(${index})">Add Charges</button>`;
        content += `<button onclick="checkOut(${index})">Check Out</button>`;
    });
    displayOutput(content);
}

function viewAvailableRooms() {
    const allRooms = Array.from({ length: 100 }, (_, i) => i + 1); // Example: Rooms 1 to 100
    const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
    const bookedRooms = bookings.map((booking) => parseInt(booking.roomNumber, 10));
    const availableRooms = allRooms.filter((room) => !bookedRooms.includes(room));

    displayOutput(`<h2>Available Rooms</h2><p>${availableRooms.join(", ")}</p>`);
}

function addCharges(index) {
    const bookings = JSON.parse(localStorage.getItem("bookings"));
    const booking = bookings[index];
    const chargeAmount = prompt("Enter the charge amount to be added to this room:");

    if (chargeAmount && !isNaN(chargeAmount) && chargeAmount > 0) {
        booking.totalCharges = (booking.totalCharges || 0) + parseFloat(chargeAmount);
        bookings[index] = booking;
        localStorage.setItem("bookings", JSON.stringify(bookings));
        alert(`$${chargeAmount} has been added to Room ${booking.roomNumber}. Total Charges: $${booking.totalCharges}`);
    } else {
        alert("Invalid charge amount.");
    }
}

function checkOut(index) {
    const bookings = JSON.parse(localStorage.getItem("bookings"));
    const booking = bookings[index];
    const totalCost = calculateTotalCost(booking);
    displayOutput(`<h2>Grand Total to be Paid</h2><p>Room Number: ${booking.roomNumber}</p><p>Guest Name: ${booking.guestName}</p><p>Total Charges (including extra charges): $${totalCost}</p>`);
}

function calculateTotalCost(booking) {
    const roomCostPerDay = 100; // Example room cost per day
    const stayCost = roomCostPerDay * booking.stayDuration;
    const totalCharges = booking.totalCharges || 0;
    return stayCost + totalCharges;
}
