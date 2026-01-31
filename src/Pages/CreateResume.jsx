import { useState } from "react";
import { useNavigate } from "react-router-dom"; // React Router hook
import client from "../config";
import Swal from "sweetalert2";

export default function CreateResume() {
  const navigate = useNavigate(); // navigation hook
  const [form, setForm] = useState({
    fullName: "",
    title: "",
    description: "",
    email: "",
    phone: "",
    address: "",
    education: [{ degree: "", school: "", year: "" }],
    experience: [{ role: "", company: "", duration: "" }],
    skills: "",
    projects: "",
    languages: "",
    summary: "",
     experience_description: "", // Add this
  projects_description: "",   // Add this
    profileImage: null,
  });

  const handleChange = (e, section, index, field) => {
    if (section === "education" || section === "experience") {
      const updated = [...form[section]];
      updated[index][field] = e.target.value;
      setForm({ ...form, [section]: updated });
    } else if (section === "profileImage") {
      setForm({ ...form, profileImage: e.target.files[0] });
    } else {
      setForm({ ...form, [section]: e.target.value });
    }
  };

  const addSectionItem = (section) => {
    setForm({
      ...form,
      [section]: [
        ...form[section],
        Object.fromEntries(Object.keys(form[section][0]).map((k) => [k, ""])),
      ],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.fullName || !form.email) {
      Swal.fire({
        icon: "warning",
        title: "Missing Info",
        text: "Full name aur email required hai",
      });
      return;
    }

    const {
      data: { user },
    } = await client.auth.getUser();

    if (!user) {
      Swal.fire({
        icon: "error",
        title: "Unauthorized",
        text: "Please login first",
      });
      return;
    }

    let profileImageUrl = null;

    // 🔹 IMAGE UPLOAD
    if (form.profileImage) {
      const fileExt = form.profileImage.name.split(".").pop();
      const fileName = `${user.id}-${Date.now()}.${fileExt}`;
      const filePath = fileName;

      const { error: uploadError } = await client.storage
        .from("resume-profile")
        .upload(filePath, form.profileImage, { upsert: true });

      if (uploadError) {
        Swal.fire({
          icon: "error",
          title: "Image Upload Failed",
          text: uploadError.message,
        });
        return;
      }

      const { data: imageData } = client.storage
        .from("resume-profile")
        .getPublicUrl(filePath);

      profileImageUrl = imageData.publicUrl;
    }

    // 🔹 INSERT INTO RESUMES TABLE
    const { error } = await client.from("resumes").insert([
      {
        user_id: user.id,
        full_name: form.fullName,
        title: form.title,
        email: form.email,
        description: form.description,
        phone: form.phone,
        address: form.address,
        education: form.education,
        experience: form.experience,
        skills: form.skills,
        projects: form.projects,
        languages: form.languages,
        summary: form.summary,
        profile_image_url: profileImageUrl,
      },
    ]);

    if (error) {
      Swal.fire({
        icon: "error",
        title: "Save Failed",
        text: error.message,
      });
    } else {
      Swal.fire({
        icon: "success",
        title: "Resume Saved 🎉",
        text: "Your resume has been stored successfully",
      });

      // 🔹 Reset form after save
      setForm({
        fullName: "",
        title: "",
        description: "",
        email: "",
        phone: "",
        address: "",
        education: [{ degree: "", school: "", year: "" }],
        experience: [{ role: "", company: "", duration: "" }],
        skills: "",
        projects: "",
        languages: "",
        summary: "",
        profileImage: null,
      });

      // 🔹 Navigate to dashboard
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
          Create Resume
        </h2>

        {/* Personal Information */}
        <h3 className="font-semibold mb-2">Personal Information</h3>
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            placeholder="Full Name"
            value={form.fullName}
            onChange={(e) => handleChange(e, "fullName")}
            className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Professional Title"
            value={form.title}
            onChange={(e) => handleChange(e, "title")}
            className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Professional Description"
            value={form.description}
            onChange={(e) => handleChange(e, "description")}
            className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => handleChange(e, "email")}
            className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            placeholder="Phone Number"
            value={form.phone}
            onChange={(e) => handleChange(e, "phone")}
            className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Address"
            value={form.address}
            onChange={(e) => handleChange(e, "address")}
            className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 md:col-span-2"
          />
        </div>

        {/* Profile Image */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">
            Profile Image (optional)
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleChange(e, "profileImage")}
            className="w-full"
          />
        </div>

        {/* Education */}
        <h3 className="font-semibold mb-2">Education</h3>
        {form.education.map((edu, idx) => (
          <div key={idx} className="grid md:grid-cols-3 gap-4 mb-3">
            <input
              type="text"
              placeholder="Degree"
              value={edu.degree}
              onChange={(e) => handleChange(e, "education", idx, "degree")}
              className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="School / University"
              value={edu.school}
              onChange={(e) => handleChange(e, "education", idx, "school")}
              className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Year"
              value={edu.year}
              onChange={(e) => handleChange(e, "education", idx, "year")}
              className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={() => addSectionItem("education")}
          className="mb-4 text-blue-600 hover:underline"
        >
          + Add More Education
        </button>

        {/* Work Experience */}
        <h3 className="font-semibold mb-2">Work Experience</h3>
        {form.experience.map((exp, idx) => (
          <div key={idx} className="grid md:grid-cols-3 gap-4 mb-3">
            <input
              type="text"
              placeholder="Role"
              value={exp.role}
              onChange={(e) => handleChange(e, "experience", idx, "role")}
              className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Company"
              value={exp.company}
              onChange={(e) => handleChange(e, "experience", idx, "company")}
              className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Duration"
              value={exp.duration}
              onChange={(e) => handleChange(e, "experience", idx, "duration")}
              className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={() => addSectionItem("experience")}
          className="mb-4 text-blue-600 hover:underline"
        >
          + Add More Experience
        </button>

        {/* Skills */}
        <h3 className="font-semibold mb-2">Skills</h3>
        <input
          type="text"
          placeholder="React, Tailwind, JS, etc."
          value={form.skills}
          onChange={(e) => handleChange(e, "skills")}
          className="w-full p-3 border rounded-lg mb-4 focus:ring-2 focus:ring-blue-500"
        />

        {/* Projects / Certifications */}
        <h3 className="font-semibold mb-2">Projects / Certifications</h3>
        <textarea
          placeholder="Project names or certifications"
          value={form.projects}
          onChange={(e) => handleChange(e, "projects")}
          className="w-full p-3 border rounded-lg mb-4 focus:ring-2 focus:ring-blue-500"
        />

        {/* Languages */}
        <h3 className="font-semibold mb-2">Languages</h3>
        <input
          type="text"
          placeholder="English, Spanish, etc."
          value={form.languages}
          onChange={(e) => handleChange(e, "languages")}
          className="w-full p-3 border rounded-lg mb-4 focus:ring-2 focus:ring-blue-500"
        />

        {/* Profile Summary */}
        <h3 className="font-semibold mb-2">Profile Summary</h3>
        <textarea
          placeholder="Write a short professional summary"
          value={form.summary}
          onChange={(e) => handleChange(e, "summary")}
          className="w-full p-3 border rounded-lg mb-6 focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-semibold"
        >
          Save Resume
        </button>
      </div>
    </div>
  );
}



// import { useState } from "react";
// import { useNavigate } from "react-router-dom"; // React Router hook
// import client from "../config";
// import Swal from "sweetalert2";

// export default function CreateResume() {
//   const navigate = useNavigate();
//   const [form, setForm] = useState({
//     fullName: "",
//     title: "",
//     description: "",
//     email: "",
//     phone: "",
//     address: "",
//     education: [{ degree: "", school: "", year: "" }],
//     experience: [{ role: "", company: "", duration: "" }],
//     skills: "",
//     projects: "",
//     languages: "",
//     summary: "",
//     profileImage: null,
//   });

//   const handleChange = (e, section, index, field) => {
//     if (section === "education" || section === "experience") {
//       const updated = [...form[section]];
//       updated[index][field] = e.target.value;
//       setForm({ ...form, [section]: updated });
//     } else if (section === "profileImage") {
//       setForm({ ...form, profileImage: e.target.files[0] });
//     } else {
//       setForm({ ...form, [section]: e.target.value });
//     }
//   };

//   const addSectionItem = (section) => {
//     setForm({
//       ...form,
//       [section]: [
//         ...form[section],
//         Object.fromEntries(Object.keys(form[section][0]).map((k) => [k, ""])),
//       ],
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!form.fullName || !form.email) {
//       Swal.fire({
//         icon: "warning",
//         title: "Missing Info",
//         text: "Full name aur email required hai",
//       });
//       return;
//     }

//     const { data: { user } } = await client.auth.getUser();

//     if (!user) {
//       Swal.fire({
//         icon: "error",
//         title: "Unauthorized",
//         text: "Please login first",
//       });
//       return;
//     }

//     let profileImageUrl = null;

//     if (form.profileImage) {
//       const fileExt = form.profileImage.name.split(".").pop();
//       const fileName = `${user.id}-${Date.now()}.${fileExt}`;
//       const filePath = fileName;

//       const { error: uploadError } = await client.storage
//         .from("resume-profile")
//         .upload(filePath, form.profileImage, { upsert: true });

//       if (uploadError) {
//         Swal.fire({
//           icon: "error",
//           title: "Image Upload Failed",
//           text: uploadError.message,
//         });
//         return;
//       }

//       const { data: imageData } = client.storage
//         .from("resume-profile")
//         .getPublicUrl(filePath);

//       profileImageUrl = imageData.publicUrl;
//     }

//     const { error } = await client.from("resumes").insert([
//       {
//         user_id: user.id,
//         full_name: form.fullName,
//         title: form.title,
//         email: form.email,
//         description: form.description,
//         phone: form.phone,
//         address: form.address,
//         education: form.education,
//         experience: form.experience,
//         skills: form.skills,
//         projects: form.projects,
//         languages: form.languages,
//         summary: form.summary,
//         profile_image_url: profileImageUrl,
//       },
//     ]);

//     if (error) {
//       Swal.fire({
//         icon: "error",
//         title: "Save Failed",
//         text: error.message,
//       });
//     } else {
//       Swal.fire({
//         icon: "success",
//         title: "Resume Saved 🎉",
//         text: "Your resume has been stored successfully",
//       });

//       setForm({
//         fullName: "",
//         title: "",
//         description: "",
//         email: "",
//         phone: "",
//         address: "",
//         education: [{ degree: "", school: "", year: "" }],
//         experience: [{ role: "", company: "", duration: "" }],
//         skills: "",
//         projects: "",
//         languages: "",
//         summary: "",
//         profileImage: null,
//       });

//       navigate("/dashboard");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-8 px-4">
//       <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
//         <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
//           Create Resume
//         </h2>

//         {/* Personal Info */}
//         <section className="mb-6">
//           <h3 className="text-lg font-semibold mb-3 border-b border-gray-200 pb-1">Personal Information</h3>
//           <div className="grid md:grid-cols-2 gap-4">
//             <input type="text" placeholder="Full Name" value={form.fullName} onChange={(e) => handleChange(e, "fullName")} className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 w-full" />
//             <input type="text" placeholder="Professional Title" value={form.title} onChange={(e) => handleChange(e, "title")} className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 w-full" />
//             <input type="text" placeholder="Professional Description" value={form.description} onChange={(e) => handleChange(e, "description")} className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 w-full md:col-span-2" />
//             <input type="email" placeholder="Email" value={form.email} onChange={(e) => handleChange(e, "email")} className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 w-full" />
//             <input type="number" placeholder="Phone Number" value={form.phone} onChange={(e) => handleChange(e, "phone")} className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 w-full" />
//             <input type="text" placeholder="Address" value={form.address} onChange={(e) => handleChange(e, "address")} className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 w-full md:col-span-2" />
//           </div>
//         </section>

//         {/* Profile Image */}
//         <section className="mb-6">
//           <label className="block mb-2 font-medium">Profile Image (optional)</label>
//           <input type="file" accept="image/*" onChange={(e) => handleChange(e, "profileImage")} className="w-full" />
//         </section>

//         {/* Education */}
//         <section className="mb-6">
//           <h3 className="text-lg font-semibold mb-3 border-b border-gray-200 pb-1">Education</h3>
//           {form.education.map((edu, idx) => (
//             <div key={idx} className="grid md:grid-cols-3 gap-4 mb-3">
//               <input type="text" placeholder="Degree" value={edu.degree} onChange={(e) => handleChange(e, "education", idx, "degree")} className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500" />
//               <input type="text" placeholder="School / University" value={edu.school} onChange={(e) => handleChange(e, "education", idx, "school")} className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500" />
//               <input type="text" placeholder="Year" value={edu.year} onChange={(e) => handleChange(e, "education", idx, "year")} className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500" />
//             </div>
//           ))}
//           <button type="button" onClick={() => addSectionItem("education")} className="text-blue-600 hover:underline mb-4">+ Add More Education</button>
//         </section>

//         {/* Experience */}
//         <section className="mb-6">
//           <h3 className="text-lg font-semibold mb-3 border-b border-gray-200 pb-1">Work Experience</h3>
//           {form.experience.map((exp, idx) => (
//             <div key={idx} className="grid md:grid-cols-3 gap-4 mb-3">
//               <input type="text" placeholder="Role" value={exp.role} onChange={(e) => handleChange(e, "experience", idx, "role")} className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500" />
//               <input type="text" placeholder="Company" value={exp.company} onChange={(e) => handleChange(e, "experience", idx, "company")} className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500" />
//               <input type="text" placeholder="Duration" value={exp.duration} onChange={(e) => handleChange(e, "experience", idx, "duration")} className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500" />
//             </div>
//           ))}
//           <button type="button" onClick={() => addSectionItem("experience")} className="text-blue-600 hover:underline mb-4">+ Add More Experience</button>
//         </section>

//         {/* Skills */}
//         <section className="mb-6">
//           <h3 className="text-lg font-semibold mb-3 border-b border-gray-200 pb-1">Skills</h3>
//           <input type="text" placeholder="React, Tailwind, JS, etc." value={form.skills} onChange={(e) => handleChange(e, "skills")} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 mb-4" />
//         </section>

//         {/* Projects */}
//         <section className="mb-6">
//           <h3 className="text-lg font-semibold mb-3 border-b border-gray-200 pb-1">Projects / Certifications</h3>
//           <textarea placeholder="Project names or certifications" value={form.projects} onChange={(e) => handleChange(e, "projects")} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 mb-4" />
//         </section>

//         {/* Languages */}
//         <section className="mb-6">
//           <h3 className="text-lg font-semibold mb-3 border-b border-gray-200 pb-1">Languages</h3>
//           <input type="text" placeholder="English, Spanish, etc." value={form.languages} onChange={(e) => handleChange(e, "languages")} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 mb-4" />
//         </section>

//         {/* Summary */}
//         <section className="mb-6">
//           <h3 className="text-lg font-semibold mb-3 border-b border-gray-200 pb-1">Profile Summary</h3>
//           <textarea placeholder="Write a short professional summary" value={form.summary} onChange={(e) => handleChange(e, "summary")} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 mb-6" />
//         </section>

//         <button onClick={handleSubmit} className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-semibold transition">
//           Save Resume
//         </button>
//       </div>
//     </div>
//   );
// }
