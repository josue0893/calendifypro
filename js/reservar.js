firebase.firestore().collection("businesses").get().then((snapshot) => {
  const negocioSelect = document.getElementById("negocio");

  snapshot.forEach((doc) => {
    const option = document.createElement("option");
    option.value = doc.id;
    option.text = doc.data().nombre;
    negocioSelect.appendChild(option);
  });
});

document.getElementById("reservaForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const negocioId = document.getElementById("negocio").value;
  const servicio = document.getElementById("servicio").value;
  const fecha = document.getElementById("fecha").value;
  const hora = document.getElementById("hora").value;
  const cliente = document.getElementById("cliente").value;

  firebase.firestore().collection("businesses").doc(negocioId).collection("Cita").add({
    servicio,
    fecha,
    hora,
    cliente,
    estado: "pendiente"
  }).then(() => {
    alert("Cita agendada correctamente.");
    window.location.href = "confirmacion.html";
  }).catch((error) => {
    alert("Error al agendar: " + error.message);
  });
});
