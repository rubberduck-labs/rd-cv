import { Pencil } from 'lucide-react';

interface EditToggleProps {
  isEditing: boolean;
  onToggle: () => void;
  isSaving: boolean;
}

export default function EditToggle({ isEditing, onToggle, isSaving }: EditToggleProps) {
  return (
    <button
      onClick={onToggle}
      disabled={isSaving}
      className={`fixed bottom-8 left-8 p-3 rounded-full shadow-lg transition-colors ${
        isEditing
          ? 'bg-green-500 text-white hover:bg-green-600'
          : 'bg-primary-400 text-secondary-900 hover:bg-primary-500'
      }`}
      title={isSaving ? 'Lagrer...' : isEditing ? 'Lagre endringer' : 'Rediger CV'}
    >
      <Pencil size={20} />
    </button>
  );
}