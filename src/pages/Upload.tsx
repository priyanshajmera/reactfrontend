import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Upload as UploadIcon, FolderPlus, Tag, XCircle } from 'lucide-react';
import { getCategoriesByGender } from '../categories';
import apiClient from '../apiclient';
import Swal from 'sweetalert2';



const Upload = () => {
  const [gender, setGender] = useState<string | null>(null);
  const [categories, setCategories] = useState<{ name: string; subcategories: string[] }[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [itemName, setItemName] = useState('');
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const storedGender = (JSON.parse(localStorage.getItem('userInfo')!)?.gender as 'male' | 'female') || 'male'; // Default to male
    setGender(storedGender);
    setCategories(getCategoriesByGender(storedGender));
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];

      if (!allowedTypes.includes(file.type)) {
        alert('Only image files (JPEG, PNG, GIF) are allowed.');
        return;
      }

      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file)); // Generate preview URL
    }
  };

  const handleRemoveImage = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  const handleUpload = async () => {
    if (!selectedFile || !selectedCategory || !selectedSubcategory || !itemName) {
      Swal.fire({
        icon: 'warning',
        title: 'Missing Fields',
        text: 'Please complete all fields before uploading.',
      });
      return;
    }
  
    const formData = new FormData();
    formData.append('category', selectedCategory);
    formData.append('subcategory', selectedSubcategory);
    formData.append('tags', itemName);
    formData.append('image', selectedFile);
  
    let currentMessageIndex = 0;
    const messages = ['Uploading file...', 'Analyzing...','Removing Background...','Generating Description...'];
    let messageInterval: NodeJS.Timeout | undefined;
    // Function to update SweetAlert messages periodically
    const updateMessage = () => {
      Swal.update({
        text: messages[currentMessageIndex],
      });
      Swal.showLoading();
      currentMessageIndex = (currentMessageIndex + 1) % messages.length; // Cycle through messages
    };
  
    try {
      console.log('Upload clicked');
      // Show initial alert with loader
      Swal.fire({
        
        text: messages[0],
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        
        willOpen: () => {
          Swal.showLoading();
        },
      });
  
      // Start the message update interval
       messageInterval = setInterval(updateMessage, 3000); // Change message every 3 seconds
  
      // Perform the actual upload
      const response = await apiClient.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      // Clear the message interval after the upload completes
      clearInterval(messageInterval);
  
      if (response.status === 201) {
        Swal.fire({
          icon: 'success',
          title: 'Upload Successful',
          text: 'Your item has been uploaded successfully!',
        });
  
        // Reset form state if needed
        handleRemoveImage();
        setItemName('');
        setSelectedCategory('');
        setSelectedSubcategory('');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Upload Failed',
          text: 'Failed to upload. Please try again.',
        });
      }
    } catch (error) {

      clearInterval(messageInterval);
      console.error('Error uploading file:', error);
  
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while uploading the file. Please try again.',
      });
    } finally {
      setUploading(false);
    }
  };
  
  

  return (
    <div className="page-container pt-24">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="section-title"
      >
        Upload Your Wardrobe
      </motion.h1>

      <div className="grid lg:grid-cols-3 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2"
        >
          <div className="category-card mb-8">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Tag className="w-5 h-5 mr-2 text-purple-400" />
              Select Category
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {categories.map((category) => (
                <button
                  key={category.name}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`p-4 rounded-xl border ${selectedCategory === category.name
                    ? 'border-purple-400 bg-purple-400/10'
                    : 'border-white/10 hover:border-white/20'
                    } transition-all duration-300`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {selectedCategory && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="category-card"
            >
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <FolderPlus className="w-5 h-5 mr-2 text-purple-400" />
                Select Subcategory
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {categories
                  .find((cat) => cat.name === selectedCategory)
                  ?.subcategories.map((sub) => (
                    <button
                      key={sub}
                      onClick={() => setSelectedSubcategory(sub)}
                      className={`p-4 rounded-xl border ${selectedSubcategory === sub
                        ? 'border-purple-400 bg-purple-400/10'
                        : 'border-white/10 hover:border-white/20'
                        } transition-all duration-300`}
                    >
                      {sub}
                    </button>
                  ))}
              </div>
            </motion.div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="category-card h-fit"
        >
          <input
            type="text"
            placeholder="Enter item name"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            className="text-black mb-4 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-purple-400"
          />
          <div className="text-center p-8 border-2 border-dashed border-white/10 rounded-xl hover:border-purple-400/30 transition-all duration-300 cursor-pointer relative">
            {!previewUrl ? (
              <>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-input"
                />
                <label htmlFor="file-input" className="cursor-pointer">
                  <UploadIcon className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Upload Image</h3>
                </label>
              </>
            ) : (
              <>
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="mt-4 max-w-full h-auto rounded-lg"
                />
                <button
                  onClick={handleRemoveImage}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2"
                >
                  <XCircle className="w-5 h-5" />
                </button>
              </>
            )}
          </div>
          <button
            onClick={handleUpload}
            disabled={uploading}
            className="mt-4 w-full bg-purple-400 text-white py-2 px-4 rounded-lg"
          >
            {uploading ? 'Uploading...' : 'Submit'}
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Upload;
