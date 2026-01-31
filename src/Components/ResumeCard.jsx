// import { Link } from "react-router-dom";

// export default function ResumeCard({ resume }) {
//   return (
//     <div className="bg-white shadow-md rounded-xl p-4 flex items-center hover:shadow-lg transition">
//       {/* Left: Profile Image */}
//       <div className="flex-shrink-0">
//         {resume.profile_image_url ? (
//           <img
//             src={resume.profile_image_url}
//             alt={resume.full_name}
//             className="w-20 h-20 rounded-full object-cover"
//           />
//         ) : (
//           <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
//             No Image
//           </div>
//         )}
//       </div>

//       {/* Center: Info */}
//       <div className="flex-1 ml-4">
//         <h2 className="text-lg font-bold">{resume.full_name}</h2>
//         <p className="text-sm text-gray-600 mb-1">{resume.title}</p>
//       </div>

//       {/* Right: View Button */}
//       <div className="ml-4 flex-shrink-0">
//         <Link
//           to="/resume-preview"
//           state={{ resume }} // ✅ yahan direct prop ka naam use karo
//           className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
//         >
//           View
//         </Link>
//       </div>
//     </div>
//   );
// }



// import { Link } from "react-router-dom";

// export default function ResumeCard({ resume }) {
//   return (
//     <div className="bg-white dark:bg-gray-900 shadow-md rounded-xl p-4 flex flex-col sm:flex-row items-center sm:items-start hover:shadow-lg transition w-full">
      
//       {/* Left: Profile Image */}
//       <div className="flex-shrink-0 mb-4 sm:mb-0">
//         {resume.profile_image_url ? (
//           <img
//             src={resume.profile_image_url}
//             alt={resume.full_name}
//             className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
//           />
//         ) : (
//           <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 border-2 border-gray-300">
//             No Image
//           </div>
//         )}
//       </div>

//       {/* Center: Info */}
//       <div className="flex-1 sm:ml-6 text-center sm:text-left">
//         <h2 className="text-xl font-bold text-gray-900 dark:text-white">
//           {resume.full_name}
//         </h2>
//         <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
//           {resume.title || "No Title"}
//         </p>
//         <p className="text-xs text-gray-500 dark:text-gray-400">
//           {resume.email}
//         </p>
//         <p className="text-xs text-gray-500 dark:text-gray-400">
//           {resume.phone}
//         </p>
//       </div>

//       {/* Right: View Button */}
//       <div className="mt-4 sm:mt-0 sm:ml-4 flex-shrink-0">
//         <Link
//           to="/resume-preview"
//           state={{ resume }}
//           className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
//         >
//           View
//         </Link>
//       </div>
//     </div>
//   );
// }



// import { Link } from "react-router-dom";

// export default function ResumeCard({ resume }) {
//   return (
//     <div
//       className="
//         w-full
//         bg-gradient-to-br from-slate-900 to-slate-800
//         text-white
//         rounded-2xl
//         p-5
//         shadow-xl
//         transition-all duration-300
//         hover:-translate-y-2 hover:shadow-2xl
//         flex flex-col sm:flex-row gap-4
//       "
//     >
//       {/* Profile Image */}
//       <div className="flex-shrink-0 flex justify-center sm:justify-start">
//         {resume.profile_image_url ? (
//           <img
//             src={resume.profile_image_url}
//             alt={resume.full_name}
//             className="w-20 h-20 rounded-full object-cover border-2 border-indigo-400 shadow-md"
//           />
//         ) : (
//           <div className="w-20 h-20 rounded-full bg-slate-700 flex items-center justify-center text-sm text-gray-300 border border-slate-600">
//             No Image
//           </div>
//         )}
//       </div>

//       {/* Info */}
//       <div className="flex-1 text-center sm:text-left">
//         <h2 className="text-lg font-bold leading-tight">
//           {resume.full_name}
//         </h2>

//         <p className="text-sm text-indigo-300">
//           {resume.title || "No Title"}
//         </p>

//         <p className="text-xs text-gray-400 mt-1 break-all line-clamp-2">
//           {resume.description}
//         </p>

//       </div>

//       {/* Action */}
//       <div className="flex  justify-center sm:justify-end items-center">
//         <Link
//           to="/resume-preview"
//           state={{ resume }}
//           className="
//             bg-indigo-600
//             text-white
//             px-5 py-2
//             text-sm
//             rounded-lg
//             shadow-md
//             hover:bg-indigo-700
//             transition
//           "
//         >
//           View
//         </Link>
//       </div>
//     </div>
//   );
// }



import { Link } from "react-router-dom";

export default function ResumeCard({ resume }) {
  return (
    <div className="
      bg-white
      rounded-xl
      shadow-md
      hover:shadow-xl
      transition
      p-5
      flex flex-col
      h-full
    ">
      {/* Profile Image */}
      <div className="flex justify-center mb-4">
        {resume.profile_image_url ? (
          <img
            src={resume.profile_image_url}
            alt={resume.full_name}
            className="w-20 h-20 rounded-full object-cover border"
          />
        ) : (
          <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
            No Image
          </div>
        )}
      </div>

      {/* Name */}
      <h2 className="text-lg font-bold text-center text-black">
        {resume.full_name}
      </h2>

      {/* Title */}
      <p className="text-lg font-extrabold text-center text-gray-500 mt-1">
        {resume.title || "No Title"}
      </p>

      {/* Description */}
      <p className="text-sm text-gray-600 mt-3 font-medium text-start line-clamp-3">
        {resume.description || "No description added"}
      </p>

      {/* Button (Bottom) */}
      <div className="mt-auto pt-4 flex justify-center">
        <Link
          to="/resume-preview"
          state={{ resume }}
          className="
            bg-indigo-600
            text-white
            px-6 py-2
            rounded-lg
            text-sm
            hover:bg-indigo-700
            transition
          "
        >
          View Resume
        </Link>
      </div>
    </div>
  );
}
