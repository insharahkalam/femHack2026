import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import client from "../config";
import Swal from "sweetalert2";

const safeArray = (value, template) => {
    if (Array.isArray(value)) return value;
    return [template];
};

export default function EditResume() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState(null);
    const [loading, setLoading] = useState(true);

    // 🔹 Fetch resume
    useEffect(() => {
        const fetchResume = async () => {
            const { data, error } = await client
                .from("resumes")
                .select("*")
                .eq("id", id)
                .single();

            if (error) {
                Swal.fire("Error", error.message, "error");
                navigate("/dashboard");
            } else {
                setForm({
                    fullName: data.full_name || "",
                    title: data.title || "",
                    description: data.description || "",
                    email: data.email || "",
                    phone: data.phone || "",
                    address: data.address || "",

                    education: safeArray(data.education, {
                        degree: "",
                        school: "",
                        year: "",
                    }),

                    experience: safeArray(data.experience, {
                        role: "",
                        company: "",
                        duration: "",
                    }),

                    skills: data.skills || "",
                    projects: data.projects || "",
                    languages: data.languages || "",
                    summary: data.summary || "",
                });

            }
            setLoading(false);
        };

        fetchResume();
    }, [id, navigate]);

    // 🔹 Handle change
    const handleChange = (e, section, index, field) => {
        if (section === "education" || section === "experience") {
            const updated = [...form[section]];
            updated[index][field] = e.target.value;
            setForm({ ...form, [section]: updated });
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

    // 🔹 Update resume
    const handleUpdate = async () => {
        const { error } = await client
            .from("resumes")
            .update({
                full_name: form.fullName,
                title: form.title,
                description: form.description,
                email: form.email,
                phone: form.phone,
                address: form.address,
                education: form.education,
                experience: form.experience,
                skills: form.skills,
                projects: form.projects,
                languages: form.languages,
                summary: form.summary,
            })
            .eq("id", id);

        if (error) {
            Swal.fire("Error", error.message, "error");
        } else {
            Swal.fire("Updated 🎉", "Resume updated successfully", "success");
            navigate("/dashboard");
        }
    };

    if (loading || !form)
        return <p className="text-center mt-10">Loading...</p>;

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow">
                <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
                    Edit Resume
                </h2>

                {/* Personal Info */}
                <h3 className="font-semibold mb-2">Personal Information</h3>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <input
                        value={form.fullName}
                        onChange={(e) => handleChange(e, "fullName")}
                        placeholder="Full Name"
                        className="p-3 border rounded-lg"
                    />
                    <input
                        value={form.title}
                        onChange={(e) => handleChange(e, "title")}
                        placeholder="Professional Title"
                        className="p-3 border rounded-lg"
                    />
                    <input
                        value={form.description}
                        onChange={(e) => handleChange(e, "description")}
                        placeholder="Professional Description"
                        className="p-3 border rounded-lg md:col-span-2"
                    />
                    <input
                        value={form.email}
                        onChange={(e) => handleChange(e, "email")}
                        placeholder="Email"
                        className="p-3 border rounded-lg"
                    />
                    <input
                        value={form.phone}
                        onChange={(e) => handleChange(e, "phone")}
                        placeholder="Phone"
                        className="p-3 border rounded-lg"
                    />
                    <input
                        value={form.address}
                        onChange={(e) => handleChange(e, "address")}
                        placeholder="Address"
                        className="p-3 border rounded-lg md:col-span-2"
                    />
                </div>

                {/* Education */}
                <h3 className="font-semibold mb-2">Education</h3>
                {form.education.map((edu, idx) => (
                    <div key={idx} className="grid md:grid-cols-3 gap-4 mb-3">
                        <input
                            value={edu.degree}
                            onChange={(e) =>
                                handleChange(e, "education", idx, "degree")
                            }
                            placeholder="Degree"
                            className="p-3 border rounded-lg"
                        />
                        <input
                            value={edu.school}
                            onChange={(e) =>
                                handleChange(e, "education", idx, "school")
                            }
                            placeholder="School"
                            className="p-3 border rounded-lg"
                        />
                        <input
                            value={edu.year}
                            onChange={(e) =>
                                handleChange(e, "education", idx, "year")
                            }
                            placeholder="Year"
                            className="p-3 border rounded-lg"
                        />
                    </div>
                ))}
                <button
                    onClick={() => addSectionItem("education")}
                    className="text-blue-600 mb-4"
                >
                    + Add More Education
                </button>

                {/* Experience */}
                <h3 className="font-semibold mb-2">Experience</h3>
                {form.experience.map((exp, idx) => (
                    <div key={idx} className="grid md:grid-cols-3 gap-4 mb-3">
                        <input
                            value={exp.role}
                            onChange={(e) =>
                                handleChange(e, "experience", idx, "role")
                            }
                            placeholder="Role"
                            className="p-3 border rounded-lg"
                        />
                        <input
                            value={exp.company}
                            onChange={(e) =>
                                handleChange(e, "experience", idx, "company")
                            }
                            placeholder="Company"
                            className="p-3 border rounded-lg"
                        />
                        <input
                            value={exp.duration}
                            onChange={(e) =>
                                handleChange(e, "experience", idx, "duration")
                            }
                            placeholder="Duration"
                            className="p-3 border rounded-lg"
                        />
                    </div>
                ))}
                <button
                    onClick={() => addSectionItem("experience")}
                    className="text-blue-600 mb-4"
                >
                    + Add More Experience
                </button>

                <button
                    onClick={handleUpdate}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-semibold"
                >
                    Update Resume
                </button>
            </div>
        </div>
    );
}
