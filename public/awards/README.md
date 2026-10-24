Drop award certificate PDFs in here, then set `pdfUrl: '/awards/<filename>.pdf'` on the
matching entry in `src/data/profile.ts`'s `awards` array.

Example:

```ts
{
  title: 'BPhO Computational Challenge — Gold',
  year: '2024',
  pdfUrl: '/awards/bpho-computational-challenge-gold.pdf',
},
```

Keep filenames lowercase-with-dashes. Files here are served as-is at `ameytrip.tech/awards/...`.
