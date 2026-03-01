
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/utils";
import { Tag } from "lucide-react"; // Replace Discount with Tag which exists in lucide-react

interface OrderSummaryProps {
  offerTitle: string;
  quantity: number;
  totalPrice: number;
  oldPrice?: number;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ 
  offerTitle, 
  quantity, 
  totalPrice,
  oldPrice
}) => {
  // Calculate discount percentage if oldPrice exists
  const discountPercentage = oldPrice ? Math.round((1 - (totalPrice/quantity) / (oldPrice/quantity)) * 100) : 0;
  
  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-xl font-medium mb-4">Récapitulatif de la commande</h2>
        
        <div className="mb-4 bg-gray-50 rounded-md p-3">
          <h3 className="font-medium">{offerTitle}</h3>
          <p className="text-sm text-gray-600">Quantité: {quantity}</p>
        </div>
        
        <div className="space-y-3 mb-4">
          <div className="flex justify-between">
            <span className="text-gray-600">Prix unitaire</span>
            <div className="text-right">
              <span>{formatPrice(totalPrice / quantity)}</span>
              {oldPrice && (
                <>
                  <div className="flex items-center justify-end text-xs space-x-1 text-green-600">
                    <Tag className="h-3 w-3" /> {/* Replace Discount with Tag */}
                    <span>{discountPercentage}% de réduction</span>
                  </div>
                  <div className="text-xs text-gray-500 line-through">
                    {formatPrice(oldPrice / quantity)}
                  </div>
                </>
              )}
            </div>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">Quantité</span>
            <span>× {quantity}</span>
          </div>
        </div>
        
        <Separator className="my-4" />
        
        <div className="flex justify-between text-lg font-medium mb-1">
          <span>Total</span>
          <span>{formatPrice(totalPrice)}</span>
        </div>
        
        {oldPrice && (
          <div className="flex justify-between text-sm text-gray-500">
            <span>Prix normal</span>
            <span className="line-through">{formatPrice(oldPrice * quantity / quantity)}</span>
          </div>
        )}
        
        <div className="mt-4 px-3 py-2 bg-gray-50 border border-gray-100 rounded-md">
          <p className="text-xs text-gray-600">
            Le paiement sera traité de manière sécurisée. Une confirmation vous sera envoyée par email.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderSummary;
