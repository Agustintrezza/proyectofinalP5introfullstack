const express = require("express");
const router = express.Router();
const {isAuth, isUserPaid} = require("../public/scripts/utils/utils");


router.get("/pro", isUserPaid, async (req, res) => {
    try {
  
      if (req.routeType === 'PRO' || req.routeType === 'PREMIUM') {

        const responseObject = {
          status: 200,
          message: 'Éxito',
          data: {
            id: '1',
            name: 'Mercurio',
            type: 'Planeta terrestre',
            diameter: '4,880 kilómetros',
            distanceFromSun: '57.9 millones de kilómetros',
            orbitalPeriod: '88 días terrestres',
            dayLength: '58.6 días terrestres',
            temperature: ['-173 °C (noche)', '427 °C (día)'],
            surfaceFeatures: ['Cráteres', 'Llanuras', 'Escarpas', 'Rocas espaciales'],
            atmosphere: {
              composition: ['Oxígeno', 'Sodio', 'Hidrógeno', 'Helio'],
              thickness: 'Muy delgada',
              conditions: 'Sin atmósfera significativa',
            },
            // magneticField: 'Débil y variable',
            // moons: [],
            // rings: [],
            // missions: [
            //   {
            //     name: 'Misión Mariner 10',
            //     year: 1974,
            //     purpose: 'Estudio del planeta y su atmósfera',
            //   },
            //   {
            //     name: 'Misión MESSENGER',
            //     year: 2004,
            //     purpose: 'Mapeo y estudio detallado de Mercurio',
            //   },
            // ],
            // averageSurfaceTemperature: '167 °C',
            // axialTilt: '0.03 grados',
            // rotationDirection: 'Rotación retrógrada',
            // maxSurfaceTemperature: '427 °C',
            // image: 'https://ejemplo.com/mercurio-imagen.jpg',
          },
        };
          
  
          res.status(200).send(responseObject);
      } 
    
  } catch (error) {
    console.log(error);
  }
  });

  router.get("/premium", isUserPaid, async (req, res) => {
    try {
      if (req.routeType === 'PREMIUM') {
        // Usuario PREMIUM, permitir acceso a la ruta "/negocio-premium"
        const responseObject = {
            status: 200,
            message: 'Éxito',
            data: {
              id: '1',
              name: 'Mercurio',
              type: 'Planeta terrestre',
              diameter: '4,880 kilómetros',
              distanceFromSun: '57.9 millones de kilómetros',
              orbitalPeriod: '88 días terrestres',
              dayLength: '58.6 días terrestres',
              temperature: ['-173 °C (noche)', '427 °C (día)'],
              surfaceFeatures: ['Cráteres', 'Llanuras', 'Escarpas', 'Rocas espaciales'],
              atmosphere: {
                composition: ['Oxígeno', 'Sodio', 'Hidrógeno', 'Helio'],
                thickness: 'Muy delgada',
                conditions: 'Sin atmósfera significativa',
              },
              magneticField: 'Débil y variable',
              moons: [],
              rings: [],
              missions: [
                {
                  name: 'Misión Mariner 10',
                  year: 1974,
                  purpose: 'Estudio del planeta y su atmósfera',
                },
                {
                  name: 'Misión MESSENGER',
                  year: 2004,
                  purpose: 'Mapeo y estudio detallado de Mercurio',
                },
              ],
              averageSurfaceTemperature: '167 °C',
              axialTilt: '0.03 grados',
              rotationDirection: 'Rotación retrógrada',
              maxSurfaceTemperature: '427 °C',
              image: 'https://ejemplo.com/mercurio-imagen.jpg',
            },
          };
        res.status(200).send(responseObject);
      } else {
        // Usuario PRO o suscripción desconocida, denegar acceso
        res.status(403).json({ message: 'API KEY Acces Denied - Auth error PREMIUM' });
      }
    
  } catch (error) {
    console.log(error);
  }
  });

  module.exports = router;