/**
 * Crea una página web utilizando TypeScript que dado un valor
 * numérico, introducido por un input, muestre en pantalla si el
 * usuario es mayor o menor de edad. También debe avisar de posibles
 * errores.
 */

function init(): void {
  const inputEdadElement = document.getElementById(
    "edadInput",
  ) as HTMLInputElement;
  const resultadoElement = document.getElementById("resultado") as HTMLElement;

  const buttonVerificarElement = document.getElementById(
    "verificarButton",
  ) as HTMLButtonElement;
  buttonVerificarElement.addEventListener("click", comprobarEdad);

  function comprobarEdad(): void {
    const edadValue = inputEdadElement.value.trim();

    if (edadValue === "") {
      resultadoElement.textContent = "Por favor, introduce un valor numérico.";
      return;
    }

    const edad = Number(edadValue);

    if (isNaN(edad)) {
      resultadoElement.textContent =
        "El valor introducido no es un número válido.";
      return;
    }

    if (edad < 0) {
      resultadoElement.textContent = "La edad no puede ser negativa.";
      return;
    }

    if (edad >= 18) {
      resultadoElement.textContent = "Eres mayor de edad.";
    } else {
      resultadoElement.textContent = "Eres menor de edad.";
    }
  }
}

window.addEventListener("DOMContentLoaded", init);
