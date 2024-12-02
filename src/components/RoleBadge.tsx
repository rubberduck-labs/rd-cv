interface RoleBadgeProps {
  role: string;
}

export default function RoleBadge({ role }: RoleBadgeProps) {
  return (
    <span className="px-3 py-1 bg-secondary-50 text-secondary-700 rounded-full text-sm font-medium hover:bg-secondary-100 transition-colors border border-secondary-200">
      {role}
    </span>
  );
}