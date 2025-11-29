import { motion } from 'framer-motion';
import { Target, Users, Lightbulb, Award, Heart, Zap } from 'lucide-react';
import { Card, Badge, SectionTitle } from '../components/common';

const About = () => {
  const stats = [
    { label: 'Affiliated Colleges', value: '151+' },
    { label: 'Departments', value: '60+' },
    { label: 'Active Students', value: '10,000+' },
    { label: 'Resources Shared', value: '5,000+' },
  ];

  const values = [
    {
      icon: Target,
      title: 'Our Mission',
      description: 'To empower every University of Calcutta student with accessible, comprehensive resources and a supportive community for academic excellence.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'Leveraging modern technology to create intuitive, user-friendly solutions that simplify university life.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Users,
      title: 'Community First',
      description: 'Building a collaborative ecosystem where students, alumni, and faculty connect and support each other.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'Committed to maintaining the highest standards in content quality, platform reliability, and user experience.',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: Heart,
      title: 'Student-Centric',
      description: 'Every feature designed with student needs at the forefront, ensuring maximum value and usability.',
      color: 'from-pink-500 to-rose-500'
    },
    {
      icon: Zap,
      title: 'Efficiency',
      description: 'Streamlining academic processes to save time and reduce stress for the entire CU community.',
      color: 'from-yellow-500 to-amber-500'
    },
  ];

  const team = [
    { role: 'Platform Development', description: 'Building robust, scalable solutions' },
    { role: 'Content Curation', description: 'Ensuring quality and relevance' },
    { role: 'Community Management', description: 'Fostering engagement and support' },
    { role: 'Student Support', description: 'Providing timely assistance' },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-primary-600 dark:bg-primary-900 text-white py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <Badge variant="primary" size="lg" className="mb-6 bg-white/20 text-white border-white/30">
              <Lightbulb className="w-4 h-4" />
              Our Mission
            </Badge>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Empowering CU Students, Together
            </h1>
            
            <p className="text-xl md:text-2xl text-primary-100 mb-16 leading-relaxed">
              Building a digital ecosystem for the University of Calcutta community
            </p>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="text-center bg-white/10 backdrop-blur-sm border-white/20">
                  <Card.Body className="py-6">
                    <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                      {stat.value}
                    </div>
                    <div className="text-sm text-primary-100">
                      {stat.label}
                    </div>
                  </Card.Body>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white dark:bg-dark-bg">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <SectionTitle 
              title="Our Story" 
              align="center"
            />
            <div className="prose prose-lg dark:prose-invert mx-auto">
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                CUSAATHI was born from a simple observation: University of Calcutta students across 151+ affiliated colleges faced common challenges—scattered information, limited resources, and fragmented communication.
              </p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                We envisioned a unified platform where every CU student, regardless of their college or department, could access notices, resources, connect with peers, explore career opportunities, and utilize powerful productivity tools—all in one place.
              </p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Today, CUSAATHI serves thousands of students, fostering collaboration, simplifying academic life, and building a stronger, more connected CU community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50 dark:bg-dark-card">
        <div className="container-custom">
          <SectionTitle 
            title="Our Values" 
            subtitle="The principles that guide everything we do at CUSAATHI"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card hover className="h-full">
                    <Card.Body className="p-6">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${value.color} flex items-center justify-center mb-4 shadow-lg`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      
                      <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                        {value.title}
                      </h3>
                      
                      <p className="text-gray-600 dark:text-gray-400">
                        {value.description}
                      </p>
                    </Card.Body>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white dark:bg-dark-bg">
        <div className="container-custom">
          <SectionTitle 
            title="Our Team" 
            subtitle="Dedicated professionals working to make CUSAATHI the best platform for CU students"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <Card key={index} variant="elevated" hover>
                <Card.Body className="p-6 text-center">
                  <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">
                    {member.role}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {member.description}
                  </p>
                </Card.Body>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Join the CUSAATHI Community
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Be part of a growing network of CU students helping each other succeed
          </p>
          <a href="/register" className="inline-block">
            <button className="px-8 py-4 bg-white text-primary-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg">
              Get Started Today
            </button>
          </a>
        </div>
      </section>
    </div>
  );
};

export default About;
