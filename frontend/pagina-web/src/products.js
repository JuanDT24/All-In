// products.js
import ferrari from './imgautos/ferrari.jpg';
import lamborghini from './imgautos/lamborghini.jpg';
import onix from './imgautos/onix.jpg';
import tracker from './imgautos/tracker.jpg';
import sail from './imgautos/sail.jpg';
import tucson from './imgautos/tucson.jpg';
import swift from './imgautos/swift.jpeg';
import renault from './imgautos/renaularkana.jpg';
import mazda from './imgautos/mazda.jpg';
import naruto from './Naruto.jpg'; // Imagen de placeholder

const initialProducts = [
  // Vehículos (categoryId: 1)
  {
    id: 1,
    name: 'Ferrari 812 GTS',
    price: '$450,000',
    image: ferrari,
    categoryId: 1,
    description: 'El Ferrari 812 GTS es un superdeportivo convertible con motor V12.',
  },
  {
    id: 2,
    name: 'Lamborghini Huracán',
    price: '$340,000',
    image: lamborghini,
    categoryId: 1,
    description: 'El Lamborghini Huracán es un superdeportivo italiano de alto rendimiento.',
  },
  {
    id: 3,
    name: 'Chevrolet Onix',
    price: '$10,000',
    image: onix,
    categoryId: 1,
    description: 'El Chevrolet Onix es un automóvil compacto ideal para la ciudad.',
  },
  {
    id: 4,
    name: 'Chevrolet Tracker',
    price: '$12,000',
    image: tracker,
    categoryId: 1,
    description: 'La Chevrolet Tracker es una SUV compacta con diseño moderno.',
  },
  {
    id: 5,
    name: 'Chevrolet Sail',
    price: '$6,000',
    image: sail,
    categoryId: 1,
    description: 'El Chevrolet Sail es un sedán económico y eficiente.',
  },
  {
    id: 6,
    name: 'Renault Arkana',
    price: '$19,000',
    image: renault,
    categoryId: 1,
    description: 'El Renault Arkana combina elegancia y tecnología en una SUV única.',
  },
  {
    id: 7,
    name: 'Hyundai Tucson',
    price: '$20,000',
    image: tucson,
    categoryId: 1,
    description: 'La Hyundai Tucson es una SUV versátil y cómoda para toda la familia.',
  },
  {
    id: 8,
    name: 'Suzuki Swift',
    price: '$13,500',
    image: swift,
    categoryId: 1,
    description: 'El Suzuki Swift es un compacto deportivo con gran rendimiento.',
  },
  {
    id: 9,
    name: 'Mazda MX-5',
    price: '$90,000',
    image: mazda,
    categoryId: 1,
    description: 'El Mazda MX-5 es un roadster icónico conocido por su manejo ágil.',
  },

  // Supermercado (categoryId: 2)
  {
    id: 10,
    name: 'Caja de Cereales',
    price: '$3',
    image: naruto,
    categoryId: 2,
    description: 'Deliciosos cereales para empezar tu día con energía.',
  },
  {
    id: 11,
    name: 'Botella de Agua',
    price: '$1',
    image: naruto,
    categoryId: 2,
    description: 'Agua mineral pura y refrescante.',
  },

  // Tecnología (categoryId: 3)
  {
    id: 12,
    name: 'Laptop',
    price: '$1,000',
    image: naruto,
    categoryId: 3,
    description: 'Laptop de alto rendimiento para tus tareas diarias.',
  },
  {
    id: 13,
    name: 'Smartphone',
    price: '$700',
    image: naruto,
    categoryId: 3,
    description: 'Smartphone de última generación con cámara de alta resolución.',
  },

  // Electrodoméstico (categoryId: 4)
  {
    id: 14,
    name: 'Refrigerador',
    price: '$600',
    image: naruto,
    categoryId: 4,
    description: 'Refrigerador espacioso y eficiente en consumo energético.',
  },
  {
    id: 15,
    name: 'Lavadora',
    price: '$400',
    image: naruto,
    categoryId: 4,
    description: 'Lavadora automática con múltiples programas de lavado.',
  },

  // Deportes y Fitness (categoryId: 5)
  {
    id: 16,
    name: 'Bicicleta de Montaña',
    price: '$350',
    image: naruto,
    categoryId: 5,
    description: 'Bicicleta resistente para aventuras en montaña.',
  },
  {
    id: 17,
    name: 'Pesas de 10kg',
    price: '$50',
    image: naruto,
    categoryId: 5,
    description: 'Set de pesas para tus rutinas de ejercicio en casa.',
  },

  // Moda (categoryId: 6)
  {
    id: 18,
    name: 'Vestido Elegante',
    price: '$80',
    image: naruto,
    categoryId: 6,
    description: 'Vestido perfecto para ocasiones especiales.',
  },
  {
    id: 19,
    name: 'Zapatos Deportivos',
    price: '$60',
    image: naruto,
    categoryId: 6,
    description: 'Zapatos cómodos y ligeros para deportes.',
  },

  // Juegos (categoryId: 7)
  {
    id: 20,
    name: 'Consola de Videojuegos',
    price: '$400',
    image: naruto,
    categoryId: 7,
    description: 'Consola de última generación para horas de diversión.',
  },
  {
    id: 21,
    name: 'Juego de Mesa',
    price: '$25',
    image: naruto,
    categoryId: 7,
    description: 'Juego de mesa para disfrutar con familia y amigos.',
  },

  // Medicamentos (categoryId: 8)
  {
    id: 22,
    name: 'Analgésico',
    price: '$10',
    image: naruto,
    categoryId: 8,
    description: 'Analgésico de rápida acción para aliviar el dolor.',
  },
  {
    id: 23,
    name: 'Vitaminas',
    price: '$15',
    image: naruto,
    categoryId: 8,
    description: 'Suplemento vitamínico para fortalecer tu salud.',
  },

  // Inmuebles (categoryId: 9)
  {
    id: 24,
    name: 'Casa en la Playa',
    price: '$250,000',
    image: naruto,
    categoryId: 9,
    description: 'Hermosa casa frente al mar con todas las comodidades.',
  },
  {
    id: 25,
    name: 'Apartamento en la Ciudad',
    price: '$150,000',
    image: naruto,
    categoryId: 9,
    description: 'Moderno apartamento en el centro de la ciudad.',
  },
  {
    id: 26,
    name: 'Terreno en el Campo',
    price: '$80,000',
    image: naruto,
    categoryId: 9,
    description: 'Amplio terreno en el campo ideal para proyectos agrícolas.',
  },
];

export default initialProducts;
