import { Link } from "react-router-dom";
import { ArrowLeft, Mail, Phone, MapPin, Building2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      toast({
        title: "Message sent",
        description: "Our enterprise team will respond within 24 hours.",
      });
      setIsSubmitting(false);
    }, 1000);
  };

  const offices = [
    {
      city: "San Francisco",
      address: "548 Market Street, Suite 95000",
      region: "San Francisco, CA 94104",
      type: "Headquarters"
    },
    {
      city: "Boston",
      address: "100 Federal Street, 29th Floor",
      region: "Boston, MA 02110",
      type: "East Coast Office"
    },
    {
      city: "London",
      address: "1 Canada Square, Canary Wharf",
      region: "London E14 5AB, UK",
      type: "EMEA Headquarters"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/50 bg-background/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back to Home</span>
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Contact Us
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Ready to transform your pharmaceutical data operations? Our enterprise team is here to help you get started.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-secondary/20 border border-border/50 rounded-xl p-8">
            <h2 className="text-2xl font-semibold text-foreground mb-6">Enterprise Inquiry</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">First Name</label>
                  <Input placeholder="John" required className="bg-background/50" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Last Name</label>
                  <Input placeholder="Smith" required className="bg-background/50" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Work Email</label>
                <Input type="email" placeholder="john.smith@pharma.com" required className="bg-background/50" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Company</label>
                <Input placeholder="Acme Pharmaceuticals" required className="bg-background/50" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Job Title</label>
                <Input placeholder="Director of Data Operations" className="bg-background/50" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Message</label>
                <Textarea 
                  placeholder="Tell us about your data challenges and compliance requirements..."
                  rows={4}
                  required
                  className="bg-background/50"
                />
              </div>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send Message"}
                <Send className="w-4 h-4 ml-2" />
              </Button>
            </form>
          </div>

          {/* Office Locations */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-6">Global Offices</h2>
              <div className="space-y-6">
                {offices.map((office, index) => (
                  <div key={index} className="bg-secondary/20 border border-border/50 rounded-xl p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-primary/10">
                        <Building2 className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <span className="text-xs text-primary font-medium uppercase tracking-wider">{office.type}</span>
                        <h3 className="text-lg font-semibold text-foreground mt-1">{office.city}</h3>
                        <p className="text-muted-foreground text-sm mt-1">{office.address}</p>
                        <p className="text-muted-foreground text-sm">{office.region}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-secondary/20 border border-border/50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Direct Contact</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-muted-foreground" />
                  <span className="text-foreground">enterprise@pharmaledger.io</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-muted-foreground" />
                  <span className="text-foreground">+1 (888) 555-LEDGER</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-muted-foreground" />
                  <span className="text-muted-foreground">Available in 40+ countries</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
