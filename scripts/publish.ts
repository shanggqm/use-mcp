import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

// 获取参数
const args = process.argv.slice(2);
const topicArg = args.find(arg => arg.startsWith('--topic='));
const typeArg = args.find(arg => arg.startsWith('--type='));
const forceArg = args.find(arg => arg === '--force' || arg === '-f');

if (!topicArg) {
  console.error('❌ 请提供主题名称');
  console.log('');
  console.log('用法: npm run publish -- --topic=xxx [--type=article|case] [--force]');
  console.log('');
  console.log('参数:');
  console.log('  --topic=xxx    主题名称（必需）');
  console.log('  --type=xxx     内容类型: article（默认）或 case');
  console.log('  --force, -f    如果目标已存在，强制覆盖');
  process.exit(1);
}

const topic = topicArg.split('=')[1];
const contentType = typeArg ? typeArg.split('=')[1] : 'article';

// 检查 workspace 中是否有待发布目录
const readyDir = path.join(rootDir, 'workspace', topic, '_ready');

if (!fs.existsSync(readyDir)) {
  console.error(`❌ 未找到待发布内容: workspace/${topic}/_ready/`);
  console.log('');
  console.log('提示: 请先使用 /publish-content skill 生成待发布内容');
  process.exit(1);
}

// 扫描所有 .mdx 文件
interface ArticleGroup {
  baseName: string; // 如 'index', '02-background'
  zhFile?: string;
  enFile?: string;
  legacyFile?: string;
}

function scanMdxFiles(dir: string): Map<string, ArticleGroup> {
  const groups = new Map<string, ArticleGroup>();
  const files = fs.readdirSync(dir);

  for (const file of files) {
    if (!file.endsWith('.mdx')) continue;

    let baseName: string;
    let lang: 'zh' | 'en' | 'legacy';

    if (file.endsWith('.zh.mdx')) {
      baseName = file.replace('.zh.mdx', '');
      lang = 'zh';
    } else if (file.endsWith('.en.mdx')) {
      baseName = file.replace('.en.mdx', '');
      lang = 'en';
    } else {
      baseName = file.replace('.mdx', '');
      lang = 'legacy';
    }

    if (!groups.has(baseName)) {
      groups.set(baseName, { baseName });
    }

    const group = groups.get(baseName)!;
    const fullPath = path.join(dir, file);

    if (lang === 'zh') group.zhFile = fullPath;
    else if (lang === 'en') group.enFile = fullPath;
    else group.legacyFile = fullPath;
  }

  return groups;
}

const articleGroups = scanMdxFiles(readyDir);

if (articleGroups.size === 0) {
  console.error(`❌ 未找到任何 .mdx 文章文件`);
  console.log('');
  console.log('期望的文件格式:');
  console.log('  - *.zh.mdx (中文版)');
  console.log('  - *.en.mdx (英文版)');
  console.log('  - *.mdx (旧格式，仍兼容)');
  process.exit(1);
}

// 确定目标目录
const targetType = contentType === 'case' ? 'cases' : 'articles';
const targetDir = path.join(rootDir, 'content', targetType, topic);

if (fs.existsSync(targetDir)) {
  if (forceArg) {
    console.log(`🔄 ${targetType}/${topic} 已存在，正在移除旧版本...`);
    fs.rmSync(targetDir, { recursive: true, force: true });
  } else {
    console.error(`❌ ${targetType}/${topic} 已存在`);
    console.log('');
    console.log('提示: 使用 --force 或 -f 参数强制覆盖');
    console.log('  npm run publish -- --topic=xxx --force');
    process.exit(1);
  }
}

// 复制目录
function copyDir(src: string, dest: string) {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// 解析 frontmatter 获取元数据
function parseFrontmatter(filePath: string): Record<string, unknown> | null {
  if (!filePath || !fs.existsSync(filePath)) return null;
  const content = fs.readFileSync(filePath, 'utf-8');
  const { data } = matter(content);
  return data;
}

// 构建单篇文章的 meta
function buildArticleMeta(group: ArticleGroup): Record<string, unknown> {
  const zhMeta = parseFrontmatter(group.zhFile || '');
  const enMeta = parseFrontmatter(group.enFile || '');
  const legacyMeta = parseFrontmatter(group.legacyFile || '');

  const primaryMeta = zhMeta || enMeta || legacyMeta;
  if (!primaryMeta) {
    throw new Error(`无法解析 ${group.baseName} 的 frontmatter`);
  }

  const languages: string[] = [];
  if (group.zhFile) languages.push('zh');
  if (group.enFile) languages.push('en');
  if (group.legacyFile && languages.length === 0) languages.push('zh');

  // slug: index 文件用 topic，其他用 topic/baseName
  const slug = group.baseName === 'index' ? topic : `${topic}/${group.baseName}`;

  return {
    slug,
    title: zhMeta?.title || legacyMeta?.title || primaryMeta.title,
    titleEn: enMeta?.title || undefined,
    description: zhMeta?.description || legacyMeta?.description || primaryMeta.description,
    descriptionEn: enMeta?.description || undefined,
    date: primaryMeta.date || new Date().toISOString().split('T')[0],
    tags: primaryMeta.tags || [],
    featured: primaryMeta.featured || false,
    languages,
  };
}

// 更新 _meta.json
function updateMeta() {
  const metaPath = path.join(rootDir, 'content', targetType, '_meta.json');
  const metaKey = targetType === 'cases' ? 'cases' : 'articles';

  // 读取现有 _meta.json
  let metaData: Record<string, unknown[]> = { [metaKey]: [] };
  if (fs.existsSync(metaPath)) {
    metaData = JSON.parse(fs.readFileSync(metaPath, 'utf-8'));
  }

  const items = metaData[metaKey] as Array<{ slug: string }>;

  // 先移除当前 topic 下所有旧条目
  const filteredItems = items.filter(
    item => item.slug !== topic && !item.slug.startsWith(`${topic}/`)
  );

  // 为每个文章组创建 meta 条目
  const newItems: Array<Record<string, unknown>> = [];

  for (const [baseName, group] of articleGroups) {
    try {
      const articleMeta = buildArticleMeta(group);
      newItems.push(articleMeta);
      console.log(`   📝 ${articleMeta.slug}`);
    } catch (err) {
      console.warn(`⚠️  跳过 ${baseName}: ${(err as Error).message}`);
    }
  }

  // 按日期降序排序新条目
  newItems.sort((a, b) => {
    const dateA = String(a.date || '');
    const dateB = String(b.date || '');
    return dateB.localeCompare(dateA);
  });

  // 合并：新条目放在最前面
  metaData[metaKey] = [...newItems, ...filteredItems];

  // 写入 _meta.json
  fs.writeFileSync(metaPath, JSON.stringify(metaData, null, 2) + '\n');
  console.log(`✅ 已更新: content/${targetType}/_meta.json`);
}

// 执行发布
console.log('');
console.log('📦 正在发布...');
copyDir(readyDir, targetDir);
console.log(`✅ 已复制: content/${targetType}/${topic}/`);

console.log('');
console.log('📋 更新文章索引:');
updateMeta();

// 统计发布的文件
console.log('');
console.log('📄 发布的文章:');
for (const [baseName, group] of articleGroups) {
  const langs: string[] = [];
  if (group.zhFile) langs.push('中文');
  if (group.enFile) langs.push('英文');
  if (group.legacyFile) langs.push('默认');
  console.log(`   - ${baseName} (${langs.join(', ')})`);
}

console.log('');
console.log('下一步:');
console.log('   1. npm run dev 预览');
console.log('   2. git add && git commit && git push');
