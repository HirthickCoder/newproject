// src/pages/Menu.jsx
import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { Search, Filter, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const categories = ['All', 'Pizza', 'Pasta', 'Burgers', 'Salads', 'Desserts', 'Drinks'];

const menuItems = [
  {
    id: 1,
    name: "Classic Burger",
    description: "Juicy beef patty with fresh vegetables and special sauce",
    price: 189,
    image: "/images/burger.jpg",
    category: "Burgers",
    popular: true
  },
  {
    id: 2,
    name: "Pasta Carbonara",
    description: "Creamy pasta with pancetta and parmesan",
    price: 279,
    image: "/images/carbo.jpg",
    category: "Pasta",
    popular: true
  },
  {
    id: 3,
    name: "Lava Cake",
    description: "Warm chocolate cake with a molten center",
    price: 199,
    image: "/images/lavas.jpg",
    category: "Desserts",
    popular: true
  },
  {
    id: 4,
    name: "Mojito",
    description: "Refreshing mint lime mojito",
    price: 149,
    image: "/images/mojito.jpg",
    category: "Drinks",
    popular: true
  },
  {
    id: 5,
    name: "Veggie Burger",
    description: "Plant-based patty with fresh vegetables",
    price: 169,
    image: "/images/burger.jpg",
    category: "Burgers",
    popular: false
  },
  {
    id: 6,
    name: "Iced Tea",
    description: "Refreshing iced tea with lemon",
    price: 99,
    image: "/images/mojito.jpg",
    category: "Drinks",
    popular: false
  }
];

export default function Menu() {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Simulate API call
    const fetchMenuItems = async () => {
      try {
        // In a real app, you would fetch this from your backend
        // const response = await fetch('/api/menu-items');
        // const data = await response.json();
        // setItems(data);
        
        // For now, use the static data
        console.log('Setting menu items:', menuItems);
        setItems(menuItems);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching menu items:', error);
        setIsLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  console.log('Current items:', items);
  console.log('Is loading:', isLoading);

  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  // Debug information
  console.log('Rendering Menu component');
  console.log('Items:', items);
  console.log('Filtered Items:', filteredItems);
  console.log('Is Loading:', isLoading);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Our Menu</h1>
        
        {/* Debug info - will be removed in production */}
        <div className="bg-yellow-50 p-4 rounded-lg mb-4">
          <p className="text-sm text-yellow-800">
             {filteredItems.length} items found
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
                <div className="relative">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/300x200?text=Image+Not+Found';
                      e.target.className = 'w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500';
                    }}
                    onLoad={(e) => {
                      e.target.className = 'w-full h-48 object-cover';
                    }}
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
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        addToCart({...item, quantity: 1});
                        // Optional: Show a toast notification
                        alert(`${item.name} added to cart!`);
                      }}
                      className="flex-1 flex items-center justify-center gap-2 bg-amber-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-amber-700 transition-colors"
                    >
                      <Plus size={18} />
                      Add to Cart
                    </button>
                    <button 
                      onClick={() => navigate(`/menu/${item.id}`)}
                      className="px-4 py-2 border border-amber-600 text-amber-600 rounded-lg hover:bg-amber-50 transition-colors"
                    >
                      View
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-3 text-center py-12">
              <h3 className="text-xl font-medium text-gray-700">No menu items found</h3>
              <p className="text-gray-500 mt-2">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}