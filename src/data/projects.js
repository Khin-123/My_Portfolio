export const projectCategories = ['All', 'IoT & Embedded', 'Hardware', 'Software']

export const projects = [
  {
    id: 'iot-universal-remote',
    title: 'IoT Universal Remote',
    year: '2025',
    category: 'IoT & Embedded',
    description: 'Control infrared appliances through a web interface and an ESP32.',
    contribution: 'Presented the project’s technical paper at ICAIT 2026.',
    technologies: ['ESP32', 'Infrared control', 'React', 'Firebase', 'Node.js', 'Express'],
    github: 'https://github.com/Khin-123/IoT-based-Universal-Remote-Controller',
    demo: 'https://smart-ir-remote-hub.vercel.app/',
    evidence: {
      label: 'Command path',
      story: [
        {
          label: 'Web app & cloud',
          icon: 'cloud',
          title: 'Send the command',
          description: 'Choose an action in the web app. The cloud-connected backend passes the command to the ESP32.',
        },
        {
          label: 'ESP32',
          icon: 'chip',
          title: 'Convert the command to infrared',
          description: 'The ESP32 receives the command and transmits the corresponding infrared signal.',
        },
        {
          label: 'Infrared appliance',
          icon: 'appliance',
          title: 'Control the appliance',
          description: 'The appliance responds to the signal as it would to a conventional remote.',
        },
      ],
    },
    details: {
      overview: 'The project brings infrared control into a web interface. The web stack uses React, Firebase, and a Node.js/Express backend. The ESP32 handles the infrared connection to the appliance.',
      highlights: [
        'The ESP32 bridges the cloud-connected interface and the physical infrared device.',
        'I presented “IoT-based Universal Remote Control System With Cloud Integration” at ICAIT 2026 in Yangon.',
      ],
      relatedLink: { href: '#ieee-conference-2026', label: 'Conference presentation' },
    },
  },
  {
    id: 'voltage-protection-circuit',
    title: 'Voltage Protection Circuit',
    year: '2025',
    category: 'Hardware',
    description: 'A DC protection circuit that disconnects a load outside its voltage limits.',
    contribution: 'Designed and simulated the circuit, fabricated the PCB, and tested it on hardware.',
    verification: 'Detected undervoltage at 4.6 V and overvoltage at 6.6 V. Normal operation was observed at 5.7 V.',
    technologies: ['PCB design', 'Hardware testing', 'Proteus', 'EasyEDA', 'Zener diodes', 'BJTs'],
    evidence: {
      label: 'Bench observations',
      readings: [
        { value: '4.6 V', label: 'Undervoltage' },
        { value: '5.7 V', label: 'Normal' },
        { value: '6.6 V', label: 'Overvoltage' },
      ],
    },
    details: {
      overview: 'I used Zener diodes to detect the voltage conditions and NPN and PNP transistor switching to control the load. I simulated the circuit in Proteus before testing the fabricated PCB.',
      highlights: [
        'The readings are three observed test points.',
        'The intended response outside the operating range is to disconnect the load automatically.',
      ],
    },
  },
  {
    id: 'greensync',
    title: 'GreenSync',
    year: '2026',
    category: 'IoT & Embedded',
    description: 'An ESP32-based system for greenhouse monitoring and control.',
    contribution: 'Worked on a greenhouse system that connects sensors and control through an ESP32.',
    technologies: ['ESP32', 'Sensor integration', 'IoT'],
    evidence: {
      label: 'System overview',
      steps: ['Sensors', 'ESP32', 'Monitor & control'],
    },
    details: {
      overview: 'GreenSync uses an ESP32 to connect greenhouse sensors to an IoT monitoring and control system. The project explores bringing environmental sensing and control into a single embedded system.',
    },
  },
  {
    id: 'moodtune',
    title: 'MoodTune',
    year: '2026',
    category: 'Software',
    specialty: 'Recommendation systems',
    description: 'Recommends songs using a mood classifier and ranks them by preferences and activity.',
    technologies: ['React', 'Flask', 'Firebase', 'Scikit-learn', 'Tailwind CSS'],
    github: 'https://github.com/Khin-123/MoodTune',
    demo: 'https://mood-tune-liart.vercel.app/',
    details: {
      overview: 'MoodTune offers Match My Mood and Make Me Feel Better modes. The mood and mode set the target song mood. Optional activity and genre preferences refine the rankings.',
      highlights: [
        'A logistic regression model assigns mood labels from Spotify audio features.',
        'A Flask API serves recommendations to a React frontend with Firebase authentication.',
      ],
    },
  },
  {
    id: 'tunewave',
    title: 'TuneWave',
    year: '2026',
    category: 'Software',
    specialty: 'Digital signal processing',
    description: 'Separates vocals from backing tracks and reduces background noise in speech.',
    technologies: ['Python', 'DSP', 'Open-Unmix', 'PyTorch', 'Flask', 'React'],
    github: 'https://github.com/Khin-123/TuneWave',
    evidence: {
      label: 'Speech enhancement sample',
      audio: [
        { src: '/projects/tunewave-speech-before.wav', label: 'Before · Speech with added noise' },
        { src: '/projects/tunewave-speech-after.wav', label: 'After · TuneWave output' },
      ],
      caption: 'Both clips use the same synthetic speech. TuneWave processed the second clip with its classical DSP algorithm.',
    },
    details: {
      overview: 'TuneWave uses Open-Unmix for vocal estimates and reconstructs vocals and instrumentals with Wiener filtering. The speech path uses an STFT, spectral subtraction, a Wiener post-filter, and an inverse STFT.',
    },
  },
  {
    id: 'drug-concentration-in-blood',
    title: 'Drug Concentration in Blood',
    year: '2026',
    category: 'Software',
    specialty: 'Mathematical modeling',
    description: 'An educational simulator that plots plasma concentration over time for oral and IV inputs.',
    technologies: ['Python', 'SciPy', 'Flask', 'NumPy', 'Matplotlib', 'LTI systems'],
    github: 'https://github.com/Khin-123/Drug-Concentration-in-Blood',
    evidence: {
      label: 'Sample concentration plot',
      image: {
        src: '/projects/concentration-example.png',
        width: 846,
        height: 470,
        alt: 'Over 16 hours, the oral curve rises to three peaks after discrete inputs. The continuous IV curve rises gradually and levels off.',
      },
      caption: 'Simulator output for a fictitious compound. The model assumes a 20 L distribution volume, absorption of 1 h⁻¹, elimination of 0.25 h⁻¹, and 100% oral bioavailability. It compares three 30 mg oral inputs 4 hours apart with a continuous 7.5 mg/h infusion. The horizontal guides are arbitrary simulation bounds.',
    },
    details: {
      overview: 'The simulator uses continuous-time transfer functions to model absorption and elimination. It compares discrete oral inputs with a constant IV infusion.',
    },
  },
  {
    id: 'neohealth',
    title: 'Neohealth',
    year: '2025',
    category: 'Software',
    specialty: 'Educational team project',
    description: 'A fuzzy-logic prototype for exploring newborn risk factors in an educational setting.',
    contribution: 'Proposed changes to the inherited-risk and combined-risk calculations in the team repository.',
    technologies: ['Python', 'Flask', 'Fuzzy logic'],
    github: 'https://github.com/yoon04/Newborn-Health-Risk-Assessment',
    details: {
      overview: 'The team built a Flask interface that combines birth factors and optional family history into an educational risk estimate.',
    },
  },
]
