import Link from "next/link";
import React, { useState, useEffect } from "react";

const Header = ({ className }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setIsScrolled(currentScrollPos > scrollPosition);
      setScrollPosition(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollPosition]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <header
      className={`bg-white shadow-md absolute w-[95%] rounded-full transition-transform duration-500 ${
        isScrolled ? "-translate-y-full" : "top-[10px]"
      } ${className}`}
    >
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <Link
          href="/"
          className="text-gray-700 hover:text-red-500 transition-colors duration-300"
        >
          <div className="text-2xl font-bold">Logo</div>
        </Link>

        <div className="hidden md:flex items-center space-x-4">
          {!user ? (
            <>
              <Link
                href="/login"
                className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition duration-300"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition duration-300"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/profile"
                className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition duration-300"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition duration-300"
              >
                Logout
              </button>
            </>
          )}
        </div>
        <div className="md:hidden flex items-center">
          <button className="text-gray-700 hover:text-gray-900 focus:outline-none focus:text-gray-900">
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
    </header>
  );
};

export default Header;
