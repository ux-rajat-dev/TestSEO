export interface BlogPost {
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

export const blogs: BlogPost[] = [
  {
    id: 'start-business-netherlands',

    slug: 'start-business-netherlands',

    title: 'How to Start a Business in the Netherlands',

    country: 'Netherlands',

    category: 'Business',

    author: {
      name: 'Business Team',
      avatar: 'https://via.placeholder.com/150',
      role: 'Content Creator',
    },

    created_at: '2025-02-10',

    readTime: '5 min read',

    image_url:
      'https://static.wixstatic.com/media/662205_c1ab43260efd48e5bb91e955a01fff05~mv2.png/v1/fill/w_1110,h_620,al_c,q_90,usm_0.66_1.00_0.01,enc_auto/662205_c1ab43260efd48e5bb91e955a01fff05~mv2.png',

    blog_content: `
      <h2>Why Start a Business in the Netherlands?</h2>

      <p>
      The Netherlands is one of the most attractive places in Europe
      for entrepreneurs because of its strong economy and access
      to the EU market.
      </p>

      <h3>Main Advantages</h3>

      <ul>
        <li>Access to European Union market</li>
        <li>Business friendly regulations</li>
        <li>Strong logistics infrastructure</li>
      </ul>

      <p>
      Registering a company in the Netherlands can be completed
      within a few days if all documents are ready.
      </p>
    `,
  },
];
