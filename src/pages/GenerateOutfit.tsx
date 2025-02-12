import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Sun,
  Cloud,
  Heart,
  ShoppingBag,
  Building,
  PartyPopper,
  Thermometer,
  Umbrella,
  Snowflake,
  Shirt,
  Star,
  Check,
  X,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import apiClient from '../apiclient';
import { useNavigate } from 'react-router-dom';
import { Typewriter } from 'react-simple-typewriter';

const GenerateOutfit = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    occasion: '',
    weather: '',
    style: '',
    fit: '',
    timeOfDay: '',
    layering: false,
  });

  const [outfits, setOutfits] = useState<{ option: string; items: [] }[]>([]);
  const [currentOutfit, setCurrentOutfit] = useState(0);
  const [showStyleDescription, setShowStyleDescription] = useState(false);
  const [generateClicked, setGenerateClicked] = useState(false);
  const [typewriterText, setTypewriterText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);



  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (showStyleDescription) {
      const suggestionItem = outfits[currentOutfit]?.items.find(item => item.key === "suggestions");
      const suggestion = suggestionItem ? suggestionItem.suggestion : "";
      const text = suggestion
        .split('.')
        .map(sentence => sentence.trim())
        .filter(sentence => sentence)
        .map(sentence => `- ${sentence}`)
        .join('\n');
      setTypewriterText(text);
    } else {
      setTypewriterText(""); // Reset typewriter text when not showing
    }
  }, [showStyleDescription, currentOutfit]);

  const handleChange = (field, value) => {
    // Allow toggling (uncheck functionality)
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field] === value ? '' : value,
    }));
  };

  const transformFormData = () => {
    const transformedData = [
      { id: 0, category: 'Occasion', tag: formData.occasion },
      { id: 1, category: 'Weather', tag: formData.weather },
      { id: 3, category: 'Body Fit', tag: formData.fit },
      { id: 4, category: 'Time of Day', tag: formData.timeOfDay },
      { id: 5, category: 'Layering with other clothes?', tag: formData.layering ? 'Yes' : 'No' },
    ];
    return transformedData;
  };

  const handleGenerateOutfit = async () => {
    setGenerateClicked(true);
    setShowStyleDescription(false);
    setCurrentOutfit(0);
    if (outfits.length) {
      setOutfits([]);
    }
    setLoading(true);
    setError('');
    try {
      const requestPayload = transformFormData();
      const response = await apiClient.post('/ootd', requestPayload);

      const responseData = response.data;
      const parsedOutfits = Object.keys(responseData).map((key) => ({
        option: key,
        items: responseData[key],
      }));

      setOutfits(parsedOutfits);
      console.log('outfits', outfits[currentOutfit].items);
      setCurrentOutfit(0);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch outfits');
    } finally {
      setLoading(false);
    }
  };

  const handleShowStyleDetails = () => {
    setShowStyleDescription(true);
  };

  const handleNextOutfit = () => {
    setCurrentOutfit((prev) => Math.min(prev + 1, outfits.length - 1));
    setShowStyleDescription(false);
  };

  const handlePreviousOutfit = () => {
    setCurrentOutfit((prev) => Math.max(prev - 1, 0));
    setShowStyleDescription(false);
  };

  const scrollOutfits = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.offsetWidth;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const updateScrollState = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, offsetWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + offsetWidth < scrollWidth);
    }
  };

  useEffect(() => {
    updateScrollState();

    const handleResize = () => updateScrollState();
    const scrollableContainer = scrollRef.current;

    if (scrollableContainer) {
      scrollableContainer.addEventListener('scroll', updateScrollState);
    }

    window.addEventListener('resize', handleResize);

    return () => {
      if (scrollableContainer) {
        scrollableContainer.removeEventListener('scroll', updateScrollState);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [outfits]);

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
        {/* Left Panel - Outfit Parameters */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="glass p-8"
        >
          <h2 className="text-2xl font-semibold mb-6">Outfit Parameters</h2>

          <div className="space-y-6">
            {/* Occasion */}
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

            {/* Weather */}
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

            {/* Style */}
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

            {/* Time of Day */}
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

            {/* Layering */}
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

            {/* Generate Outfit Button */}
            <button
              className="btn-primary w-full"
              onClick={handleGenerateOutfit}
            >
              {generateClicked ? "Regenerate Outfit" : "Generate Outfit"}
            </button>
          </div>
        </motion.div>

        {/* Right Panel - Generated Outfits */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="glass p-8"
        >
          <h2 className="text-2xl font-semibold mb-6">Generated Outfits</h2>
          {generateClicked ? (
            outfits.length > 0 ? (
              <div className="space-y-6">
                <div className="relative">
                  {canScrollLeft && (
                    <button
                      className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black/50 p-2 rounded-full"
                      onClick={() => scrollOutfits('left')}
                    >
                      <ChevronLeft className="w-5 h-5 text-white" />
                    </button>
                  )}

                  <div
                    ref={scrollRef}
                    className="flex space-x-4 py-4 overflow-x-auto scrollbar-hide"
                    style={{
                      scrollSnapType: 'x mandatory',
                      WebkitOverflowScrolling: 'touch',
                      overflowX: 'auto',
                      display: 'flex',
                      scrollBehavior: 'smooth',
                      scrollbarWidth: 'none' // For Firefox
                    }}
                  >

                    {outfits[currentOutfit].items.map((item: any, index) => (
                      item.clothId?.image_url ? (
                        <img
                          key={index}
                          src={item.clothId.image_url}
                          alt={`Outfit ${currentOutfit + 1} Image ${index + 1}`}
                          className="rounded-lg w-80 h-80 object-cover"
                        />
                      ) : null
                    ))}
                  </div>

                  {canScrollRight && (
                    <button
                      className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black/50 p-2 rounded-full"
                      onClick={() => scrollOutfits('right')}
                    >
                      <ChevronRight className="w-5 h-5 text-white" />
                    </button>
                  )}
                </div>

                {showStyleDescription ? (
                  <div className="glass p-6 rounded-lg">
                    <div className="reveal-container">
                      {typewriterText &&
                        typewriterText.split('\n').map((line, index) => (
                          <div key={index} className="reveal-line" style={{ animationDelay: `${index * 0.3}s` }}>
                            {line}
                          </div>
                        ))}
                    </div>
                  </div>
                ) : (
                  <button
                    className="btn-primary w-full"
                    onClick={handleShowStyleDetails}
                  >
                    Show Style Details
                  </button>
                )}

                <button
                  className="btn-primary w-full"
                  onClick={() => navigate('/ootd', { state: { outfit: outfits[currentOutfit].items } })}
                >
                  Virtual try on
                </button>


                <div className="flex justify-between mt-6">
                  <button
                    className="btn-secondary disabled:opacity-0"
                    onClick={handlePreviousOutfit}
                    disabled={currentOutfit === 0}
                  >
                    Previous
                  </button>
                  <button
                    className="btn-secondary"
                    onClick={handleNextOutfit}
                    hidden={currentOutfit === outfits.length - 1}
                  >
                    Next
                  </button>
                </div>


              </div>
            ) : (
              <div className="flex justify-center items-center h-full">
                <div className="spinner border-t-purple-500"></div>
              </div>
            )
          ) : (
            <div className="flex flex-col items-center justify-center h-full min-h-[300px]">
              <p className="text-white/50 text-lg text-center">
                Your perfect outfit will appear here! Let the magic happen! ✨
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default GenerateOutfit;
