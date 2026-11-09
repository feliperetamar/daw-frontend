# Una vez dento del contenedor he instalado:

npm install -D typescript@6.0 eslint@latest typescript-eslint@latest

npm install jsdoc

Para ejecutar typescript y eslint utilizar npx
npx tsc --version
npx eslint --version

# Para generar documentación jsdoc

solo un archivo: jsdoc ./js/fichero.js
todos los ficheros: jsdoc . -r -d ./docs

# Para compilar TypeScript

npx tsc ./ts/main.ts --outDir ./js
