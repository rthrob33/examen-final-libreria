/**Programa diseñado, elaborado y explicado por:
 * Roberth Alexander Melendez Sicaja
 * No. de carne: 2500461
 * 
 * utilice: las diferentes librerias que nos enseñaron(Entradas de datos
 * Arreglos, ciclos, expresiones y operadores aritmeticos, logicos, de
 * comparacion y de asignacion, funciones *EXPRESADAS* y
 * estructuras como switch y el ifElse para los casos que lo requerian.
 */
//Librerias npm:
const colors = require('colors')
const readlineSync = require('readline-sync') //llamamos para utilizar nuestras 2 librerias descargadas
//menu, utilice readline y colors para personalizarlo y darle estilo
const catalogo = []
function mostrarMenu() {
    console.log('================'.cyan);
    console.log('ELIGE UNA OPCION'.yellow);
    console.log('================'.cyan);
    
    const opciones = [
        "1. Agregar libro",
        "2. Mostrar catalogo",
        "3. Buscar libro por titulo",
        "4. Eliminar libro",
        "5. Ver estadisticas",
        "6. Ordenar libros",
        "7. Editar libro",
        "8. Salir"
    ];

    const indice = readlineSync.keyInSelect(opciones, "Elige alguna opcion?") + 1;
    
    switch(indice) {
        case 1:
            agregarLibro();
            break;
        case 2:
            mostrarCatalogo();
            break;
        case 3:
            mostrarLibroPorTitulo();
            break;
        case 4:
            eliminarLibro();
            break;
        case 5:
            verEstadisticas();
            break;
        case 6:
            ordenarLibros();
            break;
        case 7:
            editarLibro();
            break;
        case 8:
            console.log("¡Hasta luego!".yellow);
            process.exit(0);//8. finaliza el programa al seleccionar el No. de caso (8 = Salir)
        default:
            mostrarMenu();//Se ejecuta por primeravez la funcion de mostrar el menu nuevamente(linea 5)
    }
}
//1. Agregar el libro
function agregarLibro() {
    console.log('\n=== AGREGAR LIBRO ==='.yellow); //"\n" para añadirle una linea, durante la cadena de texto
    const titulo = readlineSync.question('Titulo: ');
    const autor = readlineSync.question('Autor: ');
    const precio = parseFloat(readlineSync.question('Precio: '));
    const año = readlineSync.question('Año de publicacion: ');

    const libro = {
        titulo,
        autor,
        precio,
        año
    };
// mandamos el libro adentro del arreglo "catalogo"(linea 4)
    catalogo.push(libro);//a partir de aqui implemente metodos avanzados de arreglos
    console.log('\nLibro agregado con exito!'.green);
    volverAlMenu();
}
//2. mostramos el catalogo
function mostrarCatalogo() {
    console.log('\n=== CATALOGO DE LIBROS ==='.yellow);
    if (catalogo.length === 0) {
        console.log('No hay libros en el catalogo.'.yellow);
    } else {
        catalogo.forEach((libro, index) => {
            console.log(`\nLibro #${index + 1}`.cyan);
            console.log(`Titulo: ${libro.titulo}`);
            console.log(`Autor: ${libro.autor}`);
            console.log(`Precio: $${libro.precio}`);
            console.log(`Año: ${libro.año}`);
        });
    }
    volverAlMenu();
}
//3. cree la funcion que busca cada libro por titulo 
function mostrarLibroPorTitulo() {
    console.log('\n=== BUSCAR LIBRO ==='.yellow);
    const titulo = readlineSync.question('Ingrese el titulo a buscar: ');
    const libroEncontrado = catalogo.find(libro => libro.titulo.toLowerCase() === titulo.toLowerCase());
    //utilice .find para buscar dentro del array "catalogo"
    if (libroEncontrado) {
        console.log('\nLibro encontrado:'.green);
        console.log(`Titulo: ${libroEncontrado.titulo}`);
        console.log(`Autor: ${libroEncontrado.autor}`);
        console.log(`Precio: $${libroEncontrado.precio}`);
        console.log(`Año: ${libroEncontrado.año}`);
    } else {//else para que avise el contrario, que no se encontro exactamente el libro dentro del array
        console.log('\nLibro no encontrado'.red);
    }
    volverAlMenu();
}
//4. (readlinne-sync) funcion para pedir el libro y eliminarla
function eliminarLibro() {
    console.log('\n=== ELIMINAR LIBRO ==='.bgYellow);
    const titulo = readlineSync.question('Ingrese el titulo del libro a eliminar: ');
    const indice = catalogo.findIndex(libro => libro.titulo.toLowerCase() === titulo.toLowerCase());
    
    if (indice !== -1) {
        catalogo.splice(indice, 1);
        console.log('\nLibro eliminado con exito!'.green);
    } else {
        console.log('\nLibro no encontrado'.red);
    }
    volverAlMenu();
}
//5. ver estadisticas (promedio, antiguo, mas caro)
function verEstadisticas() {
    console.log('\n=== ESTADISTICAS ==='.yellow);
    if (catalogo.length === 0) {
        console.log('No hay libros en el catalogo.'.yellow);
        volverAlMenu();
        return;
    }
    console.log(`Cantidad total de libros: ${catalogo.length}`);

    // Precio promedio
    const totalPrecios = catalogo.reduce((sum, libro) => sum + libro.precio, 0);
    const promedio = totalPrecios / catalogo.length;
    console.log(`Precio promedio: $${promedio.toFixed(2)}`);

    // Libro mas antiguo
    const libroAntiguo = catalogo.reduce((antiguo, actual) => 
        actual.año < antiguo.año ? actual : antiguo);
    console.log(`Libro mas antiguo: "${libroAntiguo.titulo}" (${libroAntiguo.año})`);

    // Libro mas caro
    const libroCaro = catalogo.reduce((caro, actual) => 
        actual.precio > caro.precio ? actual : caro);
    console.log(`Libro mas caro: "${libroCaro.titulo}" ($${libroCaro.precio})`);

    volverAlMenu();
}
//6. funcion para ordenar los libros guardados en el arreglo
function ordenarLibros() {
    console.log('\n=== ORDENAR LIBROS ==='.yellow);
    const opciones = [
        "Precio (ascendente)",
        "Precio (descendente)",
        "Año de publicacion (ascendente)",
        "Año de publicacion (descendente)"
    ];
//creamos el criterio de ordenamiento utilizando un switch e implementando metodos avanzados de arreglos
    const indice = readlineSync.keyInSelect(opciones, "Seleccione criterio de ordenamiento:") + 1;
    
    switch(indice) {
        case 1:
            catalogo.sort((a, b) => a.precio - b.precio);
            console.log('\nCatalogo ordenado por precio ascendente.'.green);
            break;
        case 2:
            catalogo.sort((a, b) => b.precio - a.precio);
            console.log('\nCatalogo ordenado por precio descendente.'.green);
            break;
        case 3:
            catalogo.sort((a, b) => a.año - b.año);
            console.log('\nCatalogo ordenado por año ascendente.'.green);
            break;
        case 4:
            catalogo.sort((a, b) => b.año - a.año);
            console.log('\nCatalogo ordenado por año descendente.'.green);
            break;
        default:
            console.log('\nOperacion cancelada.'.yellow);
            volverAlMenu();
            return;
    }
    
    mostrarCatalogo();
}
//7. funcion para editar los libros buscar por título y modificar sus datos.
function editarLibro() {
    console.log('\n=== EDITAR LIBRO ==='.yellow);
    const titulo = readlineSync.question('Ingrese el titulo del libro a editar: ');
    const libro = catalogo.find(libro => libro.titulo.toLowerCase() === titulo.toLowerCase());
    
    if (!libro) {
        console.log('\nLibro no encontrado'.red);
        volverAlMenu();
        return;
    }

    console.log('\nDeje en blanco los campos que no desea modificar.');
    const nuevoTitulo = readlineSync.question(`Titulo [${libro.titulo}]: `) || libro.titulo;
    const nuevoAutor = readlineSync.question(`Autor [${libro.autor}]: `) || libro.autor;
    const nuevoPrecio = parseFloat(readlineSync.question(`Precio [${libro.precio}]: `)) || libro.precio;
    const nuevoAño = readlineSync.question(`Año [${libro.año}]: `) || libro.año;

    libro.titulo = nuevoTitulo;
    libro.autor = nuevoAutor;
    libro.precio = nuevoPrecio;
    libro.año = nuevoAño;

    console.log('\nLibro actualizado con exito!'.green);
    volverAlMenu();
}
function volverAlMenu() {//nos regresa al menu principal
    readlineSync.question('\nPresione Enter para volver al menu principal...');
    console.clear();// <= limpieza de consola
    mostrarMenu();
}

mostrarMenu();