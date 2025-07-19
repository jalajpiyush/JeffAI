import { faker } from '@faker-js/faker';
import { User, Post, Story } from '../types';

// Generate mock users
export const generateUsers = (count: number): User[] => {
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    username: faker.internet.username(),
    displayName: faker.person.fullName(),
    avatar: faker.image.avatar(),
    followers: faker.number.int({ min: 100, max: 100000 }),
    following: faker.number.int({ min: 50, max: 5000 }),
    verified: faker.datatype.boolean({ probability: 0.1 })
  }));
};

// Generate mock posts
export const generatePosts = (users: User[], count: number): Post[] => {
  const postTypes: ('text' | 'image' | 'video' | 'reel')[] = ['text', 'image', 'video', 'reel'];
  
  return Array.from({ length: count }, () => {
    const type = faker.helpers.arrayElement(postTypes);
    return {
      id: faker.string.uuid(),
      user: faker.helpers.arrayElement(users),
      content: type === 'text' || faker.datatype.boolean() ? faker.lorem.paragraph() : undefined,
      image: type === 'image' ? faker.image.urlPicsumPhotos({ width: 600, height: 600 }) : undefined,
      video: type === 'video' || type === 'reel' ? faker.image.urlPicsumPhotos({ width: 400, height: 600 }) : undefined,
      likes: faker.number.int({ min: 0, max: 10000 }),
      comments: faker.number.int({ min: 0, max: 500 }),
      shares: faker.number.int({ min: 0, max: 1000 }),
      timestamp: faker.date.recent({ days: 7 }),
      type
    };
  });
};

// Generate mock stories
export const generateStories = (users: User[], count: number): Story[] => {
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    user: faker.helpers.arrayElement(users),
    image: faker.image.urlPicsumPhotos({ width: 400, height: 700 }),
    timestamp: faker.date.recent({ days: 1 }),
    viewed: faker.datatype.boolean({ probability: 0.3 })
  }));
};

// Initialize mock data
export const mockUsers = generateUsers(20);
export const mockPosts = generatePosts(mockUsers, 30);
export const mockStories = generateStories(mockUsers, 15);
