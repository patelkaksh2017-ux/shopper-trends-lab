import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const hourlyData = [
  { hour: "6AM", purchases: 45 },
  { hour: "8AM", purchases: 120 },
  { hour: "10AM", purchases: 180 },
  { hour: "12PM", purchases: 280 },
  { hour: "2PM", purchases: 220 },
  { hour: "4PM", purchases: 190 },
  { hour: "6PM", purchases: 320 },
  { hour: "8PM", purchases: 250 },
  { hour: "10PM", purchases: 80 },
];

const categoryData = [
  { category: "Groceries", purchases: 1250, growth: 12 },
  { category: "Electronics", purchases: 890, growth: -5 },
  { category: "Clothing", purchases: 670, growth: 8 },
  { category: "Home & Garden", purchases: 540, growth: 15 },
  { category: "Health & Beauty", purchases: 380, growth: 3 },
];

export function PurchasePatterns() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="bg-gradient-card border-border shadow-card">
        <CardHeader>
          <CardTitle className="text-foreground">Purchase Patterns by Hour</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={hourlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="hour" 
                  stroke="hsl(var(--muted-foreground))"
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: 'var(--radius)',
                    color: 'hsl(var(--foreground))'
                  }}
                />
                <Bar 
                  dataKey="purchases" 
                  fill="hsl(var(--analytics-chart-1))"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-card border-border shadow-card">
        <CardHeader>
          <CardTitle className="text-foreground">Top Categories Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {categoryData.map((category, index) => (
              <div key={category.category} className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                <div className="flex items-center gap-3">
                <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ 
                      backgroundColor: [
                        'hsl(var(--analytics-chart-1))',
                        'hsl(var(--analytics-chart-2))',
                        'hsl(var(--analytics-chart-3))',
                        'hsl(var(--analytics-chart-4))',
                        'hsl(var(--analytics-chart-5))'
                      ][index % 5]
                    }}
                  />
                  <div>
                    <div className="font-medium text-foreground">{category.category}</div>
                    <div className="text-sm text-muted-foreground">{category.purchases} purchases</div>
                  </div>
                </div>
                <div className={`text-sm font-medium ${
                  category.growth > 0 
                    ? 'text-analytics-success' 
                    : category.growth < 0 
                    ? 'text-destructive' 
                    : 'text-muted-foreground'
                }`}>
                  {category.growth > 0 ? '+' : ''}{category.growth}%
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}