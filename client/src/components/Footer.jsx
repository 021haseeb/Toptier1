import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Building2, Mail, Phone, MapPin, ArrowUpRight, Instagram, Twitter, Linkedin, Facebook } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { label: 'About Us', path: '/about' },
      { label: 'Our Properties', path: '/properties' },
      { label: 'Contact', path: '/contact' },
      { label: 'Careers', path: '#' },
    ],
    services: [
      { label: 'Buy Property', path: '/properties' },
      { label: 'Sell Property', path: '/contact' },
      { label: 'Property Management', path: '#' },
      { label: 'Investment Advisory', path: '#' },
    ],
    legal: [
      { label: 'Privacy Policy', path: '#' },
      { label: 'Terms of Service', path: '#' },
      { label: 'Cookie Policy', path: '#' },
    ],
  };

  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Facebook, href: '#', label: 'Facebook' },
  ];

  return (
    <footer className="bg-dark-800 border-t border-white/5">
      {/* CTA Section */}
      <div className="section-padding py-20">
        <div className="max-w-7xl mx-auto">
          <div className="glass-card p-8 lg:p-16 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
            
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative z-10"
            >
              <h2 className="text-3xl lg:text-5xl font-bold text-white">
                Ready to Find Your <span className="gradient-text">Dream Home?</span>
              </h2>
              <p className="text-white/60 text-lg max-w-2xl mx-auto mt-4">
                Let our expert team guide you through the luxury real estate market.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                <Link to="/properties" className="btn-primary inline-flex items-center justify-center gap-2">
                  Browse Properties <ArrowUpRight className="w-5 h-5" />
                </Link>
                <Link to="/contact" className="btn-outline inline-flex items-center justify-center gap-2">
                  Contact Us <ArrowUpRight className="w-5 h-5" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="section-padding py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
            {/* Brand */}
            <div className="lg:col-span-4 space-y-6">
              <Link to="/" className="flex items-center gap-2 group">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center group-hover:shadow-lg group-hover:shadow-primary/25 transition-all duration-300">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold gradient-text">TopTier</span>
              </Link>
              <p className="text-white/60 text-sm leading-relaxed max-w-sm">
                Premium real estate investment platform delivering exceptional properties
                and unparalleled service to discerning clients worldwide.
              </p>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="lg:col-span-2 space-y-6">
              <h3 className="text-white font-semibold">Company</h3>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.label}>
                    <Link to={link.path} className="text-white/60 hover:text-white text-sm transition-colors duration-300">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-2 space-y-6">
              <h3 className="text-white font-semibold">Services</h3>
              <ul className="space-y-3">
                {footerLinks.services.map((link) => (
                  <li key={link.label}>
                    <Link to={link.path} className="text-white/60 hover:text-white text-sm transition-colors duration-300">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="lg:col-span-4 space-y-6">
              <h3 className="text-white font-semibold">Contact Us</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3 text-white/60 text-sm">
                  <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    100 Luxury Lane, Suite 500<br />New York, NY 10001
                  </p>
                </div>
                <div className="flex items-center gap-3 text-white/60 text-sm">
                  <Phone className="w-5 h-5 text-primary shrink-0" />
                  +1 (800) 555-TOPTIER
                </div>
                <div className="flex items-center gap-3 text-white/60 text-sm">
                  <Mail className="w-5 h-5 text-primary shrink-0" />
                  hello@toptier.com
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5 py-8">
        <div className="max-w-7xl mx-auto section-padding">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/40">
            <div className="flex flex-wrap gap-6">
              {footerLinks.legal.map((link) => (
                <Link key={link.label} to={link.path} className="hover:text-white/60 transition-colors duration-300">
                  {link.label}
                </Link>
              ))}
            </div>
            <span className="text-center md:text-right">
              {currentYear} Haseeb Rajput. All rights reserved.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

