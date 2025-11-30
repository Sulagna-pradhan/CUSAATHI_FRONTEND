import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { SectionTitle } from '../../../components/common';

const DocsState = () => {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          State Management
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
          CUSAATHI uses React Context for global state management. We have two primary contexts: `AuthContext` and `ThemeContext`.
        </p>
      </div>

      {/* AuthContext */}
      <section className="space-y-6">
        <SectionTitle title="AuthContext" align="left" className="!mb-6" />
        <p className="text-gray-600 dark:text-gray-300">
          Manages user authentication state, including login, logout, and user profile data.
        </p>
        
        <div className="space-y-4">
          <h3 className="font-bold text-gray-900 dark:text-white">Usage</h3>
          <SyntaxHighlighter language="tsx" style={vscDarkPlus} className="rounded-xl !bg-gray-900">
            {`import { useAuth } from '../contexts';

const MyComponent = () => {
  const { user, login, logout, isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <button onClick={logout}>Logout {user.name}</button>;
  }

  return <button onClick={() => login(credentials)}>Login</button>;
};`}
          </SyntaxHighlighter>
        </div>
      </section>

      {/* ThemeContext */}
      <section className="space-y-6">
        <SectionTitle title="ThemeContext" align="left" className="!mb-6" />
        <p className="text-gray-600 dark:text-gray-300">
          Manages the application's theme (light/dark mode). It persists the user's preference in `localStorage`.
        </p>
        
        <div className="space-y-4">
          <h3 className="font-bold text-gray-900 dark:text-white">Usage</h3>
          <SyntaxHighlighter language="tsx" style={vscDarkPlus} className="rounded-xl !bg-gray-900">
            {`import { useTheme } from '../contexts';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme}>
      Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
    </button>
  );
};`}
          </SyntaxHighlighter>
        </div>
      </section>
    </div>
  );
};

export default DocsState;
