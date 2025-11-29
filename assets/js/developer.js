document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.querySelector("form");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const mainContent = document.getElementById("mainContent");
  const loginSection = document.getElementById("loginForm");
  const errorMessage = document.getElementById("error-message"); // Error message container

  // Hardcoded login credentials
  const validEmail = "admin@delta.com";
  const validPassword = "delta123";

  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();  // Prevent form submission (no page reload)
    
    const enteredEmail = emailInput.value.trim();
    const enteredPassword = passwordInput.value.trim();

    if (enteredEmail === validEmail && enteredPassword === validPassword) {
      loginSection.style.display = "none";
      mainContent.style.display = "block";
      loadLeads(); // Show leads only after successful login
      errorMessage.style.display = "none"; // Hide error message on successful login
    } else {
      errorMessage.style.display = "block"; // Show error message on invalid login
      errorMessage.textContent = "Invalid email or password!";
    }
  });

  // Password toggle function
  window.togglePassword = function () {
    const type = passwordInput.getAttribute("type");
    passwordInput.setAttribute("type", type === "password" ? "text" : "password");
  };

  // Load leads and populate the table
  function loadLeads() {
    const oneYear = 1000 * 60 * 60 * 24 * 365;
    const now = new Date().getTime();
    let leads = JSON.parse(localStorage.getItem("gymLeads")) || [];

    leads = leads.filter(entry => now - entry.timestamp < oneYear);
    localStorage.setItem("gymLeads", JSON.stringify(leads));
    leads.sort((a, b) => b.timestamp - a.timestamp);

    const tbody = document.querySelector("#leadsTable tbody");
    tbody.innerHTML = "";
    let lastDate = "";

    leads.forEach((entry, index) => {
      const entryDate = new Date(entry.timestamp);
      const dateStr = entryDate.toLocaleDateString();
      const timeStr = entryDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      const row = document.createElement("tr");
      if (index > 0 && dateStr !== lastDate) {
        row.classList.add("day-separator");
      }

      row.innerHTML = `
        <td>${entry.name}</td>
        <td>${entry.email}</td>
        <td>${entry.mobile}</td>
        <td>${entry.message}</td>
        <td>${dateStr}</td>
        <td>${timeStr}</td>
      `;

      tbody.appendChild(row);
      lastDate = dateStr;
    });

    // Refresh
    document.getElementById("refreshBtn").addEventListener("click", () => {
      loadLeads(); // Reload without reloading page
    });

    // Delete
    document.getElementById("deleteBtn").addEventListener("click", () => {
      localStorage.removeItem("gymLeads");
      loadLeads();
    });
  }
});
