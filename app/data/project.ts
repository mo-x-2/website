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
  publication?: string   // DOI of the project
  collaborators?: string        // Contributors (comma-separated names, e.g. "Name1, Name2, Name3")
}

// Project data mapping object
export const PROJECT_DATA: Record<number, ProjectDetail> = {
  8: {
    id: 8,
    title: "RecallMe",
    company: "Ishiguro Laboratory, The University of Tokyo",
    period: "Oct 2025 - Current",
    tag: "Research",
    collaborators: "Yoshio Ishiguro",
    overview: "RecallMe is a research project exploring self-reflection through dialogue with a \"past self\" using a rotary telephone as a ritualistic interface. While interacting with generative AI clones often induces cognitive dissonance or an \"uncanny valley\" effect, this project leverages the historical and cultural affordance of the telephone—connecting with someone absent—to create a dedicated space for introspection. By using a physical rotary phone, the system frames the dialogue as a meaningful ritual, mitigating technological discomfort and supporting the reconstruction of personal narratives.",
    mainImage: "/project/8.jpg",
    features: [
      {
        title: "Interaction",
        description: "The interaction is a four-phase ritual designed for deep immersion. It begins as the user lifts the receiver and dials, transitioning from the mundane into a reflective state. Guided by an AI operator, the user engages in a dialogue with a voice-cloned version of their past self. This setup enables users to confront past conflicts from a matured, present-day perspective, reframing their personal narratives before concluding the experience by physically hanging up.",
        image: "/project/8-1.png"
      },
      {
        title: "System",
        description: "The system integrates a vintage Model 800 rotary telephone with a generative AI pipeline. An internal ESP32 microcontroller monitors the hook and pulse dial signals, triggering the software sequence on a host PC. The audio pipeline utilizes the Whisper API for transcription, an LLM for character construction, and ElevenLabs for voice cloning. To enhance realism, the voice is pitch-adjusted based on the user's age, ensuring it resonates naturally through the handset’s acoustic characteristics",
        image: "/project/8-3.png"
      },
      {
        title: "Motivation",
        description: "My habit of letter writing has always felt like a way of encountering my past and future selves, evoking a complex mix of pain and joy. While traditional media allow us to leave traces across time, they remain one-directional. I wanted to transcend this impossibility by creating a real-time, embodied dialogue.Guided by the concept of \"dividuality\" (分人), I believe we coexist with various versions of ourselves across different timelines. This project, RecallMe, was born from a desire to facilitate deep self-reflection and healing—allowing the present self to comfort a wounded past, or a future self to soothe present anxieties. By transforming asynchronous reflection into an interactive ritual, I aim to help users reconstruct their own narratives through a direct encounter with the many versions of who they are",
        image: "/project/8-4.gif"
      },
    ],
  },
  7: {
    id: 7,
    title: "Ben10 Watch",
    company: "Unit Project, The University of Sydney",
    period: "Aug 2025 - Nov 2025",
    tag: "Project",
    collaborators: "Aleksander Petsch, Ahmed Albulushi, Heart Rateithik Gopalakrishnaraju",
    overview: "Inspired by a challenge to simulate the functionality of science fiction technology in the \"Pervasive Computing\" unit at the University of Sydney, this project involved creating a prototype of the \"Ben 10 Watch\"—a sci-fi device that allows the user to transform into various aliens at will. While existing transformation toys are often limited to replicating visual appearance, this project aimed to implement a truly \"interactive transformation\" that responds to the wearer's physiological state and physical actions. We developed a digital clothing prototype where the wearer's internal excitement and physical movements are manifested in real-time as visual changes in the garment, and successfully presented it as an interactive exhibit at a university showcase.",
    mainImage: "/project/7.gif",
    videoUrl: "https://player.vimeo.com/video/1139599894?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&muted=1",
    features: [
      {
        title: "Interaction",
        description: "The system creates an embodied \"変身\" (transformation) moment. It triggers when the heart rate sensor detects high arousal (BPM > 90), physically popping up the watch face via a servo motor. Users select an alien mode using a tactile rotary encoder, which then maps their physical 'transformation poses' to dynamic LED animations on the garment in real-time.",
        image: "/project/7.gif"
      },
      {
        title: "System",
        description: "The system integrates two ESP32 units to synchronize the transformation sequence[cite: 14, 41]. The Watch Unit serves as the primary controller: it triggers the system via a heart rate sensor, manages alien selection through a rotary encoder, and runs on-device ML inference to classify gestures from IMU data. This control data is transmitted via Bluetooth to the Mantle Unit, which dynamically updates the LED colors and lighting patterns based on the selected mode and detected movement. This architecture ensures a seamless flow from the user's physiological state to the garment's visual response.",
        image: "/project/7-3.png"
      },
      {
        title: "Showcase",
        description: "The project was presented at a showcase at the University of Sydney. Visitors interacted with the prototype, successfully performing the selection and gesture sequence to see the garment react instantly. It was especially rewarding to see the excitement of sci-fi movie fans, particularly young boys who were thrilled to see such technology brought to life.",
        image: "/project/7-4.png"
      },
    ],
  },
  6: {
    id: 6,
    title: "AwaseKagami",
    company: "Personal Work",
    period: "Jul 2025",
    tag: "Work",
    collaborators: "Saki Fujimura",
    overview: "AwaseKagami (逢鏡) is a new communication medium that enables \"chance encounters\" even when people are far apart. The system only shows the other person when both users look into their mirrors at the same moment, creating a connection based solely on synchronicity and serendipity rather than one-way notifications or read receipts. By combining a human detection model with video communication, the device displays the other person's image only when both users simultaneously peer into their mirrors. With no audio connection, the interaction relies purely on the overlap of gazes, creating a non-verbal exchange that brings the joy of unexpected reunions into daily life and gently maintains relationships with loved ones who are far away.",
    mainImage: "/project/6-1.gif",
    features: [
      {
        title: "Concept",
        description: "In our modern global society, physical and psychological distances are widening, leading to increased isolation. Existing communication media, with their read receipts and notifications, force one-way visibility of intentions and create a sense of obligation and surveillance. However, chance encounters bring surprise and joy without forcing expectations, offering opportunities to reconnect. We designed AwaseKagami to recreate these serendipitous moments even across great distances.",
        image: "/project/6-2.png"
      },
      {
        title: "System",
        description: "The system creates a synchronous connection using a Node.js server and Socket.IO to manage real-time signaling between two distributed mirrors. When the server detects exactly two active connections, it initiates a WebRTC P2P (Peer-to-Peer) pipeline to establish a direct video stream. On the client side, a TensorFlow.js-based face-detection model monitors the user's presence every 150ms. The video display is only toggled from a black screen to full-screen remote video when the local state, remote state (shared via the server), and the active WebRTC stream all confirm that both users are simultaneously peering into the mirror.",
        image: "/project/6-3.png"
      }
    ],
  },
  5: {
    id: 5,
    title: "Remora Barrette",
    company: "Internship Project at Dentsu Inc.",
    period: "Feb 2025",
    tag: "Work",
    collaborators: "Sota Aizaki, Keisuke Sasaki, Yumi Yokoe",
    overview: "Have you ever felt uncomfortable when store staff approach you while shopping? We created Remora Barrette, an agent designed to support shy or socially anxious individuals. Inspired by the unspoken signals of headphones and wired earphones—often used as a subtle \"do not disturb\" sign—this wearable device gently expresses a desire not to be approached. When a staff member's device comes near, the barrette softly glows, offering a warm and non-verbal way to say \"not right now.\"", 
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
    collaborators: "Yoshio Ishiguro",
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
    collaborators: "Hikaru Wada, Mitsuharu Fukuda, Yoshihiro Nomi",
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
    collaborators: "Satomi Tokida, Yoshio Ishiguro",
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
    collaborators: "Atsuki Akamisaka, Yoshitada Sato, Katashi Nagao",
    overview: "As part of a project in the Nagao Laboratory at Nagoya University, we participated in the \"Tsukuba Challenge\", a technical trial for autonomous mobile robots navigating outdoor environments. In this challenge, we redeveloped a wheelchair-type robot called \"WHILL\" to autonomously traverse pedestrian paths and urban areas. My contributions included developing an iOS application for object detection and semantic segmentation, as well as controlling the WHILL's movements using ROS.",
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