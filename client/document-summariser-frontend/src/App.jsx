import React, { useState } from 'react';
import UploadForm from './components/UploadForm';
import SummaryDisplay from './components/SummaryDisplay';

export default function App() {
  const [summary, setSummary] = useState('');
  const [fileInfo, setFileInfo] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1f1c2c] to-[#928dab] text-white flex items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-6">
        <h1 className="text-4xl font-bold text-center tracking-wide drop-shadow-md">
          🧠 Smart Document Summarizer
        </h1>
        <UploadForm onSummaryGenerated={setSummary} onFilePreview={setFileInfo} />
        {summary && <SummaryDisplay summary={summary} file={fileInfo} />}
      </div>
    </div>
  );
}
