// translations.ts
// This file contains all the translatable text for the portfolio.
// It's structured by language (en, id) and then by section/component.

import { FaFigma, FaSearch, FaPalette, FaCode } from "react-icons/fa";
import React from "react"; // Import React for JSX in icon type

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SkillIcon = React.ReactElement<any, any>;


export interface NavItem {
  name: string;
  href: string;
}

export interface EducationItem {
  degree: string;
  institution: string;
  year: string;
  description: string;
  logoUrl: string;
  memoryImageUrls: string[];
  highlights: string[];
}

export interface ExperienceItem {
  role: string;
  company: string;
  year: string;
  description: string;
  logoUrl: string;
  memoryImageUrls: string[];
  highlights: string[];
}

export interface SkillItem {
  name: string;
  levelName: string;
  icon: SkillIcon; // Use the SkillIcon type
}

export interface ProjectItem {
  id: number;
  category: string[];
  title: string;
  tags: string[];
  imageUrl: string;
  description: string;
  link: string;
  gradient: string;
}

export interface Translations {
  [key: string]: {
    // Hero Section
    heroGreeting: string;
    heroNameAlt: string;
    heroSubtitle: string;
    heroAboutMe: string;
    heroButtonResume: string;
    heroButtonContact: string;

    // About/Resume Section
    aboutTitle: string;
    educationTitle: string;
    experienceTitle: string;
    educationData: EducationItem[];
    experienceData: ExperienceItem[];

    // Skills Section
    skillsTitle: string;
    skillsData: SkillItem[];
    skillLevels: {
      basic: string;
      intermediate: string;
      expert: string;
    };


    // Portfolio Section
    portfolioTitle: string;
    projectsData: ProjectItem[];
    projectAccessLocked: string;
    projectSeeDetails: string;

    // Contact Section
    contactTitle: string;
    contactSubtitle: string;
    contactPrompt: string;
    contactFormSubmitSuccess: string;
    contactFormSubmitError: string; // Example for backend logic

    // Navbar
    navItems: NavItem[];

    // Footer
    footerRightsReserved: string;
    footerDesignedWith: string;
    footerCodedWith: string;
  };
}

export const translations: Translations = {
  en: {
    // Hero Section
    heroGreeting: "Hello, I'm Teds",
    heroNameAlt: "Theodore Kasyfillah Name Logo",
    heroSubtitle: "UI/UX & Digital Product Enthusiast",
    heroAboutMe: "Hi, I'm Theo an Information Systems student passionate about UI/UX and Product Management. I love blending design and tech to create user-friendly, meaningful digital experiences.",
    heroButtonResume: "My Resume",
    heroButtonContact: "Contact Me",

    // About/Resume Section
    aboutTitle: "About TEDS",
    educationTitle: "Education",
    experienceTitle: "Experience",
    educationData: [
      {
        degree: "Information System Student",
        institution: "Universitas Indonesia",
        year: "Aug 2022 - Now",
        description: "Pursuing a degree in Information Systems at Universitas Indonesia with a strong foundation in UX design, system analysis, database management, enterprise architecture, and product management. Actively involved in student organizations to sharpen collaboration and leadership abilities.",
        logoUrl: "/logo/ui.png",
        memoryImageUrls: ["/logo/Member DPD.jpg", "/logo/Member DPD.jpg", "/logo/Member DPD.jpg"],
        highlights: [
          "Gained knowledge in User Experience Design, Information System Analysis and Design, Database Management Systems, Enterprise Architecture, and Project & Product Management.",
          "Actively participating in various student organizations and committees to enhance collaboration and leadership skills."
        ]
      },
    ],
    experienceData: [
      {
        role: "Digital Product Design Lead",
        company: "Ristek Fasilkom UI",
        year: "March 2025 - Present",
        description: "As Lead of the Digital Product Design SIG at RISTEK FASILKOM UI, I led talent recruitment, designed a mentoring program to build members’ UI/UX skills, and contributed to two external projects by delivering wireframes and prototypes aligned with user needs.",
        logoUrl: "/logo/ristek.png",
        memoryImageUrls: ["/logo/Lead DPD.jpg", "/memories/ristek-team-collab.jpg"],
        highlights: [
          "Collaborated with the board of directors to recruit top talent in digital product design.",
          "Designed a mentoring program to enhance members' skills for the professional UI/UX industry.",
          "Contributed as a UI/UX Designer in two external projects, creating wireframes, high-fidelity prototypes, and aligning designs with user needs in collaboration with development teams.",
        ],
      },
      {
        role: "Creative Manager",
        company: "COMPFEST 16",
        year: "March 2024 - January 2025",
        description: "Led the creative division of COMPFEST 16, managing 30 staff and 6 PICs across Visual Design, Documentation & Animation, and Decorations. Oversaw end-to-end creative strategy and execution, ensuring a cohesive visual identity. Directed team workflows, reviewed deliverables, and aligned creative output with the event’s vision to deliver an impactful audience experience.",
        logoUrl: "/logo/compfest.jpg",
        memoryImageUrls: ["/logo/Member DPD.jpg"],
        highlights: [
          "Participated in internal classes focused on strengthening UI/UX skills, from user research to usability testing.",
          "Involved in two internal and four external projects as a junior UI/UX designer, responsible for wireframes and prototypes.",
          "Recognized as the Best Member in Q2 for consistent dedication, collaboration, and contributions.",
        ],
      },
      {
        role: "Digital Product Design Member",
        company: "Ristek Fasilkom UI",
        year: "March 2024 - January 2025",
        description: "As a junior UI/UX designer in the Digital Product Design SIG, I participated in internal classes covering user research to usability testing. I contributed to two internal and four external projects by creating wireframes and prototypes, and was recognized as Best Member in Q2 for my consistent dedication and collaboration.",
        logoUrl: "/logo/ristek.png",
        memoryImageUrls: ["/logo/Member DPD.jpg"],
        highlights: [
          "Participated in internal classes focused on strengthening UI/UX skills, from user research to usability testing.",
          "Involved in two internal and four external projects as a junior UI/UX designer, responsible for wireframes and prototypes.",
          "Recognized as the Best Member in Q2 for consistent dedication, collaboration, and contributions.",
        ],
      },
      {
        role: "UI/UX Staff",
        company: "Open House Fasilkom UI 2023",
        year: "August 2023 - November 2023",
        description: "Designed a user-friendly registration page by conducting user analysis and iterative improvements. Helped drive 750+ sign-ups by enhancing the user experience and aligning the flow with event goals.",
        logoUrl: "/logo/logo oh 23.png",
        memoryImageUrls: ["/logo/UIUX OH.jpg", "/memories/oh-fasilkom-event.jpg", "/memories/oh-fasilkom-booth.jpg"],
        highlights: [
          "Conducted user analysis to understand the needs and behavior of prospective students.",
          "Designed an intuitive and user-friendly registration page through iterative design and feedback.",
          "Played a key role in enhancing the user experience and ensuring a smooth registration process aligned with the event’s goals.",
        ],
      },
      {
        role: "Art & Culture Staff",
        company: "BEM Fasilkom UI",
        year: "April 2023 - December 2023",
        description: "Served as a full-time staff in the Art & Culture Department, initiating art-based programs to support students’ creative growth. Designed activities that integrated arts into campus life, fostering collaboration, innovation, and critical thinking. Engaged 100+ students through events that emphasized holistic development alongside academic life.",
        logoUrl: "/logo/BEMPA.jpg",
        memoryImageUrls: ["/logo/Member DPD.jpg"],
        highlights: [
          "Participated in internal classes focused on strengthening UI/UX skills, from user research to usability testing.",
          "Involved in two internal and four external projects as a junior UI/UX designer, responsible for wireframes and prototypes.",
          "Recognized as the Best Member in Q2 for consistent dedication, collaboration, and contributions.",
        ],
      },
    ],

    // Skills Section
    skillsTitle: "TEDS Skills",
    skillsData: [
      { name: "UI Design", levelName: "Intermediate", icon: React.createElement(FaFigma, { size: 30 }) },
      { name: "UX Research", levelName: "Intermediate", icon: React.createElement(FaSearch, { size: 30 }) },
      { name: "Graphic Design", levelName: "Basic", icon: React.createElement(FaPalette, { size: 30 }) },
      { name: "Front End Development", levelName: "Basic", icon: React.createElement(FaCode, { size: 30 }) },
    ],
    skillLevels: {
      basic: "Basic",
      intermediate: "Intermediate",
      expert: "Expert",
    },

    // Portfolio Section
    portfolioTitle: "Highlighted Works",
    projectsData: [
        {
            id: 1,
            title: "Open House Fasilkom UI 2023",
            category: ["Real Projects"],
            tags: ["UI/UX Design", "Registration Page", "Event"],
            imageUrl: "/logo/oh 2023.png",
            description: "Designed the Home Registration Page for Open House Fasilkom UI 2023, featuring a countdown, event details, benefits, FAQs, and contact access for a seamless attendee experience.",
            link: "https://dribbble.com/shots/25345283-Open-House-Fasilkom-UI-2023-Home-Registration-Page",
            gradient: "from-teal-600 to-cyan-700",
        },
        {
            id: 2,
            title: "Pemira Fasilkom UI 2023 Website",
            category: ["Real Projects"],
            tags: ["UI/UX Design", "E-Voting", "Election"],
            imageUrl: "/logo/PEMIRA 2023.png",
            description: "Designed the Landing Page, Candidate Overview, and E-Voting pages for Pemira Fasilkom UI 2023, ensuring an intuitive experience with clear information, smooth navigation, and secure voting functionality.",
            link: "#",
            gradient: "from-sky-700 to-blue-800",
        },
        {
            id: 3,
            title: "SIBeasiswa NG",
            category: ["College Projects"],
            tags: ["UI/UX Design", "CMS", "Scholarship"],
            imageUrl: "/logo/SiBeasiswa.png",
            description: "Designed a user-friendly scholarship website and CMS as part of open recruitment for Ristek Fasilkom Ul's Digital Product Design SIG. The platform simplifies scholarship discovery, application management, and document submission for students, while offering efficient admin tools for managing and reviewing submissions.",
            link: "https://dribbble.com/shots/25344350-SIBeasiswa-NG-A-Solution-for-Efficient-Scholarship-Management",
            gradient: "from-emerald-600 to-green-700",
        },
        {
            id: 4,
            title: "The 47th Jazz Goes to Campus Website",
            category: ["Real Projects"],
            tags: ["UI/UX Design", "Event", "Festival"],
            imageUrl: "/logo/JGTC.png",
            description: "Designed for The 47th Jazz Goes to Campus Website, the Homepage introduces the event, the Gallery showcases photos and highlights, the About Us section tell the history of the event, and the Band Registration page offers a streamlined registration process for band contest participant.",
            link: "#",
            gradient: "from-purple-600 to-indigo-700",
        },
        {
            id: 5,
            title: "RISTEK Summer Event Website Revamp",
            category: ["Real Projects"],
            tags: ["UI/UX Design", "Revamp", "Tech Event"],
            imageUrl: "/logo/Summer Event.png",
            description: "Worked on a small revamp for RISTEK Summer Event 2024 website, including adjustments to the landing page and event page for improved clarity and visual flow. Added dynamic forms to streamline the registration process, making it more seamless and interactive for participants.",
            link: "#",
            gradient: "from-pink-600 to-rose-700",
        },
        {
            id: 6,
            title: "InteractEd: Redefining Early Education!",
            category: ["College Projects"],
            tags: ["UI/UX Design", "College Project", "Education"],
            imageUrl: "/logo/InteractEd.png",
            description: "My group and I designed InteractEd for HCI course final project, InteractEd is an interactive learning platform for kids aged 6–13. It uses project-based learning to help children develop skills, explore interests, and collaborate with peers in a fun and engaging way.",
            link: "https://dribbble.com/shots/25348449-InteractEd-Redefining-Early-Education",
            gradient: "from-pink-600 to-rose-700",
        },
        {
            id: 7,
            title: "Healthcare Mobile App",
            category: ["Real Projects"],
            tags: ["UI/UX Design", "Mobile", "Healthcare"],
            imageUrl: "/logo/Healthcare App.png",
            description: "Designed for an e-health application as a contract project during my time as a Digital Product Design member at Ristek Fasilkom UI, the app includes features like surveys, e-learning, document management, and consultation. It provides users with a seamless and user-friendly experience, enabling easy access to health resources and efficient interaction with healthcare providers.",
            link: "#",
            gradient: "from-pink-600 to-rose-700",
        },
        {
            id: 8,
            title: "Football Super App",
            category: ["Real Projects"],
            tags: ["UI/UX Design", "Mobile", "Football"],
            imageUrl: "/logo/Football.png",
            description: "Designed a football application as a contract project during my time as a Digital Product Design member at Ristek Fasilkom UI featuring news, standings, player and coach details, match results, and schedules. The app delivers a comprehensive and user-friendly experience, keeping fans informed and engaged with their favorite teams and competitions.",
            link: "#",
            gradient: "from-pink-600 to-rose-700",
        },
        {
            id: 9,
            title: "Tax Centre UI Website",
            category: ["Real Projects"],
            tags: ["UI/UX Design", "Company Profile", "Tax"],
            imageUrl: "/logo/Taxfia.png",
            description: "Designed the official website for Tax Centre UI as part of a contract project under Ristek Fasilkom UI. Focused on creating a clean, accessible, and responsive interface that aligns with the institution’s branding. Delivered a modern and informative platform that helps users easily navigate tax-related content..",
            link: "#",
            gradient: "from-pink-600 to-rose-700",
        },
        {
          id: 10,
          title: "Cari.in: Competition & Team Finder",
          category: ["Competition"],
          tags: ["Business Plan", "EdTech", "Startup"],
          imageUrl: "/logo/cariin.png",
          description: "Cari.in is an innovative digital platform designed to help Indonesian university students discover competition opportunities, form teams, develop practical skills, and build digital portfolios tailored to current and future industry demands.\n This project was presented in a business plan competition, where we successfully ranked in the Top 5 finalists.",
          link: "https://drive.google.com/file/d/14XUMxkMtvEtYhvKr26OLze8K_QthDL7Q/view?usp=sharing",
          gradient: "from-pink-600 to-rose-700",
      },
      {
        id: 11,
        title: "Artera: New Hope For Digital Artist",
        category: ["College Projects"],
        tags: ["Digital Art", "University Project", "Creative Platform"],
        imageUrl: "/logo/artera.png",
        description: "Artera is a digital platform developed to support and empower Indonesian illustrators and digital artists through a fair, transparent system focused on copyright protection.\nThe platform offers features for showcasing and selling artworks, global market access, fair pricing guidelines, and a supportive, educational community.",
        link: "https://drive.google.com/file/d/1DzX2wkF_qjFlhSi_VW8kwr5uFX3mHpDz/view?usp=sharing",
        gradient: "from-pink-600 to-rose-700",
    },
    ],
    projectAccessLocked: "Access Locked",
    projectSeeDetails: "See Details",

    // Contact Section
    contactTitle: "Let's Connect!",
    contactSubtitle: "Open to collaboration or meaningful conversations!",
    contactPrompt: "Do you have a project idea, a question, or simply wish to connect? Feel free to reach out through social media or email, I’d be glad to talk further!",
    contactFormSubmitSuccess: "Contact form submitted! (Backend logic not yet implemented)",
    contactFormSubmitError: "Failed to submit form. Please try again later.",


    // Navbar
    navItems: [
      { name: "Home", href: "/" },
      { name: "About", href: "/about" },
      { name: "Portfolio", href: "/portfolio" },
    ]
    ,

    // Footer
    footerRightsReserved: "All rights reserved.",
    footerDesignedWith: "Designed with",
    footerCodedWith: "& Coded with Next.js & Tailwind CSS",
  },
  id: {
    // Hero Section
    heroGreeting: "Halo, saya Teds",
    heroNameAlt: "Logo Nama Theodore Kasyfillah",
    heroSubtitle: "Penggiat UI/UX & Produk Digital",
    heroAboutMe: "Halo, saya Theo — mahasiswa Sistem Informasi yang tertarik pada UI/UX dan Product Management. Saya suka menggabungkan desain dan teknologi untuk menciptakan pengalaman digital yang ramah dan berdampak.",
    heroButtonResume: "Resume Saya",
    heroButtonContact: "Hubungi Saya",

    // About/Resume Section
    aboutTitle: "Tentang TEDS",
    educationTitle: "Pendidikan",
    experienceTitle: "Pengalaman",
    educationData: [
      {
        degree: "Mahasiswa Sistem Informasi",
        institution: "Universitas Indonesia",
        year: "Agu 2022 - Sekarang",
        description: "Mahasiswa Sistem Informasi di Universitas Indonesia dengan minat kuat pada UI/UX dan Manajemen Produk. Berkomitmen untuk menggabungkan keahlian teknis dengan sensibilitas desain untuk menciptakan solusi yang berpusat pada pengguna.",
        logoUrl: "/logo/ui.png",
        memoryImageUrls: ["/logo/Member DPD.jpg", "/logo/Member DPD.jpg", "/logo/Member DPD.jpg"],
        highlights: [
          "Memperoleh pengetahuan dalam Desain Pengalaman Pengguna, Analisis dan Desain Sistem Informasi, Sistem Manajemen Basis Data, Arsitektur Perusahaan, dan Manajemen Proyek & Produk.",
          "Berpartisipasi aktif dalam berbagai organisasi kemahasiswaan dan kepanitiaan untuk meningkatkan keterampilan kolaborasi dan kepemimpinan."
        ]
      },
    ],
    experienceData: [
      {
        role: "Anggota Senior Divisi Desain Produk Digital",
        company: "Ristek Fasilkom UI",
        year: "Mar 2025 - Sekarang",
        description: "Setelah memperoleh banyak pengalaman dalam desain produk digital, saya akhirnya dipercaya untuk menjabat sebagai Lead dari Special Interest Group (SIG) Digital Product Design di RISTEK Fakultas Ilmu Komputer, Universitas Indonesia.",
        logoUrl: "/logo/ristek.png",
        memoryImageUrls: ["/logo/Lead DPD.jpg", "/memories/ristek-team-collab.jpg"],
        highlights: [
          "Berkolaborasi dengan dewan direksi untuk merekrut talenta terbaik dalam desain produk digital.",
          "Merancang program bimbingan untuk meningkatkan keterampilan anggota untuk industri UI/UX profesional.",
          "Berkontribusi sebagai Desainer UI/UX dalam dua proyek eksternal, membuat wireframe, prototipe high-fidelity, dan menyelaraskan desain dengan kebutuhan pengguna bekerja sama dengan tim pengembang.",
        ],
      },
      {
        role: "Anggota Divisi Desain Produk Digital",
        company: "Ristek Fasilkom UI",
        year: "Mar 2024 - Jan 2025",
        description: "Berkontribusi pada beberapa proyek desain produk digital sebagai anggota tim. Terlibat aktif dalam riset pengguna, pembuatan wireframe, prototipe interaktif, dan pengujian kegunaan untuk berbagai platform dan aplikasi.",
        logoUrl: "/logo/ristek.png",
        memoryImageUrls: ["/logo/Member DPD.jpg"],
        highlights: [
          "Berpartisipasi dalam kelas internal yang berfokus pada penguatan keterampilan UI/UX, mulai dari riset pengguna hingga pengujian kegunaan.",
          "Terlibat dalam dua proyek internal dan empat proyek eksternal sebagai desainer UI/UX junior, bertanggung jawab atas wireframe dan prototipe.",
          "Diakui sebagai Anggota Terbaik pada Q2 atas dedikasi, kolaborasi, dan kontribusi yang konsisten.",
        ],
      },
      {
        role: "Staf UI/UX",
        company: "Open House Fasilkom UI 2023",
        year: "Agustus 2023 - November 2023",
        description: "Bertanggung jawab atas aspek UI/UX dari kepanitiaan Open House Fasilkom UI 2023. Merancang alur pengguna yang intuitif dan antarmuka yang menarik untuk situs web acara dan materi digital promosi.",
        logoUrl: "/logo/logo oh 23.png",
        memoryImageUrls: ["/logo/UIUX OH.jpg", "/memories/oh-fasilkom-event.jpg", "/memories/oh-fasilkom-booth.jpg"],
        highlights: [
          "Melakukan analisis pengguna untuk memahami kebutuhan dan perilaku calon mahasiswa.",
          "Merancang halaman registrasi yang intuitif dan ramah pengguna melalui desain iteratif dan umpan balik.",
          "Memainkan peran kunci dalam meningkatkan pengalaman pengguna dan memastikan proses registrasi yang lancar selaras dengan tujuan acara.",
        ],
      },
    ],

    // Skills Section
    skillsTitle: "Keahlian TEDS",
    skillsData: [
        { name: "Desain UI", levelName: "Menengah", icon: React.createElement(FaFigma, { size: 30 }) },
        { name: "Riset UX", levelName: "Menengah", icon: React.createElement(FaSearch, { size: 30 }) },
        { name: "Desain Grafis", levelName: "Dasar", icon: React.createElement(FaPalette, { size: 30 }) },
        { name: "Pengembangan Front End", levelName: "Dasar", icon: React.createElement(FaCode, { size: 30 }) },
    ],
    skillLevels: {
      basic: "Dasar",
      intermediate: "Menengah",
      expert: "Ahli",
    },


    // Portfolio Section
    portfolioTitle: "Karya TEDS",
    projectsData: [
        {
            id: 1,
            title: "Open House Fasilkom UI 2023",
            category: ["College Projects"],
            tags: ["Desain UI/UX", "Halaman Registrasi", "Acara"],
            imageUrl: "/logo/oh 2023.png",
            description: "Merancang Halaman Registrasi Beranda untuk Open House Fasilkom UI 2023, menampilkan hitung mundur, detail acara, manfaat, FAQ, dan akses kontak untuk pengalaman peserta yang mulus.",
            link: "https://dribbble.com/shots/25345283-Open-House-Fasilkom-UI-2023-Home-Registration-Page",
            gradient: "from-teal-600 to-cyan-700",
        },
        {
            id: 2,
            title: "Situs Web Pemira Fasilkom UI 2023",
            category: ["College Projects"],
            tags: ["Desain UI/UX", "E-Voting", "Pemilihan"],
            imageUrl: "/logo/PEMIRA 2023.png",
            description: "Merancang Halaman Utama, Kandidat, dan halaman E-Voting untuk Pemira Fasilkom UI 2023, memastikan pengalaman intuitif dengan informasi yang jelas, navigasi yang lancar, dan fungsionalitas pemungutan suara yang aman.",
            link: "#",
            gradient: "from-sky-700 to-blue-800",
        },
        {
            id: 3,
            title: "SIBeasiswa NG",
            category: ["College Projects"],
            tags: ["Desain UI/UX", "CMS", "Beasiswa"],
            imageUrl: "/logo/SiBeasiswa.png",
            description: "Merancang situs web beasiswa dan CMS yang ramah pengguna sebagai bagian dari rekrutmen terbuka untuk SIG Desain Produk Digital Ristek Fasilkom UI. Platform ini menyederhanakan penemuan beasiswa, manajemen aplikasi, dan pengiriman dokumen untuk mahasiswa, sambil menawarkan alat admin yang efisien untuk mengelola dan meninjau pengajuan.",
            link: "https://dribbble.com/shots/25344350-SIBeasiswa-NG-A-Solution-for-Efficient-Scholarship-Management",
            gradient: "from-emerald-600 to-green-700",
        },
        {
            id: 4,
            title: "Situs Web The 47th Jazz Goes to Campus",
            category: ["College Projects"],
            tags: ["Desain UI/UX", "Acara", "Festival"],
            imageUrl: "/logo/JGTC.png",
            description: "Dirancang untuk Situs Web The 47th Jazz Goes to Campus, Halaman Beranda memperkenalkan acara, Galeri menampilkan foto dan sorotan, bagian Tentang Kami menceritakan sejarah acara, dan halaman Registrasi Band menawarkan proses registrasi yang disederhanakan untuk peserta kontes band.",
            link: "#",
            gradient: "from-purple-600 to-indigo-700",
        },
        {
            id: 5,
            title: "Pembaruan  Situs Web RISTEK Summer Event",
            category: ["College Projects"],
            tags: ["Desain UI/UX", "Pembaruan ", "Acara Teknologi"],
            imageUrl: "/logo/Summer Event.png",
            description: "Mengerjakan pembaruan  kecil untuk situs web RISTEK Summer Event 2024, termasuk penyesuaian pada halaman arahan dan halaman acara untuk kejelasan dan alur visual yang lebih baik. Menambahkan formulir dinamis untuk menyederhanakan proses registrasi, membuatnya lebih mulus dan interaktif bagi peserta.",
            link: "#",
            gradient: "from-pink-600 to-rose-700",
        },
        {
            id: 6,
            title: "InteractEd: Mendefinisikan Ulang Pendidikan Anak Usia Dini!",
            category: ["College Projects"],
            tags: ["Desain UI/UX", "Proyek Kuliah", "Pendidikan"],
            imageUrl: "/logo/InteractEd.png",
            description: "Kelompok saya dan saya merancang InteractEd untuk proyek akhir mata kuliah HCI, InteractEd adalah platform pembelajaran interaktif untuk anak-anak usia 6–13 tahun. Ini menggunakan pembelajaran berbasis proyek untuk membantu anak-anak mengembangkan keterampilan, mengeksplorasi minat, dan berkolaborasi dengan teman sebaya dengan cara yang menyenangkan dan menarik.",
            link: "https://dribbble.com/shots/25348449-InteractEd-Redefining-Early-Education",
            gradient: "from-pink-600 to-rose-700",
        },
        {
            id: 7,
            title: "Aplikasi Survey Kesehatan",
            category: ["College Projects"],
            tags: ["Desain UI/UX", "Mobile", "Kesehatan"],
            imageUrl: "/logo/Healthcare App.png",
            description: "Dirancang untuk aplikasi e-health sebagai proyek kontrak selama saya menjadi anggota Desain Produk Digital di Ristek Fasilkom UI, aplikasi ini mencakup fitur seperti survei, e-learning, manajemen dokumen, dan konsultasi. Ini memberikan pengguna pengalaman yang mulus dan ramah pengguna, memungkinkan akses mudah ke sumber daya kesehatan dan interaksi yang efisien dengan penyedia layanan kesehatan.",
            link: "#",
            gradient: "from-pink-600 to-rose-700",
        },
        {
            id: 8,
            title: "Aplikasi Sepak Bola",
            category: ["College Projects"],
            tags: ["Desain UI/UX", "Mobile", "Sepak Bola"],
            imageUrl: "/logo/Football.png",
            description: "Merancang aplikasi sepak bola sebagai proyek kontrak selama saya menjadi anggota Desain Produk Digital di Ristek Fasilkom UI yang menampilkan berita, klasemen, detail pemain dan pelatih, hasil pertandingan, dan jadwal. Aplikasi ini memberikan pengalaman yang komprehensif dan ramah pengguna, menjaga penggemar tetap terinformasi dan terlibat dengan tim dan kompetisi favorit mereka.",
            link: "#",
            gradient: "from-pink-600 to-rose-700",
        },
        {
            id: 9,
            title: "Situs Web Tax Centre UI",
            category: ["College Projects"],
            tags: ["Desain UI/UX", "Profil Perusahaan", "Pajak"],
            imageUrl: "/logo/Taxfia.png",
            description: "Merancang situs web resmi untuk Tax Centre UI sebagai bagian dari proyek kontrak di bawah Ristek Fasilkom UI. Berfokus pada pembuatan antarmuka yang bersih, mudah diakses, dan responsif yang selaras dengan branding institusi. Menghasilkan platform modern dan informatif yang membantu pengguna dengan mudah menavigasi konten terkait pajak.",
            link: "#",
            gradient: "from-pink-600 to-rose-700",
        },
        
    ],
    projectAccessLocked: "Akses Terkunci",
    projectSeeDetails: "Lihat Detail",

    // Contact Section
    contactTitle: "Mari Terhubung!",
    contactSubtitle: "Terbuka untuk kolaborasi atau percakapan bermakna!",
    contactPrompt: "Apakah Anda punya ide proyek, pertanyaan, atau hanya ingin terhubung? Jangan ragu untuk menghubungi melalui media sosial atau email, saya akan senang berbicara lebih lanjut!",
    contactFormSubmitSuccess: "Formulir kontak terkirim! (Logika backend belum diimplementasikan)",
    contactFormSubmitError: "Gagal mengirim formulir. Silakan coba lagi nanti.",

    // Navbar
    // LangContext.ts (atau wherever your translations live)
    navItems: [
      { name: "Beranda", href: "/" },
      { name: "Tentang", href: "/about" },
      { name: "Portofolio", href: "/portfolio" },
    ],

    // Footer
    footerRightsReserved: "Hak cipta dilindungi.",
    footerDesignedWith: "Didesain dengan",
    footerCodedWith: "& Dibuat dengan Next.js & Tailwind CSS",
  },
};
