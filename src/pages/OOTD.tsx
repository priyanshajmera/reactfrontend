import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Share2, Download, X, Calendar, Tag } from 'lucide-react';

const OOTD = () => {
  const [isLoading] = useState(true);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [saveForm, setSaveForm] = useState({
    name: '',
    occasion: ''
  });
  const [currentOutfit] = useState({
    name: 'Summer Casual',
    items: [
      {
        id: 1,
        name: 'White Cotton T-Shirt',
        category: 'Tops',
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&auto=format',
        brand: 'Essential Wear',
        color: 'White'
      },
      {
        id: 2,
        name: 'Distressed Blue Jeans',
        category: 'Bottoms',
        image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500&auto=format',
        brand: 'Denim Co',
        color: 'Light Blue'
      },
      {
        id: 3,
        name: 'White Sneakers',
        category: 'Shoes',
        image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&auto=format',
        brand: 'UrbanKicks',
        color: 'White'
      },
      {
        id: 4,
        name: 'Silver Chain Necklace',
        category: 'Accessories',
        image: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=500&auto=format',
        brand: 'LuxeJewels',
        color: 'Silver'
      }
    ]
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle saving logic here
    setShowSaveDialog(false);
    // Reset form
    setSaveForm({ name: '', occasion: '' });
  };

  return (
    <div className="page-container pt-24">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="section-title mb-8"
      >
        Outfit of the Day
      </motion.h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Virtual Try-On Preview */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 glass"
        >
          <div className="aspect-[3/4] rounded-t-lg bg-gradient-to-br from-neutral-800 to-neutral-900 flex items-center justify-center overflow-hidden">
            {isLoading ? (
              <div className="text-center px-4">
                <div className="w-16 h-16 border-4 border-purple-400 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
                <div className="space-y-3">
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-lg text-white/80"
                  >
                    Generating Virtual Try-On
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-sm text-white/50"
                  >
                    <p>Processing Top...</p>
                    <p>Processing Bottom...</p>
                    <p>Applying Style Transfer...</p>
                  </motion.div>
                </div>
              </div>
            ) : (
              <div className="w-full h-full">
                {/* VTON result image will be displayed here */}
              </div>
            )}
          </div>
          
          <div className="p-6 border-t border-white/10">
            <div className="flex justify-between items-center">
              <div className="flex space-x-4">
                <button className="glass p-3 rounded-full hover:bg-white/10 transition-colors">
                  <Heart className="w-5 h-5" />
                </button>
                <button className="glass p-3 rounded-full hover:bg-white/10 transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
                <button className="glass p-3 rounded-full hover:bg-white/10 transition-colors">
                  <Download className="w-5 h-5" />
                </button>
              </div>
              <button className="btn-primary" disabled={isLoading}>
                Download Result
              </button>
            </div>
          </div>
        </motion.div>

        {/* Outfit Details */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="glass p-6"
        >
          <h2 className="text-2xl font-semibold mb-6">Outfit Items</h2>
          
          <div className="space-y-6">
            {currentOutfit.items.map((item) => (
              <div key={item.id} className="glass hover:bg-white/5 transition-colors">
                <div className="flex gap-4 p-4">
                  <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-semibold mb-1">{item.name}</h3>
                    <p className="text-white/70 text-sm mb-1">{item.brand}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-2 py-1 rounded-full bg-white/10">
                        {item.category}
                      </span>
                      <span className="text-xs px-2 py-1 rounded-full bg-white/10">
                        {item.color}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="space-y-4 pt-4 border-t border-white/10">
              <button 
                className="btn-primary w-full"
                onClick={() => setShowSaveDialog(true)}
              >
                Save to Favorites
              </button>
              <button className="glass w-full py-3 hover:bg-white/5 transition-colors">
                Generate New Outfit
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Save to Favorites Dialog */}
      <AnimatePresence>
        {showSaveDialog && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="glass p-6 max-w-md w-full mx-4 relative"
            >
              <button
                onClick={() => setShowSaveDialog(false)}
                className="absolute top-4 right-4 text-white/60 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-xl font-semibold mb-6">Save to Favorites</h3>
              
              <form onSubmit={handleSave} className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-white/80">Collection Name</label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      placeholder="e.g., Summer Party Look"
                      className="input-glass w-full"
                      value={saveForm.name}
                      onChange={(e) => setSaveForm({ ...saveForm, name: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-white/80">Occasion</label>
                  <select
                    required
                    className="input-glass w-full"
                    value={saveForm.occasion}
                    onChange={(e) => setSaveForm({ ...saveForm, occasion: e.target.value })}
                  >
                    <option value="">Select an occasion</option>
                    <option value="Casual">Casual</option>
                    <option value="Formal">Formal</option>
                    <option value="Business">Business</option>
                    <option value="Party">Party</option>
                    <option value="Date Night">Date Night</option>
                    <option value="Vacation">Vacation</option>
                  </select>
                </div>

                <div className="flex justify-end space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowSaveDialog(false)}
                    className="glass px-4 py-2 hover:bg-white/10 transition-colors"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary">
                    Save Outfit
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default OOTD;
