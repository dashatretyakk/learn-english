import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { useRouter } from "next/router";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [completedCourses, setCompletedCourses] = useState([]);
  const [allCourses, setAllCourses] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) {
      router.push("/login");
    } else {
      setUser(storedUser);
      fetchCourses(storedUser.completedCourses);
    }
  }, []);

  const fetchCourses = async (completedCourses) => {
    const response = await fetch(`http://localhost:3001/courses`);
    const courses = await response.json();
    setCompletedCourses(
      courses.filter((course) => completedCourses.includes(course.id))
    );
    setAllCourses(courses);
  };

  const handleCompleteCourse = async (courseId) => {
    const updatedUser = {
      ...user,
      completedCourses: [...user.completedCourses, courseId],
    };
    await fetch(`http://localhost:3001/users/${user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUser),
    });
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
    fetchCourses(updatedUser.completedCourses);
    router.push(`/test/${courseId}`);
  };

  const getTestResult = (courseId) => {
    const results = user?.results?.filter(
      (result) => result.courseId === parseInt(courseId)
    );
    if (!results || results.length === 0) return "No test taken";
    const latestResult = results[results.length - 1];
    return ` Score: ${latestResult.score}/2 `;
  };

  console.log(user?.results);
  if (!user) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <Header className="!static !w-full mb-10" />
        <h2 className="text-3xl font-bold mb-6">Profile</h2>
        <p className="text-lg mb-4">
          <strong>Email:</strong> {user.email}
        </p>

        <h3 className="text-2xl font-semibold mt-8 mb-4">Completed Courses</h3>
        <ul className="mb-8">
          {completedCourses.length > 0 ? (
            completedCourses.map((course) => (
              <li
                key={course.id}
                className="mb-2 p-4 bg-gray-100 rounded-lg shadow flex justify-between items-center"
              >
                <div>
                  {course.title}{" "}
                  <span className="text-sm text-gray-600">
                    ({getTestResult(course.id)})
                  </span>
                </div>
                <button
                  onClick={() => router.push(`/test/${course.id}`)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition duration-300"
                >
                  Go to Test
                </button>
              </li>
            ))
          ) : (
            <li className="text-gray-600">No courses completed yet.</li>
          )}
        </ul>

        <h3 className="text-2xl font-semibold mt-8 mb-4">All Courses</h3>
        <ul>
          {allCourses.map((course) => (
            <li
              key={course.id}
              className="mb-4 p-4 bg-gray-100 rounded-lg shadow flex justify-between items-center"
            >
              {course.title}
              {!user.completedCourses.includes(course.id) && (
                <button
                  onClick={() => handleCompleteCourse(course.id)}
                  className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition duration-300"
                >
                  Mark as Complete
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Profile;
