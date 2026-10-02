"use client";

import React, { useState, useRef } from "react";
import { Car, Car360Config } from "@/lib/types";
import { useApp } from "@/context/AppContext";
import { SAMPLE_360_PRESETS, saveCustomCar360, DEFAULT_360_HOTSPOTS } from "@/lib/car360";
import {
  X,
  Upload,
  Video,
  CheckCircle2,
  Sparkles,
  Camera,
  RotateCw,
  Sun,
  ShieldCheck,
  Play,
  RotateCcw,
  Sliders,
  Car as CarIcon,
} from "lucide-react";

interface Seller360StudioModalProps {
  isOpen: boolean;
  onClose: () => void;
  cars: Car[];
  initialCar?: Car | null;
}

export default function Seller360StudioModal({
  isOpen,
  onClose,
  cars,
  initialCar,
}: Seller360StudioModalProps) {
  const { lang, t } = useApp();

  const [selectedCarId, setSelectedCarId] = useState<number>(initialCar?.ID || cars[0]?.ID || 0);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string>(SAMPLE_360_PRESETS[0].videoUrl);
  const [direction, setDirection] = useState<"cw" | "ccw">("cw");
  const [startAngle, setStartAngle] = useState<number>(0);
  const [isSaved, setIsSaved] = useState(false);
  const [testAngle, setTestAngle] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startAngleDrag, setStartAngleDrag] = useState(0);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const previewVideoRef = useRef<HTMLVideoElement>(null);

  if (!isOpen) return null;

  const activeCar = cars.find((c) => c.ID === selectedCarId) || initialCar || cars[0];

  // File selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideoFile(file);
      const url = URL.createObjectURL(file);
      setVideoPreviewUrl(url);
      setIsSaved(false);
    }
  };

  // Preset sample selection
  const handleSelectPreset = (preset: typeof SAMPLE_360_PRESETS[0]) => {
    setVideoFile(null);
    setVideoPreviewUrl(preset.videoUrl);
    setIsSaved(false);
  };

  // Drag scrubber for live test drive
  const handlePointerDown = (clientX: number) => {
    setIsDragging(true);
    setStartX(clientX);
    setStartAngleDrag(testAngle);
  };

  const handlePointerMove = (clientX: number) => {
    if (!isDragging) return;
    const deltaX = clientX - startX;
    const dirMult = direction === "ccw" ? 1 : -1;
    let newAngle = (startAngleDrag + (deltaX * 360) / 300 * dirMult) % 360;
    if (newAngle < 0) newAngle += 360;
    setTestAngle(newAngle);

    if (previewVideoRef.current && previewVideoRef.current.duration) {
      previewVideoRef.current.currentTime = (newAngle / 360) * previewVideoRef.current.duration;
    }
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  // Save 360 to Car
  const handleSaveToCar = () => {
    if (!activeCar) return;
    const newConfig: Car360Config = {
      available: true,
      type: "video",
      videoUrl: videoPreviewUrl,
      direction,
      startAngle,
      totalFrames: 72,
      durationSeconds: 3.0,
      hotspots: DEFAULT_360_HOTSPOTS,
    };
    saveCustomCar360(activeCar.ID, newConfig);
    setIsSaved(true);
    setTimeout(() => {
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden text-white my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/80">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span>{t("sellerStudioTitle")}</span>
                <span className="px-2 py-0.5 rounded-full bg-blue-600/30 text-blue-400 text-[11px] font-semibold">
                  AI 360 Tool
                </span>
              </h3>
              <p className="text-xs text-slate-400">{t("sellerStudioDesc")}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Section 1: Suggestions & Recording Guide */}
          <div>
            <h4 className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span>Suggested 360 Recording Instructions for Sellers</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {/* Step 1 */}
              <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 flex flex-col">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-xs mb-1.5">
                  <Sun className="w-4 h-4" />
                  <span>{t("step1Title")}</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed flex-1">{t("step1Desc")}</p>
              </div>

              {/* Step 2 */}
              <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 flex flex-col">
                <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs mb-1.5">
                  <Camera className="w-4 h-4" />
                  <span>{t("step2Title")}</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed flex-1">{t("step2Desc")}</p>
              </div>

              {/* Step 3 */}
              <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 flex flex-col">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs mb-1.5">
                  <RotateCw className="w-4 h-4" />
                  <span>{t("step3Title")}</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed flex-1">{t("step3Desc")}</p>
              </div>

              {/* Step 4 */}
              <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 flex flex-col">
                <div className="flex items-center gap-2 text-blue-400 font-bold text-xs mb-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{t("step4Title")}</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed flex-1">{t("step4Desc")}</p>
              </div>
            </div>
          </div>

          {/* Section 2: Vehicle Selection & Video Uploader */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left: Upload and Controls */}
            <div className="space-y-4">
              {/* Select Car to Attach to */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <CarIcon className="w-4 h-4 text-blue-400" />
                  <span>Select Vehicle to Attach 360 View:</span>
                </label>
                <select
                  value={selectedCarId}
                  onChange={(e) => {
                    setSelectedCarId(Number(e.target.value));
                    setIsSaved(false);
                  }}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  {cars.slice(0, 30).map((c) => (
                    <option key={c.ID} value={c.ID}>
                      {c.Year?.YearName} {c.Brand?.BrandNameen} {c.Model?.ModelNameen} — ${c.Price?.toLocaleString()} (ID: {c.ID})
                    </option>
                  ))}
                </select>
              </div>

              {/* Video File Dropzone */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  {t("uploadVideo")}
                </label>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="group relative p-6 rounded-xl border-2 border-dashed border-slate-700 hover:border-blue-500 bg-slate-800/40 hover:bg-slate-800/80 transition flex flex-col items-center justify-center text-center cursor-pointer"
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="video/mp4,video/quicktime,video/webm"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <div className="w-12 h-12 rounded-full bg-blue-600/20 text-blue-400 group-hover:scale-110 transition flex items-center justify-center mb-2">
                    <Upload className="w-6 h-6" />
                  </div>
                  <p className="text-xs font-semibold text-white mb-1">
                    {videoFile ? videoFile.name : t("dragDropVideo")}
                  </p>
                  <p className="text-[11px] text-slate-400">
                    Supports MP4, MOV, WebM (Recommended: 10-15s circle video)
                  </p>
                </div>
              </div>

              {/* Preset Test Videos */}
              <div>
                <span className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Or Test with Showroom Sample Clips:
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {SAMPLE_360_PRESETS.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => handleSelectPreset(p)}
                      className={`p-2 rounded-lg text-left text-xs border transition cursor-pointer ${
                        videoPreviewUrl === p.videoUrl && !videoFile
                          ? "bg-blue-600/30 border-blue-500 text-white font-bold"
                          : "bg-slate-800/50 border-slate-700 text-slate-300 hover:bg-slate-800"
                      }`}
                    >
                      <span className="block text-[11px] truncate">
                        {p.id === "suv" ? "SUV" : p.id === "sedan" ? "Sedan" : "Coupe"}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Spin Fine-Tuning */}
              <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700/60 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300 font-semibold flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5 text-blue-400" />
                    <span>Walk Direction:</span>
                  </span>
                  <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-700">
                    <button
                      type="button"
                      onClick={() => setDirection("cw")}
                      className={`px-2.5 py-1 rounded text-xs transition cursor-pointer ${
                        direction === "cw" ? "bg-blue-600 text-white font-bold" : "text-slate-400"
                      }`}
                    >
                      Clockwise
                    </button>
                    <button
                      type="button"
                      onClick={() => setDirection("ccw")}
                      className={`px-2.5 py-1 rounded text-xs transition cursor-pointer ${
                        direction === "ccw" ? "bg-blue-600 text-white font-bold" : "text-slate-400"
                      }`}
                    >
                      Counter-CW
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300 font-semibold">Start Angle Offset:</span>
                  <div className="flex items-center gap-2">
                    <input
                      type="range"
                      min="0"
                      max="360"
                      step="15"
                      value={startAngle}
                      onChange={(e) => setStartAngle(Number(e.target.value))}
                      className="w-28 accent-blue-500 cursor-pointer"
                    />
                    <span className="text-white font-mono text-xs w-8 text-right">{startAngle}°</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Live Interactive 360 Test Drive */}
            <div className="flex flex-col">
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center justify-between">
                <span>{t("testDrive360")} (Drag Left/Right to Spin):</span>
                <span className="text-blue-400 font-mono text-xs">{Math.round(testAngle)}°</span>
              </label>

              <div
                className="relative flex-1 min-h-[280px] rounded-xl overflow-hidden bg-slate-950 border border-slate-700 flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
                onMouseDown={(e) => handlePointerDown(e.clientX)}
                onMouseMove={(e) => handlePointerMove(e.clientX)}
                onMouseUp={handlePointerUp}
                onMouseLeave={handlePointerUp}
                onTouchStart={(e) => handlePointerDown(e.touches[0].clientX)}
                onTouchMove={(e) => handlePointerMove(e.touches[0].clientX)}
                onTouchEnd={handlePointerUp}
              >
                <video
                  ref={previewVideoRef}
                  src={videoPreviewUrl}
                  playsInline
                  muted
                  preload="auto"
                  className="max-h-[240px] w-auto object-contain mx-auto pointer-events-none drop-shadow-2xl"
                />

                {/* HUD Overlay */}
                <div className="absolute top-2 left-2 px-2.5 py-1 rounded-md bg-black/70 border border-slate-700 text-[11px] text-white flex items-center gap-1.5 backdrop-blur-sm">
                  <RotateCcw className="w-3 h-3 text-blue-400" />
                  <span>360° Live Preview</span>
                </div>

                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/60 border border-white/20 text-[11px] text-slate-300 pointer-events-none">
                  ↔ Drag horizontally to test spin
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-4">
                <button
                  type="button"
                  onClick={handleSaveToCar}
                  disabled={isSaved}
                  className={`w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-xl cursor-pointer ${
                    isSaved
                      ? "bg-emerald-600 text-white"
                      : "bg-blue-600 hover:bg-blue-500 active:scale-[0.99] text-white"
                  }`}
                >
                  {isSaved ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{t("savedSuccess")}</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>{t("save360ToCar")}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
