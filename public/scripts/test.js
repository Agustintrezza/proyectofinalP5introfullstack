
// Verificar la autenticación al cargar la página
document.addEventListener("DOMContentLoaded", function () {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const cuerpoPagina = document.querySelector("body"); // Selecciona el elemento que deseas ocultar

  // Verificar si el usuario está autenticado
  if (!userInfo || !userInfo.token) {
      // Si no está autenticado, redirigir a la página de inicio de sesión
      window.location.href = "signin.html";
  } else {
      // Si está autenticado, mostrar el contenido
      cuerpoPagina.classList.remove("ocultar");
  }
});


// const apiUrl = 'http://localhost:4242/users/negocio';
// const apiKey = '920c49aeda90ad815f82424b7bd327db';

// async function fetchAPI() {
//   try {
//     const { data } = await axios.get(apiUrl, {
//       headers: {
//         'Authorization': apiKey,
//         'Content-Type': 'application/json',
//       },
//     });

//     console.log(data);

//     // Aquí puedes realizar acciones adicionales con la respuesta exitosa si es necesario.

//   } catch (error) {
//     if (error.response && error.response.status === 401) {
//       // La API key no es válida, muestra un mensaje de error
//       const errorMessage = error.response.data.message || "Error de autenticación - Revisá tu apiKey";
//       swal({
//         title: "Error",
//         text: errorMessage,
//         icon: "error",
//         confirmButtonText: "Ok",
//       });
//     } else {
//       // Otras acciones para otros errores
//       console.error("Error en la solicitud:", error);
//       swal({
//         title: "NO ES POSIBLE ACCEDER A LA INFORMACIÓN",
//         text: "Revisá tu apiKey",
//         icon: "warning",
//         confirmButtonText: "Ok",
//       });
//     }
//   }
// }

// // Llama a la función fetchAPI
// fetchAPI();

// async function fetchAPI() {
//   console.log(apiKey);

//   try {

//     const { data } = await axios.get("/users/negocio-premium", {
//       headers: {
//         'Authorizationapi': apiKey,
//         'Content-Type': 'application/json',
//       },
//     });

//     console.log(data);

//   } catch (error) {
//     // Verifica si la respuesta tiene un código de estado 401
//     if (error.response && error.response.status === 401) {
//       // Muestra un Sweet Alert con el mensaje de error de la respuesta JSON
//       const errorMessage = error.response.data.error || "Error de autenticación - Revisá tu apiKey"; // Accede al mensaje de la respuesta
//       swal({
//         title: "Error",
//         text: errorMessage,
//         icon: "error",
//         confirmButtonText: "Ok",
//       });
//     } else {
//       // Otras acciones para otros errores
//       console.error("Error en la solicitud:", error);
//       swal({
//         title: "NO ES POSIBLE ACCEDER A LA INFORMACIÓN",
//         text: "Revisá tu apiKey",
//         icon: "warning",
//         confirmButtonText: "Ok",
//       });
//     }
//   }
// }

// fetchAPI();
