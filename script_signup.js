document.getElementById('signuppg').addEventListener('submit', async function(event) {
event.preventDefault();

// Capture input values
const Name = document.getElementById('Name').value;
const Phone = document.getElementById('Phone').value;
const Email = document.getElementById('Email').value;
const Password = document.getElementById('Password').value;
const ConfirmP = document.getElementById('ConfirmP').value;

// Simple password matching check
if (Password !== ConfirmP) {
    alert('Password and Confirm Password do not match.');
    return;
}

try {
    // Sending data to the backend
    const response = await fetch('http://localhost:3000/register', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ Name, Phone, Email, Password })  // Ensure key names match server expectations
    });

    // Parsing the server response
    const data = await response.json();

    // Handling the server's response
    if (data.success) {
    alert('User registered successfully! Please click on the Main Page to Proceed');
    } else {
    alert('SignUp Failed: ' + (data.message || 'Unknown error'));
    }
} catch (error) {
    console.error('Error:', error);
    alert('An error occurred. Please try again later.');
}
});