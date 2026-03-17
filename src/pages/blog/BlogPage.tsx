import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  SearchIcon,
  MapPinIcon,
  ArrowRightIcon,
  BookOpenIcon,
  ChevronDown,
} from 'lucide-react';
import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';
import { blogs } from './BlogData';

export function BlogPage() {
  const [blogPosts] = useState(blogs);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error] = useState<string | null>(null);

  useEffect(() => {
    setLoading(false);
  }, []);

  const filteredPosts = blogPosts
    .filter((post) => {
      const term = searchTerm.toLowerCase();
      return (
        post.title.toLowerCase().includes(term) ||
        post.blog_content.toLowerCase().includes(term) ||
        post.country.toLowerCase().includes(term)
      );
    })
    .filter((post) => {
      return selectedCountry === 'all' || post.country === selectedCountry;
    });

  const countries = [
    'all',
    ...Array.from(new Set(blogPosts.map((p) => p.country).filter(Boolean))),
  ];

  const extractTextFromHTML = (html: string) => {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText || '';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0F0B1F] flex items-center justify-center">
        <div className="text-white text-lg">Loading blog posts...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0F0B1F]">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Error</h1>
          <p className="text-gray-300 mb-8">{error}</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F0B1F]">
      <div className="sticky top-0 z-50 bg-[#0F0B1F]">
        <Header />
      </div>

      <section className="relative py-24 px-6 text-center overflow-hidden">
        {/* subtle background glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(234,58,112,0.15),transparent_60%)]"></div>

        <div className="relative max-w-4xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="p-4 shadow-lg">
              <BookOpenIcon className="h-16 w-16 text-[#EA3A70]" />
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 leading-tight text-center">
            Business Insights & Guides
          </h1>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed text-center">
            Discover expert insights, practical guides, and the latest updates
            on business formation and strategy across Europe.
          </p>
        </div>

        {/* Search + Filter */}
        <div className="relative mt-6 flex flex-col md:flex-row items-center justify-center gap-5 max-w-3xl mx-auto">
          {/* Search */}
          <div className="relative w-full">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search articles, countries, or topics..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-[#1B1537] border border-gray-600 rounded-xl text-white
        placeholder-gray-400
        focus:outline-none
        focus:ring-2 focus:ring-[#EA3A70]
        focus:border-transparent
        transition-all duration-200"
            />
          </div>

          {/* Filter */}
          <div className="relative w-full md:max-w-xs">
            {/* Dropdown icon */}
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5 pointer-events-none" />

            {/* Select */}
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="w-full pl-4 pr-10 py-3.5 bg-[#1B1537] border border-gray-600 rounded-xl text-gray-400
      focus:outline-none
      focus:ring-2 focus:ring-[#EA3A70]
      focus:border-transparent
      transition-all duration-200 cursor-pointer
      appearance-none"
            >
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country === 'all' ? 'All Countries' : country}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      <section className="pb-14 px-4">
        <div className="max-w-7xl mx-auto">
          {filteredPosts.length === 0 ? (
            <div className="text-center text-gray-400">
              <BookOpenIcon className="h-12 w-12 mx-auto mb-4" />
              No articles found.
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <article
                  key={post.id}
                  className="bg-[#1B1537] rounded-xl border border-gray-700 hover:border-[#EA3A70] transition-all"
                >
                  <div className="relative h-48 rounded-t-xl overflow-hidden">
                    <img
                      src={post.image_url}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center px-3 py-1 text-xs font-medium bg-[#EA3A70] text-white rounded-full">
                        <MapPinIcon className="h-3 w-3 mr-1" />
                        {post.country}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-3 line-clamp-2">
                      {post.title}
                    </h3>
                    <div className="text-gray-300 text-sm mb-4 line-clamp-3">
                      {extractTextFromHTML(post.blog_content).substring(0, 200)}
                      {extractTextFromHTML(post.blog_content).length > 200 &&
                        '...'}
                    </div>
                    <Link
                      to={`/post/${post.slug}`}
                      className="inline-flex items-center text-[#EA3A70] hover:text-[#EA3A70]/80 font-medium"
                    >
                      Read More
                      <ArrowRightIcon className="h-4 w-4 ml-2" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
