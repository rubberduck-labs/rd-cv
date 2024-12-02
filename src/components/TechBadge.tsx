interface TechBadgeProps {
  tech: string;
}

export default function TechBadge({ tech }: TechBadgeProps) {
  return (
    <span className="px-3 py-1 bg-primary-50 text-secondary-700 rounded-full text-sm font-medium hover:bg-primary-100 transition-colors border border-primary-200">
      {tech}
    </span>
  );
}