function mostrarTamanios() {
  // tamaño de la pantalla, el monitor entero:
  const anchoPantalla = window.screen.width;
  const altoPantalla = window.screen.height;

  // tamaño de la ventana del navegador completo con barras y pestaña
  const anchoVentana = window.outerWidth;
  const altoVentana = window.outerHeight;

  // tamaño útil de la ventana del navegador, sin barras ni pestaña
  const anchoUtil = window.innerWidth;
  const altoUtil = window.innerHeight;

  const h1 = document.getElementById("info");
  h1.innerHTML = `Tamaño de la pantalla: ${anchoPantalla} x ${altoPantalla}<br>
                  Tamaño de la ventana del navegador: ${anchoVentana} x ${altoVentana}<br>
                  Tamaño útil de la ventana del navegador: ${anchoUtil} x ${altoUtil}`;
}

// actualizamos la información cada segundo y logeamos los tamaños en la consola:
// setInterval(() => {
//   mostrarTamanios();
//   console.log(
//     `Tamaño de la pantalla: ${window.screen.width} x ${window.screen.height}`,
//   );
//   console.log(
//     `Tamaño de la ventana del navegador: ${window.outerWidth} x ${window.outerHeight}`,
//   );
//   console.log(
//     `Tamaño útil de la ventana del navegador: ${window.innerWidth} x ${window.innerHeight}`,
//   );
// }, 1000);

// Función que muestra la URL de la página actual
function mostrarURL() {
  const url = window.location.href;
  const h2 = document.getElementById("infoUrl");
  h2.innerHTML = `URL de la página actual: ${url}`;
}

// botón que al pulsarlo cambie la página actual por la de Google.
// Debe permitir volver a la página anterior con el botón "ir a página anterior" del navegador
function cambiarAPaginaGoogle() {
  window.location.href = "https://www.google.com";
}

// eventListener para el botón que cambia a Google
const botonCambiar = document.getElementById("irAGoogle");
botonCambiar.addEventListener("click", cambiarAPaginaGoogle);

// botón que al pulsarlo cambie la página actual por la de Yahoo.
// En este caso, al pulsar el botón "ir a página anterior" del navegador
// no se debe volver a la página de la tarea.
function cambiarAPaginaYahoo() {
  window.location.replace("https://www.yahoo.com");
}

// eventListener para el botón que cambia a Yahoo
const botonCambiarYahoo = document.getElementById("irAYahoo");
botonCambiarYahoo.addEventListener("click", cambiarAPaginaYahoo);

// Llamamos a la función para mostrar tamaños y la URL al cargar la página
window.onload = () => {
  mostrarTamanios();
  mostrarURL();
};
