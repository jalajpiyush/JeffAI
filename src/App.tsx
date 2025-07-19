import React, { useState } from 'react';
import Navbar from './components/Layout/Navbar';
import StoriesCarousel from './components/Stories/StoriesCarousel';
import PostsList from './components/Posts/PostsList';
import ReelsView from './components/Reels/ReelsView';
import DiscoverGrid from './components/Discover/DiscoverGrid';
import ProfileView from './components/Profile/ProfileView';
import CreatePost from './components/Create/CreatePost';
import { mockPosts, mockStories } from './data/mockData';

function App() {
  const [activeTab, setActiveTab] = useState('home');

  const reelsData = mockPosts.filter(post => post.type === 'reel' || post.type === 'video');
  const discoverPosts = mockPosts.filter(post => post.image || post.video);

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div className="pt-16 md:pt-20 pb-16 md:pb-0">
            <StoriesCarousel stories={mockStories} />
            <div className="p-4">
              <PostsList posts={mockPosts} />
            </div>
          </div>
        );
      
      case 'discover':
        return (
          <div className="pt-16 md:pt-20 pb-16 md:pb-0">
            <div className="p-4">
              <h2 className="text-2xl font-bold mb-4">Discover</h2>
              <DiscoverGrid posts={discoverPosts} />
            </div>
          </div>
        );
      
      case 'reels':
        return (
          <div className="pt-0 md:pt-20">
            <ReelsView reels={reelsData} />
          </div>
        );
      
      case 'create':
        return (
          <div className="pt-16 md:pt-20 pb-16 md:pb-0 p-4">
            <CreatePost />
          </div>
        );
      
      case 'profile':
        return (
          <div className="pt-16 md:pt-20 pb-16 md:pb-0">
            <ProfileView />
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="min-h-screen">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;
