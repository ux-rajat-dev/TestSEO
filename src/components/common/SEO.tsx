import React from 'react';
import { Helmet } from 'react-helmet';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
}

export const SEO: React.FC<SEOProps> = ({ title, description, canonical }) => {
  // Auto-generate canonical if not provided
  const canonicalUrl =
    canonical || `${window.location.origin}${window.location.pathname}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
    </Helmet>
  );
};
