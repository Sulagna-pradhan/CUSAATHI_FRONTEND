import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageSquare, HelpCircle, Bug } from 'lucide-react';
import { Card, Input, Button, Badge, SectionTitle } from '../components/common';
import { toast } from 'react-toastify';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: 'general',
    message: ''
  });

  const [loading, setLoading] = useState(false);

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      value: 'support@cusaathi.edu',
      description: 'We\'ll respond within 24 hours',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Phone,
      title: 'Call Us',
      value: '+91 XXXX-XXXXXX',
      description: 'Mon-Fri, 9 AM - 6 PM IST',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      value: 'Kolkata, West Bengal',
      description: 'University of Calcutta',
      color: 'from-purple-500 to-pink-500'
    },
  ];

  const categories = [
    { value: 'general', label: 'General Inquiry', icon: MessageSquare },
    { value: 'support', label: 'Technical Support', icon: HelpCircle },
    { value: 'bug', label: 'Report a Bug', icon: Bug },
    { value: 'feedback', label: 'Feedback', icon: Send },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      toast.success('Message sent successfully! We\'ll get back to you soon.');
      setFormData({
        name: '',
        email: '',
        subject: '',
        category: 'general',
        message: ''
      });
      setLoading(false);
    }, 1500);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-primary-600 dark:bg-primary-900 text-white py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <Badge variant="primary" size="lg" className="mb-6 bg-white/20 text-white border-white/30">
              Get in Touch
            </Badge>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              We're Here to Help
            </h1>
            
            <p className="text-xl md:text-2xl text-primary-100 leading-relaxed">
              Have questions, feedback, or need assistance? Our team is ready to support you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 bg-white dark:bg-dark-bg relative">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative -mt-32 z-10">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card variant="elevated" hover className="h-full">
                    <Card.Body className="p-6 text-center">
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${info.color} flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      
                      <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">
                        {info.title}
                      </h3>
                      
                      <p className="text-primary-600 dark:text-primary-400 font-semibold mb-1">
                        {info.value}
                      </p>
                      
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {info.description}
                      </p>
                    </Card.Body>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-gray-50 dark:bg-dark-card">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <SectionTitle 
              title="Send Us a Message" 
              subtitle="Fill out the form below and we'll get back to you as soon as possible"
            />

            <Card variant="elevated">
              <Card.Body className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name and Email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      label="Your Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                    />
                    
                    <Input
                      label="Email Address"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      required
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Category
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {categories.map((cat) => {
                        const Icon = cat.icon;
                        return (
                          <button
                            key={cat.value}
                            type="button"
                            onClick={() => setFormData({ ...formData, category: cat.value })}
                            className={`p-3 rounded-lg border-2 transition-all ${
                              formData.category === cat.value
                                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/30'
                                : 'border-gray-300 dark:border-dark-border hover:border-primary-300'
                            }`}
                          >
                            <Icon className={`w-5 h-5 mx-auto mb-1 ${
                              formData.category === cat.value
                                ? 'text-primary-600 dark:text-primary-400'
                                : 'text-gray-500'
                            }`} />
                            <span className={`text-xs font-medium ${
                              formData.category === cat.value
                                ? 'text-primary-600 dark:text-primary-400'
                                : 'text-gray-600 dark:text-gray-400'
                            }`}>
                              {cat.label}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Subject */}
                  <Input
                    label="Subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="How can we help you?"
                    required
                  />

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="6"
                      className="w-full px-4 py-2.5 rounded-lg border-2 border-gray-300 dark:border-dark-border bg-white dark:bg-dark-card text-gray-900 dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                      placeholder="Tell us more about your inquiry..."
                      required
                    />
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    size="lg"
                    loading={loading}
                    icon={Send}
                    iconPosition="right"
                    className="w-full"
                  >
                    Send Message
                  </Button>
                </form>
              </Card.Body>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Quick Links */}
      <section className="py-20 bg-white dark:bg-dark-bg">
        <div className="container-custom text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 dark:text-white">
            Looking for Quick Answers?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Check out our FAQ section for instant solutions to common questions
          </p>
          <a href="/faq">
            <Button variant="outline" size="lg">
              Visit FAQ
            </Button>
          </a>
        </div>
      </section>
    </div>
  );
};

export default Contact;
