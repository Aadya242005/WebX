import React, { useState } from "react";
import { Link as ScrollLink } from "react-scroll";
import { useNavigate } from "react-router-dom";
import { FiHome, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  // ✅ Only landing page sections here (NO Events / Alumni)
  const scrollItems = [
    "Home",
    "Features",
    "Hackathons",
    "Certifications",
    "Resume",
    "Contact",
  ];

  return (
    <>
      {/* Floating button to open menu */}
      <div className="fixed top-4 left-4 z-50">
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-black/70 backdrop-blur-md p-3 rounded-full cursor-pointer shadow-lg text-white"
          onClick={() => setMenuOpen(true)}
        >
          <FiHome size={26} />
        </motion.div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed top-0 left-0 w-72 h-full bg-black/90 backdrop-blur-2xl z-50 p-8 flex flex-col text-white space-y-6 shadow-2xl"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 80 }}
          >
            {/* Close */}
            <div className="flex justify-end mb-6">
              <FiX
                size={28}
                className="cursor-pointer hover:text-pink-400 transition"
                onClick={() => setMenuOpen(false)}
              />
            </div>

            {/* ✅ Page links (Routes) */}
            <div
              className="text-lg font-semibold hover:text-pink-400 transition cursor-pointer"
              onClick={() => {
                navigate("/events");
                setMenuOpen(false);
              }}
            >
              Events
            </div>

            <div
              className="text-lg font-semibold hover:text-pink-400 transition cursor-pointer"
              onClick={() => {
                navigate("/alumni");
                setMenuOpen(false);
              }}
            >
              Alumni
            </div>

            {/* ✅ Scroll links (Landing page sections) */}
            {scrollItems.map((item) => (
              <ScrollLink
                key={item}
                to={item.toLowerCase()}
                smooth
                duration={500}
                offset={-70}
                className="text-lg font-semibold hover:text-pink-400 transition cursor-pointer"
                onClick={() => {
                  // go home first, then scroll
                  navigate("/");
                  setTimeout(() => {
                    const el = document.getElementById(item.toLowerCase());
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }, 150);
                  setMenuOpen(false);
                }}
              >
                {item}
              </ScrollLink>
            ))}

            {/* Profile */}
            <motion.button
              onClick={() => {
                navigate("/profile");
                setMenuOpen(false);
              }}
              className="mt-auto bg-gradient-to-r from-pink-500 to-purple-600 py-2 px-6 rounded-full font-bold hover:scale-105 transition-all"
            >
              Profile
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
