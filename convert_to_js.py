#!/usr/bin/env python3
import os
import re
import shutil

def convert_tsx_to_jsx(content):
    """Convert TypeScript/TSX content to JavaScript/JSX"""
    
    # Remove type imports
    content = re.sub(r'import\s+type\s+\{[^}]+\}\s+from\s+[\'"][^\'"]+[\'"];?\s*\n', '', content)
    
    # Remove React.FC type annotations
    content = re.sub(r':\s*React\.FC<[^>]*>', '', content)
    
    # Remove prop type annotations
    content = re.sub(r'}\s*:\s*\{[^}]*\}', '}', content)
    content = re.sub(r'const\s+(\w+)\s*:\s*React\.FC<(\{[^}]*\})>\s*=\s*\((\{[^}]*\})\)', r'const \1 = (\3)', content)
    
    # Remove function parameter types
    content = re.sub(r'\(([^:)]+):\s*[^,)]+([,)])', r'(\1\2', content)
    
    # Remove return type annotations
    content = re.sub(r'\):\s*[^{=]+\s*{', ') {', content)
    content = re.sub(r'\):\s*[^{=]+\s*=>', ') =>', content)
    
    # Remove variable type annotations
    content = re.sub(r'(const|let|var)\s+(\w+)\s*:\s*[^=;]+\s*=', r'\1 \2 =', content)
    
    # Remove interface/type definitions
    content = re.sub(r'(export\s+)?interface\s+\w+\s*\{[^}]*\}\s*\n', '', content, flags=re.DOTALL)
    content = re.sub(r'(export\s+)?type\s+\w+\s*=\s*[^;]+;\s*\n', '', content)
    
    # Remove generic type parameters
    content = re.sub(r'<[^>]+>', '', content)
    
    # Remove 'as' type assertions
    content = re.sub(r'\s+as\s+\w+', '', content)
    
    # Change .tsx imports to .jsx
    content = re.sub(r'from\s+[\'"]([^\'"]+)\.tsx[\'"]', r'from \'\1.jsx\'', content)
    content = re.sub(r'from\s+[\'"]([^\'"]+)\.ts[\'"]', r'from \'\1.js\'', content)
    
    # Remove standalone type/interface exports
    lines = content.split('\n')
    filtered_lines = []
    skip_next = False
    for i, line in enumerate(lines):
        if skip_next:
            skip_next = False
            continue
        if re.match(r'^\s*(export\s+)?(interface|type)\s+', line):
            # Check if it spans multiple lines
            if '{' in line and '}' not in line:
                skip_next = True
            continue
        filtered_lines.append(line)
    content = '\n'.join(filtered_lines)
    
    return content

def convert_file(input_path, output_path):
    """Convert a single TypeScript file to JavaScript"""
    try:
        with open(input_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Convert the content
        converted = convert_tsx_to_jsx(content)
        
        # Write to output
        os.makedirs(os.path.dirname(output_path), exist_ok=True)
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(converted)
        
        print(f"✓ Converted: {input_path} -> {output_path}")
        return True
    except Exception as e:
        print(f"✗ Error converting {input_path}: {e}")
        return False

def main():
    """Main conversion function"""
    base_dir = '/tmp/sandbox/src/app'
    
    # Find all .tsx and .ts files (excluding .d.ts)
    for root, dirs, files in os.walk(base_dir):
        for file in files:
            if file.endswith('.tsx') or (file.endswith('.ts') and not file.endswith('.d.ts')):
                input_path = os.path.join(root, file)
                
                # Skip if .jsx or .js already exists
                if file.endswith('.tsx'):
                    output_file = file.replace('.tsx', '.jsx')
                else:
                    output_file = file.replace('.ts', '.js')
                
                output_path = os.path.join(root, output_file)
                
                # Check if JSX version already exists
                if os.path.exists(output_path):
                    print(f"⊘ Skipped (already exists): {output_path}")
                    continue
                
                convert_file(input_path, output_path)
    
    print("\n✓ Conversion complete!")

if __name__ == '__main__':
    main()
