// src/components/CustomCursor.tsx
import { useEffect, useState } from "react";
import Image from 'next/image'; // Pastikan ini diimpor

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", moveCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, []);

  // Ganti "/images/nama-file-gambar-anda.png" dengan path yang benar
  // Ganti width dan height dengan ukuran gambar kursor Anda
  const cursorImagePath = "/logo/Logo teds.png"; // CONTOH PATH, GANTI INI
  const cursorWidth = 30; // CONTOH UKURAN, GANTI INI
  const cursorHeight = 30; // CONTOH UKURAN, GANTI INI

  return (
    <div // Wrapper div untuk positioning
      style={{
        position: "fixed",
        top: position.y,
        left: position.x,
        width: cursorWidth,    // Gunakan variabel ukuran
        height: cursorHeight,   // Gunakan variabel ukuran
        pointerEvents: "none",
        transform: "translate(-50%, -50%)", // Pusatkan gambar ke posisi kursor
        zIndex: 9999,
        // Hapus backgroundColor dan borderRadius jika tidak diperlukan lagi
      }}
      className="custom-cursor-wrapper" // Anda bisa memberi nama class jika perlu styling tambahan
    >
      <Image
        src={cursorImagePath}
        alt="Custom Cursor" // Deskripsi untuk aksesibilitas
        width={cursorWidth}
        height={cursorHeight}
        priority // Jika Anda ingin gambar kursor dimuat lebih cepat
        style={{
          display: 'block', // Untuk menghindari spasi ekstra di bawah gambar
        }}
      />
    </div>
  );
}