import React, { useState } from 'react';
import SkillsInput from './components/SkillsInput';
import { WorkExperienceModal, ProjectModal, TrainingModal, AchievementModal, PortfolioModal } from './components/ResumeModals';

const ResumePreview = ({ form, setForm }) => {
    const [showEduModal, setShowEduModal] = useState(false);
    const [showEduForm, setShowEduForm] = useState(false);
    const [activeModal, setActiveModal] = useState(null);

    const [eduForm, setEduForm] = React.useState({
        college: '',
        startYear: '',
        endYear: '',
        degree: '',
        stream: ''
    });
    const [educations, setEducations] = React.useState([
        {
            course: form.course,
            college: form.college,
            startYear: form.startYear,
            endYear: form.endYear
        }
    ]);
    const addEducation = () => {
        setEducations(prev => [
            ...prev,
            { course: '', college: '', startYear: '', endYear: '' }
        ]);
    };
    return (

        <div className="max-w-4xl mx-auto bg-white border rounded-xl">
            <div className="bg-gray-50 rounded-xl px-6 py-5 flex justify-between items-center mb-6 border border-gray-200">

                <div>
                    <p className="text-[15px] font-semibold text-gray-800">
                        Import your resume
                    </p>
                   
                </div>

                <label className="flex items-center gap-2 text-[#008bdc] font-semibold text-[14px] cursor-pointer hover:underline">
                    Upload Resume
                    <input
                        type="file"
                        className="hidden"
                        accept=".pdf"
                        onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                                if (file.type !== 'application/pdf') {
                                    alert('Only PDF files allowed');
                                    e.target.value = '';
                                    return;
                                }
                                setForm && setForm(prev => ({ ...prev, resumeFile: file }));
                            }
                        }}
                    />
                </label>
            </div>

            {form.resumeFile && (
                <div className="p-6 border-b bg-gray-50/50">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xs font-bold text-gray-400 tracking-wide">
                            UPLOADED RESUME
                        </h3>
                        <div className="flex items-center gap-4">
                            <span className="text-sm font-semibold text-gray-700">{form.resumeFile.name}</span>
                            <button
                                onClick={() => setForm && setForm(prev => ({ ...prev, resumeFile: null }))}
                                className="text-red-500 hover:text-red-700 text-sm font-semibold"
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                    <iframe
                        src={URL.createObjectURL(form.resumeFile)}
                        className="w-full h-[500px] border rounded-lg"
                        title="Resume Preview"
                    />
                </div>
            )}

            {/* Top Info */}
            <div className="p-6 border-b">
                <div className="flex justify-between items-start">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">
                            {form.firstName} {form.lastName}
                        </h2>
                        <p className="text-gray-500 text-sm mt-1">{form.email}</p>
                        <p className="text-gray-500 text-sm">{form.phone}</p>
                        <p className="text-gray-500 text-sm">{form.city}</p>
                    </div>
                </div>
            </div>

            {/* Career Objective */}
            <div className="p-6 border-b">
                <h3 className="text-xs font-bold text-gray-400 mb-2 tracking-wide">
                    CAREER OBJECTIVE
                </h3>

                {form.about ? (
                    <p className="text-gray-700 text-sm">{form.about}</p>
                ) : (
                    <button className="text-[#008bdc] text-sm font-semibold">
                        + Add your career objective
                    </button>
                )}
            </div>

            {/* Education */}
            <div className="p-6 border-b">
                <h3 className="text-xs font-bold text-gray-400 mb-4 tracking-wide">
                    EDUCATION
                </h3>

                <div className="space-y-4">
                    {educations.map((edu, i) => (
                        <div key={i} className="border rounded-lg p-4">
                            <p className="font-semibold text-gray-900">
                                {edu.course || 'Course'}
                            </p>
                            <p className="text-sm text-gray-600">
                                {edu.college || 'College'}
                            </p>
                            <p className="text-sm text-gray-400">
                                {edu.startYear || 'Start'} - {edu.endYear || 'End'}
                            </p>
                        </div>
                    ))}
                </div>

                <button
                    onClick={() => setShowEduModal(true)}
                    className="text-[#008bdc] text-sm font-semibold mt-3"
                >
                    + Add education
                </button>
            </div>

            {/* Skills */}
            <div className="p-6 border-b">
                <h3 className="text-xs font-bold text-gray-400 mb-4 tracking-wide">
                    SKILLS
                </h3>
                <SkillsInput skills={form.skills} setForm={setForm} />
            </div>

            {/* Extra Sections */}
            <div className="p-6 space-y-6 text-sm">
                
                {/* Work Experience */}
                <div className="border-b pb-4">
                    <h3 className="text-gray-600 uppercase text-xs font-semibold mb-3">Work experience</h3>
                    {form.workExperience && form.workExperience.length > 0 ? (
                        <div className="space-y-4 mb-3">
                            {form.workExperience.map((exp, i) => (
                                <div key={i}>
                                    <p className="font-semibold text-gray-900">{exp.role}</p>
                                    <p className="text-sm text-gray-600">{exp.company}</p>
                                    <p className="text-sm text-gray-400">{exp.startDate} - {exp.endDate}</p>
                                    {exp.description && <p className="text-sm text-gray-700 mt-1">{exp.description}</p>}
                                </div>
                            ))}
                            <button onClick={() => setActiveModal('work')} className="text-[#008bdc] font-semibold text-sm">+ Add work experience</button>
                        </div>
                    ) : (
                        <button onClick={() => setActiveModal('work')} className="text-[#008bdc] font-semibold text-sm">+ Add work experience</button>
                    )}
                </div>

                {/* Extra Curricular */}
                <div className="border-b pb-4">
                    <h3 className="text-gray-600 uppercase text-xs font-semibold mb-3">Extra curricular activities</h3>
                    {form.extraCurricular && form.extraCurricular.length > 0 ? (
                        <div className="space-y-4 mb-3">
                            {form.extraCurricular.map((item, i) => (
                                <div key={i}>
                                    <p className="font-semibold text-gray-900">{item.title}</p>
                                    {item.description && <p className="text-sm text-gray-700 mt-1">{item.description}</p>}
                                </div>
                            ))}
                            <button onClick={() => setActiveModal('extra')} className="text-[#008bdc] font-semibold text-sm">+ Add extra curricular</button>
                        </div>
                    ) : (
                        <button onClick={() => setActiveModal('extra')} className="text-[#008bdc] font-semibold text-sm">+ Add extra curricular</button>
                    )}
                </div>

                {/* Trainings */}
                <div className="border-b pb-4">
                    <h3 className="text-gray-600 uppercase text-xs font-semibold mb-3">Trainings / courses</h3>
                    {form.trainings && form.trainings.length > 0 ? (
                        <div className="space-y-4 mb-3">
                            {form.trainings.map((item, i) => (
                                <div key={i}>
                                    <p className="font-semibold text-gray-900">{item.title}</p>
                                    <p className="text-sm text-gray-600">{item.organization}</p>
                                    <p className="text-sm text-gray-400">{item.duration}</p>
                                </div>
                            ))}
                            <button onClick={() => setActiveModal('training')} className="text-[#008bdc] font-semibold text-sm">+ Add training</button>
                        </div>
                    ) : (
                        <button onClick={() => setActiveModal('training')} className="text-[#008bdc] font-semibold text-sm">+ Add training</button>
                    )}
                </div>

                {/* Projects */}
                <div className="border-b pb-4">
                    <h3 className="text-gray-600 uppercase text-xs font-semibold mb-3">Academic / personal projects</h3>
                    {form.projects && form.projects.length > 0 ? (
                        <div className="space-y-4 mb-3">
                            {form.projects.map((item, i) => (
                                <div key={i}>
                                    <p className="font-semibold text-gray-900">{item.title}</p>
                                    {item.link && <a href={item.link} target="_blank" rel="noreferrer" className="text-sm text-[#008bdc] hover:underline">{item.link}</a>}
                                    {item.description && <p className="text-sm text-gray-700 mt-1">{item.description}</p>}
                                </div>
                            ))}
                            <button onClick={() => setActiveModal('project')} className="text-[#008bdc] font-semibold text-sm">+ Add project</button>
                        </div>
                    ) : (
                        <button onClick={() => setActiveModal('project')} className="text-[#008bdc] font-semibold text-sm">+ Add project</button>
                    )}
                </div>

                {/* Portfolio */}
                <div className="border-b pb-4">
                    <h3 className="text-gray-600 uppercase text-xs font-semibold mb-3">Portfolio / work samples</h3>
                    {form.portfolio && form.portfolio.length > 0 ? (
                        <div className="space-y-4 mb-3">
                            {form.portfolio.map((item, i) => (
                                <div key={i}>
                                    <p className="font-semibold text-gray-900">{item.title}</p>
                                    <a href={item.link} target="_blank" rel="noreferrer" className="text-sm text-[#008bdc] hover:underline">{item.link}</a>
                                </div>
                            ))}
                            <button onClick={() => setActiveModal('portfolio')} className="text-[#008bdc] font-semibold text-sm">+ Add portfolio</button>
                        </div>
                    ) : (
                        <button onClick={() => setActiveModal('portfolio')} className="text-[#008bdc] font-semibold text-sm">+ Add portfolio</button>
                    )}
                </div>

                {/* Accomplishments */}
                <div className="pb-4">
                    <h3 className="text-gray-600 uppercase text-xs font-semibold mb-3">Accomplishments / additional details</h3>
                    {form.accomplishments && form.accomplishments.length > 0 ? (
                        <div className="space-y-4 mb-3">
                            {form.accomplishments.map((item, i) => (
                                <div key={i}>
                                    <p className="font-semibold text-gray-900">{item.title}</p>
                                    {item.description && <p className="text-sm text-gray-700 mt-1">{item.description}</p>}
                                </div>
                            ))}
                            <button onClick={() => setActiveModal('accomplishment')} className="text-[#008bdc] font-semibold text-sm">+ Add accomplishment</button>
                        </div>
                    ) : (
                        <button onClick={() => setActiveModal('accomplishment')} className="text-[#008bdc] font-semibold text-sm">+ Add accomplishment</button>
                    )}
                </div>
            </div>

            {/* Modals rendering */}
            {activeModal === 'work' && <WorkExperienceModal onClose={() => setActiveModal(null)} onSave={(data) => { setForm(prev => ({...prev, workExperience: [...(prev.workExperience||[]), data]})); setActiveModal(null); }} />}
            {activeModal === 'extra' && <AchievementModal title="Extra curricular activities" onClose={() => setActiveModal(null)} onSave={(data) => { setForm(prev => ({...prev, extraCurricular: [...(prev.extraCurricular||[]), data]})); setActiveModal(null); }} />}
            {activeModal === 'training' && <TrainingModal onClose={() => setActiveModal(null)} onSave={(data) => { setForm(prev => ({...prev, trainings: [...(prev.trainings||[]), data]})); setActiveModal(null); }} />}
            {activeModal === 'project' && <ProjectModal onClose={() => setActiveModal(null)} onSave={(data) => { setForm(prev => ({...prev, projects: [...(prev.projects||[]), data]})); setActiveModal(null); }} />}
            {activeModal === 'portfolio' && <PortfolioModal onClose={() => setActiveModal(null)} onSave={(data) => { setForm(prev => ({...prev, portfolio: [...(prev.portfolio||[]), data]})); setActiveModal(null); }} />}
            {activeModal === 'accomplishment' && <AchievementModal title="Accomplishments / additional details" onClose={() => setActiveModal(null)} onSave={(data) => { setForm(prev => ({...prev, accomplishments: [...(prev.accomplishments||[]), data]})); setActiveModal(null); }} />}
            {showEduModal && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

                    <div className="bg-white w-[500px] rounded-xl p-6 relative">

                        {/* Close button */}
                        <button
                            onClick={() => setShowEduModal(false)}
                            className="absolute top-4 right-4 text-gray-500 text-lg"
                        >
                            ✕
                        </button>

                        <h2 className="text-xl font-semibold text-center mb-6">
                            Education
                        </h2>

                        <div className="space-y-4 text-[#008bdc] font-semibold text-sm">

                            {[
                                "Graduation / Post Graduation",
                                "Senior Secondary (XII)",
                                "Secondary (X)",
                                "Diploma",
                                "PhD"
                            ].map(type => (
                                <button
                                    key={type}
                                    onClick={() => {
                                        setShowEduModal(false);
                                        setShowEduForm(true);
                                    }}
                                    className="block w-full text-left hover:underline"
                                >
                                    + Add {type}
                                </button>
                            ))}

                        </div>
                    </div>
                </div>
            )}
            {showEduForm && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

                    <div className="bg-white w-[600px] rounded-xl p-6 relative">

                        {/* Close */}
                        <button
                            onClick={() => setShowEduForm(false)}
                            className="absolute top-4 right-4 text-gray-500"
                        >
                            ✕
                        </button>

                        <h2 className="text-lg font-semibold text-center mb-6">
                            Graduation details / Post graduation details
                        </h2>

                        {/* College */}
                        <div className="mb-4">
                            <label className="text-sm text-gray-600">College</label>
                            <input
                                type="text"
                                value={eduForm.college}
                                onChange={e => setEduForm(p => ({ ...p, college: e.target.value }))}
                                className="w-full border rounded-lg px-3 py-2 mt-1"
                                placeholder="e.g. Hindu College"
                            />
                        </div>

                        {/* Years */}
                        <div className="flex gap-4 mb-4">
                            <input
                                type="text"
                                placeholder="Start year"
                                value={eduForm.startYear}
                                onChange={e => setEduForm(p => ({ ...p, startYear: e.target.value }))}
                                className="w-full border rounded-lg px-3 py-2"
                            />
                            <input
                                type="text"
                                placeholder="End year"
                                value={eduForm.endYear}
                                onChange={e => setEduForm(p => ({ ...p, endYear: e.target.value }))}
                                className="w-full border rounded-lg px-3 py-2"
                            />
                        </div>

                        {/* Degree + Stream */}
                        <div className="flex gap-4 mb-4">
                            <input
                                type="text"
                                placeholder="Degree"
                                value={eduForm.degree}
                                onChange={e => setEduForm(p => ({ ...p, degree: e.target.value }))}
                                className="w-full border rounded-lg px-3 py-2"
                            />
                            <input
                                type="text"
                                placeholder="Stream"
                                value={eduForm.stream}
                                onChange={e => setEduForm(p => ({ ...p, stream: e.target.value }))}
                                className="w-full border rounded-lg px-3 py-2"
                            />
                        </div>

                        {/* Save button */}
                        <div className="flex justify-end">
                            <button
                                onClick={() => {
                                    setEducations(prev => [
                                        ...prev,
                                        {
                                            course: eduForm.degree || "Graduation",
                                            college: eduForm.college,
                                            startYear: eduForm.startYear,
                                            endYear: eduForm.endYear
                                        }
                                    ]);

                                    setShowEduForm(false);

                                    // reset form
                                    setEduForm({
                                        college: '',
                                        startYear: '',
                                        endYear: '',
                                        degree: '',
                                        stream: ''
                                    });
                                }}
                                className="bg-[#008bdc] text-white px-5 py-2 rounded-lg"
                            >
                                Save
                            </button>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
};

export default ResumePreview;