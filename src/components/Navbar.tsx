"use client";
import Link from "next/link";
import { motion } from "framer-motion";

const navItems = [
  { name: "Home", href: "#" },
  { name: "About", href: "#about" }, // Ganti dengan ID section yang sesuai
  { name: "Portfolio", href: "#portfolio" },
  { name: "Contact", href: "#contact" },
];

const Navbar = () => {
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-brand-dark/80 backdrop-blur-md fixed top-0 left-0 right-0 z-50"
    >
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-brand-teal">
          T.K
        </Link>
        <div className="space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-gray-300 hover:text-brand-teal transition-colors duration-300"
            >
              {item.name}
            </Link>
          ))}
        </div>
        <Link
          href="#contact"
          className="bg-brand-teal text-brand-dark px-4 py-2 rounded-md hover:bg-opacity-80 transition-colors duration-300"
        >
          Hire Me
        </Link>
      </div>
    </motion.nav>
  );
};

export default Navbar;