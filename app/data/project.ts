import Image from 'next/image'

// Type definition for project details
export type ProjectDetail = {
  id: number                // Unique identifier for the project
  title: string            // Project title
  company?: string          // Company name
  overview: string         // Brief project overview
  mainImage: string        // Main project image path
  videoUrl?: string        // Optional video URL (Vimeo, YouTube, etc.)
  link?: string            // Live project URL
  github?: string         // Optional GitHub repository URL
  features?: {             // List of project features
    title: string         // Feature title
    description: string   // Feature description  
    image: string | string[] // Feature image(s) path
  }[]
  tag?: string
  state?: "On Going" | "Finished"
  period?: string         // Project duration
  publication?: string            // DOI of the project
}

// Project data mapping object
export const PROJECT_DATA: Record<number, ProjectDetail> = {
  7: {
    id: 7,
    title: "Ben10",
    company: "Unit Project, The University of Sydney",
    period: "Aug 2025 - Nov 2025",
    tag: "Project",
    overview: "This prototype was created as part of a project with the goal of \"simulating its functionality,\" where we were tasked with developing a science fiction-inspired prototype. Inspired by the Ben 10 watch—a transformation device from the animated series—we created a wearable system consisting of a watch and a cape. The system responds to the user's choices and movements, dynamically changing the color and lighting patterns of LEDs attached to the cape. This project explores the concept of digital clothing, where garments can adapt and transform based on the wearer's actions and intentions interactively, bringing a fantastical transformation experience into reality.",
    mainImage: "/project/7.gif",
    videoUrl: "https://player.vimeo.com/video/1139599894?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&muted=1",
    features: [
      {
        title: "Watch Part",
        description: "The watch part features a rectangular casing created with a 3D printer. It activates when the user's heart rate increases. Users can select an alien to transform into using a rotary encoder while viewing the display, and pressing the encoder triggers the transformation, causing the cape's LEDs to light up.",
        image: "/project/7-1.jpeg"
      },
      {
        title: "Cape Part",
        description: "The cape's LED color changes based on the alien selected in the watch part. The lighting patterns dynamically adapt to the user's movements through an IMU sensor and ML model integrated into the watch part, creating an interactive transformation experience.",
        image: "/project/7-2.jpg"
      },
    ],
  },
  6: {
    id: 6,
    title: "AwaseKagami",
    company: "Personal Work",
    period: "Jul 2025",
    tag: "Work",
    overview: "AwaseKagami (逢鏡) is a new communication medium that enables \"chance encounters\" even when people are far apart. The system only shows the other person when both users look into their mirrors at the same moment, creating a connection based solely on synchronicity and serendipity rather than one-way notifications or read receipts. By combining a human detection model with video communication, the device displays the other person's image only when both users simultaneously peer into their mirrors. With no audio connection, the interaction relies purely on the overlap of gazes, creating a non-verbal exchange that brings the joy of unexpected reunions into daily life and gently maintains relationships with loved ones who are far away.",
    mainImage: "/project/6-1.gif",
    features: [
      {
        title: "Motivation",
        description: "In our modern global society, physical and psychological distances are widening, leading to increased isolation. Existing communication media, with their read receipts and notifications, force one-way visibility of intentions and create a sense of obligation and surveillance. However, chance encounters bring surprise and joy without forcing expectations, offering opportunities to reconnect. We designed AwaseKagami to recreate these serendipitous moments even across great distances.",
        image: "/project/6.jpg"
      }
    ],
  },
  5: {
    id: 5,
    title: "Remora Barrette",
    company: "Internship Project at Dentsu Inc.",
    period: "Feb 2025",
    tag: "Work",
    overview: "Have you ever felt uncomfortable when store staff approach you while shopping? We created Romera Barrette, an agent designed to support shy or socially anxious individuals. Inspired by the unspoken signals of headphones and wired earphones—often used as a subtle \"do not disturb\" sign—this wearable device gently expresses a desire not to be approached. When a staff member's device comes near, the barrette softly glows, offering a warm and non-verbal way to say \"not right now.\"", 
    mainImage: "/project/5-1.gif",
    features: [
      {
        title: "Inspiration",
        description: "Inspired by how remoras attach themselves to other fish, we explored the possibility of creating a wearable accessory modeled after this behavior. We envisioned a wearable agent where the remora could serve as an intermediary, helping to communicate intentions of refusal that are difficult to express directly to others.",
        image: "/project/5-5.png"
      },
      {
        title: "Color Variation",
        description: "In order to match users' preferences and outfits, we explored various color variations to create a unique and friendly design.",
        image: "/project/5-6.png"
      },
      {
        title: "Internal Architecture",
        description: "We developed a wearable device that's small enough to be worn and cute enough to love. By turning a smartphone into a beacon and using an onboard ESP32 to detect its signal, the device reacts to nearby phones in a playful and compact way.",
        image: "/project/5-3.jpg"
      }
    ],
  },
  4: {
    id: 4,
    title: "ParaTalk",
    company: "Ishiguro Laboratory, The University of Tokyo",
    period: "Sep 2024 - Current",
    tag: "Research",
    overview: "In human–agent interactions, spoken language interfaces often pose challenges such as high cognitive load and reduced practicality in noisy environments. Semantic-Free Utterances (SFUs), which are non-verbal sounds lacking semantic content, have emerged as a promising alternative to mitigate these issues. However, existing approaches rarely tackle the key problem of generating real-time, context-aware SFU responses. We address this gap by introducing ParaTalk, a paralinguistic dialogue system that uses a large language model to interpret user verbal input and generate Paralinguistic Utterances (PUs), a specific type of SFU, in real time. The system dynamically combines emotional states (Neutral, Pleasant, Unpleasant, Activation) with intentional expressions (Affirmation, Negation, Unsure, Question, Acknowledgment) to generate appropriate responses. Through a demonstration on a mobile robot, we explore the potential of verbal and non-verbal communication and propose new guidelines for designing dialogue interfaces with agents", 
    mainImage: "/project/4-2.gif",
    features: [
      {
        title: "Concept",
        description: "ParaTalk proposes a foundational architecture that enables dialogue between verbal language (human) and non-verbal language (robot).",
        image: "/project/4.png",
      },
      {
        title: "System Flow",
        description: "The system flow of ParaTalk is as follows: The user speaks in verbal language, and the system interprets it using a large language model. The system then generates a Paralinguistic Utterance (PU) based on the emotional state and intentional expression, and the robot responds with the PUs.",
        image: "/project/4-1.png",
      },
    ],
    publication: "Hanawa, Momo, and Yoshio Ishiguro. \"ParaTalk: A Real-Time Paralinguistic Dialogue System for Human-Agent Interaction.\" 2025 IEEE Conference on Virtual Reality and 3D User Interfaces Abstracts and Workshops (VRW). IEEE, 2025.",
  },
  3: {
    id: 3,
    title: "Parkour Sim2Real",
    company: "Matsuo-Iwasawa Lab Tokyo, Showcase Team Project",
    period: "Jul 2024 - Dec 2024",
    tag: "Project",
    overview: "We used the high-performance simulation environment Isaac Gym to train a quadruped robot through reinforcement learning, enabling it to perform complex parkour-like movements. Advances in simulation have made it possible to learn such behaviors in a short time and acquire models that generalize to real-world environments. By collecting large amounts of training data quickly, we were able to develop models capable of adapting to physical settings.", 
    mainImage: "/project/3.jpeg",
    link: "https://weblab.t.u-tokyo.ac.jp/research/misc/",
    features: [
      {
        title: "Reinforcement Learning in Issac Gym",
        description: "Based on prior research, we reproduced the proposed approach in a high-performance simulation environment to train a quadruped robot using reinforcement learning, enabling it to perform complex parkour-like movements. Through this reproduction, we generated a motion model capable of traversing five types of terrain: flat, gap, hurdle, parkour, and step.",
        image: "/project/3-3.png"
      },
      {
        title: "Real-World Deployment",
        description: "The trained model was deployed on the quadruped robot Unitree Go1. We recreated the stair-like terrain from the simulation in a physical test environment and confirmed that the model's performance transfers effectively to the real world.",
        image: "/project/3-2.png"
      }
    ],
  },
  2: {
    id: 2,
    title: "Robot Acceptance in Public",
    company: "Ishiguro Laboratory, The University of Tokyo",
    period: "Apr 2024 - Mar 2025",
    tag: "Research",
    overview: "How do people accept robots they encounter in public spaces? We investigated whether visual indicators that show the relationship between a robot and its operator affect public acceptance. In our experiment, we compared three operation methods: fully autonomous robots, joystick-controlled robots, and robots on a leash. Results revealed that robots on a leash were most acceptable, especially for people who are initially uncomfortable with robots. This finding suggests that making the human-robot relationship visible is key to improving robot acceptance in public spaces.", 
    mainImage: "/project/2-2.png",
    features: [
      {
        title: "Aim",
        description: "This research explores how visual design elements that express the relationship between a robot and its operator influence people's impressions and acceptance, with a focus on individual differences in comfort levels with robots.",
        image: "/project/2-1.jpg",
      }
    ],
    publication: "Hanawa, Momo, and Yoshio Ishiguro. \"Leash as a Cue: Visual Indicators for Third-Party Acceptance Across Resistance Levels.\" 2025 IEEE International Conference on Robot & Human Interactive Communication (RO-MAN). IEEE, 2025.",
  },
  1: {
    id: 1,
    title: "Auto Wheelchair",
    company: "Nagao Laboratory, Nagoya University", 
    period: "Apr 2023 - Dec 2023",
    tag: "Project",
    overview: "As part of a project in the Nagao Laboratory at Nagoya University, I participated in the \"Tsukuba Challenge\", a technical trial for autonomous mobile robots navigating outdoor environments. In this challenge, we redeveloped a wheelchair-type robot called \"WHILL\" to autonomously traverse pedestrian paths and urban areas. My contributions included developing an iOS application for object detection and semantic segmentation, as well as controlling the WHILL's movements using ROS.",
    mainImage: "/project/1.jpg",
    features: [
      {
        title: "IOS Application Development",
        description: "An iOS app that combines YOLOv8n and BiSeNetV2 to detect delivery targets and extract drivable areas, selecting optimal approach directions with a macro F1-score of ~0.96 based on user evaluation.",
        image: "/project/1-2.png"
      },
      {
        title: "Field Experiment in Outdoor Environment",
        description: "In the \"Tsukuba Challenge 2023\", we conducted real-world testing using an actual robot. The experiment aimed to achieve autonomous navigation of a delivery robot in outdoor environments based on visual information.",
        image: "/project/1-3.jpeg"
      }
    ],
  }
}

// Helper function: Get project by ID
export const getProjectById = (id: number): ProjectDetail | undefined => {
  if (!Object.keys(PROJECT_DATA).length) {
    console.warn('PROJECT_DATA is empty');
    return undefined;
  }
  return PROJECT_DATA[id] || Object.values(PROJECT_DATA)[0];
}