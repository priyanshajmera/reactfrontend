import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Share2, Download, X } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import apiClient from '../apiclient';

const OOTD = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false); // Track if save is successful
  const [saveForm, setSaveForm] = useState({ name: '', occasion: '' });
  const location = useLocation();
  const { outfit } = location.state || {};
  const [currentOutfit] = useState(outfit);
  const [vtonImage, setVtonImage] = useState(null);
  const [top, setTop] = useState(null);
  const [bottom, setBottom] = useState(null);
  const [suggestion, setSuggestion] = useState("");
  const [showNamePopup, setShowNamePopup] = useState(false);
  const [outfitName, setOutfitName] = useState('');

  useEffect(() => {
    if (!currentOutfit) {
      console.error('No outfit data found');
      setIsLoading(false);
      return;
    }

    const topItem = currentOutfit?.find((item) => item.key === 'Top')?.clothId;
    const bottomItem = currentOutfit?.find((item) => item.key === 'Bottom')?.clothId;
    const outfitSuggestion = currentOutfit?.find((item) => item.key === 'suggestions')?.suggestion;

    if (topItem && bottomItem) {
      setTop(topItem);
      setBottom(bottomItem);
      setSuggestion(outfitSuggestion || ""); // Handle empty suggestion
    }

    if (!top || !bottom) {
      console.error('Missing top or bottom item');
      setIsLoading(false);
      return;
    }

    const fetchVtonImage = async () => {
      try {
        const response = await apiClient.post('/virtualtryon', {
          top: top.image_url,
          bottom: bottom.image_url
        });
        setVtonImage(response.data.output); // Save VTON image
      } catch (error) {
        console.error('Error fetching VTON image:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVtonImage();
  }, [currentOutfit, top, bottom]);

  const handleSaveClick = () => {
    if (!saveSuccess) {
      setShowNamePopup(true);
    }
  };

  const handleSubmitName = async () => {
    if (outfitName.trim() && top && bottom && vtonImage && suggestion) {
      try {
        const response = await apiClient.post('/AddToFavorites', {
          top: top.id,
          bottom: bottom.id,
          vtonimage: vtonImage,
          suggestion: suggestion,
          name: outfitName
        });

        if (response.status === 201) {
          setSaveSuccess(true);
          setShowNamePopup(false);
          setOutfitName('');
          console.log("Item successfully saved to favorites.");
        } else {
          alert("Something went wrong. Please try again.");
        }
      } catch (error: any) {
        console.error("Failed to Save:", error);

        if (error.response?.status === 409) {
          alert("This outfit is already in your favorites.");
        } else {
          alert("Unexpected error. Please try again.");
        }
      }
    }
  };

  

  return (
    <div className="page-container pt-24">
      <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="section-title mb-8">
        Outfit of the Day
      </motion.h1>

      <div className="grid lg:grid-cols-3 gap-8">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-2 glass">
          <div className="aspect-[4/5] max-w-[300px] mx-auto sm:max-w-[400px] rounded-t-lg bg-gradient-to-br from-neutral-800 to-neutral-900 flex items-center justify-center overflow-hidden">
            {isLoading ? (
              <div className="text-center px-4">
                <div className="w-12 h-12 border-4 border-purple-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-lg text-white/80">Generating Virtual Try-On</p>
              </div>
            ) : vtonImage ? (
              <img src={`data:image/jpeg;base64,${vtonImage}`} alt="Virtual Try-On" className="w-full h-full object-cover" />
            ) : (
              <div className="text-center text-white/70">Failed to load image</div>
            )}
          </div>

          <div className="p-6 border-t border-white/10">
            <div className="flex justify-between items-center">
              <div className="flex space-x-4">
                <button className="glass p-3 rounded-full hover:bg-white/10 transition-colors"><Heart className="w-5 h-5" /></button>
                <button className="glass p-3 rounded-full hover:bg-white/10 transition-colors"><Share2 className="w-5 h-5" /></button>
                <button className="glass p-3 rounded-full hover:bg-white/10 transition-colors"><Download className="w-5 h-5" /></button>
              </div>
              <button className="btn-primary" disabled={isLoading}>Download Result</button>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="glass p-6">
          <h2 className="text-2xl font-semibold mb-6">Outfit Items</h2>

          <div className="space-y-6">
            {currentOutfit?.map((item) => (
              <div key={item.clothId?.id} className="glass hover:bg-white/5 transition-colors p-4 flex justify-between">
                <img src={item.clothId?.image_url} alt={item.key} className="w-32 h-32 rounded-lg" />
                <div>
                  <h3 className="font-semibold">{item?.clothId?.tags}</h3>
                  <p className="text-white/70 text-sm">{item?.clothId?.subcategory}</p>
                  <span className="text-xs px-2 py-1 rounded-full bg-white/10">{item?.clothId?.category}</span>
                </div>
              </div>
            ))}

            <div className="space-y-4 pt-4 border-t border-white/10">
              <button
                onClick={handleSaveClick}
                className={`w-full ${saveSuccess ? "glass text-green-400 cursor-default" : "btn-primary"}`}
                disabled={saveSuccess}
              >
                {saveSuccess ? "Saved to Favorites ✓" : "Save to Favorites"}
              </button>

            </div>
          </div>
        </motion.div>
      </div>
      {/* Name Input Popup */}
      <AnimatePresence>
        {showNamePopup && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="glass p-6 max-w-md w-full mx-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Name Your Outfit</h3>
                <button onClick={() => { setShowNamePopup(false); setOutfitName(''); }} className="text-white/60 hover:text-white"><X className="w-5 h-5" /></button>
              </div>

              <input type="text" value={outfitName} onChange={(e) => setOutfitName(e.target.value)} placeholder="Enter outfit name" className="input-glass w-full mb-4" autoFocus />
              <button onClick={handleSubmitName} className="btn-primary w-full" disabled={!outfitName.trim()}>Save</button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>


    </div>
  );
};

export default OOTD;
