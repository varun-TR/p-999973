
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_51R81UBABt917OZCQ6GtDijnobbeHYETCUEwL4MDHvgJKg5U6PVfhVsmCDrkFlZUF4N5dp0HgBzVTCcDWQZsOJZVH00488XboeF"); // Replace with your Stripe Publishable Key


interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  digitalDownload?: boolean;
  fileUrl?: string;
}

const products: Product[] = [
  {
    id: "1",
    name: "Developer T-Shirt",
    price: 29.99,
    image: "/placeholder.svg",
    description: "Comfortable cotton t-shirt with a unique design for developers."
  },
  {
    id: "2",
    name: "Code Mug",
    price: 19.99,
    image: "/placeholder.svg",
    description: "Ceramic mug with code snippets that change color when hot liquid is added."
  },
  {
    id: "3",
    name: "Portfolio Hoodie",
    price: 49.99,
    image: "/placeholder.svg",
    description: "Cozy hoodie with my portfolio brand and custom design elements."
  },
  {
    id: "4",
    name: "Developer Stickers Pack",
    price: 9.99,
    image: "/placeholder.svg",
    description: "A pack of 10 high-quality vinyl stickers with programming jokes and designs."
  },
  {
    id: "5",
    name: "Developer Handbook (PDF)",
    price: 1.00,
    image: "/placeholder.svg",
    description: "A downloadable PDF handbook for developers.",
    digitalDownload: true,
    fileUrl: "public/dev-handbook.pdf"
  }
];

const MerchStore = () => {
  const { toast } = useToast();
  const [cart, setCart] = useState<(Product & { quantity: number })[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [email, setEmail] = useState(""); // State for email input

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingProduct = prevCart.find(item => item.id === product.id);
      
      if (existingProduct) {
        return prevCart.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });

    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCart(prevCart => 
      prevCart.map(item => 
        item.id === productId 
          ? { ...item, quantity: newQuantity } 
          : item
      )
    );
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleCheckout = async () => {
    console.log("Checkout button clicked");
  
    const stripe = await stripePromise;
  
    if (!stripe) {
      console.error("Stripe is not loaded.");
      return;
    }
  
    try {
      console.log("Sending request to backend...");
      const response = await fetch("/api/create-checkout-session", { // http://localhost:4242/create-checkout-session
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cart, email }),
      });
  
      const { url } = await response.json();
      console.log("Response from backend:", url);
  
      if (url) {
        window.location.href = url; // Redirect to Stripe Checkout
      } else {
        console.error("Failed to create checkout session");
      }
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };


  return (
    <div className="min-h-screen bg-navy flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-slate-light">Merchandise Store (Coming soon)</h1>
            <Button 
              variant="outline" 
              className="border-mint text-mint hover:bg-mint/10 relative"
              onClick={() => setShowCart(!showCart)}
            >
              <ShoppingCart className="mr-2" />
              <span>Cart</span>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-mint text-navy rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {totalItems}
                </span>
              )}
            </Button>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {products.map((product) => (
              <Card key={product.id} className="bg-navy-light text-slate-light border-slate-dark overflow-hidden">
                <div className="aspect-video bg-navy-dark/50 flex items-center justify-center">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="h-40 w-auto object-contain" 
                  />
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg text-slate-light">{product.name}</h3>
                    <span className="font-mono text-mint">${product.price.toFixed(2)}</span>
                  </div>
                  <p className="text-slate text-sm mb-4">{product.description}</p>
                    <Button 
                      onClick={() => addToCart(product)}
                      className="w-full bg-mint hover:bg-mint/90 text-navy"
                    >
                      Add to Cart
                    </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>

      {/* Shopping Cart Side Panel */}
      <div 
        className={`fixed inset-y-0 right-0 w-full md:w-96 bg-navy-light z-50 shadow-xl transform transition-transform duration-300 ${
          showCart ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-slate-light">Your Cart</h2>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setShowCart(false)} 
              className="text-slate-light hover:text-mint"
            >
              <ChevronRight />
            </Button>
          </div>

          {cart.length === 0 ? (
            <div className="flex-grow flex flex-col items-center justify-center text-slate">
              <ShoppingCart size={48} className="mb-4 opacity-50" />
              <p>Your cart is empty</p>
            </div>
          ) : (
            <>
              <div className="flex-grow overflow-y-auto space-y-4 mb-6">
              <div className="mb-4">
                <label htmlFor="email" className="block text-slate-light mb-2">
                  Enter your email for order confirmation:
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-4 py-2 bg-navy-dark text-slate-light border border-slate-dark rounded focus:outline-none focus:ring-2 focus:ring-mint"
                  required
                />
              </div>
                {cart.map((item) => (
                  <div key={item.id} className="flex border-b border-slate-dark pb-4">
                    <div className="h-16 w-16 bg-navy-dark/50 flex items-center justify-center mr-4">
                      <img src={item.image} alt={item.name} className="h-12 w-auto object-contain" />
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between">
                        <h3 className="font-medium text-slate-light">{item.name}</h3>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-xs text-slate hover:text-mint"
                        >
                          Remove
                        </button>
                      </div>
                      <p className="text-mint font-mono text-sm">${item.price.toFixed(2)}</p>
                      <div className="flex items-center mt-2">
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-6 w-6 rounded-full"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <ChevronLeft className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center text-sm">{item.quantity}</span>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-6 w-6 rounded-full"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <ChevronRight className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-slate-dark pt-4 space-y-4">
                <div className="flex justify-between text-slate-light">
                  <span>Subtotal</span>
                  <span className="font-mono">${subtotal.toFixed(2)}</span>
                </div>
                <Button 
                  onClick={handleCheckout}
                  className="w-full bg-mint hover:bg-mint/90 text-navy"
                >
                  Checkout
                </Button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Overlay when cart is open */}
      {showCart && (
        <div 
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setShowCart(false)}
        />
      )}

      <Footer />
    </div>
  );
};

export default MerchStore;