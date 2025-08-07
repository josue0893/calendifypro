document.getElementById('loginForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const email = document.getElementById('correo').value;
  const password = document.getElementById('password').value;
  const mensajeError = document.getElementById('mensajeError');

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      // ADMIN
      if (email === "admin@calendify.com") {
        window.location.href = "dashboard_admin.html";
        return;
      }

      const db = firebase.firestore();

      // BUSCAR SI ES NEGOCIO
      db.collection("businesses").where("correo", "==", email).get()
        .then((querySnapshot) => {
          if (!querySnapshot.empty) {
            window.location.href = "dashboard_negocio.html";
          } else {
            // SI NO ES NEGOCIO, REDIRIGIR A DASHBOARD CLIENTE
            window.location.href = "dashboard_cliente.html";
          }
        })
        .catch((error) => {
          console.error("Error verificando tipo de usuario:", error);
          mensajeError.textContent = "Error al verificar tipo de usuario.";
        });
    })
    .catch((error) => {
      console.error("Error al iniciar sesión:", error);
      if (error.code === 'auth/user-not-found') {
        mensajeError.textContent = "Correo no registrado.";
      } else if (error.code === 'auth/wrong-password') {
        mensajeError.textContent = "Contraseña incorrecta.";
      } else {
        mensajeError.textContent = "Error al iniciar sesión.";
      }
    });
});
// Lógica de login y redirección
