const express = require("express");
const router = express.Router();
const userModel = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const bodyparser = require("body-parser");
const { randomBytes } = require('crypto');
const { validationResult } = require("express-validator");
// const stripe = require("stripe")
const { formatISO, add, parseISO } = require('date-fns');
const {isAuth, isUserPaid} = require("../public/scripts/utils/utils");
// const isUserPaid = require("../public/scripts/utils/utils");

dotenv.config();

const stripe = require('stripe')('sk_test_51MpcnREFbtwHkKNRH6otmFgmIxUQR8k0y7gQyJatb71LanFGlJjhJGgt3LdX2i437H32i1DyFe7SJNF6fMgR0KCk00Rm9Rkgqw');

//OBETENER LA INFO DEL USUARIO
router.get("/userinfo/:id", async (req, res) => {
    try {
    const id = req.params.id;
    let usuario = await userModel.findById(id);
    res.status(200).send(usuario);
  } catch (error) {
    console.log(error);
  }
});


router.get("/negocio", isUserPaid, async (req, res) => {
  try {

    if (req.routeType === 'PRO' || req.routeType === 'PREMIUM') {
      // Usuario PRO, permitir acceso a la ruta "/negocio"
      // ... tu lógica aquí ...
      // Crear un objeto de respuesta
        const nombre = 'Sebastián';
        const responseObject = {
          status: 200,
          message: 'Éxito',
          data: {
            id: '269684728',
            name: nombre,
            lastname: '',
            age: 35,
            born:'06-09-1988',
            country: 'California',
            hobbies: ['Drums', 'Web Development', 'Fútbol', 'Yoga'],
            // video: 'https://www.youtube.com/watch?v=UUltDtz4F8c&ab_channel=Buddha%27sFluteMusic',
            // imagen: 'https://res.cloudinary.com/djpifu0cl/image/upload/v1690756537/h6i3es2vccpmahhybbkq.webp',
            // historial: {
            //   infancia: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
            //   adolescencia: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
            //   vejez: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. '
            // }
          },
        };
        res.status(200).send(responseObject);
    } 
  
} catch (error) {
  console.log(error);
}
});

router.get("/negocio-premium", isUserPaid, async (req, res) => {
  try {
    if (req.routeType === 'PREMIUM') {
      // Usuario PREMIUM, permitir acceso a la ruta "/negocio-premium"

      const nombre = 'Agustin';
      const responseObject = {
        status: 200,
        message: 'Éxito',
        data: {
          id: '269684728',
          name: nombre,
          lastname: 'Trezza',
          age: 35,
          born:'06-09-1988',
          country: 'Australia',
          hobbies: ['Drums', 'Web Development', 'Fútbol', 'Yoga'],
          video: 'https://www.youtube.com/watch?v=UUltDtz4F8c&ab_channel=Buddha%27sFluteMusic',
          imagen: 'https://res.cloudinary.com/djpifu0cl/image/upload/v1690756537/h6i3es2vccpmahhybbkq.webp',
          historial: {
            infancia: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
            adolescencia: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
            vejez: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. '
          }
        },
      };
      res.status(200).send(responseObject);
    } else {
      // Usuario PRO o suscripción desconocida, denegar acceso
      res.status(403).json({ message: 'API Acces Denied - Auth error "/negocio-premium"' });
    }
  
} catch (error) {
  console.log(error);
}
});


router.post("/creardata", async (req, res) => {
  console.log(req.headers);
  try {
    await userModel.create(req.body);
    res.status(200).send("Data creada exitosamente!");
  } catch (error) {
    res
      .status(500)
      .send({
        message: "No se pudo crear la data, vuelva a intentarlo.",
        error,
      });
    console.log(error);
  }
});

//MOVIDA CON STRIPE PLAN PRO
router.post('/checkout', isAuth, async (req, res) => {
  try {
    // const userId = req.user.id;
    const userInfoFromHeader = JSON.parse(req.headers['user-info']);
    console.log(userInfoFromHeader)

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: 'price_1ODSqfEFbtwHkKNRtKcdLzN0',
          quantity: '1',
        },
      ],
      metadata: {
        userId: userInfoFromHeader, // Agrega el ID del usuario como metadato
      },
      success_url:
        'http://localhost:4242',
      cancel_url: 'http://YOUR-WEBSITE/error',
    });
    // console.log(session)
    res.send(session);
  } catch (error) {
    console.log('error', error)
  }
  
});

//MOVIDA CON STRIPE PLAN PREMIUM
router.post('/checkout-premium', isAuth, async (req, res) => {
  try {
    // const userId = req.user.id;
    const userInfoFromHeader = JSON.parse(req.headers['user-info']);
    console.log(userInfoFromHeader)

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: 'price_1OEgeuEFbtwHkKNR4DdPJIvg',
          quantity: '1',
        },
      ],
      metadata: {
        userId: userInfoFromHeader, // Agrega el ID del usuario como metadato
      },
      success_url:
        'http://localhost:4242',
      cancel_url: 'http://YOUR-WEBSITE/error',
    });
    // console.log(session)
    res.send(session);
  } catch (error) {
    console.log('error', error)
  }
  
});

// MOVIDA CON STRIPE PLAN PRO
router.post('/webhook', express.json({ type: 'application/json' }), async (request, response) => {
  const event = request.body;

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      break;
    case 'payment_intent.created':



    case 'checkout.session.completed':
      try {
        const session = event.data.object;
        
        console.log(session)
        // Obtén el ID de la factura desde el objeto de sesión
        const invoiceId = session.invoice;

        // Utiliza la API de Stripe para obtener la información completa de la factura
        const invoice = await stripe.invoices.retrieve(invoiceId);
        const facturaPdf = invoice.invoice_pdf;

        // Obtiene el ID del usuario y de la suscripción
        const usuarioId = event.data.object.customer;
        const subscriptionId = event.data.object.subscription;

        // Utiliza la API de Stripe para obtener el nombre del Servicio
        let subscriptionTitle = 'Nombre de suscripción no disponible';      

        if (subscriptionId) {
          try {
            const subscription = await stripe.subscriptions.retrieve(subscriptionId);

            if (subscription?.plan?.product) {
              const productId = subscription.plan.product;
              const product = await stripe.products.retrieve(productId);

              // Ahora, puedes acceder al nombre del producto
              subscriptionTitle = product?.name || subscriptionTitle;
              console.log('titulooooo', subscriptionTitle);
            }
          } catch (error) {
            console.error('Error al obtener información de la suscripción desde Stripe:', error);
          }
        }

        // Accede a los metadatos de la sesión
        const metadatos = event.data.object.metadata;
        const usuarioIdDesdeMetadatos = metadatos.userId;

        function generateApiKey() {
          const apiKey = randomBytes(16).toString('hex');
          return apiKey;
        }

         // Accede al precio de la suscripción desde el evento
         const precioSuscripcionRaw = event.data.object.amount_total;

        // Establece el tipo de suscripción en función del precio
        let tipoSuscripcion;
        if (precioSuscripcionRaw === 4000) {
          tipoSuscripcion = 'SUBSCRIPCION PREMIUM';
        } else if (precioSuscripcionRaw === 2500) {
          tipoSuscripcion = 'SUBSCRIPCIÓN PRO';
        } else {
          console.error('Precio de la suscripción no reconocido:', precioSuscripcionRaw);
          return response.status(400).send('Bad Request: Precio de suscripción no reconocido');
        }

         // Verifica si el precioSuscripcionRaw es un número válido
         let precioRedondeado; // Declara precioRedondeado fuera del bloque if

        // Verifica si el precioSuscripcionRaw es un número válido
        if (typeof precioSuscripcionRaw === 'number' && !isNaN(precioSuscripcionRaw)) {
          // Convierte el precio a un número y redondea a dos decimales
          precioRedondeado = Number((precioSuscripcionRaw / 100).toFixed(2));
        } else {
          console.error('El precio de la suscripción no es un número válido:', precioSuscripcionRaw);
          return response.status(400).send('Bad Request: Precio de suscripción no válido');
        }

        // const nuevaApiKey = generateApiKey();

        // async function generateHashedApiKey() {
        //   const apiKey = randomBytes(16).toString('hex');
        //   const hashedApiKey = await bcrypt.hash(apiKey, 10); // Usar el algoritmo de hash bcrypt con 10 rondas
        //   return hashedApiKey;
        // }

        const nuevaApiKey = await generateApiKey();

        console.log(`💰 Cliente ${usuarioId} se suscribió al plan ${subscriptionId}`);
        console.log(`ID del usuario desde metadatos: ${usuarioIdDesdeMetadatos}`);
        console.log('Nueva API Key generada:', nuevaApiKey);
        console.log('Información de la factura:', facturaPdf);
        console.log('Información del servicio', subscriptionTitle);
        console.log('Precio de la suscripción', precioRedondeado);

        // Calcular las fechas de creación y expiración
        const fechaCreacion = parseISO(formatISO(new Date(session.created * 1000)));
        const fechaExpiracion = add(fechaCreacion, { years: 1 });

       // Actualiza la API key del usuario en la base de datos
        const usuarioActualizado = await userModel.findByIdAndUpdate(
          usuarioIdDesdeMetadatos,
          {
            $set: {
              apiKey: nuevaApiKey,
              fechaSubscripcion: fechaCreacion,
              fechaVencimiento: fechaExpiracion,
              invoice: facturaPdf,
              subscripcionTitle: subscriptionTitle,
              precioSuscripcion: precioRedondeado,
              typeSuscription: tipoSuscripcion,
              // ... (otros campos)
            },
          },
          { new: true }
        );

        if (!usuarioActualizado) {
          console.error('Usuario no encontrado');
          return response.status(404).send('Usuario no encontrado');
        }

        console.log('Usuario actualizado con nueva API Key:', usuarioActualizado);
        response.status(200).send('Usuario creado exitosamente!');
      } catch (error) {
        console.error('Error en el manejo del evento:', error);
        response.status(500).send('Error interno del servidor');
      }

      break;


    case 'payment_method.attached':
      const paymentMethod = event.data.object;
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }
});


//CREAR UN USUARIO
router.post("/crearusuario", [


], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const saltRounds = 10;
    let hash = await bcrypt.hash(req.body.contraseña, saltRounds);

    // Resto del código para crear un usuario
    const newUser = await userModel.create({
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      email: req.body.email,
      contraseña: hash,
    });

    // Genera un token único para el usuario durante el registro
    const secret = process.env.JWT_SECRET;
    const token = jwt.sign({ userId: newUser._id }, secret, { expiresIn: "3h" });

    // Actualiza el token del usuario en la base de datos
    newUser.token = token;
    await newUser.save();

    res.status(200).json({
      message: "Usuario creado exitosamente",
      userId: newUser._id,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error interno del servidor");
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });

    if (!user) {
      return res.status(401).send("Correo electrónico o contraseña no válidos");
    }

    const match = await bcrypt.compare(req.body.contraseña, user.contraseña);

    if (match) {
      // Genera un nuevo token al iniciar sesión
      const secret = process.env.JWT_SECRET;
      const token = jwt.sign({ userId: user._id }, secret, { expiresIn: "3h" });

      // Actualiza el token del usuario en la base de datos
      user.token = token;
      await user.save();

      res.status(200).json({
        message: "Inicio de sesión exitoso",
        token,
        user,
      });
    } else {
      res.status(401).send("Correo electrónico o contraseña no válidos");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error interno del servidor");
  }
});

module.exports = router;
