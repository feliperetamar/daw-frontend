/**
 * Actividades 3 y 4 — prácticas javascript y documentación con JSDoc.
 *
 * Enunciado de los ejercicios:
 * 1. Factorial de un número positivo.
 * 2. Calcula la media aritmética de una lista de números.
 * 3. Calcula si una cadena de texto es o no un palíndromo. Ejemplo de palíndromo complejo: "La ruta nos aporto otro paso natural".
 * 4. Calcular si un DNI pasado como cadena es o no válido. Se debe comprobar tanto el número de caracteres adecuado (8 numéricos y 1 carácter) como si el carácter es el correcto.
 *
 * @author Luis-Felipe Sánchez-Escobar Retamar
 */

/**
 * Factorial de un número positivo.
 *
 * @function factorial
 * @param {number} n - Número positivo del que se calcula el factorial.
 * @returns {number|string} El factorial de `n` o el error en texto.
 */
function factorial(n) {
  if (n < 0) {
    return "Error: el número debe ser positivo.";
  } else if (n === 0 || n === 1) {
    return 1;
  } else {
    let resultado = 1;
    for (let i = 2; i <= n; i++) {
      resultado *= i;
    }
    return resultado;
  }
}
console.log("El factorial de un número positivo:");
console.log("El factorial de 5 es: " + factorial(5)); // Salida: 120
console.log("El factorial de -3 es: " + factorial(-3)); // Salida: Error: el número debe ser positivo.
console.log("El factorial de 0 es: " + factorial(0)); // Salida: 1
console.log(" ");

/**
 * Lista de números de ejemplo para el siguiente ejercicio.
 *
 * @var {Array<number>} numeros
 */
let numeros = [10, 25, 3, 8, 17];

/**
 * Calcula la media aritmética de una lista de números.
 *
 * @function calcularMedia
 * @param {Array<number>} listaNumeros - Lista de números sobre la que se calcula la media.
 * @returns {number|string} La media aritmética de la lista, o un mensaje de error si la lista está vacía.
 */
function calcularMedia(listaNumeros) {
  if (listaNumeros.length === 0) {
    return "Error: la lista de números está vacía.";
  }
  let suma = 0;
  for (let i = 0; i < listaNumeros.length; i++) {
    suma += listaNumeros[i];
  }
  return suma / listaNumeros.length;
}
console.log("La media aritmética de una lista de números:");
console.log("La media de [10, 25, 3, 8, 17] es: " + calcularMedia(numeros)); // Salida: 12.6
console.log("La media de [] es: " + calcularMedia([])); // Salida: Error: la lista de números está vacía.
console.log(" ");

/**
 * Cadena de texto de ejemplo (palíndromo complejo) para siguiente ejercicio.
 *
 * @var {string} palindromo
 */
let palindromo = "La ruta nos aporto otro paso natural";

/**
 * Calcula si una cadena de texto es o no un palíndromo. Ejemplo de palíndromo complejo: "La ruta nos aporto otro paso natural".
 *
 * @function esPalindromo
 * @param {string} cadena - Cadena de texto que se quiere comprobar.
 * @returns {boolean} `true` si la cadena es un palíndromo, `false` en caso contrario.
 */
function esPalindromo(cadena) {
  // Eliminamos espacios y convertimos a minúsculas
  let cadenaLimpia = cadena.replace(/\s+/g, "").toLowerCase();
  let cadenaReversa = cadenaLimpia.split("").reverse().join("");
  return cadenaLimpia === cadenaReversa;
}
console.log("Comprobación de palíndromos:");
console.log(`"${palindromo}" es un palíndromo: ${esPalindromo(palindromo)}`);
console.log(`"Hola mundo" es un palíndromo: ${esPalindromo("Hola mundo")}`);
console.log(`"Oro" es un palíndromo: ${esPalindromo("Oro")}`);
console.log(" ");

/**
 * Calcular si un DNI pasado como cadena es o no válido. Se debe comprobar tanto el número de caracteres adecuado (8 numéricos y 1 carácter) como si el carácter es el correcto.
 *
 * @function esDniValido
 * @param {string} dni - Cadena del DNI a comprobar.
 * @returns {boolean} `true` si el DNI es válido, `false` en caso contrario.
 */
function esDniValido(dni) {
  dni = normalizarDNI(dni);

  if (!esFormatoDNIValido(dni)) {
    return false; // Formato incorrecto
  }
  if (calcularLetraCorrecta(dni) !== dni[8]) {
    return false; // Letra incorrecta
  }

  return true; // DNI válido
}

// Se siguen los pasos indicados en la web del Ministerio del Interior:
// https://www.interior.gob.es/opencms/es/servicios-al-ciudadano/tramites-y-gestiones/dni/calculo-del-digito-de-control-del-nif-nie/

/**
 * Letras de control del DNI en el orden indicado en la web del Ministerio del Interior.
 *
 * @constant {string} letras
 */
const letras = "TRWAGMYFPDXBNJZSQVHLCKE";

/**
 * Limpia el DNI de espacios y lo pasa a mayúsculas.
 *
 * @function normalizarDNI
 * @param {string} dni - Cadena del DNI a normalizar.
 * @returns {string} El DNI normalizado (sin espacios y en mayúsculas).
 */
function normalizarDNI(dni) {
  return dni.trim().toUpperCase();
}

/**
 * Comprueba que el DNI tiene 8 números y 1 letra.
 *
 * @function esFormatoDNIValido
 * @param {string} dni - Cadena del DNI normalizada.
 * @returns {boolean} `true` si el formato es correcto, `false` en caso contrario.
 */
function esFormatoDNIValido(dni) {
  const regex = /^\d{8}[A-Z]$/;
  return regex.test(dni);
}

/**
 * Calcula la letra correcta a partir del número del DNI.
 *
 * @function calcularLetraCorrecta
 * @param {string} dni - Cadena del DNI normalizada.
 * @returns {string} La letra de control correcta para ese DNI.
 */
function calcularLetraCorrecta(dni) {
  const numero = parseInt(dni.slice(0, 8), 10);
  const resto = numero % 23;
  return letras[resto];
}

// ejemplo de uso
const dniEjemplo = "12345678Z";
if (esDniValido(dniEjemplo)) {
  console.log(`El DNI ${dniEjemplo} es válido.`);
} else {
  console.log(`El DNI ${dniEjemplo} no es válido.`);
}

// otro ejemplo de uso
const dniEjemplo2 = "12345678A";
if (esDniValido(dniEjemplo2)) {
  console.log(`El DNI ${dniEjemplo2} es válido.`);
} else {
  console.log(`El DNI ${dniEjemplo2} no es válido.`);
}
