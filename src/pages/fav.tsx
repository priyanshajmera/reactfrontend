import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Calendar, ChevronDown, ChevronUp, Tag, X } from 'lucide-react';
import apiClient from '../apiclient';
import Swal from 'sweetalert2';

interface ClothingItem {
  id: number;
  image_url: string;
  category: string;
  description: string;
  tags: string;
  subcategory: string;
}

interface FavoriteOutfit {
  favorite_id: number;
  user_id: number;
  try_on_url: string;
  created_at: string;
  suggestion: string;
  name: string;
  top: ClothingItem;
  bottom: ClothingItem;
}

const Favorites = () => {
  const [expandedCollection, setExpandedCollection] = useState<number | null>(null);
  const [favorites, setFavorites] = useState<FavoriteOutfit[]>([]);

  // Fetch and store favorites (example usage)
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await apiClient.get('/favorites'); // Replace with actual API endpoint
        setFavorites(response.data);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };

    fetchFavorites();
  }, []);

  const toggleCollection = (id: number) => {
    setExpandedCollection(expandedCollection === id ? null : id);
  };
  const removeFav = async (id: number) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#A855F7', // Your webpage's primary color
      cancelButtonColor: '#F43F5E', // Your webpage's danger color
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      background: '#1F2937', // Background color (dark palette)
      color: '#FFFFFF', // Text color
    });
    if (result.isConfirmed) {
      try {
        await apiClient.delete(`/removeFavorites/${id}`); // Replace with your DELETE API endpoint
        setFavorites((prev) => prev.filter((item) => item.favorite_id !== id));
        Swal.fire({
          title: 'Deleted!',
          text: 'Your item has been deleted.',
          icon: 'success',
          confirmButtonColor: '#A855F7', // Same primary color
          background: '#1F2937',
          color: '#FFFFFF',
        });
      } catch (error) {
        console.error('Error deleting wardrobe item:', error);
        Swal.fire({
          title: 'Error!',
          text: 'An error occurred while deleting the item.',
          icon: 'error',
          confirmButtonColor: '#A855F7', // Same primary color
          background: '#1F2937',
          color: '#FFFFFF',
        });
      }

    }

  }

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
        {favorites.map((fav) => (
          <motion.div
            key={fav.favorite_id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass overflow-hidden"
          >

            <div
              onClick={() => toggleCollection(fav.favorite_id)}
              className="p-6 cursor-pointer hover:bg-white/5 transition-colors flex items-center justify-between"
            >
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-lg overflow-hidden">
                  <img
                    src={fav.try_on_url}
                    alt={fav.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-2">{fav.name}</h2>
                  <div className="flex items-center gap-4 text-white/60">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(fav.created_at).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4" />
                      <span>{fav.name}</span>
                    </div>
                  </div>
                </div>
              </div>
              {expandedCollection === fav.favorite_id ? (
                <ChevronUp className="w-6 h-6 text-purple-400" />
              ) : (
                <ChevronDown className="w-6 h-6 text-purple-400" />
              )}
            </div>

            {/* Expanded Items */}
            <AnimatePresence>
              {expandedCollection === fav.favorite_id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="border-t border-white/10"
                >
                  <div className="p-6 space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div key={fav.top.id} className="glass hover:bg-white/5 transition-colors">
                        <div className="flex gap-4 p-4">
                          <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                            <img
                              src={fav.top.image_url}
                              alt={fav.top.tags}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-grow">
                            <h3 className="font-semibold mb-1">{fav.top.tags}</h3>
                            <div className="flex items-center gap-2">
                              <span className="text-xs px-2 py-1 rounded-full bg-white/10">
                                {fav.top.category}
                              </span>
                              <span className="text-xs px-2 py-1 rounded-full bg-white/10">
                                {fav.top.subcategory}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div key={fav.bottom.id} className="glass hover:bg-white/5 transition-colors">
                        <div className="flex gap-4 p-4">
                          <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                            <img
                              src={fav.bottom.image_url}
                              alt={fav.bottom.tags}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-grow">
                            <h3 className="font-semibold mb-1">{fav.bottom.tags}</h3>
                            <div className="flex items-center gap-2">
                              <span className="text-xs px-2 py-1 rounded-full bg-white/10">
                                {fav.bottom.category}
                              </span>
                              <span className="text-xs px-2 py-1 rounded-full bg-white/10">
                                {fav.bottom.subcategory}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>
                    <div className="flex justify-end space-x-4">
                      <button onClick={()=>removeFav(fav.favorite_id)} className="glass px-4 py-2 hover:bg-white/10 transition-colors flex items-center gap-2">
                        <X className="w-4 h-4" />
                        Remove from Favorites
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
