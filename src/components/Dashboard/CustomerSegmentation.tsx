import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

const segmentData = [
  { name: "High Value", value: 25, color: "hsl(var(--analytics-success))" },
  { name: "Medium Value", value: 45, color: "hsl(var(--analytics-primary))" },
  { name: "Low Value", value: 20, color: "hsl(var(--analytics-warning))" },
  { name: "At Risk", value: 10, color: "hsl(var(--destructive))" },
];

export function CustomerSegmentation() {
  return (
    <Card className="bg-gradient-card border-border shadow-card">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          Customer Segmentation
          <span className="text-xs bg-analytics-primary/20 text-analytics-primary px-2 py-1 rounded">
            ML Model
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={segmentData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
              >
                {segmentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: 'var(--radius)',
                  color: 'hsl(var(--foreground))'
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 space-y-2">
          {segmentData.map((segment) => (
            <div key={segment.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: segment.color }}
                />
                <span className="text-sm text-foreground">{segment.name}</span>
              </div>
              <span className="text-sm font-medium text-muted-foreground">
                {segment.value}%
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}