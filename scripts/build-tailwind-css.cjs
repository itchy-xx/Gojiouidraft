const fs = require('node:fs');
const path = require('node:path');

const tailwindcss = require('tailwindcss');

const projectRoot = process.cwd();
const srcDir = path.join(projectRoot, 'src');
const inputCssPath = path.join(srcDir, 'frontend', 'styles', 'index.css'); // Updated
const outputCssPath = path.join(srcDir, 'frontend', 'styles', 'generated.css'); // Updated

const exts = new Set(['.js', '.jsx', '.html', '.css']);

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath, out);
    } else if (exts.has(path.extname(entry.name))) {
      out.push(fullPath);
    }
  }
  return out;
}

function tokenizeStrings(source) {
  const candidates = new Set();
  const stringRegex = /(["'`])((?:\\.|(?!\1)[\s\S])*)\1/g;

  let match;
  while ((match = stringRegex.exec(source)) !== null) {
    const content = match[2];
    for (const rawToken of content.split(/\s+/)) {
      const token = rawToken
        .trim()
        .replace(/^[`'"{(,]+/, '')
        .replace(/[`'"}),;]+$/, '');

      if (!token) continue;
      if (token.includes('${')) continue;
      if (token.length > 180) continue;
      if (token.toLowerCase().includes('infinity')) continue;
      if (!/[a-zA-Z]/.test(token)) continue;
      if (!/^[!%#@A-Za-z0-9_:\/\-.\[\],()]+$/.test(token)) continue;

      candidates.add(token);
    }
  }

  return candidates;
}

function resolveStylesheet(id, baseDir) {
  const basePath = path.extname(baseDir) ? path.dirname(baseDir) : baseDir;
  const inputBase = path.dirname(inputCssPath);

  if (id.startsWith('.')) {
    const direct = path.resolve(basePath || inputBase, id);
    if (fs.existsSync(direct)) return direct;
    const fallback = path.resolve(inputBase, id);
    if (fs.existsSync(fallback)) return fallback;
  }

  if (id === 'tailwindcss') {
    return require.resolve('tailwindcss/index.css', { paths: [basePath, projectRoot] });
  }

  try {
    return require.resolve(id, { paths: [basePath, projectRoot] });
  } catch {
    try {
      return require.resolve(`${id}/index.css`, { paths: [basePath, projectRoot] });
    } catch {
      return require.resolve(path.resolve(basePath, id));
    }
  }
}

(async () => {
  const allFiles = walk(srcDir);
  const candidateSet = new Set();

  for (const file of allFiles) {
    const content = fs.readFileSync(file, 'utf8');
    const tokens = tokenizeStrings(content);
    for (const token of tokens) candidateSet.add(token);
  }

  const inputCss = fs.readFileSync(inputCssPath, 'utf8');

const compiler = await tailwindcss.compile(inputCss, {
    base: path.dirname(inputCssPath),
    from: inputCssPath,
    loadStylesheet: async (id, base) => {
      const resolvedPath = resolveStylesheet(id, base);
      return {
        path: resolvedPath,
        base: path.dirname(resolvedPath),
        content: fs.readFileSync(resolvedPath, 'utf8'),
      };
    },
  });

  const css = compiler.build([...candidateSet]);
  fs.writeFileSync(outputCssPath, css, 'utf8');
  console.log(`Generated ${path.relative(projectRoot, outputCssPath)} with ${candidateSet.size} candidates.`);
})();
