import { Database, Eye, Lock, UserCheck, FileText, AlertCircle } from 'lucide-react';

export const sections = [
  {
    icon: Database,
    title: 'Information We Collect',
    content: [
      'Personal information (name, email, college, department, semester)',
      'Usage data (pages visited, features used, time spent)',
      'Device information (browser type, IP address, operating system)',
      'Cookies and similar tracking technologies'
    ]
  },
  {
    icon: Eye,
    title: 'How We Use Your Information',
    content: [
      'Provide and maintain our services',
      'Personalize your experience (notices, resources based on your profile)',
      'Send important notifications and updates',
      'Improve our platform and develop new features',
      'Analyze usage patterns and optimize performance',
      'Prevent fraud and ensure platform security'
    ]
  },
  {
    icon: Lock,
    title: 'Data Security',
    content: [
      'Industry-standard encryption (SSL/TLS) for data transmission',
      'Secure servers with regular security audits',
      'Access controls and authentication measures',
      'Regular backups to prevent data loss',
      'Compliance with data protection regulations',
      'Employee training on data privacy and security'
    ]
  },
  {
    icon: UserCheck,
    title: 'Your Rights',
    content: [
      'Access your personal data at any time',
      'Update or correct your information',
      'Delete your account and associated data',
      'Opt-out of marketing communications',
      'Export your data in a portable format',
      'Object to certain data processing activities'
    ]
  },
  {
    icon: FileText,
    title: 'Data Sharing',
    content: [
      'We do NOT sell your personal information to third parties',
      'Limited sharing with service providers (hosting, analytics) under strict agreements',
      'Anonymized data may be used for research and statistics',
      'Legal compliance when required by law',
      'With your explicit consent for specific purposes'
    ]
  },
  {
    icon: AlertCircle,
    title: 'Cookies & Tracking',
    content: [
      'Essential cookies for platform functionality',
      'Analytics cookies to understand user behavior (can be disabled)',
      'Preference cookies to remember your settings',
      'Third-party cookies from integrated services',
      'You can manage cookie preferences in your browser'
    ]
  },
];
