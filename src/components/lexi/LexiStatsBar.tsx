import { MessageSquare, ThumbsUp, Clock, Shield } from "lucide-react";

const LexiStatsBar = () => {
  const metrics = [
    {
      number: "2,500+",
      label: "Daily Conversations",
      icon: MessageSquare,
      color: "text-emerald-600"
    },
    {
      number: "98%",
      label: "Customer Satisfaction",
      icon: ThumbsUp,
      color: "text-amber-600"
    },
    {
      number: "< 3 sec",
      label: "Response Time",
      icon: Clock,
      color: "text-blue-600"
    },
    {
      number: "24/7",
      label: "Always Online",
      icon: Shield,
      color: "text-purple-600"
    }
  ];

  return (
    <section className="py-16 bg-white border-b">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {metrics.map((metric, index) => {
            const IconComponent = metric.icon;
            return (
              <div key={index} className="text-center space-y-3">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gray-100 ${metric.color}`}>
                  <IconComponent className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-900">{metric.number}</div>
                  <div className="text-sm text-gray-600 font-medium">{metric.label}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default LexiStatsBar;