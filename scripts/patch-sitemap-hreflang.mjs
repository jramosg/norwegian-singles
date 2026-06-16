import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';

const distDir = new URL('../dist/', import.meta.url).pathname;
const site = 'https://norwegian-singles.app';

function walk(dir) {
  return readdirSync(dir).flatMap((entry) => {
    const path = join(dir, entry);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });
}

function escapeXml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function pageUrl(file) {
  const path = relative(distDir, file).replace(/\\/g, '/');
  if (path === 'index.html') return `${site}/`;
  return `${site}/${path.replace(/(?:^|\/)index\.html$/, '')}`;
}

function readAlternates(file) {
  const html = readFileSync(file, 'utf8');
  const head = html.match(/<head>([\s\S]*?)<\/head>/i)?.[1] ?? html;
  const alternates = [];
  const re =
    /<link\s+[^>]*rel=["']alternate["'][^>]*hreflang=["']([^"']+)["'][^>]*href=["']([^"']+)["'][^>]*>/gi;

  for (const match of head.matchAll(re)) {
    const [, hreflang, href] = match;
    if (hreflang !== 'x-default') {
      alternates.push({ hreflang, href });
    }
  }
  return alternates;
}

const alternatesByUrl = new Map(
  walk(distDir)
    .filter(
      (file) => file.endsWith('/index.html') || file.endsWith('index.html'),
    )
    .map((file) => [pageUrl(file), readAlternates(file)])
    .filter(([, alternates]) => alternates.length > 1),
);

for (const sitemapFile of walk(distDir).filter((file) =>
  /sitemap-\d+\.xml$/.test(file),
)) {
  let xml = readFileSync(sitemapFile, 'utf8');
  xml = xml.replace(
    /<url><loc>([^<]+)<\/loc>[\s\S]*?<\/url>/g,
    (block, loc) => {
      const alternates = alternatesByUrl.get(loc);
      if (!alternates) return block;

      const links = alternates
        .map(
          ({ hreflang, href }) =>
            `<xhtml:link rel="alternate" hreflang="${escapeXml(
              hreflang,
            )}" href="${escapeXml(href)}"/>`,
        )
        .join('');

      return `<url><loc>${loc}</loc>${links}</url>`;
    },
  );
  writeFileSync(sitemapFile, xml);
}
