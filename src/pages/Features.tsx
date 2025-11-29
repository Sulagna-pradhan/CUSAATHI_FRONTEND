import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button, Card, Badge, SectionTitle } from '../components/common';
import { features } from '../data/constant/featuresData';

const Features = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-900 text-white py-20">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-32 left-10 w-80 h-80 bg-white/10 blur-3xl rounded-full" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-900/60 blur-3xl rounded-full" />
        </div>
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <Badge variant="primary" size="lg" className="mb-6 bg-white/20 text-white border-white/30">
              <Sparkles className="w-4 h-4" />
              Platform Features
            </Badge>
            
            <h1 className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight">
              Everything You Need to Succeed
            </h1>
            
            <p className="text-base md:text-xl text-emerald-100 leading-relaxed">
              Discover the powerful features that make CUSAATHI your ultimate academic companion
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-gray-50 dark:bg-dark-card">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link to={feature.link} className="block h-full">
                    <Card clickable hover className="h-full border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300 bg-white dark:bg-dark-bg dark:border-gray-800">
                      <Card.Body className="p-8">
                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 shadow-lg`}>
                          <Icon className="w-7 h-7 text-white" />
                        </div>
                        
                        <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
                          {feature.title}
                        </h3>
                        
                        <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                          {feature.description}
                        </p>
                        
                        <div className="flex items-center text-emerald-600 dark:text-emerald-400 font-semibold group">
                          Explore Feature <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                        </div>
                      </Card.Body>
                    </Card>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white dark:bg-dark-bg">
        <div className="container-custom text-center">
          <SectionTitle 
            title="Missing Something?" 
            subtitle="We are constantly adding new features based on student feedback."
          />
          <Link to="/contact">
            <Button size="lg" className="px-8 py-3">
              Request a Feature
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Features;
