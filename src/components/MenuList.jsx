// src/components/MenuList.jsx
import { useCart } from '../context/CartContext';

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
    name: "Pepperoni Pizza",
    description: "Classic pepperoni with mozzarella",
    price: 349,
    image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=600&q=80",
    category: "Pizza",
    popular: true
  },
  {
    id: 3,
    name: "Pasta Carbonara",
    description: "Creamy pasta with bacon and parmesan",
    price: 249,
    image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=600&q=80",
    category: "Pasta",
    popular: true
  },
  {
    id: 4,
    name: "Caesar Salad",
    description: "Fresh romaine with caesar dressing",
    price: 199,
    image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=600&q=80",
    category: "Salad",
    popular: false
  }
];

export default function MenuList() {
  const { addToCart } = useCart();

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-8">Our Menu</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {menuItems.map((item) => (
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
  );
}