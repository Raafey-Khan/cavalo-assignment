'use client';

import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { fetchBlogs } from '../store/slices/blogSlice';
import { useAppDispatch, RootState } from '../store/StoreProvider';
import { format } from 'date-fns';

export default function PublicBlogs() {
  const dispatch = useAppDispatch();
  const blogs = useSelector((state: RootState) => state.blog.blogs);

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  return (
    <div className="h-full py-12 px-6 ">
      <h2 className="text-3xl font-bold mb-10 text-center text-gray-800 dark:text-white">
        Explore Blogs
      </h2>

      {blogs.length === 0 ? (
        <p className="text-center text-gray-500">No blogs available yet.</p>
      ) : (
        <div className="flex flex-wrap gap-6 justify-center">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="w-full h-full sm:w-[48%] lg:w-[30%] bg-white dark:bg-gray-900  border dark:border-gray-900  border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{blog.title}</h3>
          
              {blog.image && (
                <img
                  src={`http://localhost:5000/uploads/${blog.image}`}
                  alt={blog.title}
                  className="w-full h-48 object-cover"
                />
              )}

        
              <div className="p-5">
                
                <p className="text-gray-700 text-sm line-clamp-3 mb-3 dark:text-amber-50">{blog.content}</p>
                <p className="text-sm text-gray-500 dark:text-white">
                  By <span className="font-medium">{blog.userId?.username || 'Anonymous'}</span> on{' '}
                  {format(new Date(blog.createdAt), 'hh:mm a, dd MMM yyyy')}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
