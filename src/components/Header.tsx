import React, { ReactNode } from 'react';
import { Mail, Phone, MapPin, Calendar, Image, LogOut } from 'lucide-react';
import ContactItem from './ContactItem';
import EditableText from './EditableText';
import { useAuth } from '../contexts/AuthContext';

interface HeaderProps {
  name: string;
  title: string;
  location: string;
  phone: string;
  birthYear: string;
  email: string;
  image?: string;
  companyLogo: string;
  isEditing?: boolean;
  onUpdate?: (data: Omit<HeaderProps, 'isEditing' | 'onUpdate'>) => void;
}

export default function Header({ 
  name, 
  title, 
  location, 
  phone, 
  birthYear, 
  email, 
  image,
  companyLogo,
  isEditing = false,
  onUpdate
}: HeaderProps) {
  const { signOut } = useAuth();

  const handleUpdate = (field: string, value: string) => {
    if (onUpdate) {
      onUpdate({
        name: field === 'name' ? value : name,
        title: field === 'title' ? value : title,
        location: field === 'location' ? value : location,
        phone: field === 'phone' ? value : phone,
        birthYear: field === 'birthYear' ? value : birthYear,
        email: field === 'email' ? value : email,
        image: field === 'image' ? value : image,
        companyLogo
      });
    }
  };

  return (
    <div className="header-section relative bg-primary-50 text-secondary-900 p-8 md:p-12 print:p-12">
      <button
        onClick={signOut}
        className="absolute top-4 right-4 text-secondary-600 hover:text-secondary-900 transition-colors print:hidden"
      >
        <LogOut className="w-6 h-6" />
      </button>
      
      <div className="header-content relative flex flex-col md:flex-row print:flex-row items-center gap-8 max-w-5xl mx-auto">
        <div className="flex flex-col items-center relative">
          {(image || isEditing) && (
            <div className="relative group">
              {image ? (
                <img
                  src={image}
                  alt={name}
                  className="w-40 h-40 print:w-40 print:h-40 rounded-full object-cover"
                />
              ) : (
                <div className="w-40 h-40 rounded-full bg-gray-200 flex items-center justify-center">
                  <Image className="w-12 h-12 text-gray-400" />
                </div>
              )}
              {isEditing && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <input
                    type="text"
                    value={image || ''}
                    onChange={(e) => handleUpdate('image', e.target.value)}
                    placeholder="Bildeadresse (URL)"
                    className="absolute bottom-0 left-0 right-0 p-2 bg-white/90 text-sm border-t text-center"
                  />
                </div>
              )}
            </div>
          )}
        </div>
        <div className="flex-grow">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="header-name text-3xl md:text-4xl print:text-4xl font-bold mb-2 text-secondary-900">
                <EditableText
                  value={name}
                  onChange={(value) => handleUpdate('name', value)}
                  isEditing={isEditing}
                  className="inline-block"
                />
              </h1>
              <h2 className="header-title text-xl md:text-2xl print:text-2xl text-secondary-600 font-light mb-6">
                <EditableText
                  value={title}
                  onChange={(value) => handleUpdate('title', value)}
                  isEditing={isEditing}
                  className="inline-block"
                />
              </h2>
            </div>
            <img
              src={companyLogo}
              alt="Rubberduck Logo"
              className="w-24 h-18 print:w-24 print:h-18 object-contain ml-4"
            />
          </div>
          
          <div className="flex flex-wrap gap-6">
            <ContactItem 
              icon={MapPin} 
              text={
                <EditableText
                  value={location}
                  onChange={(value) => handleUpdate('location', value)}
                  isEditing={isEditing}
                />
              } 
            />
            <ContactItem 
              icon={Phone} 
              text={
                <EditableText
                  value={phone}
                  onChange={(value) => handleUpdate('phone', value)}
                  isEditing={isEditing}
                />
              } 
            />
            <ContactItem 
              icon={Calendar} 
              text={
                <EditableText
                  value={birthYear}
                  onChange={(value) => handleUpdate('birthYear', value)}
                  isEditing={isEditing}
                />
              } 
            />
            <ContactItem 
              icon={Mail} 
              text={
                <EditableText
                  value={email}
                  onChange={(value) => handleUpdate('email', value)}
                  isEditing={isEditing}
                />
              } 
            />
          </div>
        </div>
      </div>
    </div>
  );
}