import { 
  FileText, 
  GraduationCap, 
  Clock, 
  BookOpen, 
  Wrench, 
  Bot,
  FileJson,
  Image,
  Split,
  Merge,
  Calculator,
  Calendar,
  CheckSquare,
  BrainCircuit,
  Languages,
  FileSpreadsheet,
  Presentation,
  Wifi,
  Key, 
  Terminal, 
  Search
} from 'lucide-react';

export const toolsCategories = [
  {
    id: 'pdf-tools',
    title: 'PDF Tools',
    description: 'All-in-one solution for your PDF needs. Merge, split, compress, and convert files with ease.',
    icon: FileText,
    color: 'text-red-500',
    bg: 'bg-red-50 dark:bg-red-900/10',
    features: [
      { name: 'Merge PDF', icon: Merge },
      { name: 'Split PDF', icon: Split },
      { name: 'HTML to PDF', icon: FileJson },
      { name: 'PDF Watermark', icon: FileText },
      { name: 'PDF to Image', icon: Image },
      { name: 'Image to PDF', icon: FileText },
    ]
  },
  {
    id: 'academic-tools',
    title: 'Academic Tools',
    description: 'Essential tools for students and researchers. GPA calculators, citation generators, and more.',
    icon: GraduationCap,
    color: 'text-blue-500',
    bg: 'bg-blue-50 dark:bg-blue-900/10',
    features: [
      { name: 'CGPA Calculator', icon: Calculator },
      { name: 'Citation Generator', icon: FileText },
      { name: 'Plagiarism Checker', icon: CheckSquare },
      { name: 'Reference Manager', icon: BookOpen },
      { name: 'Grade Tracker', icon: FileSpreadsheet },
    ]
  },
  {
    id: 'time-management',
    title: 'Time Management',
    description: 'Boost your productivity with our time management suite. Pomodoro timer, schedule planners, and trackers.',
    icon: Clock,
    color: 'text-green-500',
    bg: 'bg-green-50 dark:bg-green-900/10',
    features: [
      { name: 'Pomodoro Timer', icon: Clock },
      { name: 'Study Planner', icon: Calendar },
      { name: 'Task Manager', icon: CheckSquare },
      { name: 'Focus Mode', icon: BrainCircuit },
      { name: 'Time Tracker', icon: Clock },
    ]
  },
  {
    id: 'study-tools',
    title: 'Study Tools',
    description: 'Enhance your learning experience. Flashcards, mind maps, and collaborative study rooms.',
    icon: BookOpen,
    color: 'text-purple-500',
    bg: 'bg-purple-50 dark:bg-purple-900/10',
    features: [
      { name: 'Flashcards', icon: Presentation },
      { name: 'Mind Mapping', icon: BrainCircuit },
      { name: 'Note Taking', icon: FileText },
      { name: 'Quiz Maker', icon: CheckSquare },
      { name: 'Virtual Whiteboard', icon: Presentation },
    ]
  },
  {
    id: 'utility-tools',
    title: 'Utility Tools',
    description: 'Handy utilities for everyday tasks. Unit converters, internet speed test, and file converters.',
    icon: Wrench,
    color: 'text-orange-500',
    bg: 'bg-orange-50 dark:bg-orange-900/10',
    features: [
      { name: 'Unit Converter', icon: Calculator },
      { name: 'Internet Speed', icon: Wifi },
      { name: 'File Converter', icon: FileText },
      { name: 'QR Code Generator', icon: Image },
      { name: 'Password Gen', icon: Key },
    ]
  },
  {
    id: 'ai-tools',
    title: 'AI Tools',
    description: 'Leverage the power of AI for your studies. Summarizers, writing assistants, and coding helpers.',
    icon: Bot,
    color: 'text-indigo-500',
    bg: 'bg-indigo-50 dark:bg-indigo-900/10',
    features: [
      { name: 'Text Summarizer', icon: FileText },
      { name: 'Writing Assistant', icon: FileText },
      { name: 'Code Helper', icon: Terminal },
      { name: 'Language Tutor', icon: Languages },
      { name: 'Research Assistant', icon: Search },
    ]
  }
];

