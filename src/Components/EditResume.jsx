// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import client from "../config";
// import Swal from "sweetalert2";

// export default function EditResume() {
//     const { id } = useParams();
//     const navigate = useNavigate();

//     const [resumeData, setResumeData] = useState({
//         name: "",
//         email: "",
//         contact: "",
//         education: "",
//         experience: "",
//         skills: "",
//         projects: "",
//         languages: "",
//         summary: "",
//     });

//     const fetchResume = async () => {
//         const { data, error } = await client
//             .from("resumes")
//             .select("*")
//             .eq("id", id)
//             .single();

//         if (error) {
//             Swal.fire("Error", error.message, "error");
//             navigate("/dashboard");
//         } else {
//             setResumeData(data);
//         }
//     };

//     useEffect(() => {
//         fetchResume();
//     }, []);

//     const handleChange = (e) => {
//         setResumeData({ ...resumeData, [e.target.name]: e.target.value });
//     };

//     const handleUpdate = async () => {
//         const { error } = await client
//             .from("resumes")
//             .update(resumeData)
//             .eq("id", id);

//         if (error) {
//             Swal.fire("Error", error.message, "error");
//         } else {
//             Swal.fire("Success", "Resume updated successfully", "success");
//             navigate("/dashboard");
//         }
//     };

//     return (
//         <div className="max-w-2xl mx-auto p-6">
//             <h1 className="text-2xl font-bold mb-4">Edit Resume</h1>
//             <div className="space-y-4">
//                 <input
//                     name="name"
//                     value={resumeData.name}  // <-- if resumeData.name is undefined, React throws warning
//                     onChange={handleChange}
//                 />
//                 <input
//                     name="email"
//                     value={resumeData.email}
//                     onChange={handleChange}
//                     placeholder="Email"
//                     className="w-full border p-2 rounded"
//                 />
//                 <input
//                     name="contact"
//                     value={resumeData.contact}
//                     onChange={handleChange}
//                     placeholder="Contact"
//                     className="w-full border p-2 rounded"
//                 />
//                 <textarea
//                     name="education"
//                     value={resumeData.education}
//                     onChange={handleChange}
//                     placeholder="Education"
//                     className="w-full border p-2 rounded"
//                 />
//                 <textarea
//                     name="experience"
//                     value={resumeData.experience}
//                     onChange={handleChange}
//                     placeholder="Work Experience"
//                     className="w-full border p-2 rounded"
//                 />
//                 <textarea
//                     name="skills"
//                     value={resumeData.skills}
//                     onChange={handleChange}
//                     placeholder="Skills"
//                     className="w-full border p-2 rounded"
//                 />
//                 <textarea
//                     name="projects"
//                     value={resumeData.projects}
//                     onChange={handleChange}
//                     placeholder="Projects / Certifications"
//                     className="w-full border p-2 rounded"
//                 />
//                 <textarea
//                     name="languages"
//                     value={resumeData.languages}
//                     onChange={handleChange}
//                     placeholder="Languages"
//                     className="w-full border p-2 rounded"
//                 />
//                 <textarea
//                     name="summary"
//                     value={resumeData.summary}
//                     onChange={handleChange}
//                     placeholder="Profile Summary"
//                     className="w-full border p-2 rounded"
//                 />
//             </div>
//             <button
//                 onClick={handleUpdate}
//                 className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:scale-105 transition"
//             >
//                 Update Resume
//             </button>
//         </div>
//     );
// }


import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import client from "../config";
import Swal from "sweetalert2";

export default function EditResume() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [resumeData, setResumeData] = useState(null); // start as null for loading check
    const [loading, setLoading] = useState(true);

    const fetchResume = async () => {
        try {
            const { data, error } = await client
                .from("resumes")
                .select("*")
                .eq("id", id)
                .single();

            if (error) {
                Swal.fire("Error", error.message, "error");
                navigate("/dashboard");
            } else {
                // make sure all fields are strings to avoid controlled/uncontrolled warning
                setResumeData({
                    name: data.name || "",
                    email: data.email || "",
                    contact: data.contact || "",
                    education: data.education ? JSON.stringify(data.education) : "",
                    experience: data.experience ? JSON.stringify(data.experience) : "",
                    skills: data.skills || "",
                    projects: data.projects || "",
                    languages: data.languages || "",
                    summary: data.summary || "",
                });

            }
        } catch (err) {
            Swal.fire("Error", err.message, "error");
            navigate("/dashboard");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchResume();
    }, []);

    const handleChange = (e) => {
        setResumeData({ ...resumeData, [e.target.name]: e.target.value });
    };
    
    const handleUpdate = async () => {
        const { error } = await client
            .from("resumes")
            .update({
                ...resumeData,
                education: resumeData.education ? JSON.parse(resumeData.education) : [],
                experience: resumeData.experience ? JSON.parse(resumeData.experience) : [],
            })
            .eq("id", id);

        if (error) Swal.fire("Error", error.message, "error");
        else {
            Swal.fire("Success", "Resume updated successfully", "success");
            navigate("/dashboard");
        }
    };


    if (loading || !resumeData) return <p className="text-center mt-10">Loading...</p>;

    return (
        <div className="max-w-2xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Edit Resume</h1>
            <div className="space-y-4">
                <input
                    name="name"
                    value={resumeData.name}
                    onChange={handleChange}
                    placeholder="Full Name"
                    className="w-full border p-2 rounded"
                />
                <input
                    name="email"
                    value={resumeData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="w-full border p-2 rounded"
                />
                <input
                    name="contact"
                    value={resumeData.contact}
                    onChange={handleChange}
                    placeholder="Contact"
                    className="w-full border p-2 rounded"
                />
                <textarea
                    name="education"
                    value={resumeData.education}
                    onChange={handleChange}
                    placeholder="Education"
                    className="w-full border p-2 rounded"
                />
                <textarea
                    name="experience"
                    value={resumeData.experience}
                    onChange={handleChange}
                    placeholder="Work Experience"
                    className="w-full border p-2 rounded"
                />
                <textarea
                    name="skills"
                    value={resumeData.skills}
                    onChange={handleChange}
                    placeholder="Skills"
                    className="w-full border p-2 rounded"
                />
                <textarea
                    name="projects"
                    value={resumeData.projects}
                    onChange={handleChange}
                    placeholder="Projects / Certifications"
                    className="w-full border p-2 rounded"
                />
                <textarea
                    name="languages"
                    value={resumeData.languages}
                    onChange={handleChange}
                    placeholder="Languages"
                    className="w-full border p-2 rounded"
                />
                <textarea
                    name="summary"
                    value={resumeData.summary}
                    onChange={handleChange}
                    placeholder="Profile Summary"
                    className="w-full border p-2 rounded"
                />
            </div>
            <button
                onClick={handleUpdate}
                className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:scale-105 transition"
            >
                Update Resume
            </button>
        </div>
    );
}
