import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Image } from 'lucide-react';
import Swal from 'sweetalert2';
import apiClient from '../apiclient';
import { useNavigate } from 'react-router-dom';

interface WardrobeItem {
  id: number; // Unique identifier (Primary Key)
  user_id: number; // Reference to the user who owns the wardrobe item
  image_url: string; // URL of the wardrobe item image
  category: string; // Category of the wardrobe item (e.g., Tops, Bottoms, etc.)
  description: string; // Description of the wardrobe item
  tags: string; // Tags associated with the wardrobe item (comma-separated, if applicable)
  subcategory: string; // Subcategory of the wardrobe item
}

const Wardrobe = () => {
  const navigate = useNavigate();
  const categories = ['All', 'Tops', 'Bottom', 'Dresses', 'Shoes', 'Accessories'];
  const [wardrobe, setWardrobe] = useState<WardrobeItem[]>([]); // Stores all wardrobe items fetched from the API
  const [filteredWardrobe, setFilteredWardrobe] = useState<WardrobeItem[]>([]); // Stores items filtered by category
  const [selectedCategory, setSelectedCategory] = useState('All'); // Current selected category
  const [searchTerm, setSearchTerm] = useState(''); // Search input value

  // Fetch wardrobe data from the API
  useEffect(() => {
    const fetchWardrobe = async () => {
      try {
        const response = await apiClient.get<WardrobeItem[]>('/wardrobe'); // Replace with your API URL
        setWardrobe(response.data);
        setFilteredWardrobe(response.data); // Initially show all items
      } catch (error) {
        console.error('Error fetching wardrobe:', error);
      }
    };

    fetchWardrobe();
  }, []);

  // Delete wardrobe item
  const handleDelete = async (id: number) => {
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
        await apiClient.delete(`/outfits/${id}`); // Replace with your DELETE API endpoint
        setWardrobe((prev) => prev.filter((item) => item.id !== id));
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
  };

  // Filter items based on the selected category and search term
  useEffect(() => {
    const filterItems = () => {
      let filtered = wardrobe;

      if (selectedCategory !== 'All') {
        filtered = filtered.filter((item) => item.category === selectedCategory);
      }

      if (searchTerm) {
        filtered = filtered.filter((item) =>
          item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.tags.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      setFilteredWardrobe(filtered);
    };

    filterItems();
  }, [selectedCategory, searchTerm, wardrobe]);

  return (
    <div className="page-container pt-24">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="section-title"
      >
        Your Digital Wardrobe
      </motion.h1>

      {/* Search and Filter */}
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
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent outline-none w-full"
          />
        </div>
        {/* <button className="p-2 glass rounded-full">
          <Filter className="w-5 h-5" />
        </button> */}
      </motion.div>

      {/* Categories */}
      <div className="flex space-x-4 mb-8 overflow-x-auto pb-2">
        {categories.map((category, index) => (
          <motion.button
            key={category}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            onClick={() => setSelectedCategory(category)}
            className={`glass px-6 py-2 whitespace-nowrap ${selectedCategory === category ? 'bg-purple-500/20' : ''
              }`}
          >
            {category}
          </motion.button>
        ))}
      </div>

      {/* Wardrobe Items */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredWardrobe.length > 0 ? (
          filteredWardrobe.map((item, index) => (
            <motion.div
              key={item.id} // Ensure each item has a unique ID
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="glass group cursor-pointer"
            >
              <div className="aspect-square rounded-lg bg-white/5 flex items-center justify-center relative overflow-hidden">
                {item.image_url ? (
                  <img
                    src={item.image_url}
                    alt={item.tags}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <Image className="w-12 h-12 text-white/30" />
                )}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center space-y-2">
                  <button className="btn-primary text-sm w-32"
                  onClick={() => navigate(`/wardrobe/${item.id}`)}
                  >View Details</button>
                  <button
                    className="btn-delete text-sm w-32"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent card click event
                      handleDelete(item.id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold">{item.tags}</h3>
                <p className="text-white/70 text-sm">{item.category}</p>
              </div>
            </motion.div>
          ))
        ) : (
          <p className="text-white/70">No items found</p>
        )}
      </div>
    </div>
  );
};

export default Wardrobe;
