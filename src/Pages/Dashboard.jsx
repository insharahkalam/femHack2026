import { useEffect, useState } from "react";
import ResumeCard from "../components/ResumeCard";
import client from "../config";

import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // all or mine
  const [userId, setUserId] = useState(null);
  const [skillFilter, setSkillFilter] = useState(""); // ✅ skill filter

  const navigate = useNavigate();

  const fetchResumes = async () => {
    setLoading(true);
    try {
      const { data: userData } = await client.auth.getUser();
      if (!userData.user) {
        Swal.fire("Unauthorized", "Please login first", "error");
        return;
      }

      setUserId(userData.user.id);

      const { data, error } = await client
        .from("resumes")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) Swal.fire("Error", error.message, "error");
      else setResumes(data);
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  // Filtered resumes
  const filteredResumes = resumes
    .filter((r) => (filter === "mine" ? r.user_id === userId : true))
    .filter((r) =>
      skillFilter
        ? r.skills
          ?.toLowerCase()
          .split(",")
          .some((skill) => skill.trim().includes(skillFilter.toLowerCase()))
        : true
    );

  // Delete resume
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the resume!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      const { error } = await client.from("resumes").delete().eq("id", id);
      if (error) Swal.fire("Error", error.message, "error");
      else {
        Swal.fire("Deleted!", "Your resume has been deleted.", "success");
        fetchResumes();
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* ===== Sidebar ===== */}
      <aside className="w-[350px] fixed h-screen bg-black text-white shadow-2xl">
        <div className="p-6 text-2xl font-bold tracking-wide">ResumePro</div>

        <nav className="px-4 space-y-3 mt-4">
          <button
            onClick={() => setFilter("all")}
            className={`block w-full text-left px-4 py-2 rounded-lg ${filter === "all" ? "bg-white/20" : "hover:bg-white/20"
              }`}
          >
            All Resume
          </button>

          <button
            onClick={() => setFilter("mine")}
            className={`block w-full text-left px-4 py-2 rounded-lg ${filter === "mine" ? "bg-white/20" : "hover:bg-white/20"
              }`}
          >
            My Resume
          </button>

          <button
            onClick={() => navigate("/create")}
            className="block w-full text-left px-4 py-2 rounded-lg hover:bg-white/20"
          >
            Create Resume
          </button>

          <button
            onClick={async () => {
              try {
                const { error } = await client.auth.signOut();
                if (error) throw error;
                Swal.fire("Logged out", "You have been logged out successfully", "success");
                navigate("/"); // redirect to login page
              } catch (err) {
                Swal.fire("Error", err.message, "error");
              }
            }}
            className="block w-full text-left px-4 py-2 rounded-lg hover:bg-white/20"
          >
            Logout
          </button>

        </nav>
      </aside>

      {/* ===== Main Content ===== */}
      <main className="flex-1 p-8 ml-[350px]">
        <h1 className="text-3xl font-bold mb-4 text-black">
          {filter === "mine" ? "My Resume" : "All Resumes"}
        </h1>

        {/* ===== Skill Filter Input ===== */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Filter by skill..."
            value={skillFilter}
            onChange={(e) => setSkillFilter(e.target.value)}
            className="w-full md:w-1/2 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />

        </div>

        {loading ? (
          <p className="text-gray-500 text-center">Loading resumes...</p>
        ) : filteredResumes.length === 0 ? (
          <p className="text-gray-500 text-center">
            {filter === "mine"
              ? "You have not created any resumes yet."
              : "No resumes found."}
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredResumes.map((resume) => (
              <div key={resume.id} className="relative">
                <ResumeCard resume={resume} />

                {/* Show edit/delete buttons only for your own resumes */}
                {filter === "mine" && String(resume.user_id) === String(userId) && (
                  <div className="absolute top-2 right-2 flex space-x-2">
                    <button
                      onClick={() => navigate(`/edit/${resume.id}`)}
                      className="bg-blue-600 text-white px-3 py-1 rounded hover:scale-105 transition"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(resume.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:scale-105 transition"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
