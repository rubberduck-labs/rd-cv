import { useState } from 'react';

export function useExperiencePageBreaks(initialBreaks: number[] = []) {
  const [pageBreaks, setPageBreaks] = useState<Set<number>>(new Set(initialBreaks));

  const togglePageBreak = (index: number) => {
    const newPageBreaks = new Set(pageBreaks);
    if (newPageBreaks.has(index)) {
      newPageBreaks.delete(index);
    } else {
      newPageBreaks.add(index);
    }
    setPageBreaks(newPageBreaks);
  };

  return {
    pageBreaks,
    togglePageBreak
  };
}