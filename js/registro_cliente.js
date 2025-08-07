// Registro de cliente con escritura en Firestoredocument.getElementById("registroCliente").addEventListener("submit", function (e) {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value;
  const correo = document.getElementById("correo").value;
  const password = document.getElementById("password").value;

  firebase.auth().createUserWithEmailAndPassword(correo, password)
    .then((userCredential) => {
      const user = userCredential.user;

      return firebase.firestore().collection("clientes").doc(user.uid).set({
        nombre: nombre,
        correo: correo
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
