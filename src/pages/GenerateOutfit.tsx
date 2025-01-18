import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sun, Cloud, Heart, Briefcase, ShoppingBag, Building, PartyPopper, Thermometer, Umbrella, Snowflake, Shirt, Star, Check, X } from 'lucide-react';

const GenerateOutfit = () => {
  const [formData, setFormData] = useState({
    occasion: '',
    weather: '',
    style: '',
    fit: '',
    timeOfDay: '',
    layering: false,
  });

  const [outfits, setOutfits] = useState([
    {
      id: 1,
      images: [
        "https://via.placeholder.com/400/0000FF/FFFFFF?text=Outfit+1+Pic+1",
        "https://via.placeholder.com/400/FF0000/FFFFFF?text=Outfit+1+Pic+2",
        "https://via.placeholder.com/400/00FF00/FFFFFF?text=Outfit+1+Pic+3"
      ],
      styleDescription: "This outfit combines trendy and minimalistic elements for a stylish yet comfortable look.",
    },
    {
      id: 2,
      images: [
        "https://via.placeholder.com/400/FF00FF/FFFFFF?text=Outfit+2+Pic+1",
        "https://via.placeholder.com/400/FFFF00/FFFFFF?text=Outfit+2+Pic+2",
        "https://via.placeholder.com/400/00FFFF/FFFFFF?text=Outfit+2+Pic+3"
      ],
      styleDescription: "A classic outfit designed for both elegance and versatility.",
    },
  ]);
  const [currentOutfit, setCurrentOutfit] = useState(0);
  const [showStyleDescription, setShowStyleDescription] = useState(false);
  const [typedText, setTypedText] = useState('');

  useEffect(() => {
    setShowStyleDescription(false); // Reset styling description visibility
    setTypedText(''); // Clear any existing text
  }, [currentOutfit]);

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <div className="page-container pt-24">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="section-title"
      >
        Generate Your Perfect Outfit
      </motion.h1>

      <div className="grid md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="glass p-8"
        >
          <h2 className="text-2xl font-semibold mb-6">Outfit Parameters</h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-white/80 mb-2">Occasion</label>
              <div className="grid grid-cols-3 gap-4">
                {[{ label: 'Casual', icon: ShoppingBag }, { label: 'Work', icon: Building }, { label: 'Party', icon: PartyPopper }].map(({ label, icon: Icon }) => (
                  <button
                    key={label}
                    onClick={() => handleChange('occasion', label)}
                    className={`glass p-4 flex items-center justify-center space-x-2 transition-colors hover:bg-purple-500/30 ${formData.occasion === label ? 'bg-purple-500/20' : ''}`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-white/80 mb-2">Weather</label>
              <div className="grid grid-cols-3 gap-4">
                {[{ label: 'Hot', icon: Thermometer }, { label: 'Rainy', icon: Umbrella }, { label: 'Cold', icon: Snowflake }].map(({ label, icon: Icon }) => (
                  <button
                    key={label}
                    onClick={() => handleChange('weather', label)}
                    className={`glass p-4 flex items-center justify-center space-x-2 transition-colors hover:bg-purple-500/30 ${formData.weather === label ? 'bg-purple-500/20' : ''}`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-white/80 mb-2">Style</label>
              <div className="grid grid-cols-3 gap-4">
                {[{ label: 'Classic', icon: Shirt }, { label: 'Minimalistic', icon: Heart }, { label: 'Trendy', icon: Star }].map(({ label, icon: Icon }) => (
                  <button
                    key={label}
                    onClick={() => handleChange('style', label)}
                    className={`glass p-4 flex items-center justify-center space-x-2 transition-colors hover:bg-purple-500/30 ${formData.style === label ? 'bg-purple-500/20' : ''}`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-white/80 mb-2">Fit</label>
              <div className="grid grid-cols-3 gap-4">
                {[{ label: 'Loose', icon: Shirt }, { label: 'Fitted', icon: Heart }, { label: 'Relaxed', icon: ShoppingBag }].map(({ label, icon: Icon }) => (
                  <button
                    key={label}
                    onClick={() => handleChange('fit', label)}
                    className={`glass p-4 flex items-center justify-center space-x-2 transition-colors hover:bg-purple-500/30 ${formData.fit === label ? 'bg-purple-500/20' : ''}`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-white/80 mb-2">Time of Day</label>
              <div className="grid grid-cols-2 gap-4">
                {[{ label: 'Day', icon: Sun }, { label: 'Night', icon: Cloud }].map(({ label, icon: Icon }) => (
                  <button
                    key={label}
                    onClick={() => handleChange('timeOfDay', label)}
                    className={`glass p-4 flex items-center justify-center space-x-2 transition-colors hover:bg-purple-500/30 ${formData.timeOfDay === label ? 'bg-purple-500/20' : ''}`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-white/80 mb-2">Layering</label>
              <div className="grid grid-cols-2 gap-4">
                {[{ label: 'Yes', icon: Check }, { label: 'No', icon: X }].map(({ label, icon: Icon }) => (
                  <button
                    key={label}
                    onClick={() => handleChange('layering', label === 'Yes')}
                    className={`glass p-4 flex items-center justify-center space-x-2 transition-colors hover:bg-purple-500/30 ${formData.layering === (label === 'Yes') ? 'bg-purple-500/20' : ''}`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{label}</span>
                  </button>
                ))}
              </div>
            </div>

            <button className="btn-primary w-full">Generate Outfit</button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="glass p-8"
        >
          <h2 className="text-2xl font-semibold mb-6">Generated Outfits</h2>
          <div className="space-y-6">
            <div className="overflow-x-scroll flex space-x-4 py-4">
              {outfits[currentOutfit].images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Outfit ${currentOutfit + 1} Image ${index + 1}`}
                  className="rounded-lg w-80 h-80 object-cover"
                />
              ))}
            </div>

            {showStyleDescription ? (
              <div className="glass p-6 rounded-lg">
                <p className="typewriter-text text-white/80">{typedText}</p>
              </div>
            ) : (
              <button 
                className="btn-primary w-full" 
                onClick={() => setShowStyleDescription(true)}
              >
                Show Style Details
              </button>
            )}

            <div className="flex justify-between mt-6">
              <button
                className="btn-secondary"
                onClick={() => setCurrentOutfit((prev) => Math.max(prev - 1, 0))}
                disabled={currentOutfit === 0}
              >
                Previous
              </button>
              <button
                className="btn-secondary"
                onClick={() => setCurrentOutfit((prev) => Math.min(prev + 1, outfits.length - 1))}
                disabled={currentOutfit === outfits.length - 1}
              >
                Next
              </button>
            </div>

            <button className="glass w-full py-3 mt-6" onClick={() => alert('Outfit regenerated!')}>Try Another</button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default GenerateOutfit;
