import { neon } from "@neondatabase/serverless"; // Import the JSON data

export async function POST(request: Request, { userId }: { userId: string }) {
  if (!userId) {
    return Response.json({ error: "User ID is required" }, { status: 400 });
  }

  try {
    const sql = neon(`${process.env.DATABASE_URL}`);

    // const initialTasks = require("aura-tasks-data/data.json");
    const initialTasks = [
      {
        id: "1",
        tips: "Maintain eye contact, nod, and use verbal cues to show you're listening. Summarize what you've heard to ensure understanding.",
        title: "Practice Active Listening",
        points: 1000,
        category: "Social Skills",
        difficulty: "Easy",
        description:
          "Have a 15-minute conversation with someone, focusing solely on listening and understanding their perspective.",
        is_completed: false,
      },
      {
        id: "2",
        tips: "Start with a smile and a friendly greeting. Show genuine interest by asking open-ended questions about their interests or experiences.",
        title: "Initiate a Conversation with a Stranger",
        points: 2000,
        category: "Social Skills",
        difficulty: "Hard",
        description:
          "Strike up a 5-minute conversation with someone you don't know in a public setting (e.g., coffee shop, park).",
        is_completed: false,
      },
      {
        id: "3",
        tips: "Use 'I' statements to express your feelings. Focus on the specific behavior and its impact, not personal attacks.",
        title: "Practice Assertive Communication",
        points: 1500,
        category: "Social Skills",
        difficulty: "Medium",
        description:
          "Role-play a scenario where you need to assert your boundaries or needs in a respectful manner.",
        is_completed: false,
      },
      {
        id: "4",
        tips: "Pay attention to facial expressions, tone of voice, and body language. Try to interpret the emotions behind the words.",
        title: "Nonverbal Cues Observation",
        points: 1250,
        category: "Social Skills",
        difficulty: "Medium",
        description:
          "Spend 20 minutes in a public place, observing and noting nonverbal communication between people.",
        is_completed: false,
      },
      {
        id: "5",
        tips: "Be genuine in your compliments. Focus on specific actions or qualities rather than general statements.",
        title: "Compliment Challenge",
        points: 1000,
        category: "Social Skills",
        difficulty: "Easy",
        description:
          "Give three genuine, specific compliments to different people throughout the day.",
        is_completed: false,
      },
      {
        id: "6",
        tips: "Identify the emotion, its intensity, and any physical sensations. Consider what triggered it and how you responded.",
        title: "Emotion Journaling",
        points: 1000,
        category: "Emotional Intelligence",
        difficulty: "Easy",
        description:
          "Spend 15 minutes journaling about a recent emotional experience, analyzing your feelings and reactions.",
        is_completed: false,
      },
      {
        id: "7",
        tips: "Take deep breaths, count to ten, or use a calming phrase. Identify your triggers and practice responding calmly.",
        title: "Emotional Regulation Technique",
        points: 1250,
        category: "Emotional Intelligence",
        difficulty: "Medium",
        description:
          "Learn and practice a technique for managing strong emotions, such as deep breathing or progressive muscle relaxation.",
        is_completed: false,
      },
      {
        id: "8",
        tips: "Consider different perspectives and motivations. Avoid making assumptions and try to understand the context of their actions.",
        title: "Perspective-Taking Challenge",
        points: 1750,
        category: "Emotional Intelligence",
        difficulty: "Hard",
        description:
          "Choose a recent conflict and spend 20 minutes writing about it from the other person's perspective.",
        is_completed: false,
      },
      {
        id: "9",
        tips: "Be specific about the emotion and its intensity. Use 'I' statements to express how you feel without blaming others.",
        title: "Emotion Vocabulary Expansion",
        points: 1000,
        category: "Emotional Intelligence",
        difficulty: "Easy",
        description:
          "Learn and practice using 10 new words to describe emotions more precisely.",
        is_completed: false,
      },
      {
        id: "10",
        tips: "Focus on understanding their feelings without trying to fix the problem. Use phrases like 'That sounds difficult' to show empathy.",
        title: "Active Empathy Practice",
        points: 1500,
        category: "Emotional Intelligence",
        difficulty: "Medium",
        description:
          "Have a 15-minute conversation with someone about a challenge they're facing, focusing on empathetic listening.",
        is_completed: false,
      },
      {
        id: "11",
        tips: "Stand tall, make eye contact, and speak clearly. Practice your smile and handshake. Remember to breathe deeply to stay calm.",
        title: "Power Pose Practice",
        points: 1000,
        category: "Confidence Building",
        difficulty: "Easy",
        description:
          "Spend 10 minutes practicing confident body language in front of a mirror, including power poses and facial expressions.",
        is_completed: false,
      },
      {
        id: "12",
        tips: "Focus on your strengths and past successes. Use positive self-talk and visualize yourself succeeding in the situation.",
        title: "Confidence Boosting Visualization",
        points: 1000,
        category: "Confidence Building",
        difficulty: "Easy",
        description:
          "Spend 15 minutes visualizing yourself confidently handling an upcoming challenging situation.",
        is_completed: false,
      },
      {
        id: "13",
        tips: "Start with small, achievable goals. Celebrate each accomplishment, no matter how small. Gradually increase the challenge.",
        title: "Confidence-Building Challenge",
        points: 1500,
        category: "Confidence Building",
        difficulty: "Medium",
        description:
          "Set and complete three small, confidence-building tasks throughout the day.",
        is_completed: false,
      },
      {
        id: "14",
        tips: "Be specific about your strengths and achievements. Practice delivering it with confidence and enthusiasm.",
        title: "Personal Elevator Pitch",
        points: 1250,
        category: "Confidence Building",
        difficulty: "Medium",
        description:
          "Create and practice a 30-second elevator pitch about yourself, highlighting your strengths and unique qualities.",
        is_completed: false,
      },
      {
        id: "15",
        tips: "Choose affirming statements that resonate with you. Repeat them with conviction and visualize them as true.",
        title: "Positive Affirmations Practice",
        points: 1000,
        category: "Confidence Building",
        difficulty: "Easy",
        description:
          "Spend 10 minutes reciting and internalizing positive affirmations to boost self-confidence.",
        is_completed: false,
      },
      {
        id: "16",
        tips: "Find a quiet space, sit comfortably, and focus on your breath. If your mind wanders, gently bring it back to your breathing without judgment.",
        title: "Mindful Breathing Exercise",
        points: 1000,
        category: "Mindfulness and Well-being",
        difficulty: "Easy",
        description:
          "Complete a 15-minute mindful breathing exercise, focusing on your breath and body sensations.",
        is_completed: false,
      },
      {
        id: "17",
        tips: "Choose a simple object like a raisin or a small stone. Examine it using all your senses, as if you're encountering it for the first time.",
        title: "Mindful Object Observation",
        points: 1000,
        category: "Mindfulness and Well-being",
        difficulty: "Easy",
        description:
          "Practice a 10-minute mindfulness exercise focusing on observing an everyday object using all your senses.",
        is_completed: false,
      },
      {
        id: "18",
        tips: "Focus on the physical sensations of walking, such as your feet touching the ground. Notice your surroundings without getting lost in thought.",
        title: "Mindful Walking",
        points: 1250,
        category: "Mindfulness and Well-being",
        difficulty: "Medium",
        description:
          "Take a 20-minute mindful walk, paying close attention to each step and your surroundings.",
        is_completed: false,
      },
      {
        id: "19",
        tips: "Start with a body scan from head to toe. Notice areas of tension and try to relax them. Focus on the present moment.",
        title: "Progressive Muscle Relaxation",
        points: 1000,
        category: "Mindfulness and Well-being",
        difficulty: "Easy",
        description:
          "Practice progressive muscle relaxation for 15 minutes, tensing and relaxing each muscle group.",
        is_completed: false,
      },
      {
        id: "20",
        tips: "Choose a piece of instrumental music. Focus on individual instruments, rhythm, and how the music makes you feel.",
        title: "Mindful Music Listening",
        points: 1000,
        category: "Mindfulness and Well-being",
        difficulty: "Easy",
        description:
          "Spend 15 minutes practicing mindful listening with a piece of music, focusing on every detail you can perceive.",
        is_completed: false,
      },
      {
        id: "21",
        tips: "Don't judge your ideas, just let them flow. Aim for quantity over quality. You can refine and combine ideas later.",
        title: "Rapid Idea Generation",
        points: 1500,
        category: "Creativity and Innovation",
        difficulty: "Medium",
        description:
          "Spend 20 minutes brainstorming as many ideas as possible for solving a common everyday problem.",
        is_completed: false,
      },
      {
        id: "22",
        tips: "Combine unrelated objects or concepts. Think about how they might work together or create something new.",
        title: "Random Word Association",
        points: 1250,
        category: "Creativity and Innovation",
        difficulty: "Medium",
        description:
          "Use a random word generator and spend 15 minutes creating connections between unrelated words to spark new ideas.",
        is_completed: false,
      },
      {
        id: "23",
        tips: "Start with simple shapes and progress to more complex objects. Focus on observing and reproducing what you see, not what you think you see.",
        title: "Blind Contour Drawing",
        points: 1000,
        category: "Creativity and Innovation",
        difficulty: "Easy",
        description:
          "Spend 10 minutes doing blind contour drawings of objects around you without looking at your paper.",
        is_completed: false,
      },
      {
        id: "24",
        tips: "Think of unusual combinations or uses for everyday objects. Challenge assumptions about how things typically function.",
        title: "Alternate Uses Challenge",
        points: 1750,
        category: "Creativity and Innovation",
        difficulty: "Hard",
        description:
          "Spend 25 minutes coming up with 20 unconventional uses for a common household item.",
        is_completed: false,
      },
      {
        id: "25",
        tips: "Use all your senses to imagine the scene. Be as detailed as possible in your descriptions.",
        title: "Sensory Imagination Exercise",
        points: 1250,
        category: "Creativity and Innovation",
        difficulty: "Medium",
        description:
          "Spend 15 minutes writing a vivid description of an imaginary place, focusing on sensory details.",
        is_completed: false,
      },
      {
        id: "26",
        tips: "Break your task into smaller, manageable chunks. Eliminate distractions and set a timer for focused work periods.",
        title: "Pomodoro Technique",
        points: 1250,
        category: "Time Management and Productivity",
        difficulty: "Medium",
        description:
          "Complete two 25-minute focused work sessions using the Pomodoro Technique, with a 5-minute break in between.",
        is_completed: false,
      },
      {
        id: "27",
        tips: "Be realistic about how long tasks take. Include buffer time between activities. Prioritize tasks based on importance and urgency.",
        title: "Daily Schedule Creation",
        points: 1000,
        category: "Time Management and Productivity",
        difficulty: "Easy",
        description:
          "Spend 15 minutes creating a detailed schedule for your next day, including work tasks, breaks, and personal activities.",
        is_completed: false,
      },
      {
        id: "28",
        tips: "Use categories like 'Urgent and Important', 'Important but Not Urgent', 'Urgent but Not Important', and 'Neither Urgent nor Important'.",
        title: "Eisenhower Matrix Task Sorting",
        points: 1500,
        category: "Time Management and Productivity",
        difficulty: "Medium",
        description:
          "Organize your to-do list using the Eisenhower Matrix, spending 20 minutes prioritizing your tasks.",
        is_completed: false,
      },
      {
        id: "29",
        tips: "Identify your most productive hours. Schedule your most important or challenging tasks during these peak times.",
        title: "Energy Mapping",
        points: 1250,
        category: "Time Management and Productivity",
        difficulty: "Medium",
        description:
          "Track your energy levels throughout the day for a week, then create an optimal schedule based on your peak productivity times.",
        is_completed: false,
      },
      {
        id: "30",
        tips: "Be specific about what you want to achieve. Set a clear deadline. Make sure your goal is challenging but attainable.",
        title: "SMART Goal Setting",
        points: 1000,
        category: "Time Management and Productivity",
        difficulty: "Easy",
        description:
          "Spend 15 minutes setting three SMART goals (Specific, Measurable, Achievable, Relevant, Time-bound) for the upcoming week.",
        is_completed: false,
      },
      {
        id: "31",
        tips: "Use open-ended questions to encourage detailed responses. Show interest in their answers and ask follow-up questions.",
        title: "Conversation Starter Challenge",
        points: 1000,
        category: "Social Skills",
        difficulty: "Easy",
        description:
          "Initiate three conversations using engaging opening questions and maintain them for at least 5 minutes each.",
        is_completed: false,
      },
      {
        id: "32",
        tips: "Pay attention to your tone, volume, and pace. Practice speaking clearly and confidently.",
        title: "Voice Modulation Exercise",
        points: 1250,
        category: "Social Skills",
        difficulty: "Medium",
        description:
          "Record yourself speaking for 5 minutes, then analyze and practice improving your vocal delivery.",
        is_completed: false,
      },
      {
        id: "33",
        tips: "Focus on finding common interests and experiences. Use active listening to build rapport.",
        title: "Networking Mini-Challenge",
        points: 1500,
        category: "Social Skills",
        difficulty: "Medium",
        description:
          "Attend a social or professional event and make three new connections, exchanging contact information.",
        is_completed: false,
      },
      {
        id: "34",
        tips: "Practice summarizing what you've learned in your own words. This helps reinforce your understanding and retention.",
        title: "Summarize a Learning Experience",
        points: 1000,
        category: "Social Skills",
        difficulty: "Easy",
        description:
          "After attending a workshop or reading an article, spend 15 minutes summarizing the key points in your own words.",
        is_completed: false,
      },
      {
        id: "35",
        tips: "Use humor appropriately to lighten the mood. Be mindful of timing and context. Avoid offensive or controversial jokes.",
        title: "Humor in Conversation",
        points: 1250,
        category: "Social Skills",
        difficulty: "Medium",
        description:
          "Practice incorporating light humor into a 15-minute conversation to create a positive atmosphere.",
        is_completed: false,
      },
      {
        id: "36",
        tips: "Identify your emotional triggers and practice self-awareness. Reflect on how you can respond differently next time.",
        title: "Trigger Reflection Exercise",
        points: 1500,
        category: "Emotional Intelligence",
        difficulty: "Medium",
        description:
          "Spend 20 minutes reflecting on a recent emotional trigger and how you can manage your response in the future.",
        is_completed: false,
      },
      {
        id: "37",
        tips: "Practice gratitude by writing down three things you're thankful for each day. Reflect on why they matter to you.",
        title: "Daily Gratitude Practice",
        points: 1000,
        category: "Emotional Intelligence",
        difficulty: "Easy",
        description:
          "Spend 10 minutes each day for a week writing in a gratitude journal.",
        is_completed: false,
      },
      {
        id: "38",
        tips: "Identify your core values and how they influence your emotions. Consider how your emotions align with or conflict with these values.",
        title: "Values and Emotions Reflection",
        points: 1250,
        category: "Emotional Intelligence",
        difficulty: "Medium",
        description:
          "Spend 20 minutes reflecting on how your personal values influence your emotional responses to different situations.",
        is_completed: false,
      },
      {
        id: "39",
        tips: "Practice saying no in a respectful manner. Use 'I' statements to express your feelings and reasons.",
        title: "Assertive Refusal Practice",
        points: 1500,
        category: "Social Skills",
        difficulty: "Medium",
        description:
          "Role-play scenarios where you need to say no to requests that don't align with your priorities.",
        is_completed: false,
      },
      {
        id: "40",
        tips: "Spend time observing your thoughts without judgment. Acknowledge them and let them pass.",
        title: "Thought Observation Exercise",
        points: 1000,
        category: "Mindfulness and Well-being",
        difficulty: "Easy",
        description:
          "Practice observing your thoughts for 10 minutes without engaging with them.",
        is_completed: false,
      },
      {
        id: "41",
        tips: "Choose a simple task and focus on it completely. Notice your thoughts and feelings as you work.",
        title: "Mindful Task Engagement",
        points: 1000,
        category: "Mindfulness and Well-being",
        difficulty: "Easy",
        description:
          "Spend 15 minutes engaging in a simple task (like washing dishes) mindfully, focusing on the sensations involved.",
        is_completed: false,
      },
      {
        id: "42",
        tips: "Use visual aids like mind maps or diagrams to organize your thoughts and ideas creatively.",
        title: "Mind Mapping Session",
        points: 1500,
        category: "Creativity and Innovation",
        difficulty: "Medium",
        description:
          "Spend 20 minutes creating a mind map on a topic of your choice, exploring connections and ideas.",
        is_completed: false,
      },
      {
        id: "43",
        tips: "Experiment with different artistic techniques (e.g., watercolor, collage) to express your creativity.",
        title: "Artistic Exploration",
        points: 1750,
        category: "Creativity and Innovation",
        difficulty: "Hard",
        description:
          "Spend 30 minutes creating an art piece using a technique you haven't tried before.",
        is_completed: false,
      },
      {
        id: "44",
        tips: "Reflect on your daily activities and identify time-wasting habits. Consider alternatives to improve efficiency.",
        title: "Time Audit",
        points: 1250,
        category: "Time Management and Productivity",
        difficulty: "Medium",
        description:
          "Conduct a time audit for one day, tracking how you spend your time and identifying areas for improvement.",
        is_completed: false,
      },
      {
        id: "45",
        tips: "Use checklists to stay organized. Break larger tasks into smaller, manageable steps.",
        title: "Create a Task Checklist",
        points: 1000,
        category: "Time Management and Productivity",
        difficulty: "Easy",
        description:
          "Create a checklist for a project or task, breaking it down into smaller steps to track your progress.",
        is_completed: false,
      },
      {
        id: "46",
        tips: "Reflect on your accomplishments and areas for growth. Set intentions for the next week based on your reflections.",
        title: "Weekly Reflection",
        points: 1000,
        category: "Time Management and Productivity",
        difficulty: "Easy",
        description:
          "Spend 15 minutes reflecting on your week, noting successes and areas for improvement.",
        is_completed: false,
      },
      {
        id: "47",
        tips: "Identify your peak productivity times and schedule your most challenging tasks during those times.",
        title: "Optimize Your Schedule",
        points: 1250,
        category: "Time Management and Productivity",
        difficulty: "Medium",
        description:
          "Create a weekly schedule that aligns your tasks with your peak productivity hours.",
        is_completed: false,
      },
      {
        id: "48",
        tips: "Practice expressing your thoughts and feelings in a respectful manner. Use 'I' statements to communicate effectively.",
        title: "Effective Communication Practice",
        points: 1500,
        category: "Social Skills",
        difficulty: "Medium",
        description:
          "Role-play a conversation where you need to express your feelings about a sensitive topic.",
        is_completed: false,
      },
      {
        id: "49",
        tips: "Practice mindfulness by focusing on your breath. Notice how your body feels with each inhale and exhale.",
        title: "Breath Awareness Meditation",
        points: 1000,
        category: "Mindfulness and Well-being",
        difficulty: "Easy",
        description:
          "Spend 10 minutes practicing breath awareness meditation, focusing solely on your breathing.",
        is_completed: false,
      },
      {
        id: "50",
        tips: "Reflect on your emotions and how they affect your decisions. Consider how to balance emotions with rational thinking.",
        title: "Emotional Decision-Making Analysis",
        points: 1750,
        category: "Emotional Intelligence",
        difficulty: "Hard",
        description:
          "Analyze a recent important decision, examining how emotions influenced the process and outcome.",
        is_completed: false,
      },
      {
        id: "51",
        tips: "Identify your strengths and weaknesses. Reflect on how they impact your interactions with others.",
        title: "Self-Assessment Reflection",
        points: 1500,
        category: "Emotional Intelligence",
        difficulty: "Medium",
        description:
          "Spend 20 minutes assessing your strengths and weaknesses and how they affect your relationships.",
        is_completed: false,
      },
      {
        id: "52",
        tips: "Use a timer to limit distractions. Focus on a single task for a set period and take breaks afterward.",
        title: "Focused Work Session",
        points: 1000,
        category: "Time Management and Productivity",
        difficulty: "Easy",
        description:
          "Complete a focused work session for 25 minutes, followed by a 5-minute break.",
        is_completed: false,
      },
      {
        id: "53",
        tips: "Practice giving and receiving feedback. Use constructive language and focus on specific behaviors.",
        title: "Feedback Exchange",
        points: 1250,
        category: "Social Skills",
        difficulty: "Medium",
        description:
          "Engage in a feedback exchange with a peer, focusing on constructive criticism and positive reinforcement.",
        is_completed: false,
      },
      {
        id: "54",
        tips: "Reflect on a past conflict and analyze how it was resolved. Consider what you could have done differently.",
        title: "Conflict Resolution Reflection",
        points: 1500,
        category: "Social Skills",
        difficulty: "Medium",
        description:
          "Spend 15 minutes reflecting on a past conflict, analyzing your role and potential alternative actions.",
        is_completed: false,
      },
      {
        id: "55",
        tips: "Use visualization techniques to enhance your performance. Imagine yourself succeeding in a specific situation.",
        title: "Visualization for Success",
        points: 1000,
        category: "Confidence Building",
        difficulty: "Easy",
        description:
          "Spend 10 minutes visualizing yourself successfully completing a challenging task or event.",
        is_completed: false,
      },
      {
        id: "56",
        tips: "Identify your personal triggers and practice self-regulation techniques to manage your responses.",
        title: "Trigger Management Practice",
        points: 1500,
        category: "Emotional Intelligence",
        difficulty: "Medium",
        description:
          "Spend 20 minutes identifying personal triggers and brainstorming strategies to manage your reactions.",
        is_completed: false,
      },
      {
        id: "57",
        tips: "Engage in a creative activity that allows for self-expression, such as painting, writing, or music.",
        title: "Creative Expression Activity",
        points: 1750,
        category: "Creativity and Innovation",
        difficulty: "Hard",
        description:
          "Spend 30 minutes engaging in a creative activity of your choice to express your thoughts and feelings.",
        is_completed: false,
      },
      {
        id: "58",
        tips: "Practice gratitude by acknowledging the positive aspects of your life. Share your gratitude with someone else.",
        title: "Gratitude Sharing",
        points: 1000,
        category: "Mindfulness and Well-being",
        difficulty: "Easy",
        description:
          "Spend 15 minutes writing a note of gratitude to someone who has positively impacted your life.",
        is_completed: false,
      },
      {
        id: "59",
        tips: "Identify your long-term goals and break them down into smaller, actionable steps.",
        title: "Goal Breakdown Exercise",
        points: 1250,
        category: "Time Management and Productivity",
        difficulty: "Medium",
        description:
          "Spend 20 minutes breaking down a long-term goal into smaller, manageable tasks.",
        is_completed: false,
      },
      {
        id: "60",
        tips: "Practice expressing your emotions in a healthy way. Use art, writing, or conversation to communicate your feelings.",
        title: "Emotional Expression Exercise",
        points: 1500,
        category: "Emotional Intelligence",
        difficulty: "Medium",
        description:
          "Spend 30 minutes expressing your emotions through a creative outlet of your choice.",
        is_completed: false,
      },
      {
        id: "61",
        tips: "Reflect on your daily interactions and identify areas where you can improve your communication skills.",
        title: "Communication Reflection",
        points: 1000,
        category: "Social Skills",
        difficulty: "Easy",
        description:
          "Spend 15 minutes reflecting on your communication style and how it impacts your relationships.",
        is_completed: false,
      },
      {
        id: "62",
        tips: "Practice mindful eating by focusing on the taste, texture, and aroma of your food.",
        title: "Mindful Eating Exercise",
        points: 1000,
        category: "Mindfulness and Well-being",
        difficulty: "Easy",
        description:
          "Spend one meal practicing mindful eating, paying attention to each bite and savoring the experience.",
        is_completed: false,
      },
      {
        id: "63",
        tips: "Engage in a physical activity that you enjoy. Focus on the sensations in your body as you move.",
        title: "Mindful Movement",
        points: 1000,
        category: "Mindfulness and Well-being",
        difficulty: "Easy",
        description:
          "Spend 20 minutes engaging in a physical activity (like yoga or dancing) while practicing mindfulness.",
        is_completed: false,
      },
      {
        id: "64",
        tips: "Identify a problem you want to solve and brainstorm potential solutions without judgment.",
        title: "Problem-Solving Brainstorm",
        points: 1500,
        category: "Creativity and Innovation",
        difficulty: "Medium",
        description:
          "Spend 20 minutes brainstorming solutions to a specific problem in your life or community.",
        is_completed: false,
      },
      {
        id: "65",
        tips: "Explore different perspectives on a topic by discussing it with someone who has a different viewpoint.",
        title: "Perspective Exchange",
        points: 1250,
        category: "Social Skills",
        difficulty: "Medium",
        description:
          "Engage in a conversation with someone who holds a different opinion on a topic and explore their perspective.",
        is_completed: false,
      },
      {
        id: "66",
        tips: "Reflect on your daily habits and identify one that you would like to change for the better.",
        title: "Habit Reflection",
        points: 1000,
        category: "Time Management and Productivity",
        difficulty: "Easy",
        description:
          "Spend 15 minutes reflecting on a daily habit you'd like to improve and brainstorm strategies for change.",
        is_completed: false,
      },
      {
        id: "67",
        tips: "Identify a fear or limiting belief that holds you back and write down steps to overcome it.",
        title: "Fear Confrontation Exercise",
        points: 1500,
        category: "Confidence Building",
        difficulty: "Medium",
        description:
          "Spend 20 minutes identifying a fear and creating a plan to confront and overcome it.",
        is_completed: false,
      },
      {
        id: "68",
        tips: "Use a gratitude jar to collect notes of appreciation. Reflect on them regularly to boost your mood.",
        title: "Gratitude Jar Creation",
        points: 1000,
        category: "Mindfulness and Well-being",
        difficulty: "Easy",
        description:
          "Create a gratitude jar and write down three things you're grateful for each day to add to it.",
        is_completed: false,
      },
      {
        id: "69",
        tips: "Practice saying affirmations in front of a mirror. Focus on positive statements about yourself.",
        title: "Mirror Affirmation Practice",
        points: 1000,
        category: "Confidence Building",
        difficulty: "Easy",
        description:
          "Spend 10 minutes reciting positive affirmations in front of a mirror to boost your self-esteem.",
        is_completed: false,
      },
      {
        id: "70",
        tips: "Create a vision board that represents your goals and aspirations. Use images and words that inspire you.",
        title: "Vision Board Creation",
        points: 1500,
        category: "Creativity and Innovation",
        difficulty: "Medium",
        description:
          "Spend 30 minutes creating a vision board that visually represents your goals and dreams.",
        is_completed: false,
      },
      {
        id: "71",
        tips: "Identify your peak productivity hours and schedule your most important tasks during those times.",
        title: "Productivity Hour Analysis",
        points: 1250,
        category: "Time Management and Productivity",
        difficulty: "Medium",
        description:
          "Track your productivity levels throughout the week and identify your peak hours for focus.",
        is_completed: false,
      },
      {
        id: "72",
        tips: "Practice deep breathing exercises to calm your mind and body. Use them before stressful situations.",
        title: "Deep Breathing Practice",
        points: 1000,
        category: "Mindfulness and Well-being",
        difficulty: "Easy",
        description:
          "Spend 10 minutes practicing deep breathing exercises to promote relaxation.",
        is_completed: false,
      },
      {
        id: "73",
        tips: "Identify a skill you want to learn and create a plan for how to acquire it, including resources and timelines.",
        title: "Skill Development Plan",
        points: 1500,
        category: "Creativity and Innovation",
        difficulty: "Medium",
        description:
          "Spend 20 minutes creating a plan to learn a new skill, outlining steps and resources needed.",
        is_completed: false,
      },
      {
        id: "74",
        tips: "Engage in a physical activity that you enjoy. Focus on the sensations in your body as you move.",
        title: "Mindful Exercise",
        points: 1250,
        category: "Mindfulness and Well-being",
        difficulty: "Medium",
        description:
          "Participate in a 30-minute exercise session, focusing on being present in your body and movements.",
        is_completed: false,
      },
      {
        id: "75",
        tips: "Focus on the person speaking, maintain eye contact, and ask clarifying questions to ensure understanding.",
        title: "Active Listening Challenge",
        points: 1000,
        category: "Social Skills",
        difficulty: "Easy",
        description:
          "Practice active listening in a 15-minute conversation, focusing solely on understanding the other person.",
        is_completed: false,
      },
      {
        id: "76",
        tips: "Identify your emotional responses to different situations and reflect on their origins and impacts.",
        title: "Emotional Awareness Journal",
        points: 1250,
        category: "Emotional Intelligence",
        difficulty: "Medium",
        description:
          "Keep an emotional awareness journal for a week, noting your emotions and their triggers daily.",
        is_completed: false,
      },
      {
        id: "77",
        tips: "Choose a topic you're passionate about and practice explaining it clearly and concisely.",
        title: "Elevator Pitch Practice",
        points: 1500,
        category: "Confidence Building",
        difficulty: "Medium",
        description:
          "Develop and practice a 30-second elevator pitch on a topic of your choice.",
        is_completed: false,
      },
      {
        id: "78",
        tips: "Focus on the present moment, observing your thoughts and feelings without judgment.",
        title: "Mindfulness Meditation",
        points: 1000,
        category: "Mindfulness and Well-being",
        difficulty: "Easy",
        description:
          "Practice a 15-minute mindfulness meditation session, focusing on your breath and present sensations.",
        is_completed: false,
      },
      {
        id: "79",
        tips: "Combine two unrelated objects or ideas to create something new and innovative.",
        title: "Creative Fusion Exercise",
        points: 1750,
        category: "Creativity and Innovation",
        difficulty: "Hard",
        description:
          "Spend 30 minutes creating a new product or concept by combining two unrelated items or ideas.",
        is_completed: false,
      },
      {
        id: "80",
        tips: "Identify tasks that can be grouped together and schedule them in blocks to increase efficiency.",
        title: "Task Batching",
        points: 1250,
        category: "Time Management and Productivity",
        difficulty: "Medium",
        description:
          "Organize your to-do list into batches of similar tasks and create a schedule to complete them efficiently.",
        is_completed: false,
      },
      {
        id: "81",
        tips: "Practice expressing disagreement respectfully, using 'I' statements and focusing on the issue, not the person.",
        title: "Respectful Disagreement Practice",
        points: 1500,
        category: "Social Skills",
        difficulty: "Medium",
        description:
          "Role-play a scenario where you disagree with someone, focusing on expressing your view respectfully.",
        is_completed: false,
      },
      {
        id: "82",
        tips: "Reflect on how your emotions affect your decision-making and brainstorm strategies for more balanced choices.",
        title: "Emotional Decision-Making Analysis",
        points: 1750,
        category: "Emotional Intelligence",
        difficulty: "Hard",
        description:
          "Analyze a recent decision influenced by emotions and create a plan for more balanced future decisions.",
        is_completed: false,
      },
      {
        id: "83",
        tips: "Identify a personal strength and think of ways to use it more effectively in your daily life.",
        title: "Strength Utilization Plan",
        points: 1250,
        category: "Confidence Building",
        difficulty: "Medium",
        description:
          "Create a plan to leverage one of your personal strengths more effectively in various aspects of your life.",
        is_completed: false,
      },
      {
        id: "84",
        tips: "Take a familiar route but focus on noticing new details in your surroundings.",
        title: "Mindful Observation Walk",
        points: 1000,
        category: "Mindfulness and Well-being",
        difficulty: "Easy",
        description:
          "Take a 20-minute walk, focusing on observing new details in your familiar surroundings.",
        is_completed: false,
      },
      {
        id: "85",
        tips: "Use random words or images as prompts to spark new ideas and connections.",
        title: "Random Inspiration Challenge",
        points: 1500,
        category: "Creativity and Innovation",
        difficulty: "Medium",
        description:
          "Use three random words as inspiration to create a short story or sketch in 20 minutes.",
        is_completed: false,
      },
      {
        id: "86",
        tips: "Identify and eliminate or delegate tasks that don't align with your goals or values.",
        title: "Priority Alignment Check",
        points: 1250,
        category: "Time Management and Productivity",
        difficulty: "Medium",
        description:
          "Review your weekly tasks and eliminate or delegate those that don't align with your priorities.",
        is_completed: false,
      },
      {
        id: "87",
        tips: "Practice introducing yourself confidently, making eye contact, and showing genuine interest in others.",
        title: "Networking Introduction Practice",
        points: 1000,
        category: "Social Skills",
        difficulty: "Easy",
        description:
          "Practice your networking introduction with three different people, focusing on making a strong first impression.",
        is_completed: false,
      },
      {
        id: "88",
        tips: "Identify situations where you tend to react emotionally and practice pausing before responding.",
        title: "Emotional Pause Practice",
        points: 1500,
        category: "Emotional Intelligence",
        difficulty: "Medium",
        description:
          "Practice taking a mindful pause before responding in emotionally charged situations for one day.",
        is_completed: false,
      },
      {
        id: "89",
        tips: "Identify a small challenge and commit to completing it, focusing on building your self-confidence.",
        title: "Confidence-Building Challenge",
        points: 1250,
        category: "Confidence Building",
        difficulty: "Medium",
        description:
          "Set and complete a small personal challenge that pushes you slightly out of your comfort zone.",
        is_completed: false,
      },
      {
        id: "90",
        tips: "Focus on the sensations of your body and breath, letting thoughts pass without engaging with them.",
        title: "Body Scan Meditation",
        points: 1000,
        category: "Mindfulness and Well-being",
        difficulty: "Easy",
        description:
          "Practice a 15-minute body scan meditation, focusing on each part of your body in turn.",
        is_completed: false,
      },
      {
        id: "91",
        tips: "Look at everyday objects from new angles or perspectives to inspire creative thinking.",
        title: "Perspective Shift Drawing",
        points: 1250,
        category: "Creativity and Innovation",
        difficulty: "Medium",
        description:
          "Spend 20 minutes drawing everyday objects from unusual angles or perspectives.",
        is_completed: false,
      },
      {
        id: "92",
        tips: "Identify your most common time-wasters and create strategies to minimize or eliminate them.",
        title: "Time-Waster Elimination",
        points: 1500,
        category: "Time Management and Productivity",
        difficulty: "Medium",
        description:
          "Analyze your daily routine, identify three major time-wasters, and create a plan to address them.",
        is_completed: false,
      },
      {
        id: "93",
        tips: "Practice giving specific, actionable feedback that focuses on behavior rather than personality.",
        title: "Constructive Feedback Practice",
        points: 1750,
        category: "Social Skills",
        difficulty: "Hard",
        description:
          "Provide constructive feedback to a peer or colleague on a recent project or interaction.",
        is_completed: false,
      },
      {
        id: "94",
        tips: "Reflect on how different emotions affect your body and mind, and practice recognizing these signs.",
        title: "Emotion-Body Connection Mapping",
        points: 1500,
        category: "Emotional Intelligence",
        difficulty: "Medium",
        description:
          "Create a map of how different emotions manifest in your body and mind.",
        is_completed: false,
      },
      {
        id: "95",
        tips: "Identify negative self-talk patterns and practice replacing them with more positive, realistic thoughts.",
        title: "Positive Self-Talk Challenge",
        points: 1250,
        category: "Confidence Building",
        difficulty: "Medium",
        description:
          "Monitor your self-talk for a day and practice replacing negative thoughts with positive ones.",
        is_completed: false,
      },
      {
        id: "96",
        tips: "Choose a simple, repetitive task and focus entirely on the process, staying present in the moment.",
        title: "Mindful Task Completion",
        points: 1000,
        category: "Mindfulness and Well-being",
        difficulty: "Easy",
        description:
          "Complete a routine task (like folding laundry) with full mindful attention for 15 minutes.",
        is_completed: false,
      },
      {
        id: "97",
        tips: "Use the 'SCAMPER' technique: Substitute, Combine, Adapt, Modify, Put to another use, Eliminate, Reverse.",
        title: "SCAMPER Innovation Exercise",
        points: 1750,
        category: "Creativity and Innovation",
        difficulty: "Hard",
        description:
          "Apply the SCAMPER technique to improve or reimagine an everyday object over 30 minutes.",
        is_completed: false,
      },
      {
        id: "98",
        tips: "Break larger projects into smaller, manageable tasks with specific deadlines.",
        title: "Project Breakdown Session",
        points: 1500,
        category: "Time Management and Productivity",
        difficulty: "Medium",
        description:
          "Take a large project and break it down into smaller, actionable tasks with deadlines.",
        is_completed: false,
      },
      {
        id: "99",
        tips: "Practice active listening, showing empathy, and offering support without trying to solve the problem.",
        title: "Empathetic Listening Practice",
        points: 1250,
        category: "Social Skills",
        difficulty: "Medium",
        description:
          "Have a conversation with someone about a challenge they're facing, focusing on empathetic listening.",
        is_completed: false,
      },
      {
        id: "100",
        tips: "Identify situations where you feel strong emotions and practice techniques to regulate your response.",
        title: "Emotion Regulation Strategies",
        points: 1500,
        category: "Emotional Intelligence",
        difficulty: "Medium",
        description:
          "Develop and practice three strategies for regulating your emotions in challenging situations.",
        is_completed: false,
      },
    ];

    const tasksJson = JSON.stringify(initialTasks);

    const insertedTasks = await sql`
      INSERT INTO aura_tasks (user_id, tasks)
      VALUES (${userId}, ${tasksJson})
      RETURNING *
    `;

    return Response.json({ data: insertedTasks }, { status: 201 });
  } catch (error) {
    console.error("Error creating initial tasks:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
