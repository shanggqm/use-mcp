import articlesData from '../../content/articles/_meta.json';

interface Article {
  slug: string;
  title: string;
  titleEn?: string;
  description: string;
  descriptionEn?: string;
  date: string;
  tags: string[];
  featured?: boolean;
  languages: string[];
}

export default function Articles() {
  const articles = articlesData.articles as Article[];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-slate-900 mb-8">文章</h1>
      <p className="text-slate-600 mb-8">深入了解 MCP 协议的技术文章和教程。</p>

      {articles.length === 0 ? (
        <div className="text-slate-500 text-center py-12 border-2 border-dashed border-slate-200 rounded-lg">
          文章内容即将上线...
        </div>
      ) : (
        <div className="grid gap-6">
          {articles.map(article => (
            <a
              key={article.slug}
              href={`#/articles/${article.slug}`}
              className="block p-6 bg-white rounded-xl border border-slate-200 hover:border-indigo-300 hover:shadow-lg transition-all duration-200"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {article.featured && (
                      <span className="px-2 py-0.5 text-xs font-medium bg-indigo-100 text-indigo-700 rounded-full">
                        精选
                      </span>
                    )}
                    <span className="text-sm text-slate-500">{article.date}</span>
                  </div>
                  <h2 className="text-xl font-semibold text-slate-900 mb-2 hover:text-indigo-600 transition-colors">
                    {article.title}
                  </h2>
                  <p className="text-slate-600 mb-3 line-clamp-2">{article.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map(tag => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs bg-slate-100 text-slate-600 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex gap-1">
                  {article.languages.includes('zh') && (
                    <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded">
                      中文
                    </span>
                  )}
                  {article.languages.includes('en') && (
                    <span className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded">EN</span>
                  )}
                </div>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
