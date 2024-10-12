let formData = {};  // Global variable to store form data

// Function to send message and bot response
function sendMessage() {
    const userInput = document.getElementById('user-input').value.toLowerCase();
    const chatOutput = document.getElementById('chat-output');
    // Predefined responses
    const responses = {
        "hello": "Hi! What's up? How can I help you?",
        "hii": "Hi! What's up? How can I help you?",
        "suggest me some good museum": "Ok great! Where would you like to visit?",
        "somewhere in bhubaneswar,odisha": "Ok, here are the types of museums in Bhubaneswar and nearby areas:<br>1. National<br>2. Art and Cultural<br>3. Historical<br>4. Science and Technology",
        "like to visit historical museums": "Here are some historical museums:<br>1. Odisha State Museum<br>2. Museum Gallery<br>3. Gandhi Peace Center<br>4. Regional Museum of Natural History<br>5. Museum of Tribal Arts and Artifacts",
        "like to visit odisha state museum": "Ok great! Shall I provide you more information about this museum?",
        "yes": "Odisha State Museum: Built across four floors, this museum houses a rich collection of unique manuscripts written on palm leaves, copper plates, traditional musical instruments, terracotta, contemporary art, bronze, stone, and copper materials. Established in 1932, the museum aims to preserve archaeological treasures. Address: Lewis Road, Bhubaneswar, Odisha. Around 12km from Bhubaneswar Railway Station and 20km from Biju Pattnaik International Airport.",
        "ok i want to proceed with it": "Sure, please provide the necessary details on the form.",
        "can i edit the form": "Sure, you can edit at any time you want.",
        "provide the bill informations": "Here is your billing information.",
        "thank you": "You are welcome!",
        "ok,how to pay":"Great Choose Your payment method",
        "done":"Payment Successful. The e-receipt and e-ticket are available in the profile section. You can download them anytime. Thank you for using MuseMate Assistant.",
        "default": "Sorry, I don't understand your request."
    };
    // Determine response
    const response = responses[userInput] || responses["default"];

    // Create a div for the user's message
    const userMessage = document.createElement('div');
    userMessage.classList.add('user-message');
    userMessage.innerHTML = `<p><strong>You:</strong> ${userInput}</p>`;

    // Create a div for the bot's response
    const botResponse = document.createElement('div');
    botResponse.classList.add('bot-response');

    // Check if the response needs a button
    if (userInput === "like to visit odisha state museum") {
        botResponse.innerHTML = `<p><strong>Bot:</strong> ${response}</p>
            <button id="museum-info-btn" class="btn btn-primary">View In AR/VR</button>`;
    } else {
        botResponse.innerHTML = `<p><strong>Bot:</strong> ${response}</p>`;
    }

    // Append both the user message and the bot response to the chat output
    chatOutput.appendChild(userMessage);
    chatOutput.appendChild(botResponse);

    // Add event listener for the button if it was added
    const museumInfoBtn = document.getElementById('museum-info-btn');
    
    if (museumInfoBtn) {
        museumInfoBtn.style.backgroundColor = '#0a0241'; // Green background
  museumInfoBtn.style.color = '#fff'; // White text
  museumInfoBtn.style.padding = '10px 20px'; // Add padding
  museumInfoBtn.style.margin = '10px';
  museumInfoBtn.style.border = 'none'; // Remove default border
  museumInfoBtn.style.borderRadius = '5px'; // Rounded corners
  museumInfoBtn.style.cursor = 'pointer'; // Change cursor on hover
  museumInfoBtn.style.fontSize = '16px'; // Increase font size

        museumInfoBtn.addEventListener('click', function() {
            window.location.href = 'AR.html'; // Replace with the actual URL for more information
        });
    }

    // Handle other specific user inputs
    if (userInput === "ok i want to proceed with it") {
        displayBookingForm();
    }
    if (userInput === "provide the bill informations") {
        displayBillingInfo();
    }
    if (userInput === "ok,how to pay") {
        displaypaymentmethod();
    }

    // Scroll to the bottom of the chat
    chatOutput.scrollTop = chatOutput.scrollHeight;

    // Clear the input
    document.getElementById('user-input').value = '';
}


// Event listener for the 'Send' button (click)
document.getElementById('search-btn').addEventListener('click', function() {
    sendMessage(); // Call the send message function
});

// Event listener for the 'Enter' key (keydown)
document.getElementById('user-input').addEventListener('keydown', function(event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Prevent the default action (new line or form submission)
        sendMessage(); // Call the send message function
    }
});

// Function to display the booking form
function displayBookingForm() {
    const chatOutput = document.getElementById('chat-output');

    // Create form elements dynamically
    const formHTML = `
        <div class="centered-form">
            <form id="bookingForm">
                <label for="name">Name:</label><br>
                <input type="text" id="name" name="name" placeholder="Your Name" required><br>

                <label for="mobile">Mobile Number:</label><br>
                <input type="tel" id="mobile" name="mobile" placeholder="Your Mobile Number" pattern="[0-9]{10}" required><br>

                <label for="aadhar">Aadhar Number:</label><br>
                <input type="text" id="aadhar" name="aadhar" placeholder="Your Aadhar Number" pattern="[0-9]{12}" required><br>

                <label for="bookingType">Booking Type:</label><br>
                <select id="bookingType" name="bookingType" required>
                    <option value="individual">Individual</option>
                    <option value="group">Group</option>
                </select><br>

                <label for="Noofmember">No of members:</label><br>
                <select id="Noofmember" name="Noofmember" required>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select><br>
                <label for="name">Name(Companions'name):</label><br>
                <input type="text" id="name" name="name" placeholder="Your Name" required><br>
                <label for="name">Name(Comanions name):</label><br>
                <input type="text" id="name" name="name" placeholder="Your Name" required><br>
                <label for="date">Preferred Date:</label><br>
                <input type="date" id="date" name="date" required><br>

                <label for="time">Preferred Time:</label><br>
                <input type="time" id="time" name="time" required><br>

                <label><input type="checkbox" id="wheelchair" name="wheelchair"> Facility for PWD Visitors(Wheel Chair) </label><br>
                

                <label><input type="checkbox" id="guide" name="guide"> Add a Guide</label><br>

                <button type="submit">Submit</button>
            </form>
        </div>
    `;

    // Inject the form into the chat
    chatOutput.innerHTML += formHTML;

    // Handle form submission
    document.getElementById('bookingForm').addEventListener('submit', function(event) {
        event.preventDefault();  // Prevent page refresh

        // Get form data
        formData = {
            name: document.getElementById('name').value,
            mobile: document.getElementById('mobile').value,
            aadhar: document.getElementById('aadhar').value,
            bookingType: document.getElementById('bookingType').value,
            date: document.getElementById('date').value,
            time: document.getElementById('time').value,
            member: parseInt(document.getElementById('Noofmember').value, 10),
            guide: document.getElementById('guide').checked ? "with a guide" : "without a guide",
            disability: document.getElementById('wheelchair').checked ? "with all facility for Pwd Visitor" : "without PWD Service"
        };

        // Display the form submission result in chat
        chatOutput.innerHTML += `<div class="bot-response" style="color: #ffffff; background-color:#007bff;">Thank you ${formData.name}, your booking as an ${formData.bookingType} on ${formData.date} at ${formData.time} for ${formData.member} members has been confirmed ${formData.guide} and ${formData.disability}. We will contact you on ${formData.mobile} for further details. Your profile status has been updated. Please proceed with payments.</div>`;

        // Optionally, you can clear the form after submission
        document.querySelector('.centered-form').remove();
        
        // Scroll to the bottom of the chat
        chatOutput.scrollTop = chatOutput.scrollHeight;
    });
}


// Function to display billing information
function displayBillingInfo() {
    const chatOutput = document.getElementById('chat-output');

    if (!formData.member) {
        chatOutput.innerHTML += `<div class="bot-response"style="color: #ffffff; background-color:#007bff;">No booking information available. Please submit a booking form first.</div>`;
        return;
    }

    // Billing details
    const billPerPerson = 25;
    const totalBill = billPerPerson * formData.member;
    const guidecharge = 15;
    const cgst = 0.02 * totalBill;
    const sgst = 0.02 * totalBill;
    const totalWithTax = totalBill + cgst + sgst + guidecharge;

    // Display the billing information with square shape and right alignment
    chatOutput.innerHTML += `
    <div class="billing-info">
        <h3>Billing Information</h3>
        <p>No. of persons: ${formData.member}</p>
        <p>Bill per person: ₹${billPerPerson}</p>
        <p>Total bill: ₹${totalBill}</p>
        <p>Guide charge: ₹${guidecharge}</p>
        <p>CGST (2%): ₹${cgst.toFixed(2)}</p>
        <p>SGST (2%): ₹${sgst.toFixed(2)}</p>
        <p><strong>Total Payble Amount: ₹${totalWithTax.toFixed(2)}</strong></p>
    </div>
`;


    // Scroll to the bottom of the chat
    chatOutput.scrollTop = chatOutput.scrollHeight;
}

// Function to display payment methods
function displaypaymentmethod() {
    const chatOutput = document.getElementById('chat-output');

    // Create form elements dynamically
    const formHTML = `
    <div class="payment-form">
        <form id="paymentForm">
            <label for="paymenttype">Payment Type:</label><br>
            <select id="paymenttype" name="paymenttype" required>
                <option value="UPI">UPI</option>
                <option value="netbanking">Net Banking</option>
                <option value="card">Credit/Debit Card</option>
                <option value="paylater">Pay Later</option>
            </select><br><br>

            <label for="upi">For UPI:</label><br>
            <select id="upi" name="upi">
                <option value="phonepe">PhonePe</option>
                <option value="googlepay">Google Pay</option>
                <option value="paypal">PayPal</option>
            </select><br><br>

            <label for="netbanking">For Net Banking:</label><br>
            <select id="netbanking" name="netbanking">
                <option value="Axis Bank">Axis Bank</option>
                <option value="Bank Of Baroda">Bank Of Baroda</option>
                <option value="BOI">Bank Of India</option>
                <option value="Canara Bank">Canara Bank</option>
                <option value="SBI">State Bank Of India</option>
            </select><br><br>

            <button type="submit">Submit</button>
        </form>
        
        <br><br>
        <p>Or Scan the QR code:</p> 
        <div id="qrcode"></div> 
    </div>
    `;
    chatOutput.innerHTML += formHTML;

    // Generate QR code
    let qrcode = new QRCode(document.getElementById("qrcode"), {
        text: "upi://pay?pa=YOUR-UPI-ID&pn=Your-Name&am=Amount&cu=INR",
        width: 145,
        height: 145
    });

    // Handle form submission
    document.getElementById('paymentForm').addEventListener('submit', function (event) {
        event.preventDefault();  // Prevent page refresh
        const formData = {
            UPI: document.getElementById('upi').value,
            netbanking: document.getElementById('netbanking').value
        };

        chatOutput.innerHTML += `<div class="bot-response" style="color: #ffffff; background-color:#007bff;">Please check your ${formData.UPI}, we have sent you the payment notification.</div>`;

        document.querySelector('.payment-form').remove();
        // Scroll to the bottom of the chat
        chatOutput.scrollTop = chatOutput.scrollHeight;
    });
}
