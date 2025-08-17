import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";

const salesData = [
  { month: "Jan", sales: 65000, predicted: 68000 },
  { month: "Feb", sales: 72000, predicted: 75000 },
  { month: "Mar", sales: 68000, predicted: 71000 },
  { month: "Apr", sales: 85000, predicted: 87000 },
  { month: "May", sales: 91000, predicted: 94000 },
  { month: "Jun", sales: 88000, predicted: 92000 },
  { month: "Jul", sales: 0, predicted: 96000 },
  { month: "Aug", sales: 0, predicted: 99000 },
  { month: "Sep", sales: 0, predicted: 102000 },
];

export function SalesChart() {
  return (
    <Card className="bg-gradient-card border-border shadow-card">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          Sales Trend & Prediction
          <span className="text-xs bg-analytics-secondary/20 text-analytics-secondary px-2 py-1 rounded">
            Forecast
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={salesData}>
              <defs>
                <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--analytics-primary))" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(var(--analytics-primary))" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="predictedGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--analytics-secondary))" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(var(--analytics-secondary))" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="month" 
                stroke="hsl(var(--muted-foreground))"
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: 'var(--radius)',
                  color: 'hsl(var(--foreground))'
                }}
                formatter={(value: number, name: string) => [
                  `$${(value / 1000).toFixed(0)}K`,
                  name === 'sales' ? 'Actual Sales' : 'Predicted Sales'
                ]}
              />
              <Area
                type="monotone"
                dataKey="sales"
                stroke="hsl(var(--analytics-primary))"
                fillOpacity={1}
                fill="url(#salesGradient)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="predicted"
                stroke="hsl(var(--analytics-secondary))"
                fillOpacity={1}
                fill="url(#predictedGradient)"
                strokeWidth={2}
                strokeDasharray="5 5"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}