import React, { useRef, useState } from 'react';
import { ChevronLeft, Camera, Upload, Trash2 } from 'lucide-react';

export default function SnapAndLogScreen({ onBack, onCapture, onAnalyze }) {
  const [price, setPrice] = useState('0.00');
  const [category, setCategory] = useState('photo');
  const [description, setDescription] = useState('');
  const [capturing, setCapturing] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploadedImageName, setUploadedImageName] = useState('');
  const fileInputRef = useRef(null);

  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  const handleImageSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setUploadedImage(reader.result);
      setUploadedImageName(file.name);
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const clearImage = () => {
    setUploadedImage(null);
    setUploadedImageName('');
  };

  const handleCapture = () => {
    setCapturing(true);
    // Simulate capture with slight delay
    setTimeout(() => {
      onCapture?.({
        price,
        category,
        description,
        image: uploadedImage,
        imageName: uploadedImageName,
      });
      setCapturing(false);
    }, 400);
  };

  const handlePriceChange = (e) => {
    const value = e.target.value.replace(/[^0-9.]/g, '');
    setPrice(value || '0.00');
  };

  return (
    <div className="relative h-full w-full text-white overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-app-gradient" />

      <div className="relative h-full flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-5 pt-4 pb-3 flex-shrink-0 flex items-center justify-between">
          <button
            onClick={onBack}
            className="h-9 w-9 rounded-full bg-white/10 ring-1 ring-white/15 flex items-center justify-center hover:bg-white/15 transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <p className="text-[16px] font-semibold">Log a Purchase</p>
          <div className="h-9 w-9" />
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto no-scrollbar">
          {/* Camera Viewfinder */}
          <div className="px-5 py-4 flex items-center justify-center">
            <div className="w-full aspect-[3/4] rounded-3xl bg-gradient-to-br from-violet/20 to-magenta/20 ring-1 ring-white/10 overflow-hidden flex items-center justify-center relative">
              {/* Camera placeholder with gradient */}
              <div className="absolute inset-0 bg-gradient-to-b from-bg-900/50 via-bg-800/50 to-bg-700/50" />
              
              {/* Grid overlay */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-1/3 left-0 right-0 h-px bg-white" />
                <div className="absolute top-2/3 left-0 right-0 h-px bg-white" />
                <div className="absolute left-1/3 top-0 bottom-0 w-px bg-white" />
                <div className="absolute left-2/3 top-0 bottom-0 w-px bg-white" />
              </div>

              {/* Camera icon / uploaded preview */}
              <div className="relative z-10 flex flex-col items-center gap-3 px-5 text-center">
                {uploadedImage ? (
                  <div className="w-full max-w-[220px] rounded-2xl overflow-hidden ring-1 ring-white/15 shadow-[0_12px_40px_rgba(0,0,0,0.35)]">
                    <img src={uploadedImage} alt={uploadedImageName || 'Uploaded receipt'} className="w-full h-40 object-cover" />
                  </div>
                ) : (
                  <div className="h-16 w-16 rounded-full bg-white/10 ring-1 ring-white/20 flex items-center justify-center">
                    <Camera size={32} className="text-white/40" strokeWidth={1.5} />
                  </div>
                )}
                <p className="text-[13px] text-text-secondary">
                  {uploadedImage ? uploadedImageName || 'Image uploaded' : 'Point at your meal or receipt'}
                </p>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={openFilePicker}
                    className="inline-flex items-center gap-2 rounded-full bg-white/10 ring-1 ring-white/15 px-3.5 py-2 text-[12px] font-semibold text-white hover:bg-white/15 transition-colors"
                  >
                    <Upload size={14} />
                    Upload image
                  </button>
                  {uploadedImage && (
                    <button
                      type="button"
                      onClick={clearImage}
                      className="inline-flex items-center gap-2 rounded-full bg-white/5 ring-1 ring-white/10 px-3.5 py-2 text-[12px] font-semibold text-text-secondary hover:bg-white/10 hover:text-white transition-colors"
                    >
                      <Trash2 size={14} />
                      Remove
                    </button>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageSelect}
                  className="hidden"
                />
              </div>

              {/* Capture indicator */}
              {capturing && (
                <div className="absolute inset-0 bg-white/20 animate-pulse flex items-center justify-center">
                  <div className="h-12 w-12 rounded-full border-2 border-white animate-spin" />
                </div>
              )}
            </div>
          </div>

          {/* Quick Input Form (Glassmorphism) */}
          <div className="px-5 pb-6">
            <div className="glass card-hi rounded-3xl p-5 ring-1 ring-white/15">
              {/* Price Input */}
              <div className="mb-4">
                <label className="text-[11px] text-text-secondary uppercase tracking-wider font-semibold">
                  Amount
                </label>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-[12px] font-medium text-text-secondary">RM</span>
                  <input
                    type="text"
                    value={price}
                    onChange={handlePriceChange}
                    placeholder="0.00"
                    className="flex-1 bg-transparent text-[36px] font-extrabold text-white outline-none placeholder-white/20"
                  />
                </div>
                <div className="mt-2 h-0.5 rounded-full bg-gradient-to-r from-violet-glow via-accent-pink to-transparent" />
              </div>

              {/* Category Toggle */}
              <div className="mb-4 flex gap-2">
                {[
                  { id: 'photo', label: '📸 Photo', icon: '📸' },
                  { id: 'receipt', label: '🧾 Receipt', icon: '🧾' },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setCategory(cat.id)}
                    className={`flex-1 py-2.5 rounded-2xl font-semibold text-[13px] transition-all ${
                      category === cat.id
                        ? 'bg-violet-grad text-white shadow-[0_6px_20px_rgba(124,58,237,0.4)]'
                        : 'bg-white/10 text-text-secondary ring-1 ring-white/20 hover:bg-white/15'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Description Prompt */}
              <div className="mb-5">
                <label className="text-[11px] text-text-secondary uppercase tracking-wider font-semibold">
                  What did you get?
                </label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="e.g., Nasi Goreng, Coffee..."
                  className="w-full mt-2 bg-white/10 border-0 rounded-xl px-3 py-2.5 text-[13px] text-white placeholder-white/40 outline-none ring-1 ring-white/10 focus:ring-violet-glow/50 transition-all"
                />
              </div>

              {/* Capture Button */}
              <button
                onClick={handleCapture}
                disabled={capturing}
                className="w-full rounded-2xl bg-violet-grad py-3.5 text-[15px] font-bold text-white shadow-[0_10px_30px_rgba(124,58,237,0.6)] hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Camera size={18} strokeWidth={2.5} />
                <span>{capturing ? 'Capturing...' : 'Capture & Analyze'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
