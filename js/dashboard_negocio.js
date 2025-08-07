firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    const email = user.email;
    const db = firebase.firestore();

    db.collection("businesses").where("correo", "==", email).get().then((querySnapshot) => {
      if (!querySnapshot.empty) {
        const negocioId = querySnapshot.docs[0].id;

        const citasContainer = document.getElementById("citasContainer");

        db.collection("businesses").doc(negocioId).collection("Cita")
          .orderBy("fecha")
          .onSnapshot((snapshot) => {
            citasContainer.innerHTML = ""; // limpiar

            snapshot.forEach((doc) => {
              const cita = doc.data();
              const citaId = doc.id;

              const card = document.createElement("div");
              card.style.background = "#2c2c2c";
              card.style.border = "1px solid #444";
              card.style.borderRadius = "8px";
              card.style.padding = "15px";
              card.style.marginBottom = "15px";
              card.style.color = "#fff";

              const select = document.createElement("select");
              select.innerHTML = `
                <option value="pendiente" ${cita.estado === "pendiente" ? "selected" : ""}>Pendiente</option>
                <option value="confirmada" ${cita.estado === "confirmada" ? "selected" : ""}>Confirmada</option>
                <option value="cancelada" ${cita.estado === "cancelada" ? "selected" : ""}>Cancelada</option>
              `;

              select.onchange = () => {
                db.collection("businesses").doc(negocioId).collection("Cita").doc(citaId).update({
                  estado: select.value
                });
              };

              card.innerHTML = `
                <strong>Cliente:</strong> ${cita.cliente}<br>
                <strong>Servicio:</strong> ${cita.servicio}<br>
                <strong>Fecha:</strong> ${cita.fecha}<br>
                <strong>Hora:</strong> ${cita.hora}<br>
                <strong>Estado:</strong>
              `;
              card.appendChild(select);
              citasContainer.appendChild(card);
            });
          });
      } else {
        document.body.innerHTML = "<h2>No se encontró negocio registrado con este correo.</h2>";
      }
    });
  } else {
    window.location.href = "login.html";
  }
});
// Mostrar y actualizar estados de citas
