// Products data with flavors and availability
const productsData = {
    'pudins-mini': {
        id: 'pudins-mini',
        name: 'Mini Pudim',
        description: 'Deliciosos pudins em porções individuais',
        price: 'R$ 8,00',
        image: '🍮',
        availability: 'weekend',
        flavors: [
            { name: 'Leite Condensado', available: true }
        ]
    },
    'cones-trufados': {
        id: 'cones-trufados',
        name: 'Cones Trufados',
        description: 'Cones recheados com trufas gourmet',
        price: 'R$ 12,00',
        image: '🍦',
        availability: 'available',
        flavors: [
            { name: 'Ninho', available: true },
            { name: 'Nutella', available: true },
            { name: 'Chocolate', available: true },
            { name: 'Morango', available: true },
            { name: 'Doce de Leite', available: false }
        ]
    },
    'trufas-gourmet': {
        id: 'trufas-gourmet',
        name: 'Trufas Gourmet',
        description: 'Trufas artesanais com ingredientes premium',
        price: 'R$ 6,00',
        image: '🍫',
        availability: 'available',
        flavors: [
            { name: 'Chocolate', available: true },
            { name: 'Ninho', available: true },
            { name: 'Doce de Leite', available: true },
            { name: 'Maracujá', available: true },
            { name: 'Limão', available: false }
        ]
    },
    'geladinhos-gourmet': {
        id: 'geladinhos-gourmet',
        name: 'Geladinhos Gourmet',
        description: 'Geladinhos artesanais com sabores incríveis',
        price: 'R$ 5,00',
        image: '🧊',
        availability: 'available',
        flavors: [
            { name: 'Ninho', available: true },
            { name: 'Chocolate', available: true },
            { name: 'Morango', available: true },
            { name: 'Maracujá', available: true },
            { name: 'Uva', available: true },
            { name: 'Nutella', available: true },
            { name: 'Coco', available: false }
        ]
    },
    'brigadeiros': {
        id: 'brigadeiros',
        name: 'Brigadeiros',
        description: 'O clássico brasileiro feito com muito carinho',
        price: 'R$ 4,00',
        image: '🍬',
        availability: 'available',
        flavors: [
            { name: 'Tradicional', available: true },
            { name: 'Ninho', available: true },
            { name: 'Chocolate Belga', available: true },
            { name: 'Coco', available: true },
            { name: 'Morango', available: false }
        ]
    },
    'beijinhos': {
        id: 'beijinhos',
        name: 'Beijinhos',
        description: 'Doce de coco tradicional e delicioso',
        price: 'R$ 4,00',
        image: '💋',
        availability: 'available',
        flavors: [
            { name: 'Tradicional', available: true },
            { name: 'Com Chocolate', available: true },
            { name: 'Com Leite Condensado', available: true }
        ]
    },
    'brigadeiro-ninho': {
        id: 'brigadeiro-ninho',
        name: 'Brigadeiro de Ninho',
        description: 'Brigadeiro especial com leite ninho',
        price: 'R$ 5,00',
        image: '🥛',
        availability: 'available',
        flavors: [
            { name: 'Tradicional', available: true },
            { name: 'Com Nutella', available: true },
            { name: 'Com Morango', available: true }
        ]
    }
};

// Get availability label
function getAvailabilityLabel(availability) {
    const labels = {
        'available': { text: 'Disponível', class: 'availability-available' },
        'unavailable': { text: 'Indisponível', class: 'availability-unavailable' },
        'weekend': { text: 'Apenas Finais de Semana', class: 'availability-weekend' }
    };
    return labels[availability] || labels['unavailable'];
}

// Check if it's weekend
function isWeekend() {
    const day = new Date().getDay();
    return day === 0 || day === 6;
}

