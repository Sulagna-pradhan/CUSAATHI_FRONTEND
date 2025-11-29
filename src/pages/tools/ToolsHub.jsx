import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft, Wrench } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { SectionTitle, Card, Button, Badge } from '../../components/common';
import { toolsCategories } from '../../data/constant/toolsData';

const ToolsHub = () => {
  const { category: categoryId } = useParams();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  // Detail View
  if (categoryId) {
    const category = toolsCategories.find(c => c.id === categoryId);

    if (!category) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-dark-bg p-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Category not found</h2>
          <Link to="/tools">
            <Button icon={ArrowLeft} iconPosition="left">Back to Tools</Button>
          </Link>
        </div>
      );
    }

    const Icon = category.icon;

    return (
      <div>
        {/* Hero Section */}
        <section className="bg-white dark:bg-dark-bg border-b border-gray-200 dark:border-dark-border py-12">
          <div className="container-custom">
            <Link to="/tools" className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 mb-8 transition-colors">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Tools
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col md:flex-row items-start md:items-center gap-8"
            >
              <div className={`p-6 rounded-2xl ${category.bg} shadow-soft`}>
                <Icon className={`w-16 h-16 ${category.color}`} />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
                  {category.title}
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed">
                  {category.description}
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20 bg-gray-50 dark:bg-dark-bg">
          <div className="container-custom">
            <motion.div 
              key={categoryId}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {category.features.map((feature, idx) => {
                const FeatureIcon = feature.icon;
                return (
                  <motion.div key={idx} variants={itemVariants}>
                    <Card 
                      className="h-full hover:shadow-soft-lg transition-all duration-300 cursor-pointer group border-l-4"
                      style={{ borderLeftColor: category.color.replace('text-', 'var(--tw-') }}
                      hover
                    >
                      <Card.Body className="flex items-center gap-4 p-6">
                        <div className={`p-3 rounded-xl ${category.bg} group-hover:scale-110 transition-transform duration-300`}>
                          <FeatureIcon className={`w-6 h-6 ${category.color}`} />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                          {feature.name}
                        </h3>
                      </Card.Body>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>
      </div>
    );
  }

  // Hub View
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-primary-600 dark:bg-primary-900 text-white py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <Badge variant="primary" size="lg" className="mb-6 bg-white/20 text-white border-white/30">
              <Wrench className="w-4 h-4" />
              Productivity Suite
            </Badge>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Tools for Every Day Need
            </h1>
            
            <p className="text-xl md:text-2xl text-primary-100 mb-8 leading-relaxed">
              Enhance your academic workflow with our comprehensive collection of utilities and AI-powered tools.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-20 bg-gray-50 dark:bg-dark-bg">
        <div className="container-custom">
          <motion.div 
            key="hub-grid"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {toolsCategories.map((category) => {
              const Icon = category.icon;
              const displayFeatures = category.features.slice(0, 2);
              const remainingCount = category.features.length - 2;
              
              return (
                <motion.div key={category.id} variants={itemVariants}>
                  <Card 
                    className="h-full flex flex-col shadow-soft hover:shadow-soft-xl transition-all duration-300 group border-t-4"
                    style={{ borderTopColor: category.color.replace('text-', 'var(--tw-') }}
                    hover
                  >
                    <Card.Body className="p-8 flex-1 flex flex-col">
                      <div className={`w-14 h-14 rounded-2xl ${category.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-soft`}>
                        <Icon className={`w-7 h-7 ${category.color}`} />
                      </div>
                      
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                        {category.title}
                      </h3>
                      
                      <p className="text-gray-600 dark:text-gray-400 mb-8 flex-1 leading-relaxed">
                        {category.description}
                      </p>
                      
                      <div className="space-y-3 mb-8">
                        {displayFeatures.map((feature, idx) => {
                          const FeatureIcon = feature.icon;
                          return (
                            <div key={idx} className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                              <div className={`p-1.5 rounded-lg ${category.bg}`}>
                                <FeatureIcon className={`w-4 h-4 ${category.color}`} />
                              </div>
                              <span className="font-medium">{feature.name}</span>
                            </div>
                          );
                        })}
                        {remainingCount > 0 && (
                          <div className="flex items-center gap-3 text-sm">
                            <div className="w-7 flex justify-center">
                              <span className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-600" />
                            </div>
                            <span className="text-primary-600 dark:text-primary-400 font-semibold">
                              + {remainingCount} more features
                            </span>
                          </div>
                        )}
                      </div>

                      <Link to={`/tools/${category.id}`} className="mt-auto">
                        <Button 
                          variant="outline" 
                          fullWidth 
                          icon={ArrowRight} 
                          iconPosition="right"
                          className="group-hover:bg-primary-50 dark:group-hover:bg-primary-950 transition-colors"
                        >
                          Explore Tools
                        </Button>
                      </Link>
                    </Card.Body>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ToolsHub;
