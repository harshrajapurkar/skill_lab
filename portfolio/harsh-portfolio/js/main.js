document.addEventListener("DOMContentLoaded", () => {
  // Keep the copyright year current.
  document.querySelectorAll("[data-year]").forEach(el => el.textContent = new Date().getFullYear());

  // Accessible mobile navigation.
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.textContent = open ? "✕" : "☰";
    });
    nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.textContent = "☰";
    }));
  }

  // Project category filters (only active on the projects page).
  const filterButtons = document.querySelectorAll("[data-filter]");
  const cards = document.querySelectorAll(".project-card");
  const count = document.querySelector("#project-count");
  if (filterButtons.length && cards.length) {
    const updateFilter = filter => {
      let visible = 0;
      cards.forEach(card => {
        const categories = (card.dataset.category || "").split(" ");
        const show = filter === "all" || categories.includes(filter);
        card.hidden = !show;
        if (show) visible++;
      });
      if (count) count.textContent = `${visible} project${visible === 1 ? "" : "s"}`;
      filterButtons.forEach(button => {
        const active = button.dataset.filter === filter;
        button.classList.toggle("active", active);
        button.setAttribute("aria-pressed", String(active));
      });
    };
    filterButtons.forEach(button => button.addEventListener("click", () => updateFilter(button.dataset.filter)));
    filterButtons.forEach(button => button.setAttribute("aria-pressed", String(button.classList.contains("active"))));
  }

  // Contact form: validate, then prepare a message in the visitor's email app.
  const form = document.querySelector("#contact-form");
  if (form) {
    form.addEventListener("submit", event => {
      event.preventDefault();
      const feedback = document.querySelector("#form-feedback");
      if (!form.reportValidity()) return;
      const data = new FormData(form);
      const name = String(data.get("name")).trim();
      const email = String(data.get("email")).trim();
      const subject = String(data.get("subject")).trim();
      const message = String(data.get("message")).trim();
      const body = `Hi Harsh,\\n\\n${message}\\n\\nFrom: ${name}\\nReply to: ${email}`;
      // Replace this address with your real email before publishing.
      const destination = "your.email@example.com";
      if (destination === "your.email@example.com") {
        feedback.textContent = "Form validated! Replace your.email@example.com in contact.html and js/main.js with your real email to enable email drafting.";
        feedback.classList.add("error");
        return;
      }
      feedback.classList.remove("error");
      window.location.href = `mailto:${destination}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      feedback.textContent = "Your email app should open with the message prepared.";
    });
  }
});