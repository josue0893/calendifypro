firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    const email = user.email;
    const db = firebase.firestore();

    const citasContainer = document.getElementById("citasContainer");

    db.collection("businesses").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const negocioId = doc.id;

        db.collection("businesses").doc(negocioId).collection("Cita")
          .where("cliente", "==", email)
          .get()
          .then((citasSnapshot) => {
            citasSnapshot.forEach((citaDoc) => {
              const cita = citaDoc.data();

              const card = document.createElement("div");
              card.style.background = "#2c2c2c";
              card.style.border = "1px solid #444";
              card.style.borderRadius = "8px";
              card.style.padding = "15px";
              card.style.marginBottom = "15px";
              card.style.color = "#fff";

              card.innerHTML = `
                <strong>Negocio:</strong> ${doc.data().nom
