import React from "react";

const Accordion = ({
  title,
  isOpen,
  toggleAccordion,
  children,
  unlockNext,
  isCompleted,
  markAsComplete,
  isLastSection,
  triggerConfetti,
}) => {
  return (
    <div className="bg-white p-4 rounded-md shadow-md mb-4">
      <div
        className={`flex justify-between items-center cursor-pointer ${
          isCompleted ? "" : "opacity-50 cursor-not-allowed"
        }`}
        onClick={isCompleted ? toggleAccordion : null}
      >
        <h2 className="text-2xl font-semibold">{title}</h2>
        <svg
          className={`w-6 h-6 transform transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
      {isOpen && (
        <div className="mt-4">
          {children}
          {!isCompleted && (
            <button
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300"
              onClick={markAsComplete}
            >
              Mark as Complete
            </button>
          )}
          {isCompleted && (
            <button
              className="mt-4 px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition duration-300"
              onClick={() => {
                unlockNext();
                if (isLastSection) {
                  triggerConfetti();
                }
              }}
            >
              Unlock Next Section
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Accordion;
