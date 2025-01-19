import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Star, Sparkles, ThumbsUp, Upload, ChevronRight, Loader } from 'lucide-react';
import { useDropzone } from 'react-dropzone';

const RateOutfit = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [selectedClothes, setSelectedClothes] = useState<number[]>([]);
  const [rating, setRating] = useState<number>(0);
  const [review, setReview] = useState('');
  const [hoveredStar, setHoveredStar] = useState<number>(0);
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [aiRating, setAiRating] = useState<number | null>(null);
  const [aiReview, setAiReview] = useState<string>('');

  // Mock categories and wardrobe data
  const categories = ['Tops', 'Bottoms', 'Dresses', 'Outerwear', 'Shoes', 'Accessories'];
  const wardrobeItems = {
    Tops: [
      { id: 1, name: 'White T-Shirt', image: 'https://via.placeholder.com/150?text=White+T-Shirt' },
      { id: 2, name: 'Blue Shirt', image: 'https://via.placeholder.com/150?text=Blue+Shirt' },
    ],
    Bottoms: [
      { id: 3, name: 'Blue Jeans', image: 'https://via.placeholder.com/150?text=Blue+Jeans' },
      { id: 4, name: 'Black Pants', image: 'https://via.placeholder.com/150?text=Black+Pants' },
    ],
    Dresses: [
      { id: 5, name: 'Summer Dress', image: 'https://via.placeholder.com/150?text=Summer+Dress' },
    ],
    Outerwear: [
      { id: 6, name: 'Black Jacket', image: 'https://via.placeholder.com/150?text=Black+Jacket' },
    ],
    Shoes: [
      { id: 7, name: 'Sneakers', image: 'https://via.placeholder.com/150?text=Sneakers' },
    ],
    Accessories: [
      { id: 8, name: 'Watch', image: 'https://via.placeholder.com/150?text=Watch' },
    ],
  };

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCurrentImage(reader.result as string);
      };
      reader.readAsDataURL(file);

      // Simulate API call to get outfit rating
      setIsLoading(true);
      try {
        // Here you would make the actual API call
        await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API delay
        setAiRating(8); // Mock AI rating
        setAiReview("This outfit shows great style coordination with complementary colors and balanced proportions. The combination of pieces creates a cohesive look that's both trendy and practical.");
      } catch (error) {
        console.error('Error getting outfit rating:', error);
      } finally {
        setIsLoading(false);
      }
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png']
    },
    multiple: false
  });

  const handleClothesSelection = (id: number) => {
    setSelectedClothes(prev => 
      prev.includes(id) 
        ? prev.filter(itemId => itemId !== id)
        : [...prev, id]
    );
  };

  const handleSubmitSelection = async () => {
    setIsLoading(true);
    try {
      // Here you would make the actual API call with selectedClothes
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API delay
      setAiRating(7);
      setAiReview("The selected pieces work well together, creating a balanced ensemble. The color palette is harmonious, and the style combination shows good fashion sense.");
      setStep(2);
    } catch (error) {
      console.error('Error getting outfit rating:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderCurrentOutfitUpload = () => (
    <div className="space-y-6">
      <div
        {...getRootProps()}
        className={`glass p-8 text-center cursor-pointer transition-all duration-300 ${
          isDragActive ? 'border-purple-400 bg-purple-500/20' : ''
        }`}
      >
        <input {...getInputProps()} />
        <Upload className="w-16 h-16 mx-auto mb-4 text-purple-400" />
        <h3 className="text-xl font-semibold mb-2">Upload Your Current Outfit</h3>
        <p className="text-white/60">Drag and drop an image here, or click to select</p>
      </div>

      {currentImage && (
        <div className="glass p-4">
          <img
            src={currentImage}
            alt="Current Outfit"
            className="w-full max-h-96 object-contain rounded-lg"
          />
        </div>
      )}

      {isLoading ? (
        <div className="text-center">
          <Loader className="w-8 h-8 animate-spin mx-auto mb-2 text-purple-400" />
          <p>Analyzing your outfit...</p>
        </div>
      ) : aiRating !== null && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass p-6 space-y-4"
        >
          <h3 className="text-xl font-semibold">AI Rating: {aiRating}/10</h3>
          <p className="text-white/80">{aiReview}</p>
        </motion.div>
      )}
    </div>
  );

  const renderWardrobeSelection = () => (
    <div className="space-y-8">
      {step === 1 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map(category => (
              <div key={category} className="glass p-6">
                <h3 className="text-lg font-semibold mb-4">{category}</h3>
                <div className="grid grid-cols-2 gap-4">
                  {wardrobeItems[category].map(item => (
                    <div
                      key={item.id}
                      onClick={() => handleClothesSelection(item.id)}
                      className={`relative cursor-pointer transition-all duration-300 ${
                        selectedClothes.includes(item.id) ? 'ring-2 ring-purple-400' : ''
                      }`}
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <p className="text-sm mt-2 text-center">{item.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between">
            <button
              onClick={() => setSelectedOption(null)}
              className="btn-secondary px-8"
            >
              Back
            </button>
            <button
              onClick={handleSubmitSelection}
              className="btn-primary px-8"
              disabled={selectedClothes.length === 0}
            >
              Get Rating
              <ChevronRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass p-6 space-y-6"
        >
          {isLoading ? (
            <div className="text-center">
              <Loader className="w-8 h-8 animate-spin mx-auto mb-2 text-purple-400" />
              <p>Analyzing your outfit selection...</p>
            </div>
          ) : (
            <>
              <h3 className="text-xl font-semibold">AI Rating: {aiRating}/10</h3>
              <p className="text-white/80">{aiReview}</p>
              <div className="flex justify-between pt-4">
                <button
                  onClick={() => setStep(1)}
                  className="btn-secondary px-8"
                >
                  Back to Selection
                </button>
                <button
                  onClick={() => setSelectedOption(null)}
                  className="btn-primary px-8"
                >
                  Start Over
                </button>
              </div>
            </>
          )}
        </motion.div>
      )}
    </div>
  );

  return (
    <div className="page-container pt-24">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="section-title mb-12"
      >
        Rate Your Outfit
      </motion.h1>

      {!selectedOption ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
        >
          <button
            onClick={() => setSelectedOption('current')}
            className="glass p-8 text-center hover:scale-105 transition-transform duration-300"
          >
            <ThumbsUp className="w-16 h-16 mx-auto mb-4 text-purple-400" />
            <h2 className="text-2xl font-bold mb-4">Rate Current Outfit</h2>
            <p className="text-white/60">Upload a photo of what you're wearing</p>
          </button>

          <button
            onClick={() => setSelectedOption('wardrobe')}
            className="glass p-8 text-center hover:scale-105 transition-transform duration-300"
          >
            <Sparkles className="w-16 h-16 mx-auto mb-4 text-purple-400" />
            <h2 className="text-2xl font-bold mb-4">Select from Wardrobe</h2>
            <p className="text-white/60">Choose items from your saved clothes</p>
          </button>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto"
        >
          {selectedOption === 'current' ? renderCurrentOutfitUpload() : renderWardrobeSelection()}
        </motion.div>
      )}
    </div>
  );
};

export default RateOutfit;
