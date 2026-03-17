import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import DOMPurify from 'dompurify';
import {
  ArrowLeftIcon,
  CalendarIcon,
  MapPinIcon,
  ShareIcon,
  TagIcon,
} from 'lucide-react';
import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';
import { blogs } from './BlogData';
import './BlogPage.css';

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  country: string;
  category: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  created_at: string;
  readTime: string;
  image_url: string;
  blog_content: string;
}

export function BlogDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [blogPost, setBlogPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    setError(null);

    const matchingPost = blogs.find(
      (post) => post.id === id || post.slug === id,
    );

    if (!matchingPost) {
      setError('Blog post not found');
      setBlogPost(null);
      setLoading(false);
      return;
    }

    setBlogPost(matchingPost);

    // Redirect to the slug-based route if the user is on the legacy /blog/:id path
    if (matchingPost.slug && matchingPost.slug !== id) {
      navigate(`/post/${matchingPost.slug}`, { replace: true });
    } else {
      setLoading(false);
    }
  }, [id, navigate]);

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

  const sharePost = () => {
    if (navigator.share) {
      navigator.share({
        title: blogPost?.title,
        text: blogPost?.blog_content.substring(0, 100),
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0F0B1F] flex items-center justify-center text-white">
        Loading blog post...
      </div>
    );
  }

  if (error || !blogPost) {
    return (
      <div className="min-h-screen bg-[#0F0B1F]">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Blog Not Found</h1>
          <p className="text-gray-400 mb-6">{error}</p>
          <Link
            to="/blog"
            className="inline-flex items-center px-6 py-3 bg-[#EA3A70] text-white rounded-lg"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Back to Blog
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F0B1F] text-white">
      {/* Sticky Navbar */}
      <div className="sticky top-0 z-50 bg-[#0F0B1F]">
        <Header />
      </div>

      {/* Main Content */}
      <main className="px-4 py-12 max-w-4xl mx-auto">
        {/* Title & Metadata */}
        <div className="text-center px-4 py-6">
          <h1 className="text-3xl md:text-5xl font-extrabold text-white drop-shadow-md mb-4 leading-tight max-w-3xl mx-auto">
            {blogPost.title}
          </h1>
          <div className="text-sm text-gray-200 flex flex-wrap justify-center gap-6">
            <div className="flex items-center gap-1">
              <CalendarIcon className="h-4 w-4" />
              {blogPost.created_at && formatDate(blogPost.created_at)}
            </div>
            <div className="flex items-center gap-1">
              <MapPinIcon className="h-4 w-4" />
              {blogPost.country}
            </div>
            <div className="flex items-center gap-1">
              <TagIcon className="h-4 w-4" />
              {blogPost.category}
            </div>
          </div>
        </div>

        {/* Hero Image - Simple & Vibrant */}
        <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden">
          <img
            src={blogPost.image_url}
            alt={blogPost.title}
            className="absolute inset-0 w-full h-full object-cover object-center brightness-90 hover:brightness-100 transition-all duration-300 ease-in-out rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105"
          />
        </div>

        {/* Back & Share (Moved Below Image) */}
        <div className="flex justify-between my-6">
          <Link
            to="/blog"
            className="inline-flex items-center text-[#EA3A70] hover:underline"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Back
          </Link>
          <button
            onClick={sharePost}
            className="text-gray-300 hover:text-white"
          >
            <ShareIcon className="h-5 w-5" />
          </button>
        </div>

        <div className="flex justify-center">
          <article
            className="blog-content max-w-3xl"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(blogPost.blog_content),
            }}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}
