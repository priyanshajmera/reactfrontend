import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Calendar, ChevronDown, ChevronUp, Tag, X } from 'lucide-react';

interface OutfitItem {
  id: number;
  name: string;
  category: string;
  image: string;
  brand: string;
  color: string;
}

interface OutfitCollection {
  id: number;
  name: string;
  date: string;
  occasion: string;
  vtonImage: string;
  items: OutfitItem[];
}

const Favorites = () => {
  const [expandedCollection, setExpandedCollection] = useState<number | null>(null);
  const [collections] = useState<OutfitCollection[]>([
    {
      id: 1,
      name: "Summer Beach Party",
      date: "2024-03-15",
      occasion: "Casual",
      vtonImage: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format",
      items: [
        {
          id: 1,
          name: 'Floral Summer Dress',
          category: 'Dresses',
          image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500&auto=format',
          brand: 'Summer Vibes',
          color: 'Multicolor'
        },
        {
          id: 2,
          name: 'Straw Hat',
          category: 'Accessories',
          image: 'https://images.unsplash.com/photo-1565339119519-c9eaa1918b9f?w=500&auto=format',
          brand: 'Beach Life',
          color: 'Beige'
        }
      ]
    },
    {
      id: 2,
      name: "Business Meeting",
      date: "2024-03-10",
      occasion: "Formal",
      vtonImage: "https://images.unsplash.com/photo-1548123378-8c60d6daf26f?w=800&auto=format",
      items: [
        {
          id: 3,
          name: 'Black Blazer',
          category: 'Tops',
          image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&auto=format',
          brand: 'Professional Wear',
          color: 'Black'
        },
        {
          id: 4,
          name: 'Pencil Skirt',
          category: 'Bottoms',
          image: 'https://images.unsplash.com/photo-1582142306909-195724d33ffc?w=500&auto=format',
          brand: 'Office Chic',
          color: 'Navy'
        }
      ]
    }
  ]);

  const toggleCollection = (id: number) => {
    setExpandedCollection(expandedCollection === id ? null : id);
  };

  return (
    <div className="page-container pt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <h1 className="section-title mb-4">Favorite Outfits</h1>
        <p className="text-white/60 text-lg">Your personally curated collection of perfect looks</p>
      </motion.div>

      <div className="grid gap-6">
        {collections.map((collection) => (
          <motion.div
            key={collection.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass overflow-hidden"
          >
            {/* Collection Header */}
            <div
              onClick={() => toggleCollection(collection.id)}
              className="p-6 cursor-pointer hover:bg-white/5 transition-colors flex items-center justify-between"
            >
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-lg overflow-hidden">
                  <img
                    src={collection.vtonImage}
                    alt={collection.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-2">{collection.name}</h2>
                  <div className="flex items-center gap-4 text-white/60">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(collection.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4" />
                      <span>{collection.occasion}</span>
                    </div>
                  </div>
                </div>
              </div>
              {expandedCollection === collection.id ? (
                <ChevronUp className="w-6 h-6 text-purple-400" />
              ) : (
                <ChevronDown className="w-6 h-6 text-purple-400" />
              )}
            </div>

            {/* Expanded Items */}
            <AnimatePresence>
              {expandedCollection === collection.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="border-t border-white/10"
                >
                  <div className="p-6 space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      {collection.items.map((item) => (
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
                    </div>
                    <div className="flex justify-end space-x-4">
                      <button className="glass px-4 py-2 hover:bg-white/10 transition-colors flex items-center gap-2">
                        <X className="w-4 h-4" />
                        Remove from Favorites
                      </button>
                      <button className="btn-primary flex items-center gap-2">
                        <Heart className="w-4 h-4" />
                        Try Again
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
