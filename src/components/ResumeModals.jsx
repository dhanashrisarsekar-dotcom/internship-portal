import React, { useState } from 'react';

export const GenericModal = ({ title, onClose, onSave, children }) => {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-lg rounded-xl p-6 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-lg"
        >
          ✕
        </button>
        <h2 className="text-xl font-semibold text-center mb-6">{title}</h2>
        {children}
        <div className="flex justify-end mt-6">
          <button
            onClick={onSave}
            className="bg-[#008bdc] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#0079c0] transition"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export const WorkExperienceModal = ({ onClose, onSave }) => {
  const [data, setData] = useState({ company: '', role: '', startDate: '', endDate: '', description: '' });

  const handleSave = () => {
    if (data.company && data.role) onSave(data);
    else onClose();
  };

  return (
    <GenericModal title="Work experience" onClose={onClose} onSave={handleSave}>
      <div className="space-y-4 text-sm">
        <div>
          <label className="text-gray-600 block mb-1">Company</label>
          <input type="text" value={data.company} onChange={e => setData({...data, company: e.target.value})} className="w-full border rounded-lg px-3 py-2" placeholder="e.g. Amazon" />
        </div>
        <div>
          <label className="text-gray-600 block mb-1">Role</label>
          <input type="text" value={data.role} onChange={e => setData({...data, role: e.target.value})} className="w-full border rounded-lg px-3 py-2" placeholder="e.g. Software Engineer" />
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="text-gray-600 block mb-1">Start Date</label>
            <input type="text" value={data.startDate} onChange={e => setData({...data, startDate: e.target.value})} className="w-full border rounded-lg px-3 py-2" placeholder="e.g. Jan 2021" />
          </div>
          <div className="flex-1">
            <label className="text-gray-600 block mb-1">End Date</label>
            <input type="text" value={data.endDate} onChange={e => setData({...data, endDate: e.target.value})} className="w-full border rounded-lg px-3 py-2" placeholder="e.g. Present" />
          </div>
        </div>
        <div>
          <label className="text-gray-600 block mb-1">Description</label>
          <textarea value={data.description} onChange={e => setData({...data, description: e.target.value})} className="w-full border rounded-lg px-3 py-2" rows="3" placeholder="Describe your responsibilities" />
        </div>
      </div>
    </GenericModal>
  );
};

export const ProjectModal = ({ onClose, onSave }) => {
  const [data, setData] = useState({ title: '', description: '', link: '' });

  const handleSave = () => {
    if (data.title) onSave(data);
    else onClose();
  };

  return (
    <GenericModal title="Academic / personal projects" onClose={onClose} onSave={handleSave}>
      <div className="space-y-4 text-sm">
        <div>
          <label className="text-gray-600 block mb-1">Project Title</label>
          <input type="text" value={data.title} onChange={e => setData({...data, title: e.target.value})} className="w-full border rounded-lg px-3 py-2" placeholder="e.g. E-commerce Website" />
        </div>
        <div>
          <label className="text-gray-600 block mb-1">Project Link (Optional)</label>
          <input type="text" value={data.link} onChange={e => setData({...data, link: e.target.value})} className="w-full border rounded-lg px-3 py-2" placeholder="e.g. https://github.com/..." />
        </div>
        <div>
          <label className="text-gray-600 block mb-1">Description</label>
          <textarea value={data.description} onChange={e => setData({...data, description: e.target.value})} className="w-full border rounded-lg px-3 py-2" rows="3" placeholder="Describe what you built and your role" />
        </div>
      </div>
    </GenericModal>
  );
};

export const TrainingModal = ({ onClose, onSave }) => {
  const [data, setData] = useState({ title: '', organization: '', duration: '' });

  const handleSave = () => {
    if (data.title) onSave(data);
    else onClose();
  };

  return (
    <GenericModal title="Trainings / courses" onClose={onClose} onSave={handleSave}>
      <div className="space-y-4 text-sm">
        <div>
          <label className="text-gray-600 block mb-1">Training program</label>
          <input type="text" value={data.title} onChange={e => setData({...data, title: e.target.value})} className="w-full border rounded-lg px-3 py-2" placeholder="e.g. Full Stack Web Development" />
        </div>
        <div>
          <label className="text-gray-600 block mb-1">Organization</label>
          <input type="text" value={data.organization} onChange={e => setData({...data, organization: e.target.value})} className="w-full border rounded-lg px-3 py-2" placeholder="e.g. CareerBridge" />
        </div>
        <div>
          <label className="text-gray-600 block mb-1">Duration</label>
          <input type="text" value={data.duration} onChange={e => setData({...data, duration: e.target.value})} className="w-full border rounded-lg px-3 py-2" placeholder="e.g. 6 weeks" />
        </div>
      </div>
    </GenericModal>
  );
};

export const AchievementModal = ({ title, onClose, onSave }) => {
  const [data, setData] = useState({ title: '', description: '' });

  const handleSave = () => {
    if (data.title || data.description) onSave(data);
    else onClose();
  };

  return (
    <GenericModal title={title} onClose={onClose} onSave={handleSave}>
      <div className="space-y-4 text-sm">
        <div>
          <label className="text-gray-600 block mb-1">Title</label>
          <input type="text" value={data.title} onChange={e => setData({...data, title: e.target.value})} className="w-full border rounded-lg px-3 py-2" placeholder="e.g. 1st Prize in Hackathon" />
        </div>
        <div>
          <label className="text-gray-600 block mb-1">Description</label>
          <textarea value={data.description} onChange={e => setData({...data, description: e.target.value})} className="w-full border rounded-lg px-3 py-2" rows="3" placeholder="Provide more details" />
        </div>
      </div>
    </GenericModal>
  );
};

export const PortfolioModal = ({ onClose, onSave }) => {
  const [data, setData] = useState({ title: '', link: '' });

  const handleSave = () => {
    if (data.link) onSave(data);
    else onClose();
  };

  return (
    <GenericModal title="Portfolio / work samples" onClose={onClose} onSave={handleSave}>
      <div className="space-y-4 text-sm">
        <div>
          <label className="text-gray-600 block mb-1">Title</label>
          <input type="text" value={data.title} onChange={e => setData({...data, title: e.target.value})} className="w-full border rounded-lg px-3 py-2" placeholder="e.g. Behance Profile, GitHub, etc." />
        </div>
        <div>
          <label className="text-gray-600 block mb-1">Link</label>
          <input type="text" value={data.link} onChange={e => setData({...data, link: e.target.value})} className="w-full border rounded-lg px-3 py-2" placeholder="e.g. https://..." />
        </div>
      </div>
    </GenericModal>
  );
};
