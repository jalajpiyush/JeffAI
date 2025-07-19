import React from 'react';
import PostCard from './PostCard';
import { Post } from '../../types';

interface PostsListProps {
  posts: Post[];
}

const PostsList: React.FC<PostsListProps> = ({ posts }) => {
  return (
    <div className="max-w-2xl mx-auto">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostsList;
