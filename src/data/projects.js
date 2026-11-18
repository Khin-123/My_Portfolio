// Project cards and detail dialogs use this data. Add an object to add a project.
// Use null for unavailable links. Add only verified project information.
// Visual options: 'greenhouse', 'music', 'remote', 'health', 'audio', 'modeling', 'circuit'.
export const projects = [
  {
    id: 'greensync',
    title: 'GreenSync',
    year: '2026',
    subtitle: 'Smart Greenhouse Monitoring and Control System',
    description:
      'A smart greenhouse monitoring and control system that connects embedded hardware with IoT.',
    category: 'IoT/Embedded',
    technologies: ['ESP32', 'IoT', 'Sensors'], // Update as the project evolves.
    github: 'https://github.com/Khin-123/GreenSync.git',
    demo: null,
    visual: 'greenhouse',
    details: {
      overview:
        'GreenSync is a smart greenhouse monitoring and control system built around ESP32, IoT, and sensors.',
      highlights: [
        'Focus: greenhouse monitoring and control.',
        'Platform: ESP32 with IoT and sensors.',
      ],
      // Add verified features, your role, or lessons learned here.
    },
  },
  {
    id: 'moodtune',
    title: 'MoodTune',
    year: '2026',
    subtitle: 'Music Recommendation System',
    description:
      'A music recommendation system with a web interface built using React and Tailwind CSS.',
    category: 'Software',
    technologies: ['React', 'Tailwind CSS', 'Data Analysis'], // Keep this list up to date.
    github: 'https://github.com/Khin-123/MoodTune.git',
    demo: 'https://mood-tune-liart.vercel.app/',
    visual: 'music',
    details: {
      overview:
        'MoodTune is a music recommendation system. Its web interface uses React and Tailwind CSS, and a live demo is available to explore.',
      highlights: [
        'Focus: music recommendations.',
        'Interface: React and Tailwind CSS.',
      ],
    },
  },
  {
    id: 'iot-universal-remote',
    title: 'IoT Universal Remote',
    year: '2025',
    subtitle: 'IoT-based Universal Remote Control with Cloud Integration',
    description:
      'An IoT-based universal remote control project that brings together IR communication and cloud integration.',
    category: 'IoT/Embedded',
    technologies: [
      'ESP32',
      'React',
      'Firebase',
      'Node.js',
      'Express.js',
      'IR Communication',
    ],
    github:
      'https://github.com/Khin-123/IoT-based-Universal-Remote-Controller.git',
    demo: 'https://smart-ir-remote-hub.vercel.app/',
    visual: 'remote',
    details: {
      overview:
        'An IoT-based universal remote control system with cloud integration. The project combines ESP32 and IR communication with a React interface, Firebase, Node.js, and Express.js.',
      highlights: [
        'Focus: universal remote control with cloud integration.',
        'Embedded technologies: ESP32 and IR communication.',
        'Web technologies: React, Firebase, Node.js, and Express.js.',
      ],
    },
  },
  {
    id: 'neohealth',
    title: 'Neohealth',
    year: '2025',
    subtitle: 'Newborn Health Risk Assessment System',
    description:
      'A newborn health risk assessment project developed with Python and fuzzy logic.',
    category: 'Software',
    technologies: ['Python', 'Fuzzy Logic', 'AI'], // Keep this list editable.
    github: 'https://github.com/yoon04/Newborn-Health-Risk-Assessment.git',
    demo: null,
    visual: 'health',
    details: {
      overview:
        'Neohealth is a newborn health risk assessment system using Python and fuzzy logic.',
      highlights: [
        'Focus: newborn health risk assessment.',
        'Technologies: Python, fuzzy logic and AI.',
      ],
    },
  },
  {
    id: 'tunewave',
    title: 'TuneWave',
    year: '2026',
    subtitle: 'Music Source Separation and Speech Enhancement',
    description:
      'An audio processing application that separates vocals from instrumentals and enhances noisy speech using digital signal processing and pretrained machine learning models.',
    category: 'Software / DSP',
    technologies: ['Python', 'React', 'Flask', 'Digital Signal Processing', 'PyTorch', 'Open-Unmix'],
    github: 'https://github.com/Khin-123/TuneWave.git',
    demo: null,
    visual: 'audio',
    details: {
      overview:
        'TuneWave is an audio processing application for music source separation and speech enhancement, combining digital signal processing with pretrained machine learning models.',
      highlights: [
        'Music source separation into vocals and instrumental audio.',
        'DSP-based speech enhancement.',
        'STFT, Wiener filtering, and inverse STFT.',
      ],
    },
  },
  {
    id: 'drug-concentration-in-blood',
    title: 'Drug Concentration in Blood',
    year: '2026',
    subtitle: 'Drug Concentration Simulation Using LTI Systems',
    description:
      'A Python-based web application that models and visualizes drug concentration in blood plasma using LTI systems, differential equations, and Laplace Transform.',
    category: 'Software / Mathematical Modeling',
    technologies: ['Python', 'Flask', 'NumPy', 'SciPy', 'Matplotlib', 'Laplace Transform', 'LTI Systems'],
    github: 'https://github.com/Khin-123/Drug-Concentration-in-Blood.git',
    demo: null,
    visual: 'modeling',
    details: {
      overview:
        'A Python-based web application for simulating drug concentration in blood plasma using LTI systems, differential equations, and Laplace Transform.',
      highlights: [
        'IV infusion and oral drug administration simulation.',
        'Drug concentration calculation using transfer functions and convolution.',
        'Predefined drugs and custom simulation parameters.',
        'Concentration-time graphs and therapeutic range analysis.',
        'Safe, toxic, and subtherapeutic condition analysis.',
      ],
    },
  },
  {
    id: 'voltage-protection-circuit',
    title: 'Voltage Protection Circuit',
    year: '2025',
    subtitle: 'Automatic Overvoltage and Undervoltage Protection System',
    description:
      'An automatic DC voltage protection circuit that monitors input voltage and disconnects the connected load outside predefined safety thresholds. The project involved circuit design, simulation, PCB fabrication, and hardware testing.',
    category: 'Electronics / Hardware',
    technologies: ['Zener Diodes', 'NPN & PNP Transistors', 'Proteus', 'EasyEDA', 'PCB Fabrication', 'Hardware Testing'],
    github: null,
    demo: null,
    visual: 'circuit',
    details: {
      overview:
        'Designed and implemented an automatic DC voltage protection circuit that monitors input voltage and disconnects the connected load when voltage exceeds or falls below predefined safety thresholds. The project involved circuit design, simulation, PCB fabrication, and hardware testing.',
      highlights: [
        'Automatic overvoltage and undervoltage detection.',
        'Transistor-based switching using Zener diodes.',
        'Circuit simulation using Proteus.',
        'PCB design and physical fabrication.',
        'Hardware testing at different input voltage levels.',
        'Normal operation at 5.7 V, overvoltage detection at 6.6 V, and undervoltage detection at 4.6 V.',
      ],
    },
  },
];
