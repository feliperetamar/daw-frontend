// 2.1 Con el objeto Date introducir una fecha y comprobar
// si es anterior o posterio a la actual

function comprobarFecha() {
  const fechaIntroducida = new Date(
    document.getElementById("fechaIntroducida").value,
  );
  const fechaActual = new Date();

  // mostrar resultado en la web
  // utilizo el "toLocaleDateString()" para mostrar la fecha en formato local
  // y así comprar la igualdad.
  const h3 = document.getElementById("resultadoFecha");
  if (
    fechaIntroducida.toLocaleDateString() < fechaActual.toLocaleDateString()
  ) {
    h3.innerHTML =
      "La fecha introducida es anterior a la actual. <br> La fecha actual es: " +
      fechaActual.toLocaleDateString() +
      " y la fecha introducida es: " +
      fechaIntroducida.toLocaleDateString();
  } else if (
    fechaIntroducida.toLocaleDateString() === fechaActual.toLocaleDateString()
  ) {
    h3.innerHTML =
      "La fecha introducida es igual a la actual. <br> La fecha actual es: " +
      fechaActual.toLocaleDateString() +
      " y la fecha introducida es: " +
      fechaIntroducida.toLocaleDateString();
  } else {
    h3.innerHTML =
      "La fecha introducida es posterior a la actual. <br> La fecha actual es: " +
      fechaActual.toLocaleDateString() +
      " y la fecha introducida es: " +
      fechaIntroducida.toLocaleDateString();
  }
}

// Mostrar en un input de tipo date la fecha actual más 20 días. Por ejemplo, si es el 1 de noviembre de 2023 deberá mostrar 21/11/2023. Pista: valueAsDate
function mostrarFechaActualMas20Dias() {
  const inputFecha = document.getElementById("fechaActualMas20Dias");
  const fechaActual = new Date();
  fechaActual.setDate(fechaActual.getDate() + 20);
  inputFecha.valueAsDate = fechaActual;
}

window.onload = () => {
  mostrarFechaActualMas20Dias();
};
