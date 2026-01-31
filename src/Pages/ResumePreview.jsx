import { useLocation } from "react-router-dom"

export default function ResumePreview() {
  const location = useLocation();
  const { resume } = location.state || {};

  if (!resume) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-500 text-lg">No resume selected.</p>
      </div>
    );
  }

  const education = Array.isArray(resume.education)
    ? resume.education
    : resume.education
      ? JSON.parse(resume.education)
      : [];

  const experience = Array.isArray(resume.experience)
    ? resume.experience
    : resume.experience
      ? JSON.parse(resume.experience)
      : [];

  const skills = resume.skills ? resume.skills.split(",") : [];
  const languages = resume.languages ? resume.languages.split(",") : [];
  const projects = Array.isArray(resume.projects) ? resume.projects : [];

  return (<>

  
    <div className="min-h-screen bg-gray-100 p-4 md:p-8 flex justify-center">
      <div className="bg-white flex flex-col lg:flex-row rounded-2xl shadow-xl max-w-5xl w-full overflow-hidden">

        {/* LEFT SIDEBAR */}
        <div className="bg-gray-900 text-white w-full lg:w-1/3 p-6 lg:p-8 flex flex-col items-center lg:items-start space-y-6">
          {/* Profile */}
          {resume.profile_image_url ? (
            <img
              src={resume.profile_image_url}
              alt={resume.full_name}
              className="w-28 h-28 rounded-full object-cover"
            />
          ) : (
            <div className="w-28 h-28 rounded-full bg-gray-700 flex items-center justify-center text-gray-300">
              No Image
            </div>
          )}
          <div className="text-center lg:text-left">
            <h2 className="text-2xl font-bold">{resume.full_name}</h2>
            <p className="text-gray-300">{resume.title}</p>
          </div>

          {/* Contact */}
          <div className="w-full">
            <h3 className="uppercase font-bold text-xs mb-1 border-b border-gray-600 pb-1">Contact</h3>
            <p className="text-sm">📞 {resume.phone || "N/A"}</p>
            <p className="text-sm">✉️ {resume.email || "N/A"}</p>
            <p className="text-sm">📍 {resume.address || "N/A"}</p>
          </div>

          {/* Education */}
          {education.length > 0 && (
            <div className="w-full">
              <h3 className="uppercase font-bold text-xs mb-1 border-b border-gray-600 pb-1">Education</h3>
              {education.map((edu, idx) => (
                <div key={idx} className="text-sm mb-1">
                  <p className="font-semibold">{edu.degree || "N/A"}</p>
                  <p>{edu.school || "N/A"}</p>
                  <p className="text-gray-300">{edu.year || "N/A"}</p>
                </div>
              ))}
            </div>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <div className="w-full">
              <h3 className="uppercase font-bold text-xs mb-1 border-b border-gray-600 pb-1">Skills</h3>
              <ul className="list-disc list-inside text-sm space-y-1">
                {skills.map((skill, idx) => (
                  <li key={idx}>{skill.trim()}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <div className="w-full">
              <h3 className="uppercase font-bold text-xs mb-1 border-b border-gray-600 pb-1">Languages</h3>
              <ul className="list-disc list-inside text-sm space-y-1">
                {languages.map((lang, idx) => (
                  <li key={idx}>{lang.trim()}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* RIGHT MAIN CONTENT */}
        <div className="w-full lg:w-2/3 p-6 lg:p-8 flex flex-col space-y-6">

          {/* About Me / Description */}
          {resume.description && (
            <div>
              <h3 className="font-bold text-lg mb-1 border-b border-gray-300 pb-1 text-red-600">About Me</h3>
              <p className="text-gray-700 text-sm">{resume.description}</p>
            </div>
          )}

          {/* Work Experience */}
          {experience.length > 0 && (
            <div>
              <h3 className="font-bold text-lg mb-1 border-b border-gray-300 pb-1 text-gray-600">Work Experience</h3>
              <div className="space-y-3">
                {experience.map((exp, idx) => (
                  <div key={idx} className="relative pl-6">
                    <div className="absolute left-0 top-2 w-3 h-3 bg-gray-900 rounded-full"></div>
                    <p className="font-semibold">{exp.role || "N/A"}</p>
                    <p className="text-sm text-gray-600">{exp.company || "N/A"}, {exp.duration || "N/A"}</p>
                    {exp.description && (
                      <p className="text-gray-700 text-sm mt-1">{exp.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <div>
              <h3 className="font-bold text-lg mb-1 border-b border-gray-300 pb-1 text-gray-600">Skills</h3>
              <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                {skills.map((skill, idx) => (
                  <li key={idx}>{skill.trim()}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Profile Summary */}
          {resume.summary && (
            <div>
              <h3 className="font-bold text-lg mb-1 border-b border-gray-300 pb-1 text-gray-600">Profile Summary</h3>
              <p className="text-gray-700 text-sm">{resume.summary}</p>
            </div>
          )}

          {/* Projects / Certifications */}
          {projects.length > 0 && (
            <div>
              <h3 className="font-bold text-lg mb-1 border-b border-gray-300 pb-1 text-gray-600">Projects / Certifications</h3>
              <ul className="text-gray-700 text-sm list-disc list-inside space-y-1">
                {projects.map((proj, idx) => (
                  <li key={idx}>{proj.name || "N/A"}</li>
                ))}
              </ul>
              {resume.projects_description && (
                <p className="text-gray-700 text-sm mt-1">{resume.projects_description}</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>

  </>
  );
}
