const jwt = require("jsonwebtoken");
const userModel = require("../../../models/User");
const swal = require("sweetalert")


const isAuth = (req, res, next) => {
  try {
    const authorization = req.headers.authorization;

    if (authorization) {
      const token = authorization.slice(7, authorization.length); // Bearer XXXXXX
      jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
        if (err) {
          console.error('Error al verificar el token:', err);
          res.status(401).json({ error: 'Token no válido' });
        } else {
          console.log('Usuario autenticado:', decode);
          req.user = decode;
          next();
        }
      });
    } else {
      res.status(401).json({ error: 'No hay token en los encabezados' });
    }
  } catch (error) {
    console.error('Error en el middleware de autenticación:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

const isUserPaid = async (req, res, next) => {
  try {
    const apiKey = req.headers.authorization;

    if (!apiKey) {
      return res.status(401).json({ message: 'ApiKey no proporcionada' });
    }

    // Buscar el usuario por apiKey
    const user = await userModel.findOne({ apiKey });

    if (!user) {
      return res.status(401).json({ message: 'Invalid API Key' });
    }
    
    // Verificar si la suscripción ha expirado
    const fechaActual = new Date();
    if (fechaActual > user.fechaVencimiento) {
      console.log('La suscripción ha expirado para el usuario:', user._id);
      return res.status(401).json({ message: 'API Key Expired' }); // Cambiado a "message"
    }

    // Agrega el usuario a la solicitud para que puedas acceder a él en las rutas protegidas
    req.user = user;    
    console.log(user.typeSuscription)
    // Verificar el tipo de suscripción
    if (user.typeSuscription === 'SUBSCRIPCIÓN PRO') {
      // Si es una suscripción PRO, permitir acceso a la ruta "/negocio" pero denegar a "/negocio-premium"
      req.routeType = 'PRO'; // Puedes usar esto para verificar el tipo de ruta en tus rutas
      next();
    } else if (user.typeSuscription === 'SUBSCRIPCION PREMIUM') {
      // Si es una suscripción PREMIUM, permitir acceso a ambas rutas
      req.routeType = 'PREMIUM'; // Puedes usar esto para verificar el tipo de ruta en tus rutas
      next();
    } else {
      // Tipo de suscripción desconocido
      return res.status(401).json({ message: 'Tipo de suscripción no reconocido' });
    }

  } catch (error) {
    console.error('Error en isUserPaid middleware:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

module.exports = { isUserPaid, isAuth };
