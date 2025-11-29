import { motion } from 'framer-motion';

const SectionTitle = ({ title, subtitle, align = 'center', center = false, className = '' }) => {
  const alignment = center || align === 'center';
  
  return (
    <div className={`mb-12 ${alignment ? 'text-center' : 'text-left'} ${className}`}>
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white"
      >
        {title}
      </motion.h2>
      
      <motion.div 
        initial={{ opacity: 0, width: 0 }}
        whileInView={{ opacity: 1, width: 96 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className={`h-1 bg-primary-600 dark:bg-primary-500 rounded-full mb-6 ${alignment ? 'mx-auto' : ''}`}
        style={{ width: '6rem' }}
      />

      {subtitle && (
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className={`text-lg text-gray-600 dark:text-gray-400 max-w-2xl ${alignment ? 'mx-auto' : ''}`}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};

export default SectionTitle;
