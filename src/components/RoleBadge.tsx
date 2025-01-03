import React from 'react';

interface RoleBadgeProps {
  role: string;
}

export default function RoleBadge({ role }: RoleBadgeProps) {
  return (
    <span className="role-badge">
      {role}
    </span>
  );
}