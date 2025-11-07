
import React, { useState, useCallback } from 'react';
import { Client } from '../types';
import { analyzeWithGemini } from '../services/geminiService';

interface GeminiAnalysisModalProps {
  isOpen: boolean;
  onClose: () => void;
  clients: Client[];
}

const LoadingSpinner = () => (
  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-400"></div>
);

const GeminiAnalysisModal: React.FC<GeminiAnalysisModalProps> = ({ isOpen, onClose, clients }) => {
  const [prompt, setPrompt] = useState('Summarize my client activity. Identify clients who are at risk of not renewing and suggest a personalized message for them.');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const handleAnalysis = useCallback(async () => {
    if (!prompt) {
      setError('Please enter a prompt.');
      return;
    }
    setIsLoading(true);
    setError('');
    setResult('');
    try {
      const analysis = await analyzeWithGemini(clients, prompt);
      setResult(analysis);
    } catch (err) {
      setError('Failed to get analysis from Gemini. Please check your API key and try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [prompt, clients]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg shadow-2xl p-6 w-full max-w-2xl max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-600">Gemini Client Analysis</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">&times;</button>
        </div>
        
        <div className="flex-grow overflow-y-auto pr-2">
            <p className="text-sm text-gray-400 mb-4">
              Using <span className="font-mono bg-gray-700 px-1 rounded">gemini-2.5-pro</span> with max thinking budget for complex analysis. 
              Your current client data will be sent to the model.
            </p>
          <div className="mb-4">
            <label htmlFor="gemini-prompt" className="block text-sm font-medium text-gray-300 mb-2">Your Request:</label>
            <textarea
              id="gemini-prompt"
              rows={4}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full bg-gray-900 border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2 text-gray-200"
              placeholder="e.g., Which clients are expiring this week?"
            />
          </div>

          <div className="mt-4">
            {isLoading && (
              <div className="flex flex-col items-center justify-center p-8 bg-gray-900 rounded-lg">
                <LoadingSpinner />
                <p className="text-gray-400 mt-4">Gemini is thinking...</p>
              </div>
            )}
            {error && <div className="text-red-400 bg-red-900/50 p-3 rounded-md">{error}</div>}
            {result && (
              <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-200">Analysis Result:</h3>
                <div className="prose prose-invert prose-sm max-w-none bg-gray-900 p-4 rounded-lg whitespace-pre-wrap">{result}</div>
              </div>
            )}
          </div>
        </div>
        
        <div className="mt-6 flex-shrink-0">
          <button
            onClick={handleAnalysis}
            disabled={isLoading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-800 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out"
          >
            {isLoading ? 'Analyzing...' : 'Run Analysis'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GeminiAnalysisModal;
   