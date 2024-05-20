import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { useParams } from "next/navigation";

const TestPage = () => {
  const courseId = useParams();
  const navigate = useRouter();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);

  useEffect(() => {
    if (courseId?.id) {
      fetchTestQuestions(courseId?.id);
    }
  }, [courseId?.id]);

  const fetchTestQuestions = async (courseId) => {
    const response = await fetch(
      `http://localhost:3001/tests?courseId=${courseId}`
    );
    const test = await response.json();
    if (test.length > 0) {
      setQuestions(test[0].questions);
    }
  };

  const handleAnswerChange = (questionId, selectedOption) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: selectedOption,
    }));
  };

  const handleSubmit = async () => {
    const correctAnswers = questions.reduce((acc, question) => {
      if (answers[question.id] === question.answer) {
        return acc + 1;
      }
      return acc;
    }, 0);
    setScore(correctAnswers);

    const storedUser = JSON.parse(localStorage.getItem("user"));
    const updatedUser = {
      ...storedUser,
      results: [
        ...(storedUser.results || []),
        { courseId: parseInt(courseId?.id), score: correctAnswers },
      ],
    };
    await fetch(`http://localhost:3001/users/${storedUser.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUser),
    });
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <Header className="!static !w-full mb-10" />
        <h2 className="text-3xl font-bold mb-6">Course Test</h2>
        {score === null ? (
          <>
            {questions.map((question) => (
              <div key={question.id} className="mb-6">
                <h4 className="text-xl font-semibold">{question.question}</h4>
                <div className="mt-2">
                  {question.options.map((option) => (
                    <div key={option} className="mb-2">
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name={`question-${question.id}`}
                          value={option}
                          onChange={() =>
                            handleAnswerChange(question.id, option)
                          }
                          className="form-radio"
                        />
                        <span className="ml-2">{option}</span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <button
              onClick={handleSubmit}
              className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition duration-300"
            >
              Submit Answers
            </button>
          </>
        ) : (
          <div>
            <h3 className="text-2xl font-bold">
              Your Score: {score}/{questions.length}
            </h3>
            <button
              onClick={() => navigate.push("/profile")}
              className="mt-4 bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition duration-300"
            >
              Back to Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestPage;
