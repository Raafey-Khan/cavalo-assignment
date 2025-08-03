'use client';

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../store/StoreProvider';
import { fetchOwnBlogs } from '../../store/slices/blogSlice';
import BlogCard from '../../components/BlogCard';
import BlogForm from '../../components/BlogForm';
import useAuthRedirect from '../../hooks/useAuthRedirect';
import useAuthStatus from '../../hooks/useAuthStatus';

export default function DashboardPage() {
  useAuthRedirect();

  const dispatch = useAppDispatch();
  const blogs = useSelector((s: RootState) => s.blog.userBlogs || []);

  const { ready, isAuthenticated } = useAuthStatus();
  const [editing, setEditing] = useState<any>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (ready && isAuthenticated) {
      dispatch(fetchOwnBlogs());
    }
  }, [ready, isAuthenticated, dispatch]);

  if (!ready) return null;

  return (
    <div className="max-w-3xl mx-auto mt-5 px-5">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-bold">Your Blogs</h2>
        <button
          onClick={() => {
            setEditing(null);
            setShowForm(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer"
        >
          Create Blog
        </button>
      </div>

      {showForm && (
        <BlogForm
          editing={editing}
          onCloseAction={() => setShowForm(false)}
        />
      )}

      <div className="space-y-4">
        {blogs.length === 0 ? (
          <p className="text-gray-500">You haven’t created any blogs yet.</p>
        ) : (
          blogs.map((post: any) => (
            <BlogCard
              key={post._id}
              blog={post}
              onEdit={(b) => {
                setEditing(b);
                setShowForm(true);
              }}
            />
          ))
        )}
      </div>
    </div>
  );
}
