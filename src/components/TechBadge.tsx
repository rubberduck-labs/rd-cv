import React from 'react';

interface TechBadgeProps {
  tech: string;
}

export default function TechBadge({ tech }: TechBadgeProps) {
  return (
    <span className="tech-badge">
      {tech}
    </span>
  );
}