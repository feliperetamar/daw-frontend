// función añadirNombre que guarda el nombre introducido en el input con id "nombre" en un array que se guarda en el localStorage y lo muestra en el div con id "nombreGuardado"
function añadirNombre() {
  const nombre = document.getElementById("nombre").value;
  let nombres = JSON.parse(localStorage.getItem("nombres")) || [];
  nombres.push(nombre);
  localStorage.setItem("nombres", JSON.stringify(nombres));
  document.getElementById("nombreGuardado").innerHTML =
    "Nombre guardado: " + nombre;
  // añade el nombre al listado actual
  const lista = document.getElementById("lista");
  const li = document.createElement("li");
  li.textContent = nombre;
  lista.appendChild(li);
  // limpia el input
  document.getElementById("nombre").value = "";
}

// función mostrarNombre que muestra los nombres guardados en el localStorage en el ul con id "lista"
function mostrarNombre() {
  const nombresGuardados = JSON.parse(localStorage.getItem("nombres")) || [];
  if (nombresGuardados.length > 0) {
    const lista = document.getElementById("lista");
    nombresGuardados.forEach((nombre) => {
      const li = document.createElement("li");
      li.textContent = nombre;
      lista.appendChild(li);
    });
  }
}

// vaciar la lista de nombres guardados en el localStorage y en el ul con id "lista"
function clearLista() {
  localStorage.removeItem("nombres");
  const lista = document.getElementById("lista");
  lista.innerHTML = "";
  // limpiar el div con id "nombreGuardado"
  document.getElementById("nombreGuardado").innerHTML = "";
  alert("Lista de nombres borrada.");
}

window.onload = function () {
  // Añadir evento al botón "Añadir nombre"
  document.getElementById("addNombre").addEventListener("click", añadirNombre);

  // La función mostrarNombre se ejecuta directamente al cargar la página para mostrar los nombres guardados en el localStorage
  mostrarNombre();

  // Añadir evento al botón "Borrar Lista"
  document.getElementById("clearLista").addEventListener("click", clearLista);
};
