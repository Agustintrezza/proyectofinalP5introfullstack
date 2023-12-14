// pricing.js

// Esta función muestra el cartel al cargar la página
function mostrarCartel() {
    // Crear el elemento del cartel
    const cartel = document.createElement('div');
    cartel.innerHTML = '<p>This site is %100 FREE. Only to know and test our services.</p>';

    // Establecer estilos para el cartel
    cartel.style.backgroundColor = '#232323'; // Gris oscuro
    cartel.style.color = '#fff'; // Texto blanco
    cartel.style.padding = '10px'; // Espaciado interno
    cartel.style.position = 'fixed'; // Fijar la posición
    cartel.style.bottom = '0'; // Colocar en la parte inferior
    cartel.style.width = '100%'; // Ancho completo
    cartel.style.display = 'flex'; // Usar un diseño flexbox
    cartel.style.justifyContent = 'center'; // Centrar contenido horizontalmente
    cartel.style.alignItems = 'center'; // Centrar contenido verticalmente

    // Crear el botón de cierre (una "X" en rojo)
    const botonCerrar = document.createElement('button');
    botonCerrar.innerHTML = 'CLOSE';
    botonCerrar.style.border = '1px solid #ff0000'; // Borde rojo
    botonCerrar.style.color = '#ffffff'; // Texto rojo
    botonCerrar.style.background = '#fe1548'; // Fondo transparente
    botonCerrar.style.padding = '10px'; // Espaciado interno
    botonCerrar.style.borderRadius = '5px'; // Esquinas redondeadas
    botonCerrar.style.marginLeft = '10px'; // Separación del texto

    // Establecer estilos para el texto
    const textoCartel = cartel.querySelector('p');
    textoCartel.style.fontSize = '22px'; // Tamaño del texto

    // Agregar el evento de clic al botón de cierre
    botonCerrar.addEventListener('click', () => {
        // Ocultar el cartel al hacer clic en el botón de cierre
        cartel.style.display = 'none';
    });

    // Agregar el botón al cartel
    cartel.appendChild(botonCerrar);

    // Agregar el cartel al cuerpo del documento
    document.body.appendChild(cartel);
}

// Llamar a la función al cargar la página
document.addEventListener('DOMContentLoaded', mostrarCartel);