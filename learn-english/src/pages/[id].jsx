import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Accordion from "@/components/UI/Accordion";
import Header from "@/components/Header";
import Confetti from "react-confetti";
import Modal from "react-modal";

const Course = () => {
  const courseId = useParams();

  const [course, setCourse] = useState(null);
  const [openSections, setOpenSections] = useState([]);
  const [completedSections, setCompletedSections] = useState([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (courseId?.id) {
      fetch(`http://localhost:3001/courses/${+courseId?.id}`)
        .then((response) => response.json())
        .then((data) => {
          setCourse(data);
          setOpenSections(new Array(data.sections.length).fill(false));
          setCompletedSections(new Array(data.sections.length).fill(false));
          setOpenSections((prev) => {
            const newSections = [...prev];
            newSections[0] = true;
            return newSections;
          });
        });
    }
  }, [courseId?.id]);

  const toggleAccordion = (index) => {
    setOpenSections((prevSections) => {
      const newSections = [...prevSections];
      newSections[index] = !newSections[index];
      return newSections;
    });
  };

  const unlockNextSection = (index) => {
    if (index < openSections.length - 1) {
      setOpenSections((prevSections) => {
        const newSections = [...prevSections];
        newSections[index + 1] = true;
        return newSections;
      });
    } else {
      setShowModal(true);
      triggerConfetti();
    }
  };

  const markAsComplete = (index) => {
    setCompletedSections((prevSections) => {
      const newSections = [...prevSections];
      newSections[index] = true;
      return newSections;
    });
  };

  const triggerConfetti = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 5000);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6 relative">
      {showConfetti && <Confetti />}
      <Header className="!static !w-full" />

      <header className="bg-blue-600 text-white p-6 rounded-md shadow-md mb-6 text-center mt-5">
        <h1 className="text-4xl font-bold mb-2">{course.title}</h1>
        <p className="text-lg">{course.description}</p>
      </header>
      <section className="space-y-4">
        {course.sections.map((section, index) => (
          <Accordion
            key={section.id}
            title={section.title}
            isOpen={openSections[index]}
            toggleAccordion={() => toggleAccordion(index)}
            unlockNext={() => unlockNextSection(index)}
            isCompleted={completedSections[index]}
            markAsComplete={() => markAsComplete(index)}
            isLastSection={index === course.sections.length - 1}
            triggerConfetti={() => triggerConfetti()}
          >
            <p>{section.content}</p>
          </Accordion>
        ))}
      </section>

      <Modal
        isOpen={showModal}
        onRequestClose={closeModal}
        contentLabel="Course Completion Modal"
        className="modal"
        overlayClassName="overlay"
      >
        <div className="p-6 bg-white rounded-md shadow-md">
          <h2 className="text-3xl font-bold mb-4">Congratulations!</h2>
          <p className="text-lg">You have successfully completed the course.</p>
          <button
            onClick={closeModal}
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition duration-300"
          >
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Course;
