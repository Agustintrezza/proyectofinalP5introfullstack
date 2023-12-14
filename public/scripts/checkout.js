//EVENTO AL HACER SUBMIT AL FORMULARIO
const checkoutFree = document.getElementById("checkout-free");
checkoutFree.addEventListener("click", function (e) {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  if (!userInfo) {
    // Mostrar Sweet Alert indicando que no hay sesión de usuario
    swal({
      title: "ES NECESARIO INICIAR SESIÓN",
      text: "¡Creá una cuenta, iniciá sesión suscribite!",
      icon: "warning",
      confirmButtonText: "Ok",
    });
    return; // Detener la ejecución si no hay userInfo
  }
  redirectCheckout()
  console.log('dispara el evento')
});

const checkoutInicial = document.getElementById("checkout-inicial");
checkoutInicial.addEventListener("click", function (e) {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  if (!userInfo) {
    // Mostrar Sweet Alert indicando que no hay sesión de usuario
    swal({
      title: "ES NECESARIO INICIAR SESIÓN",
      text: "¡Creá una cuenta, iniciá sesión suscribite!",
      icon: "warning",
      confirmButtonText: "Ok",
    });
    return; // Detener la ejecución si no hay userInfo
  }
  redirectCheckout()
});
const checkoutPremium = document.getElementById("checkout-premium");
checkoutPremium.addEventListener("click", function (e) {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  if (!userInfo) {
    // Mostrar Sweet Alert indicando que no hay sesión de usuario
    swal({
      title: "ES NECESARIO INICIAR SESIÓN",
      text: "¡Creá una cuenta, iniciá sesión suscribite!",
      icon: "warning",
      confirmButtonText: "Ok",
    });
    return; // Detener la ejecución si no hay userInfo
  }
  redirectCheckoutPremium()
});

// const checkout = document.getElementById("checkout");
// checkout.addEventListener("click", function (e) {
//   const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//   if (!userInfo) {
//     // Mostrar Sweet Alert indicando que no hay sesión de usuario
//     swal({
//       title: "ES NECESARIO INICIAR SESIÓN",
//       text: "¡Creá una cuenta, iniciá sesión suscribite!",
//       icon: "warning",
//       confirmButtonText: "Ok",
//     });
//     return; // Detener la ejecución si no hay userInfo
//   }
//   redirectCheckout()
// });

// CHECKOUT PLAN PRO
async function redirectCheckout() {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const token = userInfo.token || null;
    const id = userInfo._id
    
    try {
      const { data } = await axios.post("/users/checkout", {}, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'User-Info': JSON.stringify(id),  // Agrega la información de usuario como una cabecera personalizada 
      },
    });
    
      const urlCheckout = data.url
      window.location.href = `${urlCheckout}`;
    //   window.open(`${urlCheckout}`)
    } catch (error) {
      swal({
        title: "NO ES POSIBLE INICIAR SESIÓN",
        text: "El email o el password ingresados no son válidos.",
        icon: "warning",
        confirmButtonText: "Ok",
      });
    }
  }

  // CHECKOUT PLAN PREMIUM

async function redirectCheckoutPremium() {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const token = userInfo.token || null;
  const id = userInfo._id
  
  try {
    const { data } = await axios.post("/users/checkout-premium", {}, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'User-Info': JSON.stringify(id),  // Agrega la información de usuario como una cabecera personalizada 
    },
  });
  
    const urlCheckout = data.url
    window.location.href = `${urlCheckout}`;
  //   window.open(`${urlCheckout}`)
  } catch (error) {
    swal({
      title: "NO ES POSIBLE INICIAR SESIÓN",
      text: "El email o el password ingresados no son válidos.",
      icon: "warning",
      confirmButtonText: "Ok",
    });
  }
}