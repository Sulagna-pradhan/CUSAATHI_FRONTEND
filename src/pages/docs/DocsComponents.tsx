import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { 
  Button, 
  Badge, 
  Card, 
  Input, 
  SectionTitle,
  Avatar,
  LoadingSpinner,
  LoadingSkeleton,
  Modal,
  SearchBar
} from '../../components/common';
import { Mail, Search, ArrowRight } from 'lucide-react';

const DocsComponents = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Components
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
          A library of reusable UI components used throughout the application.
        </p>
      </div>

      {/* Button */}
      <section className="space-y-6">
        <SectionTitle title="Button" align="left" className="!mb-6" />
        <p className="text-gray-600 dark:text-gray-300">
          Versatile button component with multiple variants and sizes.
        </p>
        
        <div className="p-6 bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-xl space-y-4">
          <div className="flex flex-wrap gap-4 items-center">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Danger</Button>
          </div>
          <div className="flex flex-wrap gap-4 items-center">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </div>
          <div className="flex flex-wrap gap-4 items-center">
            <Button icon={Mail} iconPosition="left">Left Icon</Button>
            <Button icon={ArrowRight} iconPosition="right">Right Icon</Button>
            <Button loading>Loading</Button>
          </div>
        </div>

        <SyntaxHighlighter language="tsx" style={vscDarkPlus} className="rounded-xl !bg-gray-900">
          {`<Button variant="primary" size="md" onClick={handleClick}>
  Click Me
</Button>

<Button icon={Mail} iconPosition="left">
  Contact Us
</Button>`}
        </SyntaxHighlighter>
      </section>

      {/* Badge */}
      <section className="space-y-6">
        <SectionTitle title="Badge" align="left" className="!mb-6" />
        <p className="text-gray-600 dark:text-gray-300">
          Used to display status, tags, or small pieces of information.
        </p>
        
        <div className="p-6 bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-xl">
          <div className="flex flex-wrap gap-4">
            <Badge variant="primary">Primary</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="gray">Gray</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="error">Error</Badge>
          </div>
        </div>

        <SyntaxHighlighter language="tsx" style={vscDarkPlus} className="rounded-xl !bg-gray-900">
          {`<Badge variant="success">Active</Badge>
<Badge variant="warning">Pending</Badge>`}
        </SyntaxHighlighter>
      </section>

      {/* Input */}
      <section className="space-y-6">
        <SectionTitle title="Input" align="left" className="!mb-6" />
        <p className="text-gray-600 dark:text-gray-300">
          Form input field with support for labels, errors, and icons.
        </p>
        
        <div className="p-6 bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-xl space-y-4 max-w-md">
          <Input label="Username" placeholder="Enter username" />
          <Input label="Email" type="email" icon={Mail} placeholder="john@example.com" />
          <Input label="Search" icon={Search} iconPosition="right" placeholder="Search..." />
          <Input label="Error State" error="This field is required" />
        </div>

        <SyntaxHighlighter language="tsx" style={vscDarkPlus} className="rounded-xl !bg-gray-900">
          {`<Input 
  label="Email" 
  type="email" 
  icon={Mail} 
  placeholder="john@example.com" 
/>`}
        </SyntaxHighlighter>
      </section>

      {/* Card */}
      <section className="space-y-6">
        <SectionTitle title="Card" align="left" className="!mb-6" />
        <p className="text-gray-600 dark:text-gray-300">
          Flexible container component with hover effects.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-bold mb-2">Basic Card</h3>
            <p className="text-gray-600 dark:text-gray-400">This is a simple card component.</p>
          </Card>
          
          <Card hover className="p-6 cursor-pointer">
            <h3 className="text-lg font-bold mb-2">Hover Card</h3>
            <p className="text-gray-600 dark:text-gray-400">Hover over me to see the effect!</p>
          </Card>
        </div>

        <SyntaxHighlighter language="tsx" style={vscDarkPlus} className="rounded-xl !bg-gray-900">
          {`<Card hover className="p-6">
  <h3>Card Title</h3>
  <p>Card content goes here.</p>
</Card>`}
        </SyntaxHighlighter>
      </section>

      {/* Avatar */}
      <section className="space-y-6">
        <SectionTitle title="Avatar" align="left" className="!mb-6" />
        <p className="text-gray-600 dark:text-gray-300">
          Displays user profile image or initials.
        </p>
        
        <div className="p-6 bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-xl space-y-4">
          <div className="flex items-center gap-4">
            <Avatar size="sm" name="John Doe" />
            <Avatar size="md" name="John Doe" />
            <Avatar size="lg" name="John Doe" />
            <Avatar size="xl" name="John Doe" />
          </div>
          <div className="flex items-center gap-4">
            <Avatar size="md" name="Jane Smith" status="online" />
            <Avatar size="md" name="Bob Wilson" status="offline" />
            <Avatar size="md" name="Alice Cooper" status="busy" />
          </div>
        </div>

        <SyntaxHighlighter language="tsx" style={vscDarkPlus} className="rounded-xl !bg-gray-900">
          {`<Avatar size="md" name="John Doe" />
<Avatar size="lg" src="/path/to/image.jpg" status="online" />`}
        </SyntaxHighlighter>
      </section>

      {/* LoadingSpinner */}
      <section className="space-y-6">
        <SectionTitle title="LoadingSpinner" align="left" className="!mb-6" />
        <p className="text-gray-600 dark:text-gray-300">
          Indicates loading state with an optional text.
        </p>
        
        <div className="p-6 bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-xl space-y-4">
          <div className="flex items-center gap-8">
            <LoadingSpinner size="sm" />
            <LoadingSpinner size="md" />
            <LoadingSpinner size="lg" />
            <LoadingSpinner size="md" text="Loading data..." />
          </div>
        </div>

        <SyntaxHighlighter language="tsx" style={vscDarkPlus} className="rounded-xl !bg-gray-900">
          {`<LoadingSpinner size="md" />
<LoadingSpinner size="lg" text="Please wait..." />`}
        </SyntaxHighlighter>
      </section>

      {/* LoadingSkeleton */}
      <section className="space-y-6">
        <SectionTitle title="LoadingSkeleton" align="left" className="!mb-6" />
        <p className="text-gray-600 dark:text-gray-300">
          Placeholder for content while it loads.
        </p>
        
        <div className="p-6 bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-xl space-y-4 max-w-md">
          <div className="flex items-center gap-4">
            <LoadingSkeleton className="w-12 h-12 rounded-full" />
            <div className="space-y-2 flex-1">
              <LoadingSkeleton className="h-4 w-3/4" />
              <LoadingSkeleton className="h-3 w-1/2" />
            </div>
          </div>
          <LoadingSkeleton className="h-32 w-full rounded-xl" />
        </div>

        <SyntaxHighlighter language="tsx" style={vscDarkPlus} className="rounded-xl !bg-gray-900">
          {`<LoadingSkeleton className="w-12 h-12 rounded-full" />
<LoadingSkeleton className="h-4 w-3/4" />`}
        </SyntaxHighlighter>
      </section>

      {/* Modal */}
      <section className="space-y-6">
        <SectionTitle title="Modal" align="left" className="!mb-6" />
        <p className="text-gray-600 dark:text-gray-300">
          Overlay dialog for important content or actions.
        </p>
        
        <div className="p-6 bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-xl">
          <Button onClick={() => setIsModalOpen(true)}>Open Modal</Button>
          
          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title="Example Modal"
          >
            <div className="space-y-4">
              <p className="text-gray-600 dark:text-gray-300">
                This is the content of the modal. You can put anything here.
              </p>
              <div className="flex justify-end gap-2">
                <Button variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                <Button variant="primary" onClick={() => setIsModalOpen(false)}>Confirm</Button>
              </div>
            </div>
          </Modal>
        </div>

        <SyntaxHighlighter language="tsx" style={vscDarkPlus} className="rounded-xl !bg-gray-900">
          {`<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Modal Title"
>
  <p>Modal content...</p>
</Modal>`}
        </SyntaxHighlighter>
      </section>

      {/* SearchBar */}
      <section className="space-y-6">
        <SectionTitle title="SearchBar" align="left" className="!mb-6" />
        <p className="text-gray-600 dark:text-gray-300">
          Specialized input for search functionality.
        </p>
        
        <div className="p-6 bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-xl max-w-md">
          <SearchBar placeholder="Search documentation..." />
        </div>

        <SyntaxHighlighter language="tsx" style={vscDarkPlus} className="rounded-xl !bg-gray-900">
          {`<SearchBar 
  placeholder="Search..." 
  onChange={(e) => handleSearch(e.target.value)} 
/>`}
        </SyntaxHighlighter>
      </section>

      {/* SectionTitle */}
      <section className="space-y-6">
        <SectionTitle title="SectionTitle" align="left" className="!mb-6" />
        <p className="text-gray-600 dark:text-gray-300">
          Standardized heading with an underline decoration.
        </p>
        
        <div className="p-6 bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-xl space-y-4">
          <SectionTitle title="Left Aligned" align="left" />
          <SectionTitle title="Center Aligned" align="center" />
        </div>

        <SyntaxHighlighter language="tsx" style={vscDarkPlus} className="rounded-xl !bg-gray-900">
          {`<SectionTitle title="My Section" align="center" />`}
        </SyntaxHighlighter>
      </section>
    </div>
  );
};

export default DocsComponents;
