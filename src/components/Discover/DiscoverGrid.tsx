import React from 'react';
import { Play, Heart } from 'lucide-react';
import { Post } from '../../types';

interface DiscoverGridProps {
  posts: Post[];
}

const DiscoverGrid: React.FC<DiscoverGridProps> = ({ posts }) => {
  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  return (
    <div className="p-4">
      <div className="grid grid-cols-3 gap-1 md:gap-2">
        {posts.map((post) => (
          <div key={post.id} className="relative aspect-square cursor-pointer group">
            <img
              src={post.image || post.video}
              alt="Post"
              className="w-full h-full object-cover rounded-md"
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 rounded-md flex items-center justify-center">
              {post.video && (
                <Play className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              )}
            </div>

            {/* Stats overlay on hover */}
            <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="flex items-center justify-between text-white text-xs">
                <div className="flex items-center space-x-1">
                  <Heart className="w-3 h-3" />
                  <span>{formatNumber(post.likes)}</span>
                </div>
                {post.type === 'reel' && (
                  <div className="bg-black bg-opacity-50 px-1 py-0.5 rounded text-xs">
                    Reel
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiscoverGrid;
