// Factorial de un número positivo.
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

// Calcula la media aritmética de una lista de números
let numeros = [10, 25, 3, 8, 17];
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

// Calcula si una cadena de texto es o no un palíndromo. Ejemplo de palíndromo complejo: "La ruta nos aporto otro paso natural".
let palindromo = "La ruta nos aporto otro paso natural";
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

//Calcular si un DNI pasado como cadena es o no valido. Se debe comprobar tanto el número de caracteres adecuado (8 numéricos y 1 carácter) y si el carácter es el correcto.
// sigo los pasos que se indican en la web del ministerio:
// https://www.interior.gob.es/opencms/es/servicios-al-ciudadano/tramites-y-gestiones/dni/calculo-del-digito-de-control-del-nif-nie/

// declaro las letras según el orden indicado en la web del ministerio
const letras = "TRWAGMYFPDXBNJZSQVHLCKE";

// limpio el DNI de espacios y lo paso a mayúsculas
function normalizarDNI(dni) {
  return dni.trim().toUpperCase();
}

// compruebo que el DNI tiene 8 números y 1 letra
function esFormatoDNIValido(dni) {
  const regex = /^\d{8}[A-Z]$/;
  return regex.test(dni);
}

// calculo la letra correcta a partir del número del DNI
function calcularLetraCorrecta(dni) {
  const numero = parseInt(dni.slice(0, 8), 10);
  const resto = numero % 23;
  return letras[resto];
}

// función principal que comprueba si un DNI es válido
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
