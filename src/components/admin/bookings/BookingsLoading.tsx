
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const BookingsLoading = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Réservations</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-travel-primary"></div>
        </div>
      </CardContent>
    </Card>
  );
};
