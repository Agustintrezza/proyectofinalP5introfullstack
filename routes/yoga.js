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
    id: '2',
    name: 'Adho Mukha Svanasana',
    category: 'Yoga',
    benefits: [
      'Estiramiento de la columna y los músculos de la espalda',
      'Fortalecimiento de brazos, piernas y abdomen',
      'Mejora de la circulación sanguínea',
      'Alivio del estrés y la fatiga',
    ],
    steps: [
      'Desde la posición de mesa, eleva las caderas formando una "V" invertida.',
      'Mantén los talones bajos hacia el suelo, estira los brazos y relaja la cabeza.',
      'Respira profundamente y mantén la posición durante 30-60 segundos.',
    ],
    tips: [
      'Alinea las muñecas debajo de los hombros y los dedos de los pies hacia adelante.',
      'Engancha los músculos abdominales para estabilizar la postura.',
    ],
    contraindications: [
      'Evita si tienes lesiones en muñecas, hombros o espalda.',
      'No recomendado para presión arterial alta o problemas cardíacos.',
    ],
    image: 'https://ejemplo.com/adho-mukha-svanasana-imagen.jpg',
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
              id: '2',
              name: 'Adho Mukha Svanasana',
              category: 'Postura de Yoga',
              benefits: [
                'Estiramiento de la columna vertebral y los músculos de la espalda',
                'Fortalecimiento de brazos, piernas y abdomen',
                'Mejora de la circulación sanguínea',
                'Alivio del estrés y la fatiga',
                'Estimulación de los órganos internos',
              ],
              steps: [
                'Comienza en posición de cuadrupedia (postura de la mesa) con las manos debajo de los hombros y las rodillas debajo de las caderas.',
                'Levanta las caderas hacia arriba mientras estiras las piernas y los brazos, formando una "V" invertida con el cuerpo.',
                'Mantén los talones bajos hacia el suelo, estira los brazos y presiona firmemente las palmas de las manos en el suelo.',
                'Relaja la cabeza y el cuello, permitiendo que el pecho se acerque a los muslos.',
                'Mantén la posición durante 30-60 segundos, respirando profundamente.',
              ],
              variations: [
                'Adho Mukha Vrksasana (parada de manos)',
                'Eka Pada Adho Mukha Svanasana (perro boca abajo con una pierna levantada)',
              ],
              tips: [
                'Alinea las muñecas debajo de los hombros y los dedos de los pies apuntando hacia adelante.',
                'Si tienes problemas en las muñecas, puedes doblar un poco las rodillas.',
                'Engancha los músculos abdominales para estabilizar la postura.',
                'Adapta la postura según tus necesidades y nivel de flexibilidad.',
              ],
              contraindications: [
                'Lesiones en las muñecas, los hombros o la espalda.',
                'Presión arterial alta o problemas cardíacos.',
                'Embarazo avanzado sin experiencia previa en yoga.',
              ],
              duration: '30-60 segundos',
              difficulty: 'Intermedio',
              image: 'https://ejemplo.com/adho-mukha-svanasana-imagen.jpg',
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