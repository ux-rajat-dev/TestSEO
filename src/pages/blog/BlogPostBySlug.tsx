import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import DOMPurify from 'dompurify';
import { motion } from 'framer-motion';
import {
  ArrowLeftIcon,
  CalendarIcon,
  MapPinIcon,
  ShareIcon,
  TagIcon,
  ClockIcon,
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

export function BlogPostBySlug() {
  const { slug } = useParams<{ slug: string }>();
  const [blogPost, setBlogPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    setLoading(true);
    setError(null);

    const matchingPost = blogs.find(
      (post) => post.slug === slug || post.id === slug,
    );

    if (!matchingPost) {
      setError('Blog post not found');
      setBlogPost(null);
      setLoading(false);
      return;
    }

    setBlogPost(matchingPost);
    setLoading(false);
  }, [slug]);

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
    <div className="min-h-screen bg-[#0F0B1F] text-white relative   pb-8">
      {/* Top Gradient Overlay */}
      <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-[#EA3A70]/10 via-[#0F0B1F]/20 to-transparent pointer-events-none" />

      {/* Sticky Header */}
      <div className="sticky top-0 z-50 bg-[#0F0B1F]">
        <Header />
      </div>

      <main className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        {/* Back & Share */}
        <div className="flex justify-between mb-6 px-4 py-4">
          <Link
            to="/blog"
            className="inline-flex items-center text-[#EA3A70] hover:text-[#EA3A70]/80 font-medium"
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

        {/* Title & Metadata */}
        <header className="text-center px-4 py-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-extrabold text-white drop-shadow-md mb-4 leading-tight max-w-3xl mx-auto"
          >
            {blogPost.title}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-wrap justify-center gap-6 text-sm text-gray-200"
          >
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
          </motion.div>

          {/* Author Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex items-center justify-center gap-4 mt-6"
          >
            <img
              src={blogPost.author.avatar}
              alt={blogPost.author.name}
              className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-700"
            />
            <div className="text-left">
              <div className="text-white font-medium">
                {blogPost.author.name}
              </div>
              <div className="text-gray-400 text-sm flex items-center gap-2">
                <span>{blogPost.author.role}</span>
                <span className="w-1 h-1 rounded-full bg-gray-600" />
                <span className="flex items-center gap-1">
                  <ClockIcon className="w-3 h-3" />
                  {blogPost.readTime}
                </span>
              </div>
            </div>
          </motion.div>
        </header>

        {/* Hero Image */}
        <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden rounded-lg shadow-lg mb-8">
          <img
            src={blogPost.image_url}
            alt={blogPost.title}
            className="absolute inset-0 w-full h-full object-cover object-center brightness-90 hover:brightness-100 transition-all duration-300 ease-in-out transform hover:scale-105"
          />
        </div>

        {/* Blog Content */}
        <article
          className="blog-content mx-aut p-0"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(blogPost.blog_content),
          }}
        />
      </main>

      <Footer />
    </div>
  );
}
