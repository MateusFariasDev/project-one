import './styles.css'

import { PostCard } from '../PostCard';

export const Posts = ({ posts }) => (
  <div className="posts">
            {posts.map(post => (
              <PostCard
                key={post.id}
                post={post}
              />
            ))}
        </div>
)
