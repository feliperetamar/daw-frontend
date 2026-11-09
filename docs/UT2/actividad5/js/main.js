/**
 * Calculadora sencilla.
 * Realiza una operación matemática con dos valores introducidos por el usuario.
 * El resultado se muestra en la etiqueta <h1 id="resultado">.
 */

/**
 * Obtiene la operación marcada en los radio buttons.
 * @returns {string} El valor de la operación seleccionada.
 */
function obtenerOperacion() {
  const radios = document.querySelectorAll('input[name="operacion"]');
  for (const radio of radios) {
    if (radio.checked) {
      return radio.value;
    }
  }
  return "";
}

/**
 * Calcula la potencia de base elevada a exponente usando un bucle.
 * @param {number} base - La base.
 * @param {number} exponente - El exponente.
 * @returns {number} El resultado de la potencia.
 */
function calcularPotencia(base, exponente) {
  let resultado = 1;
  for (let i = 0; i < exponente; i++) {
    resultado = resultado * base;
  }
  return resultado;
}

/**
 * Calcula el resultado de la operación indicada.
 * @param {number} valor1 - El primer número.
 * @param {number} valor2 - El segundo número.
 * @param {string} operacion - La operación a realizar.
 * @returns {string | null} El resultado, o un mensaje de error si no es posible calcular.
 */
function calcular(valor1, valor2, operacion) {
  if (valor2 === 0 && (operacion === "division" || operacion === "modulo")) {
    return "Error: no se puede dividir entre cero";
  }

  switch (operacion) {
    case "suma":
      return (valor1 + valor2).toString();
    case "resta":
      return (valor1 - valor2).toString();
    case "multiplicacion":
      return (valor1 * valor2).toString();
    case "division":
      return (valor1 / valor2).toString();
    case "modulo":
      return (valor1 % valor2).toString();
    case "potencia":
      return calcularPotencia(valor1, valor2).toString();
    default:
      return "Error: operación no válida";
  }
}

/**
 * Lee los valores, comprueba que son números y muestra el resultado.
 */
function realizarCalculo() {
  const resultadoElement = document.getElementById("resultado");
  const texto1 = document.getElementById("valor1").value;
  const texto2 = document.getElementById("valor2").value;

  // Primero compruebo que los campos no estén vacíos.
  if (texto1 === "" || texto2 === "") {
    resultadoElement.textContent = "Error: tienes que escribir los dos números";
    return;
  }

  const valor1 = Number(texto1);
  const valor2 = Number(texto2);

  // Luego compruebo que realmente sean números y no texto.
  if (Number.isNaN(valor1) || Number.isNaN(valor2)) {
    resultadoElement.textContent = "Error: no se admiten letras, solo números";
    return;
  }

  const operacion = obtenerOperacion();
  resultadoElement.textContent = calcular(valor1, valor2, operacion);
}

// Asignar el evento al botón cuando la página esté cargada.
document
  .getElementById("botonCalcular")
  .addEventListener("click", realizarCalculo);
