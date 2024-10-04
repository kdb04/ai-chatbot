const text = "Welcome to your Health & Wellness Guide!";
let index = 0;

function typeEffect() {
    if (index < text.length) {
        document.getElementById("typing-text").innerHTML += text.charAt(index);
        index++;
        setTimeout(typeEffect, 100); // Speed of typing effect in milliseconds
    }
}

// Start typing effect after page load
window.onload = function() {
    typeEffect();
};