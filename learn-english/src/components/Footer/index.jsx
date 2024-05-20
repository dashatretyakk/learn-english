import React, { useState, useEffect } from "react";

const Footer = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setIsScrolled(currentScrollPos > scrollPosition);
      setScrollPosition(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollPosition]);

  return (
    <footer
      className={`bg-gray-900 text-white w-full rounded-t-md transition-transform duration-500 `}
    >
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <div className="text-xl">&copy; 2024 Your Company</div>
        <nav className="hidden md:flex space-x-6">
          <a
            href="#privacy"
            className="hover:text-gray-400 transition-colors duration-300"
          >
            Privacy Policy
          </a>
          <a
            href="#terms"
            className="hover:text-gray-400 transition-colors duration-300"
          >
            Terms of Service
          </a>
          <a
            href="#contact"
            className="hover:text-gray-400 transition-colors duration-300"
          >
            Contact
          </a>
        </nav>
        <div className="md:hidden flex items-center">
          <button className="text-gray-400 hover:text-white focus:outline-none focus:text-white">
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
