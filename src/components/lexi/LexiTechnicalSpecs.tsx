
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, Mic, Zap, Shield, Code, Smartphone } from "lucide-react";

const LexiTechnicalSpecs = () => {
  const [openSections, setOpenSections] = useState<string[]>(["voice"]);

  const toggleSection = (sectionId: string) => {
    setOpenSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const sections = [
    {
      id: "voice",
      title: "Voice Technology",
      icon: Mic,
      content: {
        "Voice Quality": "Studio-grade Nigerian voice synthesis",
        "Languages": "English (Nigerian), Nigerian Pidgin, Yoruba, Igbo, Hausa",
        "Response Time": "< 500ms voice generation",
        "Audio Formats": "MP3, WAV, OGG",
        "Sample Rate": "22kHz, 44.1kHz options",
        "Voice Models": "Gender-specific, age-appropriate voices",
        "Emotion Detection": "Happy, sad, neutral, excited tones",
        "Accent Accuracy": "Lagos, Abuja, Port Harcourt variations"
      }
    },
    {
      id: "integration",
      title: "Integration & APIs",
      icon: Code,
      content: {
        "WhatsApp API": "Official WhatsApp Business API certified",
        "Webhook Support": "Real-time conversation hooks",
        "REST API": "Full programmatic access with rate limiting",
        "SDKs Available": "Python, Node.js, PHP, Java",
        "Zapier Integration": "300+ app connections available",
        "Webhook Security": "HMAC signature verification",
        "API Rate Limits": "1000 requests/minute on Business plan",
        "Documentation": "Interactive API docs with live testing"
      }
    },
    {
      id: "infrastructure",
      title: "Infrastructure & Performance",
      icon: Zap,
      content: {
        "Uptime SLA": "99.9% guaranteed uptime",
        "Data Centers": "Lagos and Abuja edge servers",
        "Scalability": "Auto-scaling to handle 10,000+ concurrent users",
        "Load Balancing": "Intelligent traffic distribution",
        "CDN": "African-optimized content delivery",
        "Backup Systems": "Real-time data replication across 3 zones",
        "Monitoring": "24/7 system health monitoring",
        "Disaster Recovery": "< 15 minute recovery time"
      }
    },
    {
      id: "security",
      title: "Security & Compliance",
      icon: Shield,
      content: {
        "Data Protection": "NDPR (Nigerian Data Protection Regulation) compliant",
        "Encryption": "End-to-end AES-256 encryption",
        "Authentication": "OAuth 2.0, API keys, JWT tokens",
        "Certifications": "ISO 27001, SOC 2 Type II",
        "Data Residency": "Customer data stored in Nigeria",
        "Access Control": "Role-based permissions system",
        "Audit Logs": "Complete activity tracking",
        "Privacy": "GDPR-ready privacy controls"
      }
    },
    {
      id: "mobile",
      title: "Mobile & Device Support",
      icon: Smartphone,
      content: {
        "Supported Devices": "iOS, Android, Web browsers",
        "WhatsApp Versions": "WhatsApp Business, regular WhatsApp",
        "Offline Support": "Basic functionality when offline",
        "Push Notifications": "Real-time message alerts",
        "Voice Recording": "High-quality audio capture",
        "File Sharing": "Images, documents, voice notes",
        "Group Messaging": "Support for WhatsApp groups",
        "Status Updates": "WhatsApp Status integration"
      }
    }
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Technical Capabilities</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Enterprise-grade infrastructure built for Nigerian businesses
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {sections.map((section) => {
            const IconComponent = section.icon;
            const isOpen = openSections.includes(section.id);
            
            return (
              <Collapsible key={section.id} open={isOpen} onOpenChange={() => toggleSection(section.id)}>
                <Card className="overflow-hidden">
                  <CollapsibleTrigger className="w-full p-6 text-left hover:bg-muted/50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-teal-light rounded-lg flex items-center justify-center">
                          <IconComponent className="h-5 w-5 text-teal-dark" />
                        </div>
                        <h3 className="text-xl font-semibold">{section.title}</h3>
                      </div>
                      <ChevronDown 
                        className={`h-5 w-5 text-muted-foreground transition-transform ${
                          isOpen ? 'rotate-180' : ''
                        }`} 
                      />
                    </div>
                  </CollapsibleTrigger>
                  
                  <CollapsibleContent>
                    <div className="px-6 pb-6 border-t bg-muted/20">
                      <div className="grid md:grid-cols-2 gap-6 pt-6">
                        {Object.entries(section.content).map(([key, value]) => (
                          <div key={key} className="space-y-2">
                            <h4 className="font-medium text-sm text-gray-700">{key}</h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">{value}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CollapsibleContent>
                </Card>
              </Collapsible>
            );
          })}
        </div>

        {/* Performance Highlights */}
        <div className="mt-16 grid md:grid-cols-3 gap-8 text-center">
          <Card className="p-6">
            <div className="text-3xl font-bold text-teal mb-2">&lt; 500ms</div>
            <div className="text-sm text-muted-foreground">Voice Response Time</div>
          </Card>
          <Card className="p-6">
            <div className="text-3xl font-bold text-teal mb-2">99.9%</div>
            <div className="text-sm text-muted-foreground">Guaranteed Uptime</div>
          </Card>
          <Card className="p-6">
            <div className="text-3xl font-bold text-teal mb-2">5+</div>
            <div className="text-sm text-muted-foreground">Nigerian Languages</div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default LexiTechnicalSpecs;
