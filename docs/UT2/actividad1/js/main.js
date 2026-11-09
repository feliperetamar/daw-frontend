// Función principal: se ejecuta cuando la página ha cargado por completo
function init() {
  // 1. Recoger los elementos del DOM (ya están cargados aquí)
  const formulario = document.getElementById("formulario");
  const inputNota = document.getElementById("notaInput");
  const resultado = document.getElementById("resultado");

  // 2. Función que se ejecutará cada vez que el usuario pulse el botón
  function mostrarResultado(evento) {
    // Evita que el formulario recargue la página
    evento.preventDefault();

    const valor = inputNota.value.trim();
    const nota = Number(valor);

    // 3. Validamos qeu sea un número y esté entre 0 y 10 usando "guard clauses"
    if (valor === "") {
      resultado.textContent = "Error: no has introducido ningún valor.";
    } else if (isNaN(nota)) {
      resultado.textContent = "Error: " + valor + " no es un número.";
    } else if (nota < 0 || nota > 10) {
      resultado.textContent = "Error: la nota debe estar entre 0 y 10.";
    } else {
      // 4. Calcular la calificación textual
      let calificacion;
      if (nota < 5) {
        calificacion = "Suspenso";
      } else if (nota < 6) {
        calificacion = "Aprobado";
      } else if (nota < 7) {
        calificacion = "Bien";
      } else if (nota < 9) {
        calificacion = "Notable";
      } else {
        calificacion = "Sobresaliente";
      }

      // 5. Mostrar el resultado
      resultado.textContent = `Tu nota es ${calificacion} (${nota}).`;
    }
  }

  // 6. Al pulsar el botón del formulario, ejecuta mostrarResultado
  formulario.addEventListener("submit", mostrarResultado);
}

// cuando la página carga, se ejecuta init()
window.onload = init;
