"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { Car, Car360Config, Car360Hotspot } from "@/lib/types";
import { useApp } from "@/context/AppContext";
import { getCar360Config, DEFAULT_360_HOTSPOTS } from "@/lib/car360";
import {
  RotateCcw,
  Play,
  Pause,
  Compass,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  Info,
  Sparkles,
  Video,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";

interface Car360ViewerProps {
  car: Car;
  customConfig?: Car360Config | null;
  className?: string;
}

export default function Car360Viewer({
  car,
  customConfig,
  className = "",
}: Car360ViewerProps) {
  const { lang, t } = useApp();
  const config = customConfig || getCar360Config(car.ID, car);

  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Angle in degrees (0 to 359)
  const [angle, setAngle] = useState(config?.startAngle || 0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startAngle, setStartAngle] = useState(0);
  const [isAutoSpinning, setIsAutoSpinning] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [activeHotspot, setActiveHotspot] = useState<Car360Hotspot | null>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [useFrames, setUseFrames] = useState(true);

  const totalFrames = config?.totalFrames || 72;
  const frameIndex = Math.floor((angle / 360) * totalFrames) % totalFrames;

  // Frame URL generator
  const getFrameUrl = useCallback(
    (index: number) => {
      const padded = String(index).padStart(3, "0");
      if (config?.framesPattern) {
        return config.framesPattern.replace("%03d", padded);
      }
      return `/cars360/suv/frame_${padded}.webp`;
    },
    [config?.framesPattern]
  );

  // Synchronize video currentTime if in video mode
  useEffect(() => {
    if (!useFrames && videoRef.current && videoRef.current.duration) {
      const dur = videoRef.current.duration;
      const targetTime = (angle / 360) * dur;
      if (Math.abs(videoRef.current.currentTime - targetTime) > 0.05) {
        videoRef.current.currentTime = targetTime;
      }
    }
  }, [angle, useFrames]);

  // Auto-spin animation loop
  useEffect(() => {
    let animId: number;
    if (isAutoSpinning && !isDragging) {
      const spinStep = () => {
        setAngle((prev) => (prev + 0.6) % 360);
        animId = requestAnimationFrame(spinStep);
      };
      animId = requestAnimationFrame(spinStep);
    }
    return () => {
      if (animId) cancelAnimationFrame(animId);
    };
  }, [isAutoSpinning, isDragging]);

  // Drag handlers (Mouse & Touch)
  const handlePointerDown = (clientX: number) => {
    setIsDragging(true);
    setIsAutoSpinning(false);
    setStartX(clientX);
    setStartAngle(angle);
  };

  const handlePointerMove = (clientX: number) => {
    if (!isDragging) return;
    const deltaX = clientX - startX;
    // Sensitivity: 300px drag equals full 360 rotation
    const rotationSensitivity = 360 / 320;
    const directionMult = config?.direction === "ccw" ? 1 : -1;
    let newAngle = (startAngle + deltaX * rotationSensitivity * directionMult) % 360;
    if (newAngle < 0) newAngle += 360;
    setAngle(newAngle);
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  // Preset angles
  const jumpToAngle = (targetDeg: number) => {
    setIsAutoSpinning(false);
    setAngle(targetDeg % 360);
  };

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen?.().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.().catch(() => {});
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFsChange);
    return () => document.removeEventListener("fullscreenchange", handleFsChange);
  }, []);

  // Hotspots visible around this angle
  const hotspots = config?.hotspots || DEFAULT_360_HOTSPOTS;
  const currentHotspots = hotspots.filter((h) => {
    const diff = Math.abs(h.angle - angle);
    const circularDiff = Math.min(diff, 360 - diff);
    return circularDiff <= 40;
  });

  const getHotspotTitle = (h: Car360Hotspot) => {
    if (lang === "ar") return h.titleAr;
    if (lang === "ku") return h.titleKu;
    return h.titleEn;
  };

  const getHotspotDesc = (h: Car360Hotspot) => {
    if (lang === "ar") return h.descriptionAr;
    if (lang === "ku") return h.descriptionKu;
    return h.descriptionEn;
  };

  // Angle compass label
  const getAngleLabel = (deg: number) => {
    if (deg >= 337.5 || deg < 22.5) return t("frontView");
    if (deg >= 67.5 && deg < 112.5) return `${t("sideView")} (90°)`;
    if (deg >= 157.5 && deg < 202.5) return t("rearView");
    if (deg >= 247.5 && deg < 292.5) return `${t("sideView")} (270°)`;
    return `${Math.round(deg)}°`;
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full rounded-2xl overflow-hidden bg-slate-950 text-white select-none border border-slate-800 shadow-2xl flex flex-col justify-between ${
        isFullscreen ? "h-screen w-screen rounded-none" : "min-h-[460px] md:min-h-[520px]"
      } ${className}`}
    >
      {/* Top HUD Bar */}
      <div className="relative z-20 flex items-center justify-between p-4 bg-gradient-to-b from-black/80 via-black/40 to-transparent">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-600/90 text-white text-xs font-bold tracking-wide shadow-md backdrop-blur-md">
            <RotateCcw className="w-3.5 h-3.5 animate-spin-slow" />
            <span>360° SPIN</span>
          </div>

          <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-700/60 text-xs text-slate-300 backdrop-blur-md">
            <Compass className="w-3.5 h-3.5 text-blue-400" />
            <span className="font-semibold text-white">{Math.round(angle)}°</span>
            <span className="text-slate-400">• {getAngleLabel(angle)}</span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">

          <button
            onClick={() => setUseFrames(!useFrames)}
            className="px-2.5 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 transition cursor-pointer"
            title="Switch between high-speed frames and video stream"
          >
            {useFrames ? "HD Frames" : "Video"}
          </button>

          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div
        className="relative flex-1 flex items-center justify-center cursor-grab active:cursor-grabbing overflow-hidden"
        onMouseDown={(e) => handlePointerDown(e.clientX)}
        onMouseMove={(e) => handlePointerMove(e.clientX)}
        onMouseUp={handlePointerUp}
        onMouseLeave={handlePointerUp}
        onTouchStart={(e) => handlePointerDown(e.touches[0].clientX)}
        onTouchMove={(e) => handlePointerMove(e.touches[0].clientX)}
        onTouchEnd={handlePointerUp}
      >
        {/* Subtle Radial Glow in Showroom Background */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="w-[500px] h-[300px] rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />
        </div>

        {/* 360 Media View: Frames or Video */}
        <div
          className="relative transition-transform duration-100 ease-out"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          {useFrames ? (
            /* High-Speed Synchronized WebP Frame */
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={getFrameUrl(frameIndex)}
              alt={`${car.Brand?.BrandNameen || "Car"} 360 exterior spin`}
              className="max-h-[380px] md:max-h-[440px] w-auto object-contain mx-auto pointer-events-none select-none drop-shadow-2xl"
              draggable={false}
            />
          ) : (
            /* HTML5 Video Scrubbing */
            <video
              ref={videoRef}
              src={config?.videoUrl || "/videos/360/suv-360.mp4"}
              playsInline
              muted
              preload="auto"
              onLoadedMetadata={() => setVideoLoaded(true)}
              className="max-h-[380px] md:max-h-[440px] w-auto object-contain mx-auto pointer-events-none select-none drop-shadow-2xl"
            />
          )}

          {/* Interactive Inspection Hotspots Pins */}
          {currentHotspots.map((h) => (
            <div
              key={h.id}
              style={{
                left: `${h.xPercent}%`,
                top: `${h.yPercent}%`,
              }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-30 cursor-pointer pointer-events-auto"
              onClick={(e) => {
                e.stopPropagation();
                setActiveHotspot(activeHotspot?.id === h.id ? null : h);
              }}
            >
              <div className="relative group">
                <span className="flex h-6 w-6 relative items-center justify-center">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-blue-500 border-2 border-white shadow-lg items-center justify-center text-[10px] font-bold text-white">
                    +
                  </span>
                </span>

                {/* Hotspot quick label on hover */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block whitespace-nowrap bg-slate-900/95 border border-slate-700 px-2.5 py-1 rounded text-xs text-white shadow-xl z-40 backdrop-blur-md">
                  {getHotspotTitle(h)}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Hotspot Detail Popover Card */}
        {activeHotspot && (
          <div
            className="absolute bottom-20 left-4 right-4 md:left-auto md:right-6 md:w-80 p-4 rounded-xl bg-slate-900/95 border border-blue-500/40 shadow-2xl backdrop-blur-xl z-40 animate-in fade-in slide-in-from-bottom-2 text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-2 mb-1.5">
              <div className="flex items-center gap-1.5 text-blue-400 font-bold text-xs">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{t("hotspots")}</span>
              </div>
              <button
                onClick={() => setActiveHotspot(null)}
                className="text-slate-400 hover:text-white text-xs px-1.5 py-0.5 rounded bg-slate-800 cursor-pointer"
              >
                ✕
              </button>
            </div>
            <h4 className="font-bold text-sm text-white mb-1">{getHotspotTitle(activeHotspot)}</h4>
            <p className="text-xs text-slate-300 leading-relaxed">{getHotspotDesc(activeHotspot)}</p>
          </div>
        )}

        {/* Center Hint (Only shows on start) */}
        {!isDragging && !isAutoSpinning && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-40 hover:opacity-10 transition">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 border border-white/20 text-white text-xs tracking-wider uppercase font-semibold backdrop-blur-sm">
              <ChevronLeft className="w-4 h-4 animate-pulse" />
              <span>{t("dragToRotate")}</span>
              <ChevronRight className="w-4 h-4 animate-pulse" />
            </div>
          </div>
        )}
      </div>

      {/* Bottom Controls Bar */}
      <div className="relative z-20 p-4 bg-gradient-to-t from-black/90 via-black/60 to-transparent flex flex-wrap items-center justify-between gap-3">
        {/* Angle Presets */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          <button
            onClick={() => jumpToAngle(0)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${
              Math.abs(angle - 0) < 20 || Math.abs(angle - 360) < 20
                ? "bg-blue-600 text-white font-bold shadow-md shadow-blue-500/20"
                : "bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800"
            }`}
          >
            {t("frontView")}
          </button>
          <button
            onClick={() => jumpToAngle(90)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${
              Math.abs(angle - 90) < 20
                ? "bg-blue-600 text-white font-bold shadow-md shadow-blue-500/20"
                : "bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800"
            }`}
          >
            {t("sideView")} (90°)
          </button>
          <button
            onClick={() => jumpToAngle(180)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${
              Math.abs(angle - 180) < 20
                ? "bg-blue-600 text-white font-bold shadow-md shadow-blue-500/20"
                : "bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800"
            }`}
          >
            {t("rearView")}
          </button>
          <button
            onClick={() => jumpToAngle(270)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${
              Math.abs(angle - 270) < 20
                ? "bg-blue-600 text-white font-bold shadow-md shadow-blue-500/20"
                : "bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800"
            }`}
          >
            {t("sideView")} (270°)
          </button>
        </div>

        {/* Rotation & Zoom Controls */}
        <div className="flex items-center gap-2 ml-auto">
          {/* Auto Spin Toggle */}
          <button
            onClick={() => setIsAutoSpinning(!isAutoSpinning)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition shadow-md cursor-pointer ${
              isAutoSpinning
                ? "bg-amber-600 hover:bg-amber-500 text-white"
                : "bg-blue-600 hover:bg-blue-500 text-white"
            }`}
          >
            {isAutoSpinning ? (
              <>
                <Pause className="w-3.5 h-3.5" />
                <span>{t("pauseRotate")}</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{t("autoRotate")}</span>
              </>
            )}
          </button>

          {/* Zoom controls */}
          <button
            onClick={() => setZoomLevel((z) => Math.max(0.8, z - 0.2))}
            disabled={zoomLevel <= 0.8}
            className="p-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 disabled:opacity-30 text-slate-300 border border-slate-800 transition cursor-pointer"
            title="Zoom out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={() => setZoomLevel((z) => Math.min(1.8, z + 0.2))}
            disabled={zoomLevel >= 1.8}
            className="p-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 disabled:opacity-30 text-slate-300 border border-slate-800 transition cursor-pointer"
            title="Zoom in"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
