interface ExperienceHeaderProps {
  title: string;
}

export default function ExperienceHeader({ title }: ExperienceHeaderProps) {
  return (
    <h3 className="section-title text-xl font-bold text-secondary-900 mb-6">
      {title}
    </h3>
  );
}