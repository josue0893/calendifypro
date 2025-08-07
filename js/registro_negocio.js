document.getElementById("registroNegocio").addEventListener("submit", function (e) {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value;
  const correo = document.getElementById("correo").value;
  const password = document.getElementById("password").value;

  firebase.auth().createUserWithEmailAndPassword(correo, password)
    .then((userCredential) => {
      const user = userCredential.user;

      return firebase.firestore().collection("businesses").doc(user.uid).set({
        nombre: nombre,
        correo: correo,
        servicios: ["Corte", "Uñas", "Masaje"] // puedes personalizarlo luego
      });
    })
    .then(() => {
      alert("Registro exitoso. Revisa tu correo para confirmar.");
      window.location.href = "login.html";
    })
    .catch((error) => {
      console.error(error);
      alert("Error al registrar: " + error.message);
    });
});
