import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Share2, Download } from 'lucide-react';

const OOTD = () => {
  return (
    <div className="page-container pt-24">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="section-title"
      >
        Outfit of the Day
      </motion.h1>

      <div className="grid lg:grid-cols-3 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 glass p-8"
        >
          <div className="aspect-video rounded-lg bg-white/5 flex items-center justify-center">
            <p className="text-white/50">Virtual Try-On Preview</p>
          </div>
          
          <div className="flex justify-between items-center mt-6">
            <div className="flex space-x-4">
              <button className="glass p-3 rounded-full">
                <Heart className="w-5 h-5" />
              </button>
              <button className="glass p-3 rounded-full">
                <Share2 className="w-5 h-5" />
              </button>
              <button className="glass p-3 rounded-full">
                <Download className="w-5 h-5" />
              </button>
            </div>
            <button className="btn-primary">Try On Virtually</button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="glass p-8"
        >
          <h2 className="text-2xl font-semibold mb-6">Outfit Details</h2>
          
          <div className="space-y-6">
            {['Top', 'Bottom', 'Shoes', 'Accessories'].map((item) => (
              <div key={item} className="glass p-4">
                <h3 className="font-semibold mb-2">{item}</h3>
                <p className="text-white/70 text-sm">Item description and styling tips</p>
              </div>
            ))}

            <div className="space-y-4">
              <button className="btn-primary w-full">Save to Favorites</button>
              <button className="glass w-full py-3">Generate New Outfit</button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default OOTD;