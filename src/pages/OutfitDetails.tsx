import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Trash2 } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import apiClient from '../apiclient';
import { getCategoriesByGender } from '../categories';
import Swal from 'sweetalert2';

const OutfitDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();



  const [formData, setFormData] = useState({
    tags: 'Summer Casual Outfit',
    description: 'Perfect for warm summer days, combining comfort with style.',
    category: 'Casual',
    subcategory: 'Summer',
    image_url: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&auto=format&fit=crop'
  });
  const [gender, setGender] = useState<string | null>(null);
  const [categories, setCategories] = useState<{ name: string; subcategories: string[] }[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  useEffect(() => {
    const storedGender = (JSON.parse(localStorage.getItem('userInfo')!).gender as 'male' | 'female') || 'male'; // Default to male
    setGender(storedGender);
    setCategories(getCategoriesByGender(storedGender));
  }, []);

  useEffect(() => {
    const fetchClothDetails = async () => {
      try {
        const response = await apiClient.get(`/outfits/${id}`); // Replace with your API endpoint
        setFormData(response.data);
        setSelectedCategory(response.data.category);
        setSelectedSubcategory(response.data.subcategory);
      } catch (error) {
        console.error('Error fetching cloth details:', error);
      }
    };

    fetchClothDetails();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === 'category' && { subcategory: '' }), // Reset subcategory when category changes
    }));
    if (name === 'category') setSelectedCategory(value);
    if (name === 'subcategory') setSelectedSubcategory(value);
  };



  const handleSave = async () => {
    try {
      const repsonse = await apiClient.put(`/outfits/${id}`, formData);
      if (repsonse.status == 200) {
        navigate('/wardrobe');
      }
    }
    catch (error) {
      console.error('Error fetching cloth details:', error);
    }

  };


  const handleDelete = async () => {
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
        
        Swal.fire({
          title: 'Deleted!',
          text: 'Your item has been deleted.',
          icon: 'success',
          confirmButtonColor: '#A855F7', // Same primary color
          background: '#1F2937',
          color: '#FFFFFF',
        });
        navigate('/wardrobe');
      } catch (error) {
        
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

  return (
    <div className="page-container pt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <div className="glass p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-8">Outfit Details</h1>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Image Section */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="aspect-square rounded-lg overflow-hidden bg-white/5"
            >
              <img
                src={formData?.image_url}
                alt="Outfit"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </motion.div>

            {/* Form Section */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="tags"
                  value={formData?.tags}
                  onChange={handleChange}
                  className="input-glass w-full"
                  placeholder="Enter outfit name"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData?.description}
                  onChange={handleChange}
                  className="input-glass w-full min-h-[100px] resize-y"
                  placeholder="Enter outfit description"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="input-glass w-full"
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category.name} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Sub-Category
                </label>
                <select
                  name="subcategory"
                  value={formData.subcategory}
                  onChange={handleChange}
                  className="input-glass w-full"
                   // Disable if no category is selected
                >
                  <option value="">Select Sub-Category</option>
                  {categories
                    .find((cat) => cat.name === selectedCategory)?.subcategories.map(
                      (subCategory) => (
                        <option key={subCategory} value={subCategory}>
                          {subCategory}
                        </option>
                      )
                    )}
                </select>
              </motion.div>
            </div>
          </div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex justify-between items-center mt-12 pt-6 border-t border-white/10"
          >
            <button
              onClick={handleDelete}
              className="btn-secondary px-8 bg-red-500/10 hover:bg-red-500/20 flex items-center justify-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              <span>Delete</span>
            </button>

            <div className="flex gap-6">
              <button
                onClick={() => navigate('/wardrobe')}
                className="btn-secondary px-8"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="btn-primary px-8 flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>Save</span>
              </button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default OutfitDetails; 