const seats = document.querySelectorAll('.seat');
const selectedSeats = [];
let totalPrice;
updateTable();

function handleSeatSelection() {
    const seat = this;

    if (selectedSeats.length === 4 && !seat.classList.contains('bg-selected')) {
        document.getElementById('error-message').classList.remove('hidden');

    }
    else {
        document.getElementById('error-message').classList.add('hidden');
        seat.classList.toggle('bg-selected');
        const seatName = seat.textContent;
        const seatClass = 'Economoy'; // Assuming it's Economoyclass for all selected seats
        const seatPrice = 550;

        let availableSeat = parseInt(document.getElementById('available-seats').textContent);
        let selectedSeat = parseInt(document.getElementById('selected-seats').textContent);

        if (seat.classList.contains('bg-selected')) {
            availableSeat--;
            selectedSeat++;
            selectedSeats.push({ name: seatName, class: seatClass, price: seatPrice });
        } else {
            availableSeat++;
            selectedSeat--;
            const index = selectedSeats.findIndex(s => s.name === seatName);
            if (index !== -1) {
                selectedSeats.splice(index, 1);
            }
        }
        document.getElementById('available-seats').textContent = availableSeat;
        document.getElementById('selected-seats').textContent = selectedSeat;
        if (selectedSeats.length) {
            document.getElementById('next-btn').removeAttribute('disabled');
        }
        else {
            document.getElementById('next-btn').setAttribute('disabled', 'disabled');
        }
        if (selectedSeats.length === 4) {
            document.getElementById('coupon-text').removeAttribute('disabled');
            document.getElementById('coupon-btn').removeAttribute('disabled');
        }
        else {
            document.getElementById('coupon-text').setAttribute('disabled', 'disabled');
            document.getElementById('coupon-btn').setAttribute('disabled', 'disabled');
        }
        updateTable();
    }
}

function updateTable() {
    const tableBody = document.querySelector('.table tbody');
    tableBody.innerHTML = ''; // Clear the table body

    // Add selected seats' information to the table
    selectedSeats.forEach(seat => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${seat.name}</td>
            <td>${seat.class}</td>
            <td>${seat.price}</td>
        `;
        tableBody.appendChild(row);
    });

    // Calculate and display the total price
    totalPrice = selectedSeats.reduce((total, seat) => total + seat.price, 0);
    const totalRow = document.createElement('tr');
    totalRow.innerHTML = `
        <td>Total Price</td>
        <td></td>
        <td>BDT <span>${totalPrice}</span></td>
    `;
    tableBody.appendChild(totalRow);

    let grandTotal = totalPrice;
    document.getElementById('grand-total').textContent = grandTotal;

}



// function grandOffer() {
//     let grandTotal = totalPrice;
//     const couponText = document.getElementById('coupon-text').value;
//     if (couponText === 'NEW15') {
//         grandTotal -= grandTotal * 0.15;
//         document.getElementById('error-coupon').classList.add('hidden');
//         document.getElementById('coupon-text').classList.add('hidden');
//         document.getElementById('coupon-btn').classList.add('hidden');
//     }
    else if (couponText === 'Couple 20') {
        grandTotal -= grandTotal * 0.2;
        document.getElementById('error-coupon').classList.add('hidden');
        document.getElementById('coupon-text').classList.add('hidden');
        document.getElementById('coupon-btn').classList.add('hidden');
    }
    else{
        document.getElementById('error-coupon').classList.remove('hidden');
    }
    document.getElementById('grand-total').textContent = grandTotal;

}

seats.forEach(seat => {
    // console.log(seat);
    // seat.nextSibling()
    seat.addEventListener('click', handleSeatSelection);
})
