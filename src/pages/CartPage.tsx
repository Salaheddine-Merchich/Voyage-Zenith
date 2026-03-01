import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ShoppingCart, Trash2, Plus, Minus, AlertTriangle, ArrowLeft, ShoppingBag } from "lucide-react";

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart();
  const navigate = useNavigate();
  
  // Group cart items by type
  const itemsByType = cartItems.reduce((acc, item) => {
    const type = item.type;
    if (!acc[type]) {
      acc[type] = [];
    }
    acc[type].push(item);
    return acc;
  }, {} as Record<string, typeof cartItems>);
  
  const typeLabels: Record<string, string> = {
    flight: "Vols",
    hotel: "Hôtels",
    package: "Séjours",
    circuit: "Circuits",
  };
  
  // Format currency
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
    }).format(price);
  };

  // Handle payment process
  const handlePayment = () => {
    if (cartItems.length === 0) {
      return;
    }

    // Directly use the first item for simplicity when processing payment
    // In a real scenario, you might want to handle multiple items differently
    const firstItem = cartItems[0];
    
    navigate('/payment', { 
      state: { 
        offerId: firstItem.id,
        offerTitle: firstItem.title,
        quantity: firstItem.quantity,
        totalPrice: getCartTotal(),
        oldPrice: firstItem.oldPrice // Pass oldPrice to payment page
      }
    });
  };
  
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="travel-container py-12 flex-grow">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold text-travel-primary flex items-center">
              <ShoppingCart className="mr-3 h-6 w-6" /> Votre Panier
            </h1>
            <Button variant="outline" onClick={() => navigate('/home')}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Continuer vos achats
            </Button>
          </div>
          
          <div className="text-center py-16 bg-gray-50 rounded-lg">
            <ShoppingBag className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h2 className="text-xl font-medium mb-2">Votre panier est vide</h2>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              Il semble que vous n'ayez pas encore ajouté d'offres à votre panier.
              Explorez nos destinations pour trouver votre prochain voyage.
            </p>
            <Button className="btn-travel" onClick={() => navigate('/search')}>
              Découvrir nos offres
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="travel-container py-12 flex-grow">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-travel-primary flex items-center">
            <ShoppingCart className="mr-3 h-6 w-6" /> Votre Panier
          </h1>
          <Button variant="outline" onClick={() => navigate('/search')}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Continuer vos achats
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Cart Items */}
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-medium">{cartItems.length} article(s)</h2>
                  <Button variant="ghost" size="sm" onClick={clearCart}>
                    <Trash2 className="h-4 w-4 mr-2" /> Vider le panier
                  </Button>
                </div>
                
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Offre</TableHead>
                        <TableHead>Prix unitaire</TableHead>
                        <TableHead>Quantité</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {cartItems.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="min-w-[250px]">
                            <div className="flex items-center space-x-3">
                              <div className="h-16 w-16 rounded overflow-hidden flex-shrink-0">
                                <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
                              </div>
                              <div>
                                <p className="font-medium line-clamp-1">{item.title}</p>
                                <p className="text-sm text-gray-500">{item.destination}</p>
                                <p className="text-xs px-1.5 py-0.5 bg-gray-100 rounded inline-block mt-1">
                                  {typeLabels[item.type] || item.type}
                                </p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <div>{formatPrice(item.price)}</div>
                              {item.oldPrice && (
                                <div className="text-xs text-gray-500 line-through">
                                  {formatPrice(item.oldPrice)}
                                </div>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-1">
                              <Button 
                                variant="outline" 
                                size="icon"
                                className="h-7 w-7"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              >
                                <Minus className="h-3.5 w-3.5" />
                              </Button>
                              <Input 
                                className="w-12 h-7 text-center px-1"
                                value={item.quantity}
                                onChange={(e) => {
                                  const val = parseInt(e.target.value);
                                  if (!isNaN(val)) updateQuantity(item.id, val);
                                }}
                              />
                              <Button 
                                variant="outline" 
                                size="icon"
                                className="h-7 w-7"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                <Plus className="h-3.5 w-3.5" />
                              </Button>
                            </div>
                          </TableCell>
                          <TableCell className="font-medium">{formatPrice(item.price * item.quantity)}</TableCell>
                          <TableCell>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              className="text-gray-500 hover:text-red-600"
                              onClick={() => removeFromCart(item.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-medium mb-4">Récapitulatif</h2>
                
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sous-total</span>
                    <span>{formatPrice(getCartTotal())}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Frais de service</span>
                    <span>0,00 €</span>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="flex justify-between text-lg font-medium mb-6">
                  <span>Total</span>
                  <span>{formatPrice(getCartTotal())}</span>
                </div>
                
                <Button 
                  className="w-full btn-travel"
                  size="lg"
                  onClick={handlePayment}
                >
                  Procéder au paiement
                </Button>
                
                <div className="mt-4 px-3 py-2 bg-yellow-50 border border-yellow-100 rounded-md flex items-start">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-yellow-800">
                    Les offres de voyage dans votre panier ne sont pas réservées tant que le paiement n'est pas effectué.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CartPage;
