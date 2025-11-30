import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const DocsTheme = () => {
  const colors = {
    emerald: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
    lime: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
    gray: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
  };

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Theme & Design System
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
          CUSAATHI uses a modern, accessible color palette based on Tailwind CSS colors. The primary brand colors are Emerald and Lime.
        </p>
      </div>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Color Palette</h2>
        
        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-emerald-700 dark:text-emerald-400">Emerald (Primary)</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {colors.emerald.map((shade) => (
                <div key={shade} className="space-y-2">
                  <div className={`h-16 rounded-lg bg-emerald-${shade} shadow-sm`} />
                  <div className="text-xs font-mono text-gray-500">emerald-{shade}</div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-lime-700 dark:text-lime-400">Lime (Accent)</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {colors.lime.map((shade) => (
                <div key={shade} className="space-y-2">
                  <div className={`h-16 rounded-lg bg-lime-${shade} shadow-sm`} />
                  <div className="text-xs font-mono text-gray-500">lime-{shade}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Dark Mode</h2>
        <p className="text-gray-600 dark:text-gray-300">
          Dark mode is implemented using the `dark` class on the `html` element. We use Tailwind's `dark:` modifier to style components for dark mode.
        </p>

        <div className="p-6 bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-xl">
          <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">Example Card</h3>
          <p className="text-gray-600 dark:text-gray-400">
            This card automatically adapts to the current theme. Try toggling the theme in the navbar!
          </p>
        </div>

        <SyntaxHighlighter language="tsx" style={vscDarkPlus} className="rounded-xl !bg-gray-900">
          {`<div className="bg-white dark:bg-dark-card text-gray-900 dark:text-white">
  <h1 className="text-emerald-600 dark:text-emerald-400">
    Adaptive Text
  </h1>
</div>`}
        </SyntaxHighlighter>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Typography</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold">Heading 1</h1>
            <p className="text-sm text-gray-500">text-4xl font-bold</p>
          </div>
          <div className="space-y-2">
            <h2 className="text-3xl font-bold">Heading 2</h2>
            <p className="text-sm text-gray-500">text-3xl font-bold</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-bold">Heading 3</h3>
            <p className="text-sm text-gray-500">text-2xl font-bold</p>
          </div>
          <div className="space-y-2">
            <p className="text-base">Body text. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <p className="text-sm text-gray-500">text-base</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Small text. Used for captions and secondary info.</p>
            <p className="text-sm text-gray-500">text-sm text-gray-500</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DocsTheme;
