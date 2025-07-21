import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function UploadForm({ onSummaryGenerated, onFilePreview }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState('');
  const [summaryLength, setSummaryLength] = useState('medium');
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("history")) || [];
    setHistory(saved);
  }, []);

  useEffect(() => {
    if (summary) {
      const newEntry = { summary, fileName: file.name };
      const updated = [...history, newEntry];
      localStorage.setItem("history", JSON.stringify(updated));
      setHistory(updated);
    }
  }, [summary]);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('mode', summaryLength);

    try {
      const res = await fetch('http://localhost:5000/api/summarize/file', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      setSummary(data.summary);
      onSummaryGenerated(data.summary);
      onFilePreview({ name: data.fileName, url: data.filePath });
    } catch (err) {
      alert('Upload failed!');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([summary], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${file.name}-summary.txt`;
    a.click();
  };

  return (
    <motion.div className="space-y-6">
      <form
        onSubmit={handleUpload}
        className="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-2xl border border-white/20 space-y-4"
      >
        <label className="block text-lg font-semibold">Upload Document</label>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="w-full text-sm file:mr-4 file:px-4 file:py-2 file:bg-purple-600 file:text-white file:rounded-lg file:border-0 file:cursor-pointer bg-white/10 rounded-md text-white p-2"
          accept=".pdf,.doc,.docx"
        />
        <select
          value={summaryLength}
          onChange={(e) => setSummaryLength(e.target.value)}
          className="text-black rounded px-3 py-2 bg-white"
        >
          <option value="short">Short</option>
          <option value="medium">Medium</option>
          <option value="detailed">Detailed</option>
        </select>
        <button
          type="submit"
          disabled={!file || loading}
          className="w-full bg-purple-600 hover:bg-purple-500 transition-all duration-200 text-white py-2 rounded-md font-semibold disabled:opacity-50"
        >
          {loading ? 'Uploading...' : 'Summarize Document'}
        </button>
      </form>

      {summary && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-2xl border border-white/20"
        >
          <h2 className="text-2xl font-bold mb-2">📃 Summary</h2>
          <div className="text-white/90 whitespace-pre-line">
            {summary.split('. ').map((s, i) => (
              <p key={i}>🔹 {s.trim()}.</p>
            ))}
          </div>
          <div className="text-sm text-white/60 mt-4">
            📄 File: {file?.name}<br />
            📝 Words: {summary.split(' ').length}<br />
            🧠 Mode: {summaryLength}<br />
          </div>
          <button
            onClick={handleDownload}
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-500"
          >
            📥 Download Summary
          </button>
        </motion.div>
      )}

      {history.length > 0 && (
        <div className="bg-white/5 rounded-xl p-4 mt-6 text-white/80">
          <h3 className="text-lg font-semibold mb-2">🕘 History</h3>
          <ul className="list-disc pl-6 space-y-1">
            {history.slice(-5).reverse().map((item, idx) => (
              <li key={idx}>{item.fileName}</li>
            ))}
          </ul>
        </div>
      )}
    </motion.div>
  );
}
