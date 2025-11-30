import { Folder, FileText } from 'lucide-react';

const DocsStructure = () => {
  const structure = [
    {
      name: 'src',
      type: 'folder',
      children: [
        {
          name: 'assets',
          type: 'folder',
          desc: 'Static assets like images, icons, and global styles.'
        },
        {
          name: 'components',
          type: 'folder',
          children: [
            { name: 'common', type: 'folder', desc: 'Reusable UI components (Button, Card, etc.)' },
            { name: 'layout', type: 'folder', desc: 'Layout components (Navbar, Footer, etc.)' },
            { name: 'providers', type: 'folder', desc: 'Context providers (Theme, etc.)' }
          ]
        },
        {
          name: 'config',
          type: 'folder',
          desc: 'Configuration files (Firebase, etc.)'
        },
        {
          name: 'data',
          type: 'folder',
          desc: 'Static data and constants.'
        },
        {
          name: 'hooks',
          type: 'folder',
          desc: 'Custom React hooks.'
        },
        {
          name: 'lib',
          type: 'folder',
          desc: 'Library configurations and utilities.'
        },
        {
          name: 'pages',
          type: 'folder',
          desc: 'Page components corresponding to routes.'
        },
        {
          name: 'services',
          type: 'folder',
          desc: 'API services and utilities.'
        },
        {
          name: 'utils',
          type: 'folder',
          desc: 'Helper functions and utilities.'
        },
        { name: 'App.tsx', type: 'file', desc: 'Main application component with routing.' },
        { name: 'main.tsx', type: 'file', desc: 'Entry point.' }
      ]
    }
  ];

  const renderStructure = (items: any[], depth = 0) => {
    return items.map((item) => (
      <div key={item.name} className="ml-4 border-l border-gray-200 dark:border-dark-border pl-4 py-2">
        <div className="flex items-start gap-2">
          {item.type === 'folder' ? (
            <Folder className="w-5 h-5 text-emerald-500 shrink-0" />
          ) : (
            <FileText className="w-5 h-5 text-gray-400 shrink-0" />
          )}
          <div>
            <span className="font-mono text-sm font-semibold text-gray-900 dark:text-white">
              {item.name}
            </span>
            {item.desc && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                {item.desc}
              </p>
            )}
          </div>
        </div>
        {item.children && renderStructure(item.children, depth + 1)}
      </div>
    ));
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Project Structure
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
          An overview of the CUSAATHI codebase organization. We follow a feature-based and component-driven architecture.
        </p>
      </div>

      <section className="bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-xl p-6">
        {renderStructure(structure)}
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Key Architectural Decisions</h2>
        <div className="space-y-4">
          <div className="p-4 bg-emerald-50 dark:bg-emerald-900/10 rounded-xl border border-emerald-100 dark:border-emerald-900/30">
            <h3 className="font-bold text-emerald-800 dark:text-emerald-200 mb-2">Component Organization</h3>
            <p className="text-emerald-700 dark:text-emerald-300 text-sm">
              Components are split into <strong>common</strong> (atomic, reusable everywhere), <strong>layout</strong> (structural), and <strong>features</strong> (domain-specific). This prevents circular dependencies and keeps the codebase clean.
            </p>
          </div>
          
          <div className="p-4 bg-blue-50 dark:bg-blue-900/10 rounded-xl border border-blue-100 dark:border-blue-900/30">
            <h3 className="font-bold text-blue-800 dark:text-blue-200 mb-2">Barrel Exports</h3>
            <p className="text-blue-700 dark:text-blue-300 text-sm">
              We use <code>index.ts</code> files in directories to simplify imports. For example, you can import multiple components from <code>../../components/common</code> in a single line.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DocsStructure;
