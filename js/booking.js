// Booking Page JavaScript
let bookingData = {
    roomType: '',
    checkIn: '',
    checkOut: '',
    adults: 1,
    children: 0,
    selectedRoom: null,
    guestDetails: {},
    paymentDetails: {}
};

// Sample room data
const rooms = [
    {
        id: 1,
        type: 'standard',
        name: 'Standard Room',
        price: 250,
        image: 'img/room1.jpg',
        description: 'Comfortable room with modern amenities',
        features: ['Queen Bed', 'City View', 'Free WiFi', 'Mini Bar'],
        available: 15
    },
    {
        id: 2,
        type: 'deluxe',
        name: 'Deluxe Room',
        price: 380,
        image: 'img/room2.jpg',
        description: 'Spacious room with premium amenities',
        features: ['King Bed', 'Ocean View', 'Free WiFi', 'Mini Bar', 'Balcony'],
        available: 8
    },
    {
        id: 3,
        type: 'suite',
        name: 'Executive Suite',
        price: 450,
        image: 'img/room3.jpg',
        description: 'Luxurious suite with separate living area',
        features: ['King Bed', 'Ocean View', 'Free WiFi', 'Living Room', 'Kitchenette', 'Balcony'],
        available: 5
    },
    {
        id: 4,
        type: 'presidential',
        name: 'Presidential Suite',
        price: 590,
        image: 'img/room4.jpg',
        description: 'Ultimate luxury with panoramic views',
        features: ['King Bed', 'Panoramic View', 'Free WiFi', 'Living Room', 'Kitchen', 'Balcony', 'Jacuzzi'],
        available: 2
    }
];

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    initializeBookingForm();
    loadRooms();
    updateBookingSummary();
});

// Initialize booking form
function initializeBookingForm() {
    // Set minimum dates
    const today = new Date().toISOString().split('T')[0];
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split('T')[0];
    
    document.getElementById('checkIn').min = today;
    document.getElementById('checkOut').min = tomorrowStr;
    
    // Add event listeners
    document.getElementById('checkIn').addEventListener('change', handleDateChange);
    document.getElementById('checkOut').addEventListener('change', handleDateChange);
    document.getElementById('roomType').addEventListener('change', handleRoomTypeChange);
    document.getElementById('adults').addEventListener('change', updateBookingSummary);
    document.getElementById('children').addEventListener('change', updateBookingSummary);
    
    // Add payment method listeners
    document.querySelectorAll('input[name="paymentMethod"]').forEach(radio => {
        radio.addEventListener('change', handlePaymentMethodChange);
    });
    
    // Load all rooms initially
    loadRooms();
}

// Handle payment method change
function handlePaymentMethodChange() {
    const selectedMethod = document.querySelector('input[name="paymentMethod"]:checked').value;
    const cardDetails = document.querySelector('.card-details');
    
    // Show/hide card details based on payment method
    if (selectedMethod === 'credit' || selectedMethod === 'debit') {
        cardDetails.style.display = 'block';
    } else {
        cardDetails.style.display = 'none';
    }
    
    // Show appropriate message for other payment methods
    if (selectedMethod === 'paypal') {
        showPaymentMessage('PayPal', 'You will be redirected to PayPal to complete your payment.');
    } else if (selectedMethod === 'apple') {
        showPaymentMessage('Apple Pay', 'Use your Apple device to complete payment securely.');
    } else if (selectedMethod === 'google') {
        showPaymentMessage('Google Pay', 'Use your Google account to complete payment securely.');
    } else if (selectedMethod === 'bank') {
        showPaymentMessage('Bank Transfer', 'Bank details will be provided after confirmation.');
    } else if (selectedMethod === 'crypto') {
        showPaymentMessage('Cryptocurrency', 'Pay with Bitcoin, Ethereum, or other cryptocurrencies.');
    } else if (selectedMethod === 'cash') {
        showPaymentMessage('Cash on Arrival', 'Pay directly at the hotel front desk upon arrival.');
    } else {
        hidePaymentMessage();
    }
}

// Show payment method message
function showPaymentMessage(method, message) {
    let messageDiv = document.getElementById('paymentMessage');
    if (!messageDiv) {
        messageDiv = document.createElement('div');
        messageDiv.id = 'paymentMessage';
        messageDiv.className = 'payment-message alert alert-info';
        const cardDetails = document.querySelector('.card-details');
        cardDetails.parentNode.insertBefore(messageDiv, cardDetails);
    }
    
    messageDiv.innerHTML = `
        <i class="fas fa-info-circle"></i>
        <strong>${method}:</strong> ${message}
    `;
}

// Hide payment method message
function hidePaymentMessage() {
    const messageDiv = document.getElementById('paymentMessage');
    if (messageDiv) {
        messageDiv.remove();
    }
}

// Handle date changes
function handleDateChange() {
    const checkIn = document.getElementById('checkIn').value;
    const checkOut = document.getElementById('checkOut').value;
    
    if (checkIn && checkOut) {
        // Update check-out minimum date
        const checkInDate = new Date(checkIn);
        const minCheckOut = new Date(checkInDate);
        minCheckOut.setDate(minCheckOut.getDate() + 1);
        document.getElementById('checkOut').min = minCheckOut.toISOString().split('T')[0];
        
        // Validate dates
        if (new Date(checkOut) <= new Date(checkIn)) {
            document.getElementById('checkOut').value = minCheckOut.toISOString().split('T')[0];
        }
    }
    
    bookingData.checkIn = checkIn;
    bookingData.checkOut = checkOut;
    updateBookingSummary();
    loadRooms();
}

// Handle room type change
function handleRoomTypeChange() {
    const roomType = document.getElementById('roomType').value;
    const selectedOption = document.getElementById('roomType').options[document.getElementById('roomType').selectedIndex];
    
    bookingData.roomType = roomType;
    bookingData.selectedRoom = null;
    
    loadRooms();
    updateBookingSummary();
}

// Load available rooms
function loadRooms() {
    const roomType = document.getElementById('roomType').value;
    const roomCards = document.getElementById('roomCards');
    
    // Show all rooms initially when no type is selected
    if (!roomType) {
        const allRooms = rooms.map(room => createRoomCard(room)).join('');
        roomCards.innerHTML = allRooms;
        addRoomCardListeners();
        return;
    }
    
    const availableRooms = rooms.filter(room => room.type === roomType);
    
    if (availableRooms.length === 0) {
        roomCards.innerHTML = '<p class="text-warning">No rooms available for selected type.</p>';
        return;
    }
    
    roomCards.innerHTML = availableRooms.map(room => createRoomCard(room)).join('');
    addRoomCardListeners();
}

// Add event listeners to room cards
function addRoomCardListeners() {
    document.querySelectorAll('.room-card').forEach(card => {
        card.addEventListener('click', function() {
            selectRoom(this.dataset.roomId);
        });
    });
    
    // Add click handlers to select buttons
    document.querySelectorAll('.btn-select-room').forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const roomId = this.closest('.room-card').dataset.roomId;
            selectRoom(roomId);
        });
    });
}

// Create room card HTML
function createRoomCard(room) {
    const isSelected = bookingData.selectedRoom == room.id;
    const availableClass = room.available > 0 ? '' : 'disabled';
    const selectedClass = isSelected ? 'selected' : '';
    
    return `
        <div class="room-card ${selectedClass} ${availableClass}" data-room-id="${room.id}">
            <div class="room-card-image">
                <img src="${room.image}" alt="${room.name}">
                <div class="room-price">$${room.price}/night</div>
                ${room.available <= 3 ? `<div class="room-availability limited">Only ${room.available} left!</div>` : ''}
            </div>
            <div class="room-card-content">
                <div class="room-header">
                    <h4>${room.name}</h4>
                    <div class="room-rating">
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star-half-alt"></i>
                        <span>4.5</span>
                    </div>
                </div>
                <p class="room-description">${room.description}</p>
                <div class="room-features">
                    ${room.features.map(feature => `<span><i class="fas fa-check"></i> ${feature}</span>`).join('')}
                </div>
                <div class="room-details">
                    <div class="room-info">
                        <i class="fas fa-users"></i>
                        <span>Max 4 guests</span>
                    </div>
                    <div class="room-info">
                        <i class="fas fa-bed"></i>
                        <span>1 bed</span>
                    </div>
                    <div class="room-info">
                        <i class="fas fa-ruler-combined"></i>
                        <span>35 m²</span>
                    </div>
                </div>
                <button class="btn-select-room ${room.available > 0 ? 'btn-warning' : 'btn-secondary disabled'}" 
                        ${room.available > 0 ? '' : 'disabled'}>
                    ${room.available > 0 ? 'Select Room' : 'Sold Out'}
                </button>
            </div>
        </div>
    `;
}

// Select a room
function selectRoom(roomId) {
    const room = rooms.find(r => r.id == roomId);
    if (room && room.available > 0) {
        bookingData.selectedRoom = roomId;
        
        // Update UI
        document.querySelectorAll('.room-card').forEach(card => {
            card.classList.remove('selected');
        });
        document.querySelector(`[data-room-id="${roomId}"]`).classList.add('selected');
        
        // Update booking summary with room details
        updateBookingSummaryWithRoom(room);
    }
}

// Update booking summary with room details
function updateBookingSummaryWithRoom(room) {
    const roomType = document.getElementById('roomType').value;
    const checkIn = document.getElementById('checkIn').value;
    const checkOut = document.getElementById('checkOut').value;
    const adults = document.getElementById('adults').value;
    const children = document.getElementById('children').value;
    
    // Update room type with selected room name
    document.getElementById('summaryRoomType').textContent = room.name;
    
    // Update dates
    document.getElementById('summaryCheckIn').textContent = checkIn ? formatDate(checkIn) : '-';
    document.getElementById('summaryCheckOut').textContent = checkOut ? formatDate(checkOut) : '-';
    
    // Calculate nights
    let nights = 0;
    if (checkIn && checkOut) {
        const startDate = new Date(checkIn);
        const endDate = new Date(checkOut);
        nights = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
    }
    document.getElementById('summaryNights').textContent = nights;
    
    // Update guests
    const totalGuests = (parseInt(adults) || 0) + (parseInt(children) || 0);
    document.getElementById('summaryGuests').textContent = totalGuests > 0 ? `${adults || 0} Adults, ${children || 0} Children` : '-';
    
    // Calculate total
    let total = 0;
    if (room) {
        total = room.price * nights;
    }
    document.getElementById('summaryTotal').textContent = `$${total}`;
}

// Update booking summary
function updateBookingSummary() {
    const roomType = document.getElementById('roomType').value;
    const checkIn = document.getElementById('checkIn').value;
    const checkOut = document.getElementById('checkOut').value;
    const adults = document.getElementById('adults').value;
    const children = document.getElementById('children').value;
    
    // Update room type
    const roomTypeText = document.getElementById('roomType').options[document.getElementById('roomType').selectedIndex]?.text || '-';
    document.getElementById('summaryRoomType').textContent = roomTypeText;
    
    // Update dates
    document.getElementById('summaryCheckIn').textContent = checkIn ? formatDate(checkIn) : '-';
    document.getElementById('summaryCheckOut').textContent = checkOut ? formatDate(checkOut) : '-';
    
    // Calculate nights
    let nights = 0;
    if (checkIn && checkOut) {
        const startDate = new Date(checkIn);
        const endDate = new Date(checkOut);
        nights = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
    }
    document.getElementById('summaryNights').textContent = nights;
    
    // Update guests
    const totalGuests = (parseInt(adults) || 0) + (parseInt(children) || 0);
    document.getElementById('summaryGuests').textContent = totalGuests > 0 ? `${adults || 0} Adults, ${children || 0} Children` : '-';
    
    // Calculate total
    let total = 0;
    if (bookingData.selectedRoom) {
        const room = rooms.find(r => r.id == bookingData.selectedRoom);
        if (room) {
            total = room.price * nights;
        }
    }
    document.getElementById('summaryTotal').textContent = `$${total}`;
    
    // Update progress indicator
    updateProgressIndicator();
}

// Update progress indicator
function updateProgressIndicator() {
    const hasDates = document.getElementById('checkIn').value && document.getElementById('checkOut').value;
    const hasRoomType = document.getElementById('roomType').value;
    const hasRoom = bookingData.selectedRoom;
    const hasGuests = document.getElementById('adults').value;
    
    const progressPercent = calculateProgress();
    const progressBar = document.querySelector('.booking-progress-bar');
    if (progressBar) {
        progressBar.style.width = `${progressPercent}%`;
    }
}

// Calculate booking progress
function calculateProgress() {
    let progress = 0;
    const totalSteps = 4;
    
    if (document.getElementById('checkIn').value && document.getElementById('checkOut').value) progress += 0.5;
    if (document.getElementById('roomType').value) progress += 0.5;
    if (bookingData.selectedRoom) progress += 0.5;
    if (document.getElementById('adults').value) progress += 0.5;
    if (bookingData.guestDetails.firstName) progress += 0.5;
    if (bookingData.paymentDetails.method) progress += 1.5;
    
    return Math.min((progress / totalSteps) * 100, 100);
}

// Format date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Navigation functions
function nextStep(stepNumber) {
    // Validate current step
    if (!validateCurrentStep(stepNumber - 1)) {
        return;
    }
    
    // Update progress
    updateProgress(stepNumber);
    
    // Show next step
    document.querySelectorAll('.booking-step').forEach(step => {
        step.classList.remove('active');
    });
    document.getElementById(`step${stepNumber}`).classList.add('active');
    
    // Update booking summary if going to confirmation
    if (stepNumber === 4) {
        showConfirmation();
    }
}

function prevStep(stepNumber) {
    updateProgress(stepNumber);
    
    document.querySelectorAll('.booking-step').forEach(step => {
        step.classList.remove('active');
    });
    document.getElementById(`step${stepNumber}`).classList.add('active');
}

function updateProgress(activeStep) {
    document.querySelectorAll('.progress-step').forEach((step, index) => {
        const stepNumber = index + 1;
        step.classList.remove('active', 'completed');
        
        if (stepNumber < activeStep) {
            step.classList.add('completed');
        } else if (stepNumber === activeStep) {
            step.classList.add('active');
        }
    });
}

function validateCurrentStep(stepNumber) {
    switch(stepNumber) {
        case 1:
            return validateRoomSelection();
        case 2:
            return validateGuestDetails();
        case 3:
            return validatePayment();
        default:
            return true;
    }
}

function validateRoomSelection() {
    const checkIn = document.getElementById('checkIn').value;
    const checkOut = document.getElementById('checkOut').value;
    const roomType = document.getElementById('roomType').value;
    
    if (!checkIn || !checkOut) {
        alert('Please select check-in and check-out dates.');
        return false;
    }
    
    if (!roomType) {
        alert('Please select a room type.');
        return false;
    }
    
    if (!bookingData.selectedRoom) {
        alert('Please select a room.');
        return false;
    }
    
    return true;
}

function validateGuestDetails() {
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    
    if (!firstName || !lastName) {
        alert('Please enter your full name.');
        return false;
    }
    
    if (!email || !isValidEmail(email)) {
        alert('Please enter a valid email address.');
        return false;
    }
    
    if (!phone) {
        alert('Please enter your phone number.');
        return false;
    }
    
    // Store guest details
    bookingData.guestDetails = {
        firstName,
        lastName,
        email,
        phone,
        specialRequests: document.getElementById('specialRequests').value
    };
    
    return true;
}

function validatePayment() {
    const selectedMethod = document.querySelector('input[name="paymentMethod"]:checked').value;
    
    // For non-card payment methods, skip card validation
    if (selectedMethod === 'paypal' || selectedMethod === 'apple' || selectedMethod === 'google' || selectedMethod === 'bank' || selectedMethod === 'crypto' || selectedMethod === 'cash') {
        bookingData.paymentDetails = {
            method: selectedMethod
        };
        return true;
    }
    
    // Validate card details for credit/debit cards
    const cardNumber = document.getElementById('cardNumber').value;
    const expiryDate = document.getElementById('expiryDate').value;
    const cvv = document.getElementById('cvv').value;
    const cardName = document.getElementById('cardName').value;
    
    if (!cardNumber || cardNumber.replace(/\s/g, '').length < 16) {
        alert('Please enter a valid card number.');
        return false;
    }
    
    if (!expiryDate || !isValidExpiry(expiryDate)) {
        alert('Please enter a valid expiry date.');
        return false;
    }
    
    if (!cvv || cvv.length < 3) {
        alert('Please enter a valid CVV.');
        return false;
    }
    
    if (!cardName) {
        alert('Please enter name on card.');
        return false;
    }
    
    // Store payment details
    bookingData.paymentDetails = {
        cardNumber: cardNumber.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim(),
        expiryDate,
        cvv,
        cardName,
        method: selectedMethod
    };
    
    return true;
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidExpiry(expiry) {
    const [month, year] = expiry.split('/');
    const now = new Date();
    const expDate = new Date(20 + year, month - 1);
    return expDate > now;
}

function showConfirmation() {
    const confirmationDetails = document.getElementById('confirmationDetails');
    const room = rooms.find(r => r.id == bookingData.selectedRoom);
    
    confirmationDetails.innerHTML = `
        <div class="confirmation-item">
            <strong>Room:</strong> ${room.name}
        </div>
        <div class="confirmation-item">
            <strong>Guest:</strong> ${bookingData.guestDetails.firstName} ${bookingData.guestDetails.lastName}
        </div>
        <div class="confirmation-item">
            <strong>Email:</strong> ${bookingData.guestDetails.email}
        </div>
        <div class="confirmation-item">
            <strong>Check-in:</strong> ${formatDate(bookingData.checkIn)}
        </div>
        <div class="confirmation-item">
            <strong>Check-out:</strong> ${formatDate(bookingData.checkOut)}
        </div>
        <div class="confirmation-item">
            <strong>Confirmation #:</strong> ${generateConfirmationNumber()}
        </div>
    `;
}

function generateConfirmationNumber() {
    return 'RH' + Date.now().toString().slice(-6);
}
