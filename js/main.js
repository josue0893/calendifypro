document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', async (e) => {
      e.preventDefault();
      const route = e.target.getAttribute('data-route');
      loadComponent(route);
    });
  });

  function loadComponent(route) {
    fetch(`components/${route}.html`)
      .then(res => res.text())
      .then(html => {
        document.getElementById('component-view').innerHTML = html;

        if (route === 'login') {
          setTimeout(() => {
            const form = document.getElementById('login-form');
            if (form) {
              form.addEventListener('submit', (e) => {
                e.preventDefault();
                const email = document.getElementById('email').value.trim();
                const tipo = document.querySelector('input[name="tipo"]:checked').value;

                if (email === 'admin@calendify.com') {
                  loadComponent('dashboard_admin');
                } else if (tipo === 'negocio') {
                  loadComponent('dashboard_negocio');
                } else {
                  loadComponent('dashboard_cliente');
                }
              });
            }

            const invitadoLink = document.getElementById('invitado-link');
            if (invitadoLink) {
              invitadoLink.addEventListener('click', (e) => {
                e.preventDefault();
                loadComponent('reservar');
              });
            }
          }, 100);
        }
      });
  }
});
