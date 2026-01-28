import { useParams, useSearchParams, Link } from 'react-router-dom';
import { useState, useEffect, ComponentType } from 'react';
import { ArrowLeft } from 'lucide-react';

interface Frontmatter {
  title: string;
  description: string;
  date: string;
  tags: string[];
  lang: string;
  author: string;
}

interface MDXModule {
  default: ComponentType;
  frontmatter: Frontmatter;
}

export default function ArticleDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const lang = searchParams.get('lang') || 'zh';

  const [Content, setContent] = useState<ComponentType | null>(null);
  const [frontmatter, setFrontmatter] = useState<Frontmatter | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [availableLangs, setAvailableLangs] = useState<string[]>([]);

  useEffect(() => {
    async function loadArticle() {
      setLoading(true);
      setError(null);

      try {
        // Try to load the requested language version
        const module = (await import(
          `../../content/articles/${slug}/index.${lang}.mdx`
        )) as MDXModule;
        setContent(() => module.default);
        setFrontmatter(module.frontmatter);

        // Check available languages
        const langs: string[] = [];
        try {
          await import(`../../content/articles/${slug}/index.zh.mdx`);
          langs.push('zh');
        } catch {}
        try {
          await import(`../../content/articles/${slug}/index.en.mdx`);
          langs.push('en');
        } catch {}
        setAvailableLangs(langs);
      } catch (err) {
        console.error('Failed to load article:', err);
        // Try fallback to other language
        try {
          const fallbackLang = lang === 'zh' ? 'en' : 'zh';
          const module = (await import(
            `../../content/articles/${slug}/index.${fallbackLang}.mdx`
          )) as MDXModule;
          setContent(() => module.default);
          setFrontmatter(module.frontmatter);
          setAvailableLangs([fallbackLang]);
        } catch {
          setError('文章未找到');
        }
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      loadArticle();
    }
  }, [slug, lang]);

  const switchLanguage = (newLang: string) => {
    setSearchParams({ lang: newLang });
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-pulse">
          <div className="h-8 bg-slate-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-slate-200 rounded w-1/2 mb-8"></div>
          <div className="space-y-3">
            <div className="h-4 bg-slate-200 rounded"></div>
            <div className="h-4 bg-slate-200 rounded"></div>
            <div className="h-4 bg-slate-200 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !Content) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          to="/articles"
          className="inline-flex items-center text-indigo-600 hover:text-indigo-700 mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          返回文章列表
        </Link>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">文章未找到</h1>
          <p className="text-slate-600">请检查文章地址是否正确</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Navigation */}
      <div className="flex items-center justify-between mb-8">
        <Link
          to="/articles"
          className="inline-flex items-center text-indigo-600 hover:text-indigo-700"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          返回文章列表
        </Link>

        {/* Language Switcher */}
        {availableLangs.length > 1 && (
          <div className="flex gap-2">
            {availableLangs.includes('zh') && (
              <button
                onClick={() => switchLanguage('zh')}
                className={`px-3 py-1 text-sm rounded-full transition-colors ${
                  lang === 'zh'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                中文
              </button>
            )}
            {availableLangs.includes('en') && (
              <button
                onClick={() => switchLanguage('en')}
                className={`px-3 py-1 text-sm rounded-full transition-colors ${
                  lang === 'en'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                English
              </button>
            )}
          </div>
        )}
      </div>

      {/* Article Header */}
      {frontmatter && (
        <header className="mb-8 pb-8 border-b border-slate-200">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            {frontmatter.title}
          </h1>
          <p className="text-lg text-slate-600 mb-4">{frontmatter.description}</p>
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
            <span>{frontmatter.date}</span>
            <span>·</span>
            <span>{frontmatter.author}</span>
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            {frontmatter.tags.map(tag => (
              <span key={tag} className="px-2 py-1 text-xs bg-slate-100 text-slate-600 rounded">
                {tag}
              </span>
            ))}
          </div>
        </header>
      )}

      {/* Article Content */}
      <article className="prose prose-slate prose-lg max-w-none prose-headings:scroll-mt-20 prose-a:text-indigo-600 prose-a:no-underline hover:prose-a:underline prose-code:bg-slate-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none prose-pre:bg-slate-900">
        <Content />
      </article>
    </div>
  );
}
