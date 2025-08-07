firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    const email = user.email;
    const adminEmail = "admin@calendify.com"; // Este debe ser tu correo de administrador

    if (email !== adminEmail) {
      alert("Acceso denegado. No eres administrador.");
      window.location.href = "login.html";
      return;
    }

    const db = firebase.firestore();

    // Mostrar negocios
    db.collection("businesses").get().then(snapshot => {
      const container = document.getElementById("negociosContainer");
      snapshot.forEach(doc => {
        const data = doc.data();
        const div = document.createElement("div");
        div.classList.add("card");
        div.innerHTML = `
          <div><span class="label">Nombre:</span> ${data.nombre}</div>
          <div><span class="label">Correo:</span> ${data.correo}</div>
          <div><span class="label">Servicios:</span> ${data.servicios?.join(", ") || "N/A"}</div>
        `;
        container.appendChild(div);
      });
    });

    // Mostrar clientes
    db.collection("clientes").get().then(snapshot => {
      const container = document.getElementById("clientesContainer");
      snapshot.forEach(doc => {
        const data = doc.data();
        const div = document.createElement("div");
        div.classList.add("card");
        div.innerHTML = `
          <div><span class="label">Nombre:</span> ${data.nombre}</div>
          <div><span class="label">Correo:</span> ${data.correo}</div>
        `;
        container.appendChild(div);
      });
    });

    // Mostrar todas las citas
    db.collection("businesses").get().then(snapshot => {
      snapshot.forEach(negocioDoc => {
        const negocioNombre = negocioDoc.data().nombre;
        const negocioId = negocioDoc.id;

        db.collection("businesses").doc(negocioId).collection("Cita").get().then(citasSnapshot => {
          const container = document.getElementById("citasContainer");
          citasSnapshot.forEach(doc => {
            const cita = doc.data();
            const div = document.createElement("div");
            div.classList.add("card");
            div.innerHTML = `
              <div><span class="label">Negocio:</span> ${negocioNombre}</div>
              <div><span class="label">Cliente:</span> ${cita.cliente}</div>
              <div><span class="label">Servicio:</span> ${cita.servicio}</div>
              <div><span class="label">Fecha:</span> ${cita.fecha}</div>
              <div><span class="label">Hora:</span> ${cita.hora}</div>
              <div><span class="label">Estado:</span> ${cita.estado}</div>
            `;
            container.appendChild(div);
          });
        });
      });
    });

  } else {
    window.location.href = "login.html";
  }
});
