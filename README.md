# rbstech.uk

Website for RBS Technologies Ltd, built with [Astro](https://astro.build) as a static site.

## Working on it

```bash
npm install
npm run dev      # local preview at http://localhost:4321
npm run build    # output in dist/
```

Pushing to `main` builds and deploys to GitHub Pages.

## Where the content lives

| What | File |
| --- | --- |
| Company name, email, company number | `src/data/site.ts` |
| Industries | `src/data/industries.ts` |
| Accounting & Audit solutions (written in full) | `src/data/accounting.ts` |
| Solutions added to the original catalogue | `src/data/additions.ts` |
| Original 180 solutions | `src/data/legacy.json`, with corrections in `src/data/usecases.ts` |
| Architecture patterns and their diagrams | `src/data/patterns.ts` |
| Technology stack, controls, delivery phases | `src/data/stack.ts` |

Adding a solution means adding one entry to `additions.ts` (or `accounting.ts`); its page, diagram and catalogue row are generated.
