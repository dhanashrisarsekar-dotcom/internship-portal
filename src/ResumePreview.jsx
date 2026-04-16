import React from 'react';

const ResumePreview = ({ form }) => {
    const [showEduModal, setShowEduModal] = React.useState(false);
    const [showEduForm, setShowEduForm] = React.useState(false);

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
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                                console.log(file.name);
                            }
                        }}
                    />
                </label>

            </div>
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

                {form.skills.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                        {form.skills.map(skill => (
                            <span
                                key={skill}
                                className="px-3 py-1 text-sm bg-gray-100 rounded-full"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                ) : (
                    <button className="text-[#008bdc] text-sm font-semibold">
                        + Add skill
                    </button>
                )}
            </div>

            {/* Extra Sections (static for now like Internshala UI) */}
            <div className="p-6 space-y-4 text-sm">

                {[
                    "Work experience",
                    "Extra curricular activities",
                    "Trainings / courses",
                    "Academic / personal projects",
                    "Portfolio / work samples",
                    "Accomplishments / additional details"
                ].map(section => (
                    <div key={section} className="flex justify-between border-b pb-3">
                        <span className="text-gray-600 uppercase text-xs font-semibold">
                            {section}
                        </span>
                        <button className="text-[#008bdc] font-semibold">
                            + Add
                        </button>
                    </div>
                ))}

            </div>
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