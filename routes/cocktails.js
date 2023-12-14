const express = require("express");
const router = express.Router();
const {isAuth, isUserPaid} = require("../public/scripts/utils/utils");


module.exports = router;

router.get("/pro", isUserPaid, async (req, res) => {
    try {
  
      if (req.routeType === 'PRO' || req.routeType === 'PREMIUM') {

        const responseObject = {
            status: 200,
            message: 'Éxito',
            data: {
              id: '1',
              name: 'Margarita',
              category: 'Cóctel',
              ingredients: [
                '2 oz (60 ml) de tequila',
                '1 oz (30 ml) de licor de naranja (triple sec)',
                '1 oz (30 ml) de jugo de limón fresco',
                '1 cucharadita de azúcar (opcional, para el borde del vaso)',
                'Hielo',
                'Rodaja de limón (para decorar)',
                'Sal (opcional, para el borde del vaso)',
              ],
              preparation: [
                'Moja el borde del vaso con una rodaja de limón y luego sumérgelo en sal (opcional) para crear un borde escarchado.',
                'En una coctelera, agrega el tequila, el licor de naranja, el jugo de limón y el azúcar (opcional).',
                'Añade hielo a la coctelera y agita bien para enfriar la mezcla.',
                'Cuela la mezcla en el vaso preparado con hielo.',
                'Decora con una rodaja de limón en el borde del vaso.',
                '¡Disfruta de tu refrescante Margarita!',
              ],
              tips: [
                'Utiliza tequila de buena calidad para obtener un mejor sabor.',
                'Puedes ajustar la cantidad de azúcar según tu preferencia de dulzura.',
                'Prueba diferentes variaciones, como Margarita de fresa o mango.',
                'Sirve en un vaso de margarita para una presentación auténtica.',
              ],
              glassType: 'Vaso de margarita',
              images: [
                'https://ejemplo.com/margarita-imagen1.jpg',
                'https://ejemplo.com/margarita-imagen2.jpg',
                'https://ejemplo.com/margarita-imagen3.jpg',
              ],
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
  
      if (req.routeType === 'PRO' || req.routeType === 'PREMIUM') {

        const responseObject = {
            status: 200,
            message: 'Éxito',
            data: {
              id: '1',
              name: 'Margarita',
              category: 'Cóctel',
              ingredients: [
                {
                  name: 'Tequila',
                  amount: '2 oz (60 ml)',
                },
                {
                  name: 'Licor de naranja (triple sec)',
                  amount: '1 oz (30 ml)',
                },
                {
                  name: 'Jugo de limón fresco',
                  amount: '1 oz (30 ml)',
                },
                {
                  name: 'Azúcar (opcional, para el borde del vaso)',
                  amount: '1 cucharadita',
                },
                {
                  name: 'Hielo',
                  amount: 'Al gusto',
                },
                {
                  name: 'Rodaja de limón (para decorar)',
                  amount: '1 unidad',
                },
                {
                  name: 'Sal (opcional, para el borde del vaso)',
                  amount: 'Al gusto',
                },
              ],
              preparation: [
                'Moja el borde del vaso con una rodaja de limón y luego sumérgelo en sal (opcional) para crear un borde escarchado.',
                'En una coctelera, agrega el tequila, el licor de naranja, el jugo de limón y el azúcar (opcional).',
                'Añade hielo a la coctelera y agita bien para enfriar la mezcla.',
                'Cuela la mezcla en el vaso preparado con hielo.',
                'Decora con una rodaja de limón en el borde del vaso.',
                '¡Disfruta de tu refrescante Margarita!',
              ],
              tips: [
                'Utiliza tequila de calidad premium para un sabor excepcional.',
                'Ajusta la cantidad de azúcar según tu preferencia de dulzura.',
                'Experimenta con variedades de limón para darle un toque único.',
                'Sirve en un vaso de margarita de cristal para una presentación elegante.',
              ],
              glassType: 'Vaso de margarita',
              garnish: 'Rodaja de limón y borde escarchado con sal',
              servingTemperature: 'Fresco',
              alcoholContent: 'Moderado',
              images: [
                'https://ejemplo.com/margarita-imagen1.jpg',
                'https://ejemplo.com/margarita-imagen2.jpg',
                'https://ejemplo.com/margarita-imagen3.jpg',
              ],
              video: 'https://www.youtube.com/watch?v=ejemplo',
            },
          };
          
  
          res.status(200).send(responseObject);
      } 
    
  } catch (error) {
    console.log(error);
  }
  });

  module.exports = router;