
import { useState } from "react";
import { AdminSidebar } from "@/components/layout/AdminSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { travelOffers } from "@/data/mockData";

// A simple bar chart component
const BarChart = ({ data }: { data: { label: string; value: number }[] }) => {
  const maxValue = Math.max(...data.map((item) => item.value));

  return (
    <div className="space-y-2">
      {data.map((item, index) => (
        <div key={index} className="space-y-1">
          <div className="flex justify-between text-sm">
            <span>{item.label}</span>
            <span>{item.value}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-travel-primary h-2.5 rounded-full"
              style={{ width: `${(item.value / maxValue) * 100}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
};

const AdminDashboard = () => {
  const [period, setPeriod] = useState<"day" | "week" | "month" | "year">("month");
  
  // Mock data for charts
  const salesData = {
    day: [
      { label: "Vols", value: 3 },
      { label: "Hôtels", value: 2 },
      { label: "Séjours", value: 5 },
      { label: "Circuits", value: 1 },
    ],
    week: [
      { label: "Vols", value: 12 },
      { label: "Hôtels", value: 8 },
      { label: "Séjours", value: 15 },
      { label: "Circuits", value: 6 },
    ],
    month: [
      { label: "Vols", value: 45 },
      { label: "Hôtels", value: 32 },
      { label: "Séjours", value: 58 },
      { label: "Circuits", value: 24 },
    ],
    year: [
      { label: "Vols", value: 540 },
      { label: "Hôtels", value: 380 },
      { label: "Séjours", value: 620 },
      { label: "Circuits", value: 290 },
    ],
  };
  
  const destinationData = {
    day: [
      { label: "Paris", value: 2 },
      { label: "New York", value: 1 },
      { label: "Tokyo", value: 3 },
      { label: "Barcelone", value: 2 },
      { label: "Venise", value: 1 },
    ],
    week: [
      { label: "Paris", value: 8 },
      { label: "New York", value: 5 },
      { label: "Tokyo", value: 9 },
      { label: "Barcelone", value: 7 },
      { label: "Venise", value: 4 },
    ],
    month: [
      { label: "Paris", value: 32 },
      { label: "New York", value: 24 },
      { label: "Tokyo", value: 38 },
      { label: "Barcelone", value: 29 },
      { label: "Venise", value: 19 },
    ],
    year: [
      { label: "Paris", value: 380 },
      { label: "New York", value: 290 },
      { label: "Tokyo", value: 420 },
      { label: "Barcelone", value: 350 },
      { label: "Venise", value: 210 },
    ],
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <AdminSidebar />
      
      <div className="flex-1 overflow-y-auto">
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-travel-primary">Tableau de bord admin</h1>
            <div className="flex items-center space-x-2">
              <select 
                value={period} 
                onChange={(e) => setPeriod(e.target.value as any)}
                className="border border-gray-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-travel-primary"
              >
                <option value="day">Aujourd'hui</option>
                <option value="week">Cette semaine</option>
                <option value="month">Ce mois</option>
                <option value="year">Cette année</option>
              </select>
            </div>
          </div>
          
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold">{period === "day" ? 11 : period === "week" ? 41 : period === "month" ? 159 : 1830}</div>
                <p className="text-muted-foreground">Réservations totales</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold">
                  {new Intl.NumberFormat("fr-FR", {
                    style: "currency",
                    currency: "EUR",
                  }).format(
                    period === "day" ? 5400 : 
                    period === "week" ? 19500 : 
                    period === "month" ? 74800 : 
                    856000
                  )}
                </div>
                <p className="text-muted-foreground">Revenus</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold">{period === "day" ? 3 : period === "week" ? 8 : period === "month" ? 26 : 320}</div>
                <p className="text-muted-foreground">Nouveaux clients</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold">{travelOffers.length}</div>
                <p className="text-muted-foreground">Offres actives</p>
              </CardContent>
            </Card>
          </div>
          
          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Ventes par type</CardTitle>
              </CardHeader>
              <CardContent>
                <BarChart data={salesData[period]} />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Destinations populaires</CardTitle>
              </CardHeader>
              <CardContent>
                <BarChart data={destinationData[period]} />
              </CardContent>
            </Card>
          </div>
          
          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Activité récente</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="bookings">
                <TabsList className="mb-4">
                  <TabsTrigger value="bookings">Réservations</TabsTrigger>
                  <TabsTrigger value="users">Utilisateurs</TabsTrigger>
                </TabsList>
                
                <TabsContent value="bookings">
                  <div className="space-y-4">
                    {[
                      {
                        id: "B-1234",
                        user: "Martin Dupont",
                        destination: "Paris",
                        amount: "€599",
                        status: "Confirmée",
                        date: "28 Avr 2025, 14:30",
                      },
                      {
                        id: "B-1233",
                        user: "Sophie Martin",
                        destination: "Tokyo",
                        amount: "€3,200",
                        status: "En attente",
                        date: "28 Avr 2025, 12:15",
                      },
                      {
                        id: "B-1232",
                        user: "Lucas Dubois",
                        destination: "New York",
                        amount: "€385",
                        status: "Confirmée",
                        date: "27 Avr 2025, 18:45",
                      },
                      {
                        id: "B-1231",
                        user: "Emilie Laurent",
                        destination: "Venise",
                        amount: "€720",
                        status: "Confirmée",
                        date: "27 Avr 2025, 10:20",
                      },
                      {
                        id: "B-1230",
                        user: "Thomas Petit",
                        destination: "Barcelone",
                        amount: "€850",
                        status: "Annulée",
                        date: "26 Avr 2025, 09:05",
                      },
                    ].map((booking) => (
                      <div
                        key={booking.id}
                        className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-md"
                      >
                        <div className="flex items-center">
                          <div className="mr-4">
                            <p className="font-medium">{booking.id}</p>
                            <p className="text-sm text-gray-500">{booking.date}</p>
                          </div>
                        </div>
                        
                        <div>
                          <p className="font-medium">{booking.user}</p>
                          <p className="text-sm text-gray-500">{booking.destination}</p>
                        </div>
                        
                        <div className="text-right">
                          <p className="font-medium">{booking.amount}</p>
                          <p className={`text-sm ${
                            booking.status === "Confirmée" ? "text-green-600" :
                            booking.status === "En attente" ? "text-orange-500" :
                            "text-red-600"
                          }`}>{booking.status}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="users">
                  <div className="space-y-4">
                    {[
                      {
                        name: "Nicolas Bernard",
                        email: "nicolas.bernard@example.com",
                        joined: "28 Avr 2025",
                        status: "Actif",
                      },
                      {
                        name: "Julie Moreau",
                        email: "julie.moreau@example.com",
                        joined: "28 Avr 2025",
                        status: "Actif",
                      },
                      {
                        name: "Alexandre Martin",
                        email: "alexandre.martin@example.com",
                        joined: "27 Avr 2025",
                        status: "Actif",
                      },
                      {
                        name: "Laura Petit",
                        email: "laura.petit@example.com",
                        joined: "26 Avr 2025",
                        status: "Actif",
                      },
                      {
                        name: "Antoine Dubois",
                        email: "antoine.dubois@example.com",
                        joined: "25 Avr 2025",
                        status: "Inactif",
                      },
                    ].map((user, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-md"
                      >
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                        
                        <div className="text-right">
                          <p className="font-medium">Inscrit le {user.joined}</p>
                          <p className={`text-sm ${user.status === "Actif" ? "text-green-600" : "text-red-600"}`}>
                            {user.status}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
