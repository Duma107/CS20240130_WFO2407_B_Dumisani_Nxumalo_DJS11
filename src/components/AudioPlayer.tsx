import React, { useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { useStore } from '../store/useStore';

/**
 * Persistent audio player component
 * Stays fixed at the bottom of the screen and maintains state across navigation
 */
export const AudioPlayer: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const { currentEpisode, isPlaying, progress } = useStore((state) => state.audioState);
  const { setIsPlaying, setProgress, addCompletedEpisode } = useStore();

  // Handle audio time updates and track completion
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      const progress = (audio.currentTime / audio.duration) * 100;
      setProgress(progress);
      
      // Mark episode as completed when finished
      if (progress === 100 && currentEpisode) {
        addCompletedEpisode(currentEpisode.id);
      }
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    return () => audio.removeEventListener('timeupdate', handleTimeUpdate);
  }, [currentEpisode]);

  // Prevent accidental navigation while audio is playing
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isPlaying) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isPlaying]);

  if (!currentEpisode) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg">
      <div className="container mx-auto flex items-center gap-4 p-4">
        {/* Play/Pause button */}
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="rounded-full bg-indigo-600 p-2 text-white hover:bg-indigo-700"
        >
          {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
        </button>

        {/* Episode info and progress bar */}
        <div className="flex flex-1 flex-col">
          <div className="mb-2 text-sm font-medium">{currentEpisode.title}</div>
          <div className="h-2 rounded-full bg-gray-200">
            <div
              className="h-full rounded-full bg-indigo-600 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Audio element */}
        <audio
          ref={audioRef}
          src={currentEpisode.file}
          autoPlay={isPlaying}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />
      </div>
    </div>
  );
};