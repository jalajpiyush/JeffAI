import React from 'react';
import { Plus } from 'lucide-react';
import { Story } from '../../types';

interface StoriesCarouselProps {
  stories: Story[];
}

const StoriesCarousel: React.FC<StoriesCarouselProps> = ({ stories }) => {
  return (
    <div className="flex space-x-4 p-4 overflow-x-auto scrollbar-hide bg-white border-b border-gray-200">
      {/* Add Story Button */}
      <div className="flex-shrink-0 flex flex-col items-center space-y-2">
        <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center cursor-pointer">
          <Plus className="w-8 h-8 text-white" />
        </div>
        <span className="text-xs text-gray-600">Your Story</span>
      </div>

      {/* Stories */}
      {stories.map((story) => (
        <div key={story.id} className="flex-shrink-0 flex flex-col items-center space-y-2 cursor-pointer">
          <div className={`w-16 h-16 rounded-full p-0.5 ${
            story.viewed 
              ? 'bg-gray-300' 
              : 'bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500'
          }`}>
            <img
              src={story.user.avatar}
              alt={story.user.displayName}
              className="w-full h-full rounded-full object-cover border-2 border-white"
            />
          </div>
          <span className="text-xs text-gray-600 max-w-16 truncate">
            {story.user.username}
          </span>
        </div>
      ))}
    </div>
  );
};

export default StoriesCarousel;
