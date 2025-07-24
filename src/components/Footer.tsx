import { Heart, ExternalLink } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Product: [
      { name: "Features", href: "#features" },
      { name: "Agents", href: "#agents" },
      { name: "Pricing", href: "#pricing" },
      { name: "Demo", href: "#demo" }
    ],
    Company: [
      { name: "About", href: "/about" },
      { name: "Careers", href: "/careers" },
      { name: "Blog", href: "/blog" },
      { name: "Press", href: "/press" }
    ],
    Legal: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "NDPR Compliance", href: "/ndpr" },
      { name: "Security", href: "/security" }
    ],
    Support: [
      { name: "Help Center", href: "/help" },
      { name: "Contact", href: "#demo" },
      { name: "System Status", href: "/status" },
      { name: "Documentation", href: "/docs" }
    ]
  };

  const socialLinks = [
    { name: "LinkedIn", href: "https://linkedin.com/company/odia-ai", icon: "🔗" },
    { name: "Twitter", href: "https://twitter.com/odia_ai", icon: "🐦" },
    { name: "YouTube", href: "https://youtube.com/@odia-ai", icon: "📺" },
    { name: "Instagram", href: "https://instagram.com/odia.ai", icon: "📸" }
  ];

  return (
    <footer className="bg-dark text-white">
      {/* Main Footer Content */}
      <div className="container-odia py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">O</span>
              </div>
              <span className="text-2xl font-bold font-space-grotesk">VaaS</span>
            </div>
            
            <p className="text-white/70 mb-6 leading-relaxed">
              Nigeria's first voice AI infrastructure platform. Empowering businesses across Africa with intelligent automation.
            </p>

            <div className="flex items-center gap-2 text-sm text-gold font-medium mb-4">
              <span className="text-2xl">🇳🇬</span>
              Proudly Nigerian-Owned & Operated
            </div>

            <div className="text-sm text-white/60">
              <div>170 Golden Spring Estate</div>
              <div>Galadimwa, Abuja, Nigeria</div>
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold text-white mb-4">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-white/70 hover:text-primary transition-colors text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social Links */}
        <div className="border-t border-white/10 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-6">
              <span className="text-white/70 text-sm">Follow us:</span>
              <div className="flex items-center gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-white/70 hover:text-primary transition-colors text-sm"
                  >
                    <span>{social.icon}</span>
                    <span className="hidden sm:inline">{social.name}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm text-white/60">
              <a href="tel:+2348105786326" className="hover:text-primary transition-colors">
                +234 810 578 6326
              </a>
              <span>•</span>
              <a href="mailto:hello@odia.dev" className="hover:text-primary transition-colors">
                hello@odia.dev
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 bg-dark-card">
        <div className="container-odia py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/60">
            <div className="flex items-center gap-1">
              <span>© {currentYear} VaaS - Voice as a Service. All rights reserved.</span>
              <span>•</span>
              <span>Built with</span>
              <Heart className="w-4 h-4 text-red-500 mx-1" />
              <span>in Nigeria</span>
              <span className="text-xl ml-1">🇳🇬</span>
            </div>

            <div className="flex items-center gap-4">
              <span>Powered by ODIA.dev</span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <span className="text-primary font-medium">Online</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;