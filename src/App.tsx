import React, { useState, useEffect } from 'react';
import { getStats } from './services/api';
import { askGemini } from './services/gemini';

const GeminiQuery = () => {
  const [prompt, setPrompt] = useState('');
  const [geminiResponse, setGeminiResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsLoading(true);
    setError(null);
    setGeminiResponse('');

    try {
      const response = await askGemini(prompt);
      setGeminiResponse(response);
    } catch (err) {
      setError('Failed to get a response from the AI. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="gemini-query-container">
      <h2>Project AI Assistant</h2>
      <p>Have questions about your project, need to brainstorm ideas, or want a code snippet? Ask away!</p>
      <form onSubmit={handleSubmit}>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., Write a JavaScript function to sort an array of objects by a property"
          rows={4}
          disabled={isLoading}
          aria-label="Ask the AI assistant a question"
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Thinking...' : 'Submit Question'}
        </button>
      </form>
      {error && <p className="error-message">{error}</p>}
      {geminiResponse && (
        <div className="gemini-response">
          <h3>AI Response:</h3>
          <p>{geminiResponse}</p>
        </div>
      )}
    </div>
  );
};

const ProjectStats = () => {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      const data = await getStats();
      setStats(data);
      setLoading(false);
    };

    fetchStats();
  }, []);

  if (loading) {
    return <p>Loading project stats...</p>;
  }

  return (
    <>
      {stats && (
        <ul className="stats-grid">
          {Object.entries(stats).map(([key, value]) => (
            <li key={key} className="stat-card">
              <p className="stat-value">{String(value)}</p>
              <p className="stat-label">{key.replace(/([A-Z])/g, ' $1').toUpperCase()}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};


const HomeView = () => {
  return (
    <div className="container">
      <header className="app-header">
        <h1>Sunrise23 Project</h1>
        <p>Your project dashboard and AI assistant.</p>
      </header>
      
      <main>
        <section className="project-stats-section">
          <h2>Project Status</h2>
          <ProjectStats />
        </section>
        <section className="ai-section">
          <GeminiQuery />
        </section>
      </main>

      <footer className="app-footer">
          <p>&copy; 2024 Sunrise23 Project. All rights reserved.</p>
      </footer>
    </div>
  );
};


function App() {
  return (
      <HomeView />
  );
}

export default App;