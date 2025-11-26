import { HelpCircle, BookOpen, Bell, Users, Wrench, Shield } from 'lucide-react';

export const categories = [
  { id: 'all', label: 'All Questions', icon: HelpCircle },
  { id: 'general', label: 'General', icon: BookOpen },
  { id: 'notices', label: 'Notices', icon: Bell },
  { id: 'resources', label: 'Resources', icon: BookOpen },
  { id: 'community', label: 'Community', icon: Users },
  { id: 'tools', label: 'Tools', icon: Wrench },
  { id: 'account', label: 'Account', icon: Shield },
];

export const faqs = [
  {
    category: 'general',
    question: 'What is CUSAATHI?',
    answer: 'CUSAATHI is a comprehensive platform designed for University of Calcutta students across 151+ affiliated colleges. It provides centralized access to notices, academic resources, community features, career opportunities, and productivity tools.'
  },
  {
    category: 'general',
    question: 'Is CUSAATHI free to use?',
    answer: 'Yes! CUSAATHI is completely free for all University of Calcutta students. Our mission is to make academic resources and tools accessible to everyone.'
  },
  {
    category: 'general',
    question: 'Which colleges are supported?',
    answer: 'CUSAATHI supports all 151+ affiliated colleges of the University of Calcutta across all 60+ departments. You can find your college in the Colleges section.'
  },
  {
    category: 'notices',
    question: 'How do I get notified about important notices?',
    answer: 'You can customize your notification preferences in your dashboard. Select your department, course, and semester to receive relevant notices via PWA push notifications and email (optional).'
  },
  {
    category: 'notices',
    question: 'Can I filter notices by department?',
    answer: 'Yes! Use the advanced filters on the Notices page to filter by department, course, semester, notice type (exam, admission, result, general), and date range.'
  },
  {
    category: 'notices',
    question: 'How often are notices updated?',
    answer: 'Notices are updated in real-time as they are published by the university or colleges. You can also bookmark important notices for quick access.'
  },
  {
    category: 'resources',
    question: 'What types of resources are available?',
    answer: 'CUSAATHI provides syllabi (UG/PG), Previous Year Questions (PYQs), notes, lab manuals, and library resources. All resources are categorized by department, semester, and subject.'
  },
  {
    category: 'resources',
    question: 'Can I upload my own notes?',
    answer: 'Yes! Registered users can contribute notes and resources to help fellow students. All uploads are moderated to ensure quality and relevance.'
  },
  {
    category: 'resources',
    question: 'How do I access library resources?',
    answer: 'Visit the Library section under Resources to access CU Library guides, e-resources, journals, plagiarism help, timings, and FAQs.'
  },
  {
    category: 'community',
    question: 'How does the Q&A forum work?',
    answer: 'The forum is organized by department and subject. You can ask questions, provide answers, upvote helpful responses, and bookmark important threads. Verified badges are awarded to trusted contributors.'
  },
  {
    category: 'community',
    question: 'Can I create a study group?',
    answer: 'Yes! You can create public or private study groups, invite members, share files, and collaborate. Groups can be organized by subject, competitive exams, or special interests.'
  },
  {
    category: 'community',
    question: 'How do I connect with alumni?',
    answer: 'Visit the Alumni Network section to browse alumni profiles, filter by graduation year/industry, and request mentorship. Alumni can provide career guidance and resume reviews.'
  },
  {
    category: 'tools',
    question: 'What PDF tools are available?',
    answer: 'CUSAATHI offers a complete PDF toolkit including merge, split, compress, convert (PDF↔JPG, PDF↔Word, PDF↔PPT), unlock, protect, and organize pages.'
  },
  {
    category: 'tools',
    question: 'How does the SGPA calculator work?',
    answer: 'The SGPA calculator is designed for CU\'s CBCS system. Enter your subject credits and grades, and it will calculate your SGPA with detailed explanations.'
  },
  {
    category: 'tools',
    question: 'Can I create a timetable?',
    answer: 'Yes! Use the Timetable Maker to create weekly schedules, color-code subjects, and export as an image for easy sharing.'
  },
  {
    category: 'account',
    question: 'How do I create an account?',
    answer: 'Click "Sign Up" in the navigation bar, provide your details, and complete the profile setup by selecting your department, semester, and college.'
  },
  {
    category: 'account',
    question: 'Can I change my department or semester?',
    answer: 'Yes! You can update your profile information anytime from your Profile page. This will adjust your personalized content and notifications.'
  },
  {
    category: 'account',
    question: 'Is my data secure?',
    answer: 'Absolutely! We use industry-standard encryption and security practices to protect your data. Read our Privacy Policy for more details.'
  },
];
