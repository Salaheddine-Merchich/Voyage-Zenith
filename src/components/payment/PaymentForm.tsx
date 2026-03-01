
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PaypalIcon } from "@/components/ui/paypal-icon";

interface PaymentFormProps {
  initialEmail: string;
  isProcessing: boolean;
  onSubmit: (e: React.FormEvent) => void;
  paymentForm: {
    email: string;
    name: string;
    paypalReference: string;
    paymentMethod: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PaymentForm = ({
  isProcessing,
  onSubmit,
  paymentForm,
  handleChange,
}: PaymentFormProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Informations de paiement</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nom complet (optionnel)</Label>
            <Input
              id="name"
              name="name"
              value={paymentForm.name}
              onChange={handleChange}
              placeholder="Votre nom"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email (optionnel)</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={paymentForm.email}
              onChange={handleChange}
              placeholder="votre@email.com"
            />
          </div>
          
          <div className="mt-6">
            <Label className="text-base font-medium">Méthode de paiement</Label>
            <div className="mt-3 space-y-3">
              <div className="flex items-center gap-3 p-3 border rounded-md bg-blue-50 border-blue-200">
                <input
                  type="radio"
                  id="paypal"
                  name="paymentMethod"
                  value="paypal"
                  checked={paymentForm.paymentMethod === "paypal"}
                  className="h-4 w-4"
                  onChange={handleChange}
                />
                <label htmlFor="paypal" className="flex items-center cursor-pointer flex-grow">
                  <span className="font-medium mr-2">PayPal</span>
                  <span className="text-sm text-gray-500">
                    Paiement sécurisé via PayPal
                  </span>
                  <PaypalIcon className="ml-auto h-6 w-6" />
                </label>
              </div>
            </div>
          </div>
          
          <div className="space-y-2 mt-4">
            <Label htmlFor="paypalReference">
              ID PayPal ou référence (optionnel)
            </Label>
            <Input
              id="paypalReference"
              name="paypalReference"
              value={paymentForm.paypalReference}
              onChange={handleChange}
              placeholder="Votre identifiant PayPal ou référence"
            />
          </div>
          
          <Button
            type="submit"
            className="w-full btn-travel mt-6 flex items-center justify-center"
            disabled={isProcessing}
          >
            {isProcessing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                Traitement en cours...
              </>
            ) : (
              "Confirmer la réservation"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default PaymentForm;
