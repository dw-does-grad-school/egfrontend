"use client";
import { useState } from 'react';

export default function GalleryPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch('/api/search-proxy', {
        method: 'POST',
        body: JSON.stringify({ query }),
      });
      const data = await res.json();
      setResults(data.results || []); // Adjust based on your JSON structure
    } catch (err) {
      console.error("Search failed", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">EchoGallery Search</h1>
      
      <form onSubmit={handleSearch} className="flex gap-2 mb-8">
        <input 
          type="text"
          className="flex-1 p-2 border rounded text-black"
          placeholder="Search for images..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button 
          className="bg-blue-600 px-6 py-2 rounded text-white"
          disabled={isLoading}
        >
          {isLoading ? 'Searching...' : 'Search'}
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {results.map((item: any, index) => (
          <div key={index} className="border rounded p-2">
            {/* If your backend returns image URLs, display them here */}
            <p className="text-sm">{item.label || "Image Result"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}