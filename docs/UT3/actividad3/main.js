// con las funcionalidades de String, calular del textarea:
// La longitud del texto en caracteres
// La longitud del texto en palabras (se asume que están separadas todas por un espacio " ").
// El número de frases introducidas (se asume que todas las frases están separadas por un punto ".").
// Devuelve los primeros 10 caracteres del texto introducido en mayúscula.
// El número de apariciones de la palabra "alumno" o "alumna" en el texto. Debe ser robusto al uso de mayúsculas.
// Remplazar todas las apariciones de la palabra "alumno" o "alumna" por tu nombre.
function procesarTexto() {
  const texto = document.getElementById("texto").value;
  const longitud = texto.length;
  const palabras = texto.trim().split(" ").length;
  const frases = texto.trim().split(".").length - 1;
  const primeros10 = texto.substring(0, 10).toUpperCase();
  // para comparar pasamos el texto a minúsculas y usamos dos expresiones regulares para buscar "alumno" o "alumna"
  const apariciones =
    (texto.toLowerCase().match(/alumno/g) || []).length +
    (texto.toLowerCase().match(/alumna/g) || []).length;
  // reemplazar todas las apariciones de "alumno" o "alumna" por mi nombre "Felipe"
  const textoModificado = texto
    .replace(/alumno/gi, "Felipe")
    .replace(/alumna/gi, "Felipe");
  document.getElementById("resultado").innerHTML =
    "La longitud del texto es: " +
    longitud +
    "<br>La longitud del texto en palabras es: " +
    palabras +
    "<br>El número de frases es: " +
    frases +
    "<br>Los primeros 10 caracteres en mayúscula son: " +
    primeros10 +
    "<br>El número de apariciones de 'alumno' o 'alumna' es: " +
    apariciones +
    "<br>El texto modificado es: " +
    textoModificado;
}

window.onload = () => {
  document
    .getElementById("procesarTexto")
    .addEventListener("click", procesarTexto);
};
