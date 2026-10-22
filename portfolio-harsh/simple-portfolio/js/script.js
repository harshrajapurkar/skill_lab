// Show the current year in the footer.
document.getElementById("year").textContent = new Date().getFullYear();

// Open and close the menu on small screens.
const menuButton = document.getElementById("menu-button");
const navMenu = document.getElementById("nav-menu");

menuButton.addEventListener("click", function () {
  navMenu.classList.toggle("show");
});

// Show a simple message when the contact form is submitted.
const contactForm = document.getElementById("contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();
    document.getElementById("form-message").textContent =
      "Thank you! Your form has been checked.";
    contactForm.reset();
  });
}
