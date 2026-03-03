import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';

const projectRoot = process.cwd();
const srcRoot = path.join(projectRoot, 'src');

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath, out);
      continue;
    }
    out.push(fullPath);
  }
  return out;
}

function transpileFile(filePath) {
  const source = fs.readFileSync(filePath, 'utf8');
  const isTsx = filePath.endsWith('.tsx');
  const outputPath = filePath.replace(/\.tsx?$/, isTsx ? '.jsx' : '.js');

  const { outputText, diagnostics } = ts.transpileModule(source, {
    compilerOptions: {
      target: ts.ScriptTarget.ES2020,
      module: ts.ModuleKind.ESNext,
      jsx: ts.JsxEmit.Preserve,
      moduleResolution: ts.ModuleResolutionKind.NodeJs,
      isolatedModules: true,
      esModuleInterop: true,
      allowSyntheticDefaultImports: true,
      skipLibCheck: true,
      removeComments: false,
      noEmitHelpers: true,
    },
    fileName: filePath,
    reportDiagnostics: true,
  });

  if (diagnostics?.length) {
    const hardErrors = diagnostics.filter((d) => d.category === ts.DiagnosticCategory.Error);
    if (hardErrors.length) {
      const msg = hardErrors
        .map((d) => ts.flattenDiagnosticMessageText(d.messageText, '\n'))
        .join('\n');
      throw new Error(`Transpile error in ${filePath}:\n${msg}`);
    }
  }

  const cleaned = outputText
    .replace(/\.tsx(["'])/g, '$1')
    .replace(/\.ts(["'])/g, '$1')
    .replace(/^\s*\/\/\# sourceMappingURL=.*$/gm, '')
    .trimEnd() + '\n';

  fs.writeFileSync(outputPath, cleaned, 'utf8');
  return outputPath;
}

const tsFiles = walk(srcRoot).filter(
  (file) => (file.endsWith('.ts') || file.endsWith('.tsx')) && !file.endsWith('.d.ts'),
);

const emitted = [];
for (const file of tsFiles) {
  emitted.push(transpileFile(file));
}

for (const file of tsFiles) {
  fs.unlinkSync(file);
}

console.log(`Converted ${tsFiles.length} files to JS/JSX.`);
