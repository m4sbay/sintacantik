# sintacantik

Personal study/quiz web app berbasis Next.js untuk latihan soal ortodonti.

## Scripts

```bash
npm run dev
npm run lint
npm run typecheck
npm test
npm run build
npm run start
```

## Deployment

Project ini kompatibel dengan Vercel dan tidak membutuhkan backend, database, atau environment variable untuk MVP. Bank soal dibundle sebagai static TypeScript data yang digenerate dari `soal.md` lewat:

```bash
npm run generate:questions
```
