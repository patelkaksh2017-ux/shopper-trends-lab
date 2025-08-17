import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const basketRules = [
  {
    rule: "Bread → Milk",
    support: 0.15,
    confidence: 0.85,
    lift: 2.1,
    strength: "Strong"
  },
  {
    rule: "Coffee → Sugar",
    support: 0.12,
    confidence: 0.78,
    lift: 1.9,
    strength: "Strong"
  },
  {
    rule: "Chips → Soda",
    support: 0.18,
    confidence: 0.72,
    lift: 1.7,
    strength: "Medium"
  },
  {
    rule: "Eggs → Bacon",
    support: 0.08,
    confidence: 0.68,
    lift: 1.5,
    strength: "Medium"
  },
  {
    rule: "Beer → Nuts",
    support: 0.06,
    confidence: 0.65,
    lift: 1.4,
    strength: "Weak"
  }
];

export function MarketBasketAnalysis() {
  return (
    <Card className="bg-gradient-card border-border shadow-card">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          Market Basket Analysis
          <span className="text-xs bg-analytics-info/20 text-analytics-info px-2 py-1 rounded">
            Association Rules
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {basketRules.map((rule, index) => (
            <div key={index} className="p-4 rounded-lg bg-secondary/50 border border-border">
              <div className="flex items-center justify-between mb-2">
                <div className="font-medium text-foreground">{rule.rule}</div>
                <Badge 
                  variant={rule.strength === "Strong" ? "default" : rule.strength === "Medium" ? "secondary" : "outline"}
                  className={
                    rule.strength === "Strong" 
                      ? "bg-analytics-success/20 text-analytics-success border-analytics-success/30" 
                      : rule.strength === "Medium" 
                      ? "bg-analytics-warning/20 text-analytics-warning border-analytics-warning/30"
                      : "bg-analytics-info/20 text-analytics-info border-analytics-info/30"
                  }
                >
                  {rule.strength}
                </Badge>
              </div>
              
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <div className="text-muted-foreground mb-1">Support</div>
                  <div className="font-medium text-foreground">{(rule.support * 100).toFixed(1)}%</div>
                  <Progress value={rule.support * 100} className="h-1 mt-1" />
                </div>
                
                <div>
                  <div className="text-muted-foreground mb-1">Confidence</div>
                  <div className="font-medium text-foreground">{(rule.confidence * 100).toFixed(1)}%</div>
                  <Progress value={rule.confidence * 100} className="h-1 mt-1" />
                </div>
                
                <div>
                  <div className="text-muted-foreground mb-1">Lift</div>
                  <div className="font-medium text-foreground">{rule.lift.toFixed(1)}</div>
                  <Progress value={(rule.lift / 3) * 100} className="h-1 mt-1" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}