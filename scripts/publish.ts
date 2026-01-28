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

if (!topicArg) {
  console.error('❌ 请提供主题名称: npm run publish -- --topic=xxx --type=article|case');
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

// 检查文章文件（支持双语或单语）
const zhFile = path.join(readyDir, 'index.zh.mdx');
const enFile = path.join(readyDir, 'index.en.mdx');
const legacyFile = path.join(readyDir, 'index.mdx'); // 兼容旧格式

const hasZh = fs.existsSync(zhFile);
const hasEn = fs.existsSync(enFile);
const hasLegacy = fs.existsSync(legacyFile);

if (!hasZh && !hasEn && !hasLegacy) {
  console.error(`❌ 未找到文章文件`);
  console.log('');
  console.log('期望以下文件之一:');
  console.log('  - index.zh.mdx (中文版)');
  console.log('  - index.en.mdx (英文版)');
  console.log('  - index.mdx (旧格式，仍兼容)');
  process.exit(1);
}

// 确定目标目录
const targetType = contentType === 'case' ? 'cases' : 'articles';
const targetDir = path.join(rootDir, 'content', targetType, topic);

if (fs.existsSync(targetDir)) {
  console.error(`❌ ${targetType}/${topic} 已存在`);
  process.exit(1);
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
  if (!fs.existsSync(filePath)) return null;
  const content = fs.readFileSync(filePath, 'utf-8');
  const { data } = matter(content);
  return data;
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

  // 解析中英文 frontmatter
  const zhMeta = hasZh ? parseFrontmatter(zhFile) : null;
  const enMeta = hasEn ? parseFrontmatter(enFile) : null;
  const legacyMeta = hasLegacy ? parseFrontmatter(legacyFile) : null;

  // 优先使用中文，回退到英文或旧格式
  const primaryMeta = zhMeta || enMeta || legacyMeta;

  if (!primaryMeta) {
    console.warn('⚠️  无法解析 frontmatter，跳过 _meta.json 更新');
    return;
  }

  // 构建文章元数据
  const languages: string[] = [];
  if (hasZh) languages.push('zh');
  if (hasEn) languages.push('en');
  if (hasLegacy && languages.length === 0) languages.push('zh'); // 旧格式默认中文

  const articleMeta = {
    slug: topic,
    title: zhMeta?.title || legacyMeta?.title || primaryMeta.title,
    titleEn: enMeta?.title || undefined,
    description: zhMeta?.description || legacyMeta?.description || primaryMeta.description,
    descriptionEn: enMeta?.description || undefined,
    date: primaryMeta.date || new Date().toISOString().split('T')[0],
    tags: primaryMeta.tags || [],
    featured: primaryMeta.featured || false,
    languages,
  };

  // 检查是否已存在（避免重复）
  const items = metaData[metaKey] as Array<{ slug: string }>;
  const existingIndex = items.findIndex(item => item.slug === topic);
  if (existingIndex >= 0) {
    items[existingIndex] = articleMeta;
  } else {
    items.unshift(articleMeta); // 新文章放在最前面
  }

  // 写入 _meta.json
  fs.writeFileSync(metaPath, JSON.stringify(metaData, null, 2) + '\n');
  console.log(`✅ 已更新: content/${targetType}/_meta.json`);
}

// 执行发布
copyDir(readyDir, targetDir);
console.log(`✅ 已发布: content/${targetType}/${topic}/`);

// 更新索引
updateMeta();

console.log('');
console.log('发布的文件:');
if (hasZh) console.log('   📄 index.zh.mdx (中文版)');
if (hasEn) console.log('   📄 index.en.mdx (英文版)');
if (hasLegacy) console.log('   📄 index.mdx');
console.log('');
console.log('下一步:');
console.log('   1. npm run dev 预览');
console.log('   2. git add && git commit && git push');
