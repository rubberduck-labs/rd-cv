import { useState } from 'react';

export function usePageBreaks() {
  const [pageBreaks] = useState<Set<string>>(new Set(['summary']));

  const hasPageBreak = (sectionId: string) => pageBreaks.has(sectionId);

  return {
    hasPageBreak
  };
}