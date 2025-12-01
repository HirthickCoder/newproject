import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Search, Filter, Plus } from 'lucide-react';

const categories = ['All', 'Pizza', 'Pasta', 'Burgers', 'Salads', 'Desserts', 'Drinks'];

const menuItems = [
  {
    id: 1,
    name: "Margherita Pizza",
    description: "Fresh tomatoes, mozzarella, and basil",
    price: 299,
    image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=600&q=80",
    category: "Pizza",
    popular: true
  },
  {
    id: 2,
    name: "Pasta Carbonara",
    description: "Creamy pasta with pancetta and parmesan",
    price: 249,
    image: "/images/carbo.jpg",
    category: "Pasta",
    popular: true
  },
  {
    id: 3,
    name: "Classic Burger",
    description: "Beef patty with cheese, lettuce, and special sauce",
    price: 199,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80",
    category: "Burgers",
    popular: true
  },
  {
    id: 4,
    name: "Caesar Salad",
    description: "Fresh romaine, croutons, and parmesan with Caesar dressing",
    price: 229,
    image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=600&q=80",
    category: "Salads"
  },
  {
    id: 5,
    name: "Chocolate Lava Cake",
    description: "Warm chocolate cake with a molten center",
    price: 179,
    image: "/images/lavas.jpg",
    category: "Desserts"
  },
  {
    id: 6,
    name: "Mojito",
    description: "Classic mint and lime cocktail",
    price: 159,
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=600&q=80",
    category: "Drinks"
  }
];

export default function Menu() {
  const { addToCart } = useCart();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Menu</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Discover our delicious selection of dishes made with the finest ingredients
        </p>
      </div>

      {/* Search and Filter */}
      <div className="mb-8 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search menu items..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <select
            className="appearance-none pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Menu Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredItems.map((item) => (
          <div key={item.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
            <div className="relative">
              <img 
                src={item.image} 
                alt={item.name}
                className="w-full h-48 object-cover"
              />
              {item.popular && (
                <span className="absolute top-3 right-3 bg-amber-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  Popular
                </span>
              )}
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-semibold">{item.name}</h3>
                <span className="text-amber-600 font-bold">₹{item.price}</span>
              </div>
              <p className="text-gray-600 mb-4">{item.description}</p>
              <button
                onClick={() => addToCart({...item, quantity: 1})}
                className="w-full flex items-center justify-center gap-2 bg-amber-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-amber-700 transition-colors"
              >
                <Plus size={18} />
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium text-gray-700">No items found</h3>
          <p className="text-gray-500 mt-2">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
}