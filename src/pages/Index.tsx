import { DashboardLayout } from "@/components/Dashboard/DashboardLayout";
import { Header } from "@/components/Dashboard/Header";
import { SalesChart } from "@/components/Dashboard/SalesChart";
import { CustomerSegmentation } from "@/components/Dashboard/CustomerSegmentation";
import { MarketBasketAnalysis } from "@/components/Dashboard/MarketBasketAnalysis";
import { PurchasePatterns } from "@/components/Dashboard/PurchasePatterns";

const Index = () => {
  return (
    <DashboardLayout>
      <Header />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <SalesChart />
        </div>
        <div>
          <CustomerSegmentation />
        </div>
      </div>
      
      <div className="mb-8">
        <PurchasePatterns />
      </div>
      
      <div>
        <MarketBasketAnalysis />
      </div>
    </DashboardLayout>
  );
};

export default Index;
