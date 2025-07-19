import React, { useState } from 'react';
import { Image, Video, Smile, MapPin, Users, X } from 'lucide-react';

const CreatePost: React.FC = () => {
  const [postText, setPostText] = useState('');
  const [selectedMedia, setSelectedMedia] = useState<string | null>(null);
  const [postType, setPostType] = useState<'post' | 'reel' | 'story'>('post');

  const handleMediaUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedMedia(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeMedia = () => {
    setSelectedMedia(null);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white border border-gray-200 rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-6">Create New Post</h2>
      
      {/* Post Type Selector */}
      <div className="flex space-x-4 mb-6">
        {(['post', 'reel', 'story'] as const).map((type) => (
          <button
            key={type}
            onClick={() => setPostType(type)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              postType === type
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      {/* Media Upload Area */}
      {selectedMedia ? (
        <div className="relative mb-6">
          <img
            src={selectedMedia}
            alt="Selected media"
            className="w-full max-h-96 object-cover rounded-lg"
          />
          <button
            onClick={removeMedia}
            className="absolute top-2 right-2 p-1 bg-black bg-opacity-50 rounded-full text-white hover:bg-opacity-70"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-6">
          <div className="space-y-4">
            <div className="flex justify-center space-x-4">
              <label className="cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleMediaUpload}
                  className="hidden"
                />
                <div className="flex flex-col items-center space-y-2 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <Image className="w-8 h-8 text-gray-400" />
                  <span className="text-sm text-gray-600">Photo</span>
                </div>
              </label>
              
              <label className="cursor-pointer">
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleMediaUpload}
                  className="hidden"
                />
                <div className="flex flex-col items-center space-y-2 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <Video className="w-8 h-8 text-gray-400" />
                  <span className="text-sm text-gray-600">Video</span>
                </div>
              </label>
            </div>
            <p className="text-gray-500">Drag photos and videos here</p>
          </div>
        </div>
      )}

      {/* Text Input */}
      <div className="mb-6">
        <textarea
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
          placeholder="What's on your mind?"
          className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          rows={3}
        />
      </div>

      {/* Additional Options */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex space-x-4">
          <button className="flex items-center space-x-2 text-gray-600 hover:text-purple-600">
            <Smile className="w-5 h-5" />
            <span>Emoji</span>
          </button>
          <button className="flex items-center space-x-2 text-gray-600 hover:text-purple-600">
            <MapPin className="w-5 h-5" />
            <span>Location</span>
          </button>
          <button className="flex items-center space-x-2 text-gray-600 hover:text-purple-600">
            <Users className="w-5 h-5" />
            <span>Tag People</span>
          </button>
        </div>
      </div>

      {/* Privacy & Share */}
      <div className="flex items-center justify-between">
        <select className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500">
          <option>Everyone</option>
          <option>Friends</option>
          <option>Only Me</option>
        </select>
        
        <button
          disabled={!postText.trim() && !selectedMedia}
          className="px-6 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          Share {postType}
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
