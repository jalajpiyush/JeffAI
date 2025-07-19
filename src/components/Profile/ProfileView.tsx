import React, { useState } from 'react';
import { Settings, Grid, Video, Bookmark, Users } from 'lucide-react';
import { mockUsers, mockPosts } from '../../data/mockData';
import DiscoverGrid from '../Discover/DiscoverGrid';

const ProfileView: React.FC = () => {
  const [activeTab, setActiveTab] = useState('posts');
  const currentUser = mockUsers[0];
  const userPosts = mockPosts.filter(post => post.user.id === currentUser.id);

  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const tabs = [
    { id: 'posts', icon: Grid, label: 'Posts' },
    { id: 'reels', icon: Video, label: 'Reels' },
    { id: 'saved', icon: Bookmark, label: 'Saved' }
  ];

  return (
    <div className="max-w-4xl mx-auto bg-white">
      {/* Profile Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-8">
          {/* Profile Picture */}
          <div className="relative">
            <img
              src={currentUser.avatar}
              alt={currentUser.displayName}
              className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
            />
          </div>

          {/* Profile Info */}
          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
              <div>
                <div className="flex items-center justify-center md:justify-start space-x-2 mb-2">
                  <h1 className="text-2xl font-light">{currentUser.username}</h1>
                  {currentUser.verified && (
                    <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  )}
                </div>
                
                <div className="flex space-x-8 mb-4">
                  <div className="text-center">
                    <div className="font-semibold">{userPosts.length}</div>
                    <div className="text-gray-500 text-sm">posts</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold">{formatNumber(currentUser.followers)}</div>
                    <div className="text-gray-500 text-sm">followers</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold">{formatNumber(currentUser.following)}</div>
                    <div className="text-gray-500 text-sm">following</div>
                  </div>
                </div>
              </div>

              <div className="flex space-x-3">
                <button className="px-6 py-1.5 bg-blue-500 text-white rounded-md font-semibold hover:bg-blue-600 transition-colors">
                  Edit Profile
                </button>
                <button className="p-1.5 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                  <Settings className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="mt-4">
              <h2 className="font-semibold">{currentUser.displayName}</h2>
              <p className="text-gray-600 mt-1">
                Digital creator • Lifestyle • Travel ✈️<br />
                Living life one adventure at a time 🌟<br />
                📍 New York, NY
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Highlights Section */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex space-x-6 overflow-x-auto">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="flex-shrink-0 text-center">
              <div className="w-16 h-16 bg-gray-200 rounded-full mb-2 cursor-pointer"></div>
              <span className="text-xs text-gray-600">Highlight {index + 1}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex justify-center">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-1 px-6 py-3 text-sm font-medium border-b-2 ${
                activeTab === tab.id
                  ? 'border-gray-900 text-gray-900'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span className="hidden md:inline">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="min-h-96">
        {activeTab === 'posts' && (
          userPosts.length > 0 ? (
            <DiscoverGrid posts={userPosts} />
          ) : (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-16 h-16 border-2 border-gray-300 rounded-full flex items-center justify-center mb-4">
                <Grid className="w-8 h-8 text-gray-300" />
              </div>
              <h3 className="text-xl font-light mb-2">No Posts Yet</h3>
              <p className="text-gray-500">When you share posts, they'll appear here.</p>
            </div>
          )
        )}
        
        {activeTab === 'reels' && (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-16 h-16 border-2 border-gray-300 rounded-full flex items-center justify-center mb-4">
              <Video className="w-8 h-8 text-gray-300" />
            </div>
            <h3 className="text-xl font-light mb-2">No Reels Yet</h3>
            <p className="text-gray-500">When you create reels, they'll appear here.</p>
          </div>
        )}
        
        {activeTab === 'saved' && (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-16 h-16 border-2 border-gray-300 rounded-full flex items-center justify-center mb-4">
              <Bookmark className="w-8 h-8 text-gray-300" />
            </div>
            <h3 className="text-xl font-light mb-2">No Saved Posts</h3>
            <p className="text-gray-500">Save posts to view them later.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileView;
