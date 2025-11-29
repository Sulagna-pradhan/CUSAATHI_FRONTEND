import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, GraduationCap } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    'Quick Links': [
      { name: 'About Us', path: '/about' },
      { name: 'Contact', path: '/contact' },
      { name: 'Features', path: '/features' },
      { name: 'Privacy Policy', path: '/privacy' },
      { name: 'Terms of Service', path: '/terms' },
    ],
    'Resources': [
      { name: 'Notices', path: '/notices' },
      { name: 'Academic Resources', path: '/resources' },
      { name: 'Calendar', path: '/calendar' },
      { name: 'Helpdesk', path: '/helpdesk' },
    ],
    'Community': [
      { name: 'Forum', path: '/community/forum' },
      { name: 'Study Groups', path: '/community/groups' },
      { name: 'Alumni Network', path: '/community/alumni' },
      { name: 'Colleges', path: '/colleges' },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
  ];

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-gray-300 mt-auto">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-4 group">
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center shadow-soft">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">CUSAATHI</span>
            </Link>
            <p className="text-gray-400 mb-6 max-w-md leading-relaxed">
              Your complete one-stop solution for University of Calcutta students across 151+ affiliated colleges and 60+ departments.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <div className="w-8 h-8 bg-primary-600/10 rounded-lg flex items-center justify-center">
                  <Mail className="w-4 h-4 text-primary-400" />
                </div>
                <a href="mailto:support@cusaathi.edu" className="hover:text-primary-400 transition-colors">
                  support@cusaathi.edu
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-8 h-8 bg-primary-600/10 rounded-lg flex items-center justify-center">
                  <Phone className="w-4 h-4 text-primary-400" />
                </div>
                <span>+91 XXXX-XXXXXX</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-8 h-8 bg-primary-600/10 rounded-lg flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-primary-400" />
                </div>
                <span>Kolkata, West Bengal, India</span>
              </div>
            </div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">{title}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-sm text-gray-400 hover:text-primary-400 transition-colors inline-block"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <p className="text-sm text-gray-400">
              © {currentYear} CUSAATHI. All rights reserved.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-2">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-primary-600 rounded-lg transition-all"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
