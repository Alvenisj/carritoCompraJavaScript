
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [ ];

cargarEventListeners();

// Donde cargamos todos los eventListener
function cargarEventListeners( ) {
    //Cuando agregas un curso presionando "Agregar al carrito"
    listaCursos.addEventListener('click', agregarCurso );
   //Elimina cursos del carrito
   carrito.addEventListener('click', eliminarCurso );
   // Vaciar carrito
   vaciarCarritoBtn.addEventListener('click', ( ) => {
     articulosCarrito = [ ];//RESETEAMOS EL ARREGLO
     limpiarHTML(); //ELIMINANO TODO EL HTML
   })
}


// --------FUNCIONES-------------
function agregarCurso( e ) {
    e.preventDefault();
    if( e.target.classList.contains('agregar-carrito') ) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    
    }
}

function eliminarCurso( e ) {
    if( e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id');
        //ELIMINA DEL ARREGLO DE articulosCarrito a través del: data-id
        articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId )
        carritoHtmlMostrar(); //VUELVE A LLAMAR LA FUNCIÓN, LIMPIA Y MUESTRA LO QUE QUEDA EN EL HTML SIN ELIMINAR
    }
    console.log(articulosCarrito); 
}                   

// leer los datos del info-card del curso y extraer los datos
function leerDatosCurso( curso ) {
    // Crear un objeto con el contenido del curso actual
   const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
   }
   //REVISA SI EL ELEMENTO EXISTE EN EL CARRITO
   const existe = articulosCarrito.some( curso => curso.id === infoCurso.id);

  if( existe ) {
    //ACTUALIZAMOS ÚNICAMENTE LA CANTIDAD
    const cursos = articulosCarrito.map( curso => {
        if( curso.id === infoCurso.id ) {
            curso.cantidad++;
            return curso; //retorna objeto actualizado
        } else {
            return curso; //retorna los objetos que no están duplicados
        }
    });
    articulosCarrito = [ ...cursos ];
  } else {
    //AGREGAMOS EL CURSO AL CARRITO
    // AGREGA ELEMENTOS AL ARREGLO DE CARRITO
     articulosCarrito = [ ...articulosCarrito,  infoCurso ];
  }

   carritoHtmlMostrar( );
}


// MUESTRA EL CARRITO DE COMPRA EN EL HTML
function carritoHtmlMostrar(  ) {
    //LIMPIAR EL HTML previo, después de imprimir cada row
    limpiarHTML();
    // RECORRE EL CARRITO Y GENERA EL HTML
    articulosCarrito.forEach( curso => {
        console.log(curso)
       const { imagen, titulo, precio, cantidad, id } = curso;
       const row = document.createElement('tr');
       row.innerHTML = `<td> <img src="${imagen}" width="100"> <td>   
        <td> ${titulo} </td>
        <td> ${precio} <td>
        <td> ${cantidad} <td>
        <td> <a href="#" class="borrar-curso" data-id="${id}"> x </a> </td>
       `;
       //Agrega el HTML del carrito en el tbody
       contenedorCarrito.appendChild( row );
    });

}

// ELIMINA LOS CURSOS DEL tbody
function limpiarHTML( ) {
    // forma lenta
    // contenedorCarrito.innerHTML = '';
    while( contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild( contenedorCarrito.firstChild )
    }
}