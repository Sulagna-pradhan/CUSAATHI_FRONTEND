import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Badge } from '../../../components/common';

const DocsIntroduction = () => {
  return (
    <div className="space-y-8">
      <div>
        <Badge variant="primary" className="mb-4">v1.0.0</Badge>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Introduction
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
          Welcome to the CUSAATHI frontend documentation. This guide is designed to help you understand the project structure, design system, and development workflows.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Tech Stack</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { name: 'React 18', desc: 'UI Library' },
            { name: 'TypeScript', desc: 'Type Safety' },
            { name: 'Vite', desc: 'Build Tool' },
            { name: 'Tailwind CSS', desc: 'Styling' },
            { name: 'Framer Motion', desc: 'Animations' },
            { name: 'React Router', desc: 'Routing' },
            { name: 'Lucide React', desc: 'Icons' },
            { name: 'Context API', desc: 'State Management' },
          ].map((tech) => (
            <div key={tech.name} className="p-4 bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-xl">
              <h3 className="font-semibold text-gray-900 dark:text-white">{tech.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{tech.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Installation</h2>
        <p className="text-gray-600 dark:text-gray-300">
          Follow these steps to get the project running locally:
        </p>
        
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">1. Clone the repository</p>
          <SyntaxHighlighter language="bash" style={vscDarkPlus} className="rounded-xl !bg-gray-900">
            {`git clone https://github.com/Sulagna-pradhan/CUSAATHI.git
cd cusaathi`}
          </SyntaxHighlighter>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">2. Install dependencies</p>
          <SyntaxHighlighter language="bash" style={vscDarkPlus} className="rounded-xl !bg-gray-900">
            {`npm install`}
          </SyntaxHighlighter>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">3. Start development server</p>
          <SyntaxHighlighter language="bash" style={vscDarkPlus} className="rounded-xl !bg-gray-900">
            {`npm run dev`}
          </SyntaxHighlighter>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Available Scripts</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 dark:border-dark-border">
                <th className="py-3 px-4 text-sm font-semibold text-gray-900 dark:text-white">Script</th>
                <th className="py-3 px-4 text-sm font-semibold text-gray-900 dark:text-white">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-dark-border">
              <tr>
                <td className="py-3 px-4 font-mono text-sm text-emerald-600 dark:text-emerald-400">npm run dev</td>
                <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">Starts the development server</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-mono text-sm text-emerald-600 dark:text-emerald-400">npm run build</td>
                <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">Builds the app for production</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-mono text-sm text-emerald-600 dark:text-emerald-400">npm run lint</td>
                <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">Runs ESLint to check for code quality issues</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-mono text-sm text-emerald-600 dark:text-emerald-400">npm run preview</td>
                <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">Locally preview the production build</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default DocsIntroduction;
