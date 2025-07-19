import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal, Play, Volume2, VolumeX } from 'lucide-react';
import { Post } from '../../types';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [muted, setMuted] = useState(true);

  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const formatTime = (date: Date): string => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (hours < 1) return 'now';
    if (hours < 24) return `${hours}h`;
    return `${Math.floor(hours / 24)}d`;
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg mb-4">
      {/* Post Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-3">
          <img
            src={post.user.avatar}
            alt={post.user.displayName}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <div className="flex items-center space-x-1">
              <h3 className="font-semibold text-sm">{post.user.displayName}</h3>
              {post.user.verified && (
                <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
              )}
            </div>
            <p className="text-gray-500 text-xs">@{post.user.username} • {formatTime(post.timestamp)}</p>
          </div>
        </div>
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <MoreHorizontal className="w-5 h-5 text-gray-500" />
        </button>
      </div>

      {/* Post Content */}
      {post.content && (
        <div className="px-4 pb-3">
          <p className="text-gray-800">{post.content}</p>
        </div>
      )}

      {/* Post Media */}
      {post.image && (
        <div className="relative">
          <img
            src={post.image}
            alt="Post content"
            className="w-full max-h-96 object-cover"
          />
        </div>
      )}

      {post.video && (
        <div className="relative bg-black">
          <img
            src={post.video}
            alt="Video thumbnail"
            className="w-full max-h-96 object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <button className="w-16 h-16 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
              <Play className="w-8 h-8 text-white ml-1" />
            </button>
          </div>
          {post.type === 'reel' && (
            <button
              onClick={() => setMuted(!muted)}
              className="absolute bottom-4 right-4 p-2 bg-black bg-opacity-50 rounded-full"
            >
              {muted ? (
                <VolumeX className="w-5 h-5 text-white" />
              ) : (
                <Volume2 className="w-5 h-5 text-white" />
              )}
            </button>
          )}
        </div>
      )}

      {/* Post Actions */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setLiked(!liked)}
              className="flex items-center space-x-2 hover:bg-gray-100 rounded-full p-1"
            >
              <Heart
                className={`w-6 h-6 ${
                  liked ? 'text-red-500 fill-current' : 'text-gray-600'
                }`}
              />
            </button>
            <button className="hover:bg-gray-100 rounded-full p-1">
              <MessageCircle className="w-6 h-6 text-gray-600" />
            </button>
            <button className="hover:bg-gray-100 rounded-full p-1">
              <Share2 className="w-6 h-6 text-gray-600" />
            </button>
          </div>
          <button
            onClick={() => setSaved(!saved)}
            className="hover:bg-gray-100 rounded-full p-1"
          >
            <Bookmark
              className={`w-6 h-6 ${
                saved ? 'text-gray-800 fill-current' : 'text-gray-600'
              }`}
            />
          </button>
        </div>

        {/* Post Stats */}
        <div className="space-y-1">
          <p className="font-semibold text-sm">
            {formatNumber(post.likes + (liked ? 1 : 0))} likes
          </p>
          {post.comments > 0 && (
            <button className="text-gray-500 text-sm hover:underline">
              View all {formatNumber(post.comments)} comments
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostCard;
