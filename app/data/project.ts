import Image from 'next/image'

// Type definition for project details
export type ProjectDetail = {
  id: number                // Unique identifier for the project
  title: string            // Project title
  company?: string          // Company name
  overview: string         // Brief project overview
  mainImage: string        // Main project image path
  link?: string            // Live project URL
  github?: string         // Optional GitHub repository URL
  features?: {             // List of project features
    title: string         // Feature title
    description: string   // Feature description  
    image: string | string[] // Feature image(s) path
  }[]
  tag?: string
  state: "On Going" | "Finished"
  period?: string         // Project duration
}

// Project data mapping object
export const PROJECT_DATA: Record<number, ProjectDetail> = {
  1: {
    id: 1,
    title: "Wheelchair Robot",
    company: "Nagao Laboratory, Nagoya University", 
    period: "Apr 2023 - Dec 2023",
    state: "Finished",
    tag: "Project",
    overview: "As part of a project in the Nagao Laboratory at Nagoya University, I participated in the “Tsukuba Challenge”, a technical trial for autonomous mobile robots navigating outdoor environments. In this challenge, we redeveloped a wheelchair-type robot called “WHILL” to autonomously traverse pedestrian paths and urban areas. My contributions included developing an iOS application for object detection and semantic segmentation, as well as controlling the WHILL’s movements using ROS.",
    mainImage: "/project/1.jpg",
    features: [
      {
        title: "IOS Application Development",
        description: "An iOS app that combines YOLOv8n and BiSeNetV2 to detect delivery targets and extract drivable areas, selecting optimal approach directions with a macro F1-score of ~0.96 based on user evaluation.",
        image: "/project/1-2.png"
      },
      {
        title: "Field Experiment in Outdoor Environment",
        description: "In the “Tsukuba Challenge 2023”, we conducted real-world testing using an actual robot. The experiment aimed to achieve autonomous navigation of a delivery robot in outdoor environments based on visual information.",
        image: "/project/1-3.jpeg"
      }
    ],
  },
  2: {
    id: 2,
    title: "Accompanying Robot",
    company: "Ishiguro Laboratory, The University of Tokyo",
    period: "Apr 2024 - Current",
    state: "On Going",
    tag: "Research",
    overview: "We are exploring how people perceive and accept robots they encounter in public spaces. Specifically, our ongoing work examines how visual design elements that express the relationship between an accompanying robot and its user may affect impressions, especially for those who are initially less comfortable with robots.", 
    mainImage: "/project/2.jpeg",
  },
  3: {
    id: 3,
    title: "Parkour Simulation",
    company: "Matsuo-Iwasawa Lab Tokyo",
    period: "Jul 2024 - Dec 2024",
    state: "Finished",
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
  4: {
    id: 4,
    title: "Paralinguistic Dialogue System",
    company: "Ishiguro Laboratory, The University of Tokyo",
    period: "Sep 2024 - Current",
    state: "On Going",
    tag: "Research",
    overview: "Have you ever wished you could talk to R2D2—not through words, but through sounds? While voice-based agents are becoming more common, relying solely on spoken language in human–agent interaction presents real challenges. It can be mentally demanding and often impractical in noisy or hands-free situations. To address this, we explored the potential of non-verbal communication using Semantic-Free Utterances (SFUs)—meaningless yet expressive sounds that can lighten cognitive load. In this project, we introduce ParaTalk, a paralinguistic dialogue system that interprets user speech using a large language model and responds with Paralinguistic Utterances (PUs), a type of SFU, in real time. By focusing on the balance between verbal and non-verbal expression, ParaTalk opens up new possibilities for designing more intuitive and emotionally resonant agent communication.", 
    mainImage: "/project/4-2.gif",
    features: [
      {
        title: "On Going",
        description: "We are currently building conducting a user study to evaluate the effectiveness of our proposed system.",
        image: "/project/4.png"
      }
    ],
    link: ""
  },
  5: {
    id: 5,
    title: "Remora Barrette",
    company: "Internship at Dentsu Inc.",
    period: "Dec 2025",
    state: "Finished",
    tag: "Work",
    overview: "Have you ever felt uncomfortable when store staff approach you while shopping? We created Romera Barrette, an agent designed to support shy or socially anxious individuals. Inspired by the unspoken signals of headphones and wired earphones—often used as a subtle “do not disturb” sign—this wearable device gently expresses a desire not to be approached. When a staff member’s device comes near, the barrette softly glows, offering a warm and non-verbal way to say “not right now.”", 
    mainImage: "/project/5-2.gif",
    features: [
      {
        title: "Internal Architecture",
        description: "We developed a wearable device that's small enough to be worn and cute enough to love. By turning a smartphone into a beacon and using an onboard ESP32 to detect its signal, the device reacts to nearby phones in a playful and compact way.",
        image: "/project/5-3.jpg"
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