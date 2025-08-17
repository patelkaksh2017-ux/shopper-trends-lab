import { BarChart3, TrendingUp, Users, ShoppingCart } from "lucide-react";

export function Header() {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-3 rounded-lg bg-gradient-primary shadow-glow">
          <BarChart3 className="h-8 w-8 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            SuperMart Analytics
          </h1>
          <p className="text-muted-foreground">
            Customer Behavior Analysis & Predictive Modeling
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-card rounded-lg p-4 shadow-card border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm">Total Revenue</p>
              <p className="text-2xl font-bold text-analytics-success">$2.4M</p>
              <p className="text-xs text-analytics-success flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                +12.5% vs last month
              </p>
            </div>
            <div className="p-2 rounded-lg bg-analytics-success/20">
              <TrendingUp className="h-5 w-5 text-analytics-success" />
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-card rounded-lg p-4 shadow-card border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm">Active Customers</p>
              <p className="text-2xl font-bold text-analytics-primary">15,847</p>
              <p className="text-xs text-analytics-primary flex items-center gap-1">
                <Users className="h-3 w-3" />
                +8.2% vs last month
              </p>
            </div>
            <div className="p-2 rounded-lg bg-analytics-primary/20">
              <Users className="h-5 w-5 text-analytics-primary" />
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-card rounded-lg p-4 shadow-card border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm">Avg. Basket Size</p>
              <p className="text-2xl font-bold text-analytics-info">$47.80</p>
              <p className="text-xs text-analytics-warning flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                -2.1% vs last month
              </p>
            </div>
            <div className="p-2 rounded-lg bg-analytics-info/20">
              <ShoppingCart className="h-5 w-5 text-analytics-info" />
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-card rounded-lg p-4 shadow-card border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm">Conversion Rate</p>
              <p className="text-2xl font-bold text-analytics-secondary">3.4%</p>
              <p className="text-xs text-analytics-success flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                +0.8% vs last month
              </p>
            </div>
            <div className="p-2 rounded-lg bg-analytics-secondary/20">
              <BarChart3 className="h-5 w-5 text-analytics-secondary" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}