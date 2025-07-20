import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MessageSquare, Phone, Mail, Calendar } from "lucide-react";

const LexiCTASection = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-emerald-600 to-emerald-700 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Deploy Agent Lexi in 24 Hours</h2>
          <p className="text-xl text-emerald-100 max-w-2xl mx-auto">
            Join 500+ Nigerian businesses already using ODIA AI
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <Card className="p-8">
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Get Started with Agent Lexi</h3>
                <p className="text-muted-foreground">Free setup consultation + ₦50,000 setup credit</p>
              </div>

              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="business_name">Business Name</Label>
                    <Input id="business_name" placeholder="Your Business" />
                  </div>
                  <div>
                    <Label htmlFor="email">Business Email</Label>
                    <Input id="email" type="email" placeholder="you@business.com" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">WhatsApp Number</Label>
                    <Input id="phone" placeholder="+234 xxx xxx xxxx" />
                  </div>
                  <div>
                    <Label htmlFor="business_size">Business Size</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-10">1-10 employees</SelectItem>
                        <SelectItem value="11-50">11-50 employees</SelectItem>
                        <SelectItem value="51-200">51-200 employees</SelectItem>
                        <SelectItem value="200+">200+ employees</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="industry">Industry</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ecommerce">E-commerce</SelectItem>
                      <SelectItem value="banking">Banking</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="government">Government</SelectItem>
                      <SelectItem value="telecom">Telecom</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="use_case">Primary Use Case</Label>
                  <Textarea id="use_case" placeholder="Tell us how you plan to use Agent Lexi..." />
                </div>

                <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-6 text-lg font-semibold">
                  Deploy Agent Lexi Now
                </Button>

                <p className="text-center text-sm text-muted-foreground">
                  🔒 Your information is secure and NDPR compliant
                </p>
              </form>
            </div>
          </Card>

          {/* Contact Options */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold">Other Ways to Reach Us</h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                    <MessageSquare className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="font-semibold">WhatsApp</div>
                    <div className="text-emerald-100">+234 810 578 6326</div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="font-semibold">Email</div>
                    <div className="text-emerald-100">hello@odia.dev</div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                    <Calendar className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="font-semibold">Schedule Demo</div>
                    <div className="text-emerald-100">Book 15-min demo call</div>
                  </div>
                </div>
              </div>
            </div>

            <Card className="p-6 bg-white/10 border-white/20">
              <h4 className="font-semibold mb-4">What happens next?</h4>
              <div className="space-y-3 text-sm">
                <div className="flex gap-3">
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-xs font-bold">1</div>
                  <div>We'll call you within 2 hours to understand your needs</div>
                </div>
                <div className="flex gap-3">
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-xs font-bold">2</div>
                  <div>Custom demo tailored to your business scenarios</div>
                </div>
                <div className="flex gap-3">
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-xs font-bold">3</div>
                  <div>Agent Lexi deployed and trained within 24 hours</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LexiCTASection;