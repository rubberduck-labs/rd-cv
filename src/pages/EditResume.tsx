import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { resumeData } from '../data/resume';
import EditableField from '../components/EditableField';

export default function EditResume() {
  const [data, setData] = useState(resumeData);
  const navigate = useNavigate();

  const updatePersonal = (key: keyof typeof data.personal, value: string) => {
    setData({
      ...data,
      personal: {
        ...data.personal,
        [key]: value
      }
    });
  };

  const updateSummary = (index: number, value: string) => {
    const newSummary = [...data.summary];
    newSummary[index] = value;
    setData({
      ...data,
      summary: newSummary
    });
  };

  const updateExperience = (index: number, key: keyof (typeof data.experience)[0], value: string) => {
    const newExperience = [...data.experience];
    newExperience[index] = {
      ...newExperience[index],
      [key]: value
    };
    setData({
      ...data,
      experience: newExperience
    });
  };

  const handleSave = async () => {
    try {
      const response = await fetch('/api/save-resume', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (response.ok) {
        navigate('/nicolai');
      }
    } catch (error) {
      console.error('Failed to save resume:', error);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-8">
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold">Rediger CV</h1>
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-primary-400 text-white rounded-md hover:bg-primary-500"
        >
          Lagre endringer
        </button>
      </div>

      <div className="space-y-8">
        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Personlig informasjon</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <EditableField
              label="Navn"
              value={data.personal.name}
              onChange={(value) => updatePersonal('name', value)}
            />
            <EditableField
              label="Tittel"
              value={data.personal.title}
              onChange={(value) => updatePersonal('title', value)}
            />
            <EditableField
              label="Bosted"
              value={data.personal.location}
              onChange={(value) => updatePersonal('location', value)}
            />
            <EditableField
              label="Telefon"
              value={data.personal.phone}
              onChange={(value) => updatePersonal('phone', value)}
            />
            <EditableField
              label="Fødselsår"
              value={data.personal.birthYear}
              onChange={(value) => updatePersonal('birthYear', value)}
            />
            <EditableField
              label="E-post"
              value={data.personal.email}
              onChange={(value) => updatePersonal('email', value)}
            />
          </div>
        </section>

        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Sammendrag</h2>
          {data.summary.map((paragraph, index) => (
            <div key={index} className="mb-4">
              <EditableField
                value={paragraph}
                onChange={(value) => updateSummary(index, value)}
                multiline
              />
            </div>
          ))}
        </section>

        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Erfaring</h2>
          {data.experience.map((exp, index) => (
            <div key={index} className="mb-8 p-4 border rounded-lg">
              <EditableField
                label="Tittel"
                value={exp.title}
                onChange={(value) => updateExperience(index, 'title', value)}
              />
              <EditableField
                label="Periode"
                value={exp.period}
                onChange={(value) => updateExperience(index, 'period', value)}
              />
              <EditableField
                label="Beskrivelse"
                value={exp.description}
                onChange={(value) => updateExperience(index, 'description', value)}
                multiline
              />
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}