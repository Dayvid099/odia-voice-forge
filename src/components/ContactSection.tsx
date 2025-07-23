import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, MessageSquare, Mail, MapPin, Send, Gift } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from '@/integrations/supabase/client';

const ContactSection = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    business_name: '',
    phone: '',
    email: '',
    business_size: '',
    use_case: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.full_name || !formData.business_name || !formData.phone || !formData.email) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('submit-contact', {
        body: {
          name: formData.full_name,
          email: formData.email,
          phone: formData.phone,
          message: `Business: ${formData.business_name}\nSize: ${formData.business_size}\nUse Case: ${formData.use_case}\nMessage: ${formData.message}`
        },
      });

      if (error) throw error;

      toast({
        title: "Demo Booked Successfully! 🎉",
        description: "We'll contact you within 2 hours to schedule your free demo + ₦50,000 setup credit.",
      });

      // Reset form
      setFormData({
        full_name: '',
        business_name: '',
        phone: '',
        email: '',
        business_size: '',
        use_case: '',
        message: ''
      });
    } catch (error: any) {
      console.error('Contact form error:', error);
      toast({
        title: "Error",
        description: "Failed to submit form. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="demo" className="section-padding bg-muted/30">
      <div className="container-odia">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6 font-space-grotesk">
            Ready to Transform 
            <span className="nigerian-gradient bg-clip-text text-transparent"> Your Business?</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join 500+ Nigerian businesses already using ODIA AI. Book your free demo and get started in 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold text-foreground mb-6">
                Get in Touch
              </h3>
              <p className="text-muted-foreground text-lg mb-8">
                Speak with our Nigerian AI specialists. We understand your business challenges and can deploy your perfect solution in 24 hours.
              </p>
            </div>

            {/* Contact Methods */}
            <div className="space-y-6">
              <Card className="border-primary/20 hover:border-primary/40 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">Call or WhatsApp</div>
                      <a href="tel:+2348105786326" className="text-primary hover:text-primary/80 font-medium">
                        +234 810 578 6326
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-primary/20 hover:border-primary/40 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                      <MessageSquare className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">Chat on WhatsApp</div>
                      <a href="https://wa.me/2348105786326" className="text-primary hover:text-primary/80 font-medium">
                        Start Conversation
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-primary/20 hover:border-primary/40 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">Email Us</div>
                      <a href="mailto:hello@odia.dev" className="text-primary hover:text-primary/80 font-medium">
                        hello@odia.dev
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-primary/20 hover:border-primary/40 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">Visit Our Office</div>
                      <div className="text-muted-foreground">
                        170 Golden Spring Estate<br />
                        Galadimwa, Abuja, Nigeria
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Contact Form */}
          <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <Gift className="w-8 h-8 text-gold" />
                <div>
                  <h3 className="text-2xl font-semibold text-foreground">
                    Book Free Demo
                  </h3>
                  <p className="text-primary font-medium">
                    + Get ₦50,000 Setup Credit
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Input
                      name="full_name"
                      placeholder="Your Full Name *"
                      value={formData.full_name}
                      onChange={handleInputChange}
                      required
                      className="border-primary/20 focus:border-primary"
                    />
                  </div>
                  <div>
                    <Input
                      name="business_name"
                      placeholder="Business Name *"
                      value={formData.business_name}
                      onChange={handleInputChange}
                      required
                      className="border-primary/20 focus:border-primary"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Input
                      name="phone"
                      type="tel"
                      placeholder="+234 (Phone Number) *"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="border-primary/20 focus:border-primary"
                    />
                  </div>
                  <div>
                    <Input
                      name="email"
                      type="email"
                      placeholder="your@email.com *"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="border-primary/20 focus:border-primary"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <select
                      name="business_size"
                      value={formData.business_size}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-primary/20 rounded-md focus:border-primary focus:ring-1 focus:ring-primary bg-background"
                    >
                      <option value="">Business Size *</option>
                      <option value="1-10 employees">1-10 employees</option>
                      <option value="11-50 employees">11-50 employees</option>
                      <option value="51-200 employees">51-200 employees</option>
                      <option value="200+ employees">200+ employees</option>
                    </select>
                  </div>
                  <div>
                    <select
                      name="use_case"
                      value={formData.use_case}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-primary/20 rounded-md focus:border-primary focus:ring-1 focus:ring-primary bg-background"
                    >
                      <option value="">Primary Use Case *</option>
                      <option value="Customer Support">Customer Support</option>
                      <option value="Sales Automation">Sales Automation</option>
                      <option value="Education">Education</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="E-commerce">E-commerce</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <Textarea
                    name="message"
                    placeholder="Tell us about your specific needs... (Optional)"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="border-primary/20 focus:border-primary min-h-[120px]"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full btn-gradient text-lg py-6 group"
                  disabled={loading}
                >
                  <Gift className="mr-2 w-5 h-5" />
                  {loading ? 'Submitting...' : 'Book Free Demo + Get ₦50,000 Setup Credit'}
                  <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </form>

              <p className="text-sm text-muted-foreground text-center mt-4">
                🔒 Your information is secure and will only be used to contact you about ODIA AI services.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;