const routes = {
  dashboard: "components/dashboard.html",
  calendar: "components/calendar.html",
  tasks: "components/tasks.html",
  settings: "components/settings.html"
};

function loadComponent(route) {
  const path = routes[route];
  fetch(path)
    .then(res => res.text())
    .then(html => {
      document.getElementById("main-content").innerHTML = html;
      if (route === "dashboard") loadChart();
    });
}

document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const route = link.getAttribute("data-route");
    loadComponent(route);
  });
});

// Cargar componente inicial
loadComponent("dashboard");

// Demo: carga Chart.js en dashboard
function loadChart() {
  const ctx = document.getElementById("productivityChart");
  if (!ctx) return;

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"],
      datasets: [{
        label: "Tareas completadas",
        data: [3, 5, 2, 4, 6],
        backgroundColor: "rgba(0, 85, 255, 0.6)"
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: { beginAtZero: true }
      }
    }
  });
}
