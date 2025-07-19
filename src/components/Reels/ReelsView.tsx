import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, MoreHorizontal, Volume2, VolumeX, Play } from 'lucide-react';
import { Post } from '../../types';

interface ReelsViewProps {
  reels: Post[];
}

const ReelsView: React.FC<ReelsViewProps> = ({ reels }) => {
  const [currentReel, setCurrentReel] = useState(0);
  const [muted, setMuted] = useState(true);
  const [liked, setLiked] = useState<Set<string>>(new Set());

  const toggleLike = (reelId: string) => {
    setLiked(prev => {
      const newLiked = new Set(prev);
      if (newLiked.has(reelId)) {
        newLiked.delete(reelId);
      } else {
        newLiked.add(reelId);
      }
      return newLiked;
    });
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  if (reels.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center bg-black">
        <p className="text-white text-lg">No reels available</p>
      </div>
    );
  }

  const reel = reels[currentReel];

  return (
    <div className="relative h-screen bg-black overflow-hidden">
      {/* Video Container */}
      <div className="absolute inset-0 flex items-center justify-center">
        <img
          src={reel.video || reel.image}
          alt="Reel content"
          className="h-full w-auto object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <button className="w-20 h-20 bg-black bg-opacity-30 rounded-full flex items-center justify-center">
            <Play className="w-10 h-10 text-white ml-2" />
          </button>
        </div>
      </div>

      {/* Right Side Actions */}
      <div className="absolute right-4 bottom-20 flex flex-col items-center space-y-6">
        <button
          onClick={() => toggleLike(reel.id)}
          className="flex flex-col items-center space-y-1"
        >
          <div className="w-12 h-12 bg-black bg-opacity-30 rounded-full flex items-center justify-center">
            <Heart
              className={`w-7 h-7 ${
                liked.has(reel.id) ? 'text-red-500 fill-current' : 'text-white'
              }`}
            />
          </div>
          <span className="text-white text-xs font-semibold">
            {formatNumber(reel.likes + (liked.has(reel.id) ? 1 : 0))}
          </span>
        </button>

        <button className="flex flex-col items-center space-y-1">
          <div className="w-12 h-12 bg-black bg-opacity-30 rounded-full flex items-center justify-center">
            <MessageCircle className="w-7 h-7 text-white" />
          </div>
          <span className="text-white text-xs font-semibold">{formatNumber(reel.comments)}</span>
        </button>

        <button className="flex flex-col items-center space-y-1">
          <div className="w-12 h-12 bg-black bg-opacity-30 rounded-full flex items-center justify-center">
            <Share2 className="w-7 h-7 text-white" />
          </div>
          <span className="text-white text-xs font-semibold">{formatNumber(reel.shares)}</span>
        </button>

        <button
          onClick={() => setMuted(!muted)}
          className="w-12 h-12 bg-black bg-opacity-30 rounded-full flex items-center justify-center"
        >
          {muted ? (
            <VolumeX className="w-7 h-7 text-white" />
          ) : (
            <Volume2 className="w-7 h-7 text-white" />
          )}
        </button>

        <button className="w-12 h-12 bg-black bg-opacity-30 rounded-full flex items-center justify-center">
          <MoreHorizontal className="w-7 h-7 text-white" />
        </button>
      </div>

      {/* Bottom Content */}
      <div className="absolute bottom-20 left-4 right-20">
        <div className="flex items-center space-x-3 mb-3">
          <img
            src={reel.user.avatar}
            alt={reel.user.displayName}
            className="w-10 h-10 rounded-full object-cover border-2 border-white"
          />
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-white font-semibold">@{reel.user.username}</h3>
              {reel.user.verified && (
                <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
              )}
            </div>
          </div>
          <button className="px-4 py-1 bg-red-600 text-white text-sm font-semibold rounded-md">
            Follow
          </button>
        </div>
        
        {reel.content && (
          <p className="text-white text-sm mb-2">{reel.content}</p>
        )}
      </div>

      {/* Navigation */}
      <div className="absolute left-1/2 transform -translate-x-1/2 bottom-4 flex space-x-2">
        {reels.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentReel(index)}
            className={`w-2 h-2 rounded-full ${
              index === currentReel ? 'bg-white' : 'bg-white bg-opacity-50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ReelsView;
