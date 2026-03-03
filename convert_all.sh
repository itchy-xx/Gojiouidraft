#!/bin/bash

# TypeScript to JavaScript Conversion Script
# This script converts all .tsx files to .jsx and .ts files to .js

echo "🚀 Starting TypeScript to JavaScript conversion..."
echo ""

# Counter for converted files
converted=0
skipped=0

# Function to convert a single file
convert_file() {
    local input_file="$1"
    local output_file="${input_file%.tsx}.jsx"
    
    # If it's a .ts file (not .d.ts), convert to .js
    if [[ "$input_file" == *.ts ]] && [[ "$input_file" != *.d.ts ]]; then
        output_file="${input_file%.ts}.js"
    fi
    
    # Skip if output already exists
    if [ -f "$output_file" ]; then
        echo "⊘ Skipped (already exists): $output_file"
        ((skipped++))
        return
    fi
    
    # Perform conversion using sed
    cat "$input_file" | \
        # Remove type annotations from function parameters
        sed -E 's/\(([^:)]+):\s*[^,)]+([,)])/(\1\2/g' | \
        # Remove : React.FC
        sed -E 's/:\s*React\.FC(<[^>]*>)?//g' | \
        # Remove return type annotations
        sed -E 's/\):\s*[^{=]+\s*\{/) {/g' | \
        sed -E 's/\):\s*[^{=]+\s*=>/) =>/g' | \
        # Remove variable type annotations
        sed -E 's/(const|let|var)\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*:\s*[^=]+\s*=/\1 \2 =/g' | \
        # Change .tsx imports to .jsx
        sed -E "s/from\s+['\"']([^'\"]+)\.tsx['\"']/from '\1'/g" | \
        sed -E "s/from\s+['\"']([^'\"]+)\.ts['\"']/from '\1'/g" | \
        # Remove generic types
        sed -E 's/<[A-Za-z_][A-Za-Z0-9_<>, ]*>//g' | \
        # Remove as type assertions
        sed -E 's/\s+as\s+[A-Za-z_][A-Za-Z0-9_]*//g' > "$output_file"
    
    # Remove interface and type definitions (multi-line)
    # This is a simple approach - may need manual cleanup
    grep -v "^interface " "$output_file" | \
    grep -v "^export interface " | \
    grep -v "^type " | \
    grep -v "^export type " > "${output_file}.tmp"
    
    mv "${output_file}.tmp" "$output_file"
    
    echo "✓ Converted: $input_file → $output_file"
    ((converted++))
}

# Find and convert all .tsx and .ts files in src/app
cd /tmp/sandbox

find src/app -type f \( -name "*.tsx" -o \( -name "*.ts" -and ! -name "*.d.ts" \) \) | while read -r file; do
    convert_file "$file"
done

echo ""
echo "================================================"
echo "✅ Conversion Complete!"
echo "   Converted: $converted files"
echo "   Skipped: $skipped files"
echo "================================================"
echo ""
echo "Next steps:"
echo "1. Review converted files for any remaining type annotations"
echo "2. Run: npm install"
echo "3. Run: npm start"
echo ""
