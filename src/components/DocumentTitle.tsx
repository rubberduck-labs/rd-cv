import { useEffect } from 'react';

interface DocumentTitleProps {
  name: string;
}

export default function DocumentTitle({ name }: DocumentTitleProps) {
  useEffect(() => {
    document.title = `CV - Rubberduck - ${name}`;
    return () => {
      document.title = 'Rubberduck CV';
    };
  }, [name]);

  return null;
}