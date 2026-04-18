import React, { useState } from 'react';
import { X } from 'lucide-react';

const SkillsInput = ({ skills, setForm }) => {
  const [skillInput, setSkillInput] = useState('');

  const addSkill = () => {
    const trimmed = skillInput.trim();
    if (trimmed && !skills.includes(trimmed)) {
      setForm(prev => ({
        ...prev,
        skills: [...prev.skills, trimmed]
      }));
    }
    setSkillInput('');
  };

  const removeSkill = (skillToRemove) => {
    setForm(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skillToRemove)
    }));
  };

  return (
    <div>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={skillInput}
          onChange={(e) => setSkillInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              addSkill();
            }
          }}
          placeholder="e.g. Video Editing"
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-[14px] outline-none focus:border-[#008bdc]"
        />
        <button
          type="button"
          onClick={addSkill}
          className="px-4 py-2 bg-[#008bdc] text-white rounded-lg text-sm font-semibold"
        >
          Add
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {skills.map(skill => (
          <div
            key={skill}
            onClick={() => removeSkill(skill)}
            className="px-4 py-2 rounded-full text-[13px] font-semibold cursor-pointer transition flex items-center gap-2 bg-[#008bdc] text-white shadow-sm shadow-blue-200"
          >
            {skill}
            <X className="w-3.5 h-3.5" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsInput;
