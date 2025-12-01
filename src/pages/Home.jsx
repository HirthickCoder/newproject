import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const menuItems = [
  {
    id: 1,
    name: "Margherita Pizza",
    description: "Fresh tomatoes, mozzarella, and basil",
    price: 299,
    image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=600&q=80",
    category: "pizza",
    popular: true
  },
  {
    id: 2,
    name: "Pasta Carbonara",
    description: "Creamy pasta with pancetta and parmesan",
    price: 249,
    image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=600&q=80",
    category: "pasta",
    popular: true
  },
  {
    id: 3,
    name: "Chocolate Lava Cake",
    description: "Warm chocolate cake with a molten center",
    price: 179,
    image: "/images/lavas.jpg",
    category: "dessert",
    popular: true
  },
  {
    id: 4,
    name: "Caesar Salad",
    description: "Fresh romaine lettuce with Caesar dressing",
    price: 199,
    image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=600&q=80",
    category: "salad"
  },
  {
    id: 5,
    name: "Grilled Salmon",
    description: "Fresh salmon with lemon butter sauce",
    price: 399,
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&q=80",
    category: "main"
  },
  {
    id: 6,
    name: "Mojito",
    description: "Refreshing mint and lime cocktail",
    price: 149,
    image: "/images/mojito.jpg",
    category: "drinks"
  }
];

export default function Home() {
  const { addToCart } = useCart();
  const [activeCategory, setActiveCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  const categories = ['all', ...new Set(menuItems.map(item => item.category))];
  const filteredItems = activeCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

  useEffect(() => {
    console.log('Home component mounted');
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Delicious Food Delivered</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Order your favorite meals from the best restaurants in town.
          </p>
          <Link 
            to="/menu" 
            className="bg-white text-amber-600 px-8 py-3 rounded-full font-bold text-lg hover:bg-gray-100 transition"
          >
            View Full Menu
          </Link>
        </div>
      </div>

      {/* Menu Section */}
      <div className="container mx-auto px-4 py-12">
        {/* Categories Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full font-medium capitalize ${
                activeCategory === category
                  ? 'bg-amber-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div 
              key={item.id} 
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative h-48">
                <img
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover"
                />
                {item.popular && (
                  <span className="absolute top-2 right-2 bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    Popular
                  </span>
                )}
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-bold">{item.name}</h3>
                  <span className="text-amber-600 font-bold">₹{item.price}</span>
                </div>
                <p className="text-gray-600 mt-2">{item.description}</p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-sm text-gray-500">{item.category}</span>
                  <button
                    onClick={() => addToCart({ ...item, quantity: 1 })}
                    className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}