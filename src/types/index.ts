// 文章类型
export interface Article {
  slug: string;
  title: string;
  description: string;
  date: string;
  author?: string;
  tags: string[];
  cover?: string;
  featured?: boolean;
}

// 资源类型
export interface Resource {
  id: string;
  title: string;
  description: string;
  url: string;
  category: string;
  tags: string[];
  featured?: boolean;
}

export interface ResourceCategory {
  id: string;
  name: string;
  icon: string;
}

export interface ResourceData {
  categories: ResourceCategory[];
  items: Resource[];
}

// 案例类型
export interface Case {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  cover?: string;
  difficulty?: string;
}

// 视频类型
export interface Video {
  id: string;
  title: string;
  description: string;
  platform: 'youtube' | 'bilibili' | 'vimeo';
  videoId: string;
  thumbnail?: string;
  duration: string;
  date: string;
  tags: string[];
}

export interface VideoData {
  items: Video[];
}
