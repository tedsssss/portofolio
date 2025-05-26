import { motion } from "framer-motion";

export default function FunAnimatedBlobs() {
  return (
    <>
      {/* Blob 1: besar, cyan blur, gerak melingkar */}
      <motion.div
        className="absolute rounded-full filter blur-3xl"
        style={{
          width: 160,
          height: 160,
          top: "40%",
          right: "25%",
          marginTop: "-80px", // Half of height
          marginLeft: "-80px", // Half of width
          background: "radial-gradient(circle at 30% 30%, #00f0ff70, #00000050)",
          zIndex: 0, // Behind the logo
        }}
        animate={{
          x: [0, 50, 100, 50, 0, -50, -100, -50, 0],
          y: [0, -50, 0, 50, 100, 50, 0, -50, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Blob 2: sedang, silver blur, getar kecil */}
      <motion.div
        className="absolute rounded-full filter blur-xl"
        style={{
          width: 120,
          height: 120,
          top: "60%",
          right: "30%",
          marginTop: "-60px",  // Half of height
          marginRight: "-60px", // Half of width (adjusted for right positioning)
          background: "radial-gradient(circle at 50% 50%, #C0C0C0aa, #00000044)",
          zIndex: 0, // Behind the logo
        }}
        animate={{
          x: [0, 10, -10, 10, -10, 0], // Relative to its new position
          y: [0, -10, 10, -10, 10, 0], // Relative to its new position
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Blob 3: kecil, soft teal blur, scale dan opacity naik turun */}
      <motion.div
        className="absolute rounded-full filter blur-lg"
        style={{
          width: 80,
          height: 80,
          bottom: "30%",
          right: "10%",
          marginBottom: "-40px", // Half of height (for bottom positioning)
          marginLeft: "-40px",  // Half of width
          background: "radial-gradient(circle at 50% 50%, #008080bb, #00404088)",
          zIndex: 0, // Behind the logo
        }}
        animate={{
          scale: [1, 1.2, 1, 1.2, 1],
          opacity: [0.6, 1, 0.6, 1, 0.6],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </>
  );
}