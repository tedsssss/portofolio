import { motion } from "framer-motion";

export default function FunAnimatedBlobs() {
  return (
    <>
      {/* === BLOBS KANAN === */}

      {/* Blob 1: besar, cyan blur, gerak melingkar */}
      <motion.div
        className="absolute rounded-full filter blur-3xl"
        style={{
          width: 160,
          height: 160,
          top: "40%",
          right: "25%",
          marginTop: "-80px",
          marginLeft: "-80px",
          background: "radial-gradient(circle at 30% 30%, #00f0ff70, #00000050)",
          zIndex: 0,
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
          marginTop: "-60px",
          marginRight: "-60px",
          background: "radial-gradient(circle at 50% 50%, #C0C0C0aa, #00000044)",
          zIndex: 0,
        }}
        animate={{
          x: [0, 10, -10, 10, -10, 0],
          y: [0, -10, 10, -10, 10, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Blob 3: kecil, teal blur, scale dan opacity */}
      <motion.div
        className="absolute rounded-full filter blur-lg"
        style={{
          width: 80,
          height: 80,
          bottom: "30%",
          right: "10%",
          marginBottom: "-40px",
          marginLeft: "-40px",
          background: "radial-gradient(circle at 50% 50%, #008080bb, #00404088)",
          zIndex: 0,
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

      {/* === BLOBS KIRI (mirror dari kanan) === */}

      {/* Blob 1 kiri: besar */}
      <motion.div
        className="absolute rounded-full filter blur-3xl"
        style={{
          width: 160,
          height: 160,
          top: "40%",
          left: "25%",
          marginTop: "-80px",
          marginLeft: "-80px",
          background: "radial-gradient(circle at 70% 70%, #00f0ff70, #00000050)",
          zIndex: 0,
        }}
        animate={{
          x: [0, -50, -100, -50, 0, 50, 100, 50, 0],
          y: [0, -50, 0, 50, 100, 50, 0, -50, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Blob 2 kiri: sedang */}
      <motion.div
        className="absolute rounded-full filter blur-xl"
        style={{
          width: 120,
          height: 120,
          top: "60%",
          left: "30%",
          marginTop: "-60px",
          marginLeft: "-60px",
          background: "radial-gradient(circle at 50% 50%, #C0C0C0aa, #00000044)",
          zIndex: 0,
        }}
        animate={{
          x: [0, -10, 10, -10, 10, 0],
          y: [0, 10, -10, 10, -10, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Blob 3 kiri: kecil */}
      <motion.div
        className="absolute rounded-full filter blur-lg"
        style={{
          width: 80,
          height: 80,
          bottom: "30%",
          left: "10%",
          marginBottom: "-40px",
          marginLeft: "-40px",
          background: "radial-gradient(circle at 50% 50%, #008080bb, #00404088)",
          zIndex: 0,
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
