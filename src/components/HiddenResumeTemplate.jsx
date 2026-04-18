import React from 'react';

const HiddenResumeTemplate = ({ form }) => {
  return (
    <div style={{ display: 'none' }}>
      <div 
        id="pdf-content" 
        style={{ 
          width: '800px', 
          minHeight: '1100px', 
          backgroundColor: '#fff', 
          color: '#000',
          fontFamily: 'Arial, sans-serif',
          padding: '40px',
          boxSizing: 'border-box'
        }}
      >
        {/* Header */}
        <div style={{ borderBottom: '2px solid #000', paddingBottom: '20px', marginBottom: '20px' }}>
          <h1 style={{ fontSize: '32px', fontWeight: 'bold', margin: '0 0 10px 0', textTransform: 'uppercase' }}>
            {form.firstName} {form.lastName}
          </h1>
          <div style={{ fontSize: '14px' }}>
            {form.email} &bull; {form.phone} &bull; {form.city}
          </div>
        </div>

        {/* Career Objective */}
        {form.about && (
          <div style={{ marginBottom: '20px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '10px' }}>Career Objective</h2>
            <p style={{ fontSize: '14px', lineHeight: '1.5', margin: 0 }}>{form.about}</p>
          </div>
        )}

        {/* Education */}
        {(form.course || form.college) && (
          <div style={{ marginBottom: '20px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '10px' }}>Education</h2>
            <div style={{ marginBottom: '10px' }}>
              <div style={{ fontWeight: 'bold', fontSize: '14px' }}>{form.course} {form.stream ? `- ${form.stream}` : ''}</div>
              <div style={{ fontSize: '14px' }}>{form.college}</div>
              <div style={{ fontSize: '12px' }}>{form.startYear} - {form.endYear}</div>
            </div>
          </div>
        )}

        {/* Work Experience */}
        {form.workExperience && form.workExperience.length > 0 && (
          <div style={{ marginBottom: '20px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '10px' }}>Work Experience</h2>
            {form.workExperience.map((exp, idx) => (
              <div key={idx} style={{ marginBottom: '15px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <div style={{ fontWeight: 'bold', fontSize: '14px' }}>{exp.role}</div>
                  <div style={{ fontSize: '12px', fontWeight: 'bold' }}>{exp.startDate} - {exp.endDate}</div>
                </div>
                <div style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '5px' }}>{exp.company}</div>
                {exp.description && <p style={{ fontSize: '14px', lineHeight: '1.5', margin: 0, whiteSpace: 'pre-wrap' }}>{exp.description}</p>}
              </div>
            ))}
          </div>
        )}

        {/* Projects */}
        {form.projects && form.projects.length > 0 && (
          <div style={{ marginBottom: '20px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '10px' }}>Projects</h2>
            {form.projects.map((proj, idx) => (
              <div key={idx} style={{ marginBottom: '15px' }}>
                <div style={{ display: 'flex', alignItems: 'baseline' }}>
                  <div style={{ fontWeight: 'bold', fontSize: '14px', marginRight: '10px' }}>{proj.title}</div>
                  {proj.link && <a href={proj.link} style={{ fontSize: '12px', color: '#000', textDecoration: 'underline' }}>{proj.link}</a>}
                </div>
                {proj.description && <p style={{ fontSize: '14px', lineHeight: '1.5', margin: '5px 0 0 0', whiteSpace: 'pre-wrap' }}>{proj.description}</p>}
              </div>
            ))}
          </div>
        )}

        {/* Skills */}
        {form.skills && form.skills.length > 0 && (
          <div style={{ marginBottom: '20px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '10px' }}>Skills</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {form.skills.map((skill, idx) => (
                <span key={idx} style={{ fontSize: '14px', padding: '4px 8px', border: '1px solid #000', borderRadius: '4px' }}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Trainings */}
        {form.trainings && form.trainings.length > 0 && (
          <div style={{ marginBottom: '20px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '10px' }}>Trainings & Certifications</h2>
            {form.trainings.map((t, idx) => (
              <div key={idx} style={{ marginBottom: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <div style={{ fontWeight: 'bold', fontSize: '14px' }}>{t.title}</div>
                  <div style={{ fontSize: '12px' }}>{t.duration}</div>
                </div>
                <div style={{ fontSize: '14px' }}>{t.organization}</div>
              </div>
            ))}
          </div>
        )}

        {/* Accomplishments */}
        {form.accomplishments && form.accomplishments.length > 0 && (
          <div style={{ marginBottom: '20px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '10px' }}>Accomplishments</h2>
            {form.accomplishments.map((acc, idx) => (
              <div key={idx} style={{ marginBottom: '10px' }}>
                <div style={{ fontWeight: 'bold', fontSize: '14px' }}>{acc.title}</div>
                {acc.description && <div style={{ fontSize: '14px', lineHeight: '1.5' }}>{acc.description}</div>}
              </div>
            ))}
          </div>
        )}

        {/* Portfolio */}
        {form.portfolio && form.portfolio.length > 0 && (
          <div style={{ marginBottom: '20px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '10px' }}>Portfolio</h2>
            {form.portfolio.map((port, idx) => (
              <div key={idx} style={{ marginBottom: '5px' }}>
                <span style={{ fontWeight: 'bold', fontSize: '14px', marginRight: '10px' }}>{port.title}:</span>
                <a href={port.link} style={{ fontSize: '14px', color: '#000', textDecoration: 'underline' }}>{port.link}</a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HiddenResumeTemplate;
