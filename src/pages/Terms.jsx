import { motion } from 'framer-motion';
import { FileText, AlertTriangle, Scale } from 'lucide-react';
import { Card, Badge, SectionTitle } from '../components/common';
import { sections, highlights } from '../data/constant/termsData';

const Terms = () => {


  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50 dark:from-dark-bg dark:via-dark-card dark:to-dark-bg py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <Badge variant="primary" size="lg" className="mb-6">
              <Scale className="w-4 h-4" />
              Terms of Service
            </Badge>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 gradient-text">
              Terms & Conditions
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
              Please read these terms carefully before using CUSAATHI
            </p>
            
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Last updated: November 22, 2025
            </p>
          </motion.div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-12 bg-white dark:bg-dark-bg">
        <div className="container-custom">
          <SectionTitle 
            title="Key Highlights" 
            subtitle="Quick overview of what you can and cannot do on CUSAATHI"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {highlights.map((highlight, index) => {
              const Icon = highlight.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  <Card variant="elevated" hover className="h-full">
                    <Card.Body className="p-6">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${highlight.color} flex items-center justify-center mb-4`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      
                      <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                        {highlight.title}
                      </h3>
                      
                      <ul className="space-y-2">
                        {highlight.items.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2 flex-shrink-0" />
                            <span className="text-gray-600 dark:text-gray-300 text-sm">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </Card.Body>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Terms Sections */}
      <section className="py-20 bg-gray-50 dark:bg-dark-card">
        <div className="container-custom">
          <SectionTitle 
            title="Detailed Terms" 
            subtitle="Please read the full terms of service below"
          />
          <div className="max-w-4xl mx-auto space-y-6">
            {sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <Card hover>
                  <Card.Body className="p-8">
                    <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                      {section.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {section.content}
                    </p>
                  </Card.Body>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Important Notice */}
      <section className="py-12 bg-white dark:bg-dark-bg">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <Card variant="gradient">
              <Card.Body className="p-8">
                <div className="flex items-start gap-4">
                  <AlertTriangle className="w-8 h-8 text-amber-500 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                      Important Notice
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      By using CUSAATHI, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree with any part of these terms, you must discontinue use of the platform immediately.
                    </p>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
        <div className="container-custom text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Questions About Our Terms?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Our legal team is available to clarify any concerns
          </p>
          <a href="/contact">
            <button className="px-8 py-3 bg-white text-primary-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg">
              Contact Us
            </button>
          </a>
        </div>
      </section>
    </div>
  );
};

export default Terms;
