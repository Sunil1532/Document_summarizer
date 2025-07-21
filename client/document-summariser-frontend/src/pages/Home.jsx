import React, { useState } from 'react';
import UploadForm from '../components/UploadForm';
import SummaryDisplay from '../components/SummaryDisplay';
import { motion } from 'framer-motion';

export default function Home() {
  const [summary, setSummary] = useState('');
  const [filePreview, setFilePreview] = useState(null);

  return (
    <div className="flex flex-col items-center justify-center px-4 py-10">
      <motion.h1
        className="text-4xl sm:text-5xl font-extrabold text-center mb-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        AI Document Summarizer 📄✨
      </motion.h1>

      <UploadForm onSummaryGenerated={setSummary} onFilePreview={setFilePreview} />
      {summary && <SummaryDisplay summary={summary} filePreview={filePreview} />}
    </div>
  );
}
