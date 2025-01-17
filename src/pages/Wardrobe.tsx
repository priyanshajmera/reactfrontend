import React from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Image } from 'lucide-react';

const Wardrobe = () => {
  const categories = ['All', 'Tops', 'Bottoms', 'Dresses', 'Shoes', 'Accessories'];

  return (
    <div className="page-container pt-24">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="section-title"
      >
        Your Digital Wardrobe
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass p-4 mb-8 flex items-center space-x-4"
      >
        <div className="flex-1 flex items-center space-x-2 glass p-2 rounded-full">
          <Search className="w-5 h-5 text-white/50" />
          <input
            type="text"
            placeholder="Search your wardrobe..."
            className="bg-transparent outline-none w-full"
          />
        </div>
        <button className="p-2 glass rounded-full">
          <Filter className="w-5 h-5" />
        </button>
      </motion.div>

      <div className="flex space-x-4 mb-8 overflow-x-auto pb-2">
        {categories.map((category, index) => (
          <motion.button
            key={category}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            className={`glass px-6 py-2 whitespace-nowrap ${
              index === 0 ? 'bg-purple-500/20' : ''
            }`}
          >
            {category}
          </motion.button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 12 }).map((_, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 + index * 0.1 }}
            className="glass group cursor-pointer"
          >
            <div className="aspect-square rounded-lg bg-white/5 flex items-center justify-center relative overflow-hidden">
              <Image className="w-12 h-12 text-white/30" />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button className="btn-primary text-sm">View Details</button>
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold">Item Name</h3>
              <p className="text-white/70 text-sm">Category</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Wardrobe;