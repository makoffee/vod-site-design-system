#!/bin/sh
# Copy saved MCP reads into data/. Usage: ./refresh.sh <ds+DesignSystem read> <Components read> <Key Screens read>
# (read Styles/default.ds + "1 Design System", "2 Components", "3 Key Screens" with expandInstances: true)
set -e
awk '/^```ds/{f=1;next} f&&/^```/{exit} f' "$1" > data/default.ds
awk '/^```bl/{f=1} f{print} f&&/^```$/{exit}' "$1" > data/ds.x.bl
cp "$2" data/components.x.bl
cp "$3" data/screens.x.bl
echo "refreshed: $(wc -l < data/default.ds) token lines, $(wc -l < data/components.x.bl) component rows, $(wc -l < data/screens.x.bl) screen rows"
