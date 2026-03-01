
import React from "react";
import { useNavigate } from "react-router-dom";
import { AdminSidebar } from "@/components/layout/AdminSidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { useOffers } from "@/hooks/useOffers";
import { OffersTable } from "@/components/admin/OffersTable";
import { OffersLoading } from "@/components/admin/OffersLoading";
import { EmptyOffersList } from "@/components/admin/EmptyOffersList";
import { DeleteOfferDialog } from "@/components/admin/DeleteOfferDialog";

const OffersListPage = () => {
  const navigate = useNavigate();
  const { 
    offers, 
    loading, 
    deleteDialogOpen, 
    setDeleteDialogOpen, 
    handleDeleteClick, 
    confirmDelete 
  } = useOffers();
  
  return (
    <div className="flex h-screen overflow-hidden">
      <AdminSidebar />
      
      <div className="flex-1 overflow-y-auto">
        <div className="p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-travel-primary">Gestion des offres</h1>
            <Button onClick={() => navigate("/admin/offers/add")} className="btn-travel">
              <Plus className="mr-2 h-4 w-4" />
              Ajouter une offre
            </Button>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Liste des offres</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <OffersLoading />
              ) : offers.length > 0 ? (
                <OffersTable offers={offers} onDeleteClick={handleDeleteClick} />
              ) : (
                <EmptyOffersList />
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      
      <DeleteOfferDialog 
        open={deleteDialogOpen} 
        onOpenChange={setDeleteDialogOpen} 
        onConfirm={confirmDelete} 
      />
    </div>
  );
};

export default OffersListPage;
