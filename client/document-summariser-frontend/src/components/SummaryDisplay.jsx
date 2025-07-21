import React from 'react';
import { motion } from 'framer-motion';

export default function SummaryDisplay({ summary, file }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-2xl border border-white/20 space-y-4"
    >
      <h2 className="text-2xl font-bold mb-2">📃 Summary</h2>
      <p className="text-white/90 whitespace-pre-line">{summary}</p>
      {file && (
        <p className="text-sm text-white/60 mt-2">
          File: <a href={file.url} className="underline" target="_blank">{file.name}</a>
        </p>
      )}
    </motion.div>
  );
}
