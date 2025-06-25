import { motion } from "framer-motion";

export default function FunAnimatedBlobs() {
  return (
    <>
      {/* === BLOBS KANAN === */}

      {/* Blob 1: besar, biru blur, gerak melingkar */}
      <motion.div
        className="absolute rounded-full filter blur-3xl"
        style={{
          width: 160,
          height: 160,
          top: "40%",
          right: "25%",
          marginTop: "-80px",
          marginLeft: "-80px",
          background: "radial-gradient(circle at 30% 30%, #00304970, #669bbc40)", // Biru tua ke biru terang transparan
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

      {/* Blob 2: sedang, putih blur, getar kecil */}
      <motion.div
        className="absolute rounded-full filter blur-xl"
        style={{
          width: 120,
          height: 120,
          top: "60%",
          right: "30%",
          marginTop: "-60px",
          marginRight: "-60px",
          background: "radial-gradient(circle at 50% 50%, #ffffffbb, #ffffff33)", // Putih soft
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

      {/* Blob 3: kecil, merah blur, scale dan opacity */}
      <motion.div
        className="absolute rounded-full filter blur-lg"
        style={{
          width: 80,
          height: 80,
          bottom: "30%",
          right: "10%",
          marginBottom: "-40px",
          marginLeft: "-40px",
          background: "radial-gradient(circle at 50% 50%, #d6282888, #a3000033)", // Merah terang ke gelap
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

      {/* === BLOBS KIRI === */}

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
          background: "radial-gradient(circle at 70% 70%, #00304970, #669bbc40)",
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
          background: "radial-gradient(circle at 50% 50%, #ffffffbb, #ffffff33)",
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
          background: "radial-gradient(circle at 50% 50%, #d6282888, #a3000033)",
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
