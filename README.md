run:  
deno run --allow-net -c tsconfig.json index.tsx

bundle:
deno bundle -c tsconfig.json hydrate.tsx hydrate.bundle.js
