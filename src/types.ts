export interface Post {
  id: string;
  slug: string;
  body: string;
  collection: 'posts';
  data: {
    title: string;
    description: string;
    pubDate: Date;
    category: string;
    tags: string[];
    draft?: boolean;
  };
}

export type Category = 'TypeScript' | 'R' | 'Python' | '統計' | 'Web開発' | 'その他';
