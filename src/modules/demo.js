export const loadDemo = (user) => {
  //DEMO
  /**
   * Generates a date string in YYYY-MM-DD format relative to the current date.
   * @param {number} offsetDays - Number of days to offset from today (0 for today, 1 for tomorrow, etc.).
   * @returns {string} The formatted date string.
   */
  function getDynamicDate(offsetDays = 0) {
    const date = new Date();
    date.setDate(date.getDate() + offsetDays); // Add the offset days
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed, so add 1
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  // Ensure user model handles new projects properly if they don't exist
  // User should be initialized with 'Things ToDo' as projects[0] by default.
  // Adding projects explicitly.

  user.newProject("Daily Grind 🏋️"); // Renamed and new emoji
  user.newProject("Learn Code 💻"); // New project for Odin Project
  user.newProject("Watchlist 🍿"); // New project for media
  user.newProject("Creative 🎨"); // Existing, kept

  const projects = user.getProjects();
  const thingsToDoId = projects[0].getId(); // Default project
  const dailyGrindId = projects[1].getId(); // Updated ID variable
  const learnCodeId = projects[2].getId(); // New ID variable
  const watchlistId = projects[3].getId(); // New ID variable
  const creativeId = projects[4].getId(); // Updated ID variable

  // --- Things ToDo 📋 (Default Project) ---
  user.addToProject(
    user.newTodo(
      "Pay Utility Bills 💸",
      "Check electric, water, and internet bills. Set up autopay for next month.",
      getDynamicDate(0), // Date: Today (1/3)
      "high",
      thingsToDoId,
      null
    ),
    thingsToDoId
  );
  user.addToProject(
    user.newTodo(
      "Schedule Dentist Appointment",
      "Call Dr. Smith's office to book a cleaning for next quarter.",
      "", // No specific date
      "medium",
      thingsToDoId,
      null
    ),
    thingsToDoId
  );
  user.addToProject(
    user.newTodo(
      "Reply to Sarah's Email",
      "Regarding weekend plans and proposal feedback.",
      getDynamicDate(0), // Date: Today (2/3)
      "medium",
      thingsToDoId,
      null
    ),
    thingsToDoId
  );
  user.addToProject(
    user.newTodo(
      "Research New Recipe",
      "Look for a healthy chicken stir-fry recipe with fresh vegetables.",
      "", // No specific date
      "low",
      thingsToDoId,
      null
    ),
    thingsToDoId
  );
  user.addToProject(
    user.newTodo(
      "Update Software on PC 💻",
      "Check for pending updates for OS, browser, and antivirus software.",
      getDynamicDate(10), // Date: Future (1/3)
      "low",
      thingsToDoId,
      null
    ),
    thingsToDoId
  );

  // --- Daily Grind 🏋️ ---
  const morningRoutineTodo = user.newTodo(
    "Complete Morning Routine",
    "Ensure all morning habits are checked off.",
    getDynamicDate(0), // Date: Today (3/3)
    "high",
    dailyGrindId,
    null
  );
  user.addToProject(morningRoutineTodo, dailyGrindId);
  morningRoutineTodo.addSubTodo(
    user.newTodo(
      "Make bed",
      "",
      "",
      "low",
      dailyGrindId,
      morningRoutineTodo.getId()
    )
  );
  morningRoutineTodo.addSubTodo(
    user.newTodo(
      "Brush teeth & Floss",
      "",
      "",
      "low",
      dailyGrindId,
      morningRoutineTodo.getId()
    )
  );
  morningRoutineTodo.addSubTodo(
    user.newTodo(
      "Hydrate (2 glasses water)",
      "",
      "",
      "low",
      dailyGrindId,
      morningRoutineTodo.getId()
    )
  );
  morningRoutineTodo.addSubTodo(
    user.newTodo(
      "Quick Stretch",
      "",
      "",
      "low",
      dailyGrindId,
      morningRoutineTodo.getId()
    )
  );

  const workoutTodo = user.newTodo(
    "Evening Workout - Full Body Strength",
    "Follow the gym routine focusing on major muscle groups.",
    getDynamicDate(1), // Date: Tomorrow (1/2)
    "high",
    dailyGrindId,
    null
  );
  user.addToProject(workoutTodo, dailyGrindId);
  // Sub-todos for workout
  const squatsTodo = user.newTodo(
    "Squats",
    "3 sets of 8-10 reps. Focus on form.",
    "",
    "medium",
    dailyGrindId,
    workoutTodo.getId()
  );
  workoutTodo.addSubTodo(squatsTodo);
  squatsTodo.addSubTodo(
    user.newTodo(
      "Warm-up set (empty bar)",
      "",
      "",
      "low",
      dailyGrindId,
      squatsTodo.getId()
    )
  );
  squatsTodo.addSubTodo(
    user.newTodo(
      "Set 1: 135 lbs",
      "",
      "",
      "medium",
      dailyGrindId,
      squatsTodo.getId()
    )
  );
  squatsTodo.addSubTodo(
    user.newTodo(
      "Set 2: 155 lbs",
      "",
      "",
      "medium",
      dailyGrindId,
      squatsTodo.getId()
    )
  );
  squatsTodo.addSubTodo(
    user.newTodo(
      "Set 3: 165 lbs",
      "",
      "",
      "high",
      dailyGrindId,
      squatsTodo.getId()
    )
  );

  workoutTodo.addSubTodo(
    user.newTodo(
      "Bench Press",
      "3 sets of 8-10 reps.",
      "",
      "medium",
      dailyGrindId,
      workoutTodo.getId()
    )
  );
  workoutTodo.addSubTodo(
    user.newTodo(
      "Rows",
      "3 sets of 10-12 reps. Use incline bench.",
      "",
      "medium",
      dailyGrindId,
      workoutTodo.getId()
    )
  );
  workoutTodo.addSubTodo(
    user.newTodo(
      "Overhead Press",
      "3 sets of 8-10 reps.",
      "",
      "medium",
      dailyGrindId,
      workoutTodo.getId()
    )
  );

  user.addToProject(
    user.newTodo(
      "Plan Tomorrow's Meals",
      "Prep breakfast and lunch to save time.",
      "",
      "low",
      dailyGrindId,
      null
    ),
    dailyGrindId
  );

  // --- Learn Code 💻 (Odin Project Focus) ---
  const odinProjectTodo = user.newTodo(
    "Odin Project: JavaScript Fundamentals",
    "Work through the 'DOM Manipulation' section and complete practice exercises.",
    getDynamicDate(3), // Date: Future (2/3)
    "high",
    learnCodeId,
    null
  );
  user.addToProject(odinProjectTodo, learnCodeId);

  const domManipulationTodo = user.newTodo(
    "Read DOM Manipulation Chapter",
    "Focus on event bubbling and delegation.",
    "",
    "medium",
    learnCodeId,
    odinProjectTodo.getId()
  );
  odinProjectTodo.addSubTodo(domManipulationTodo);

  const practiceProjectTodo = user.newTodo(
    "Build Etch-A-Sketch Project",
    "Implement drawing functionality and reset button.",
    getDynamicDate(5),
    "high",
    learnCodeId,
    odinProjectTodo.getId()
  );
  odinProjectTodo.addSubTodo(practiceProjectTodo);
  practiceProjectTodo.addSubTodo(
    user.newTodo(
      "Setup HTML/CSS structure",
      "",
      "",
      "low",
      learnCodeId,
      practiceProjectTodo.getId()
    )
  );
  practiceProjectTodo.addSubTodo(
    user.newTodo(
      "Implement drawing logic (mouseover events)",
      "",
      "",
      "medium",
      learnCodeId,
      practiceProjectTodo.getId()
    )
  );
  practiceProjectTodo.addSubTodo(
    user.newTodo(
      "Add clear grid button",
      "",
      "",
      "medium",
      learnCodeId,
      practiceProjectTodo.getId()
    )
  );
  practiceProjectTodo.addSubTodo(
    user.newTodo(
      "Review Odin Project solution for comparison",
      "",
      "",
      "low",
      learnCodeId,
      practiceProjectTodo.getId()
    )
  );

  user.addToProject(
    user.newTodo(
      "Study Async JavaScript",
      "Review Promises, async/await syntax.",
      "",
      "medium",
      learnCodeId,
      null
    ),
    learnCodeId
  );
  user.addToProject(
    user.newTodo(
      "LeetCode Daily Challenge",
      "Solve today's easy/medium problem.",
      getDynamicDate(0),
      "low",
      learnCodeId,
      null
    ),
    learnCodeId
  );

  // --- Watchlist 🍿 ---
  const animeSeriesTodo = user.newTodo(
    "Start 'Frieren: Beyond Journey's End'",
    "Watch the first few episodes, heard great things!",
    getDynamicDate(1), // Date: Tomorrow (2/2)
    "medium",
    watchlistId,
    null
  );
  user.addToProject(animeSeriesTodo, watchlistId);
  animeSeriesTodo.addSubTodo(
    user.newTodo(
      "Episode 1: The End of the Journey and the Beginning",
      "",
      "",
      "low",
      watchlistId,
      animeSeriesTodo.getId()
    )
  );
  animeSeriesTodo.addSubTodo(
    user.newTodo(
      "Episode 2: It Didn't Have To Be...",
      "",
      "",
      "low",
      watchlistId,
      animeSeriesTodo.getId()
    )
  );
  animeSeriesTodo.addSubTodo(
    user.newTodo(
      "Episode 3: The True Hero's Journey",
      "",
      "",
      "low",
      watchlistId,
      animeSeriesTodo.getId()
    )
  );

  user.addToProject(
    user.newTodo(
      "Watch 'Dune: Part Two'",
      "Finally get around to seeing it on streaming service.",
      getDynamicDate(7), // Date: Future (3/3)
      "high",
      watchlistId,
      null
    ),
    watchlistId
  );

  user.addToProject(
    user.newTodo(
      "Re-watch 'Spirited Away'",
      "A classic Studio Ghibli film, always a good re-watch.",
      "",
      "low",
      watchlistId,
      null
    ),
    watchlistId
  );

  // --- Creative 🎨 (Original content with refinement) ---
  const novelWritingTodo = user.newTodo(
    "Write Novel Chapter 3 ✍️",
    "Focus on character development for Sarah. Target ~500 words.",
    "", // Removed date, main sections have dates
    "high",
    creativeId,
    null
  );
  user.addToProject(novelWritingTodo, creativeId);

  const outlineTodo = user.newTodo(
    "Outline plot points for Chapter 3",
    "Ensure major beats and character decisions are clear.",
    "",
    "medium",
    creativeId,
    novelWritingTodo.getId()
  );
  novelWritingTodo.addSubTodo(outlineTodo);
  outlineTodo.addSubTodo(
    user.newTodo(
      "Draft scene summary (1-2 sentences per section)",
      "",
      "",
      "low",
      creativeId,
      outlineTodo.getId()
    )
  );
  outlineTodo.addSubTodo(
    user.newTodo(
      "Identify key character arcs and emotional shifts for chapter",
      "",
      "",
      "medium",
      creativeId,
      outlineTodo.getId()
    )
  );

  const draftTodo = user.newTodo(
    "Draft Chapter 3 Content (~500 words)",
    "Breakdown into character development sections.",
    getDynamicDate(25), // Date: Future (This is the 3rd future date)
    "high",
    creativeId,
    novelWritingTodo.getId()
  );
  novelWritingTodo.addSubTodo(draftTodo);

  const backstoryTodo = user.newTodo(
    "Develop Sarah's backstory",
    "Focus on key formative events.",
    "", // Removed date
    "medium",
    creativeId,
    draftTodo.getId()
  );
  draftTodo.addSubTodo(backstoryTodo);
  backstoryTodo.addSubTodo(
    user.newTodo(
      "Brainstorm 3 pivotal past experiences",
      "",
      "",
      "low",
      creativeId,
      backstoryTodo.getId()
    )
  );
  backstoryTodo.addSubTodo(
    user.newTodo(
      "Draft scene or paragraph introducing her core motivation",
      "",
      "",
      "medium",
      creativeId,
      backstoryTodo.getId()
    )
  );

  const familyDynamicsTodo = user.newTodo(
    "Integrate family dynamics",
    "Show, don't just tell, relationships.",
    "",
    "medium",
    creativeId,
    draftTodo.getId()
  );
  draftTodo.addSubTodo(familyDynamicsTodo);
  familyDynamicsTodo.addSubTodo(
    user.newTodo(
      "Identify Sarah's relationship with specific family members",
      "",
      "",
      "low",
      creativeId,
      familyDynamicsTodo.getId()
    )
  );
  familyDynamicsTodo.addSubTodo(
    user.newTodo(
      "Write dialogue or interaction reflecting family impact",
      "",
      "",
      "medium",
      creativeId,
      familyDynamicsTodo.getId()
    )
  );

  const guitarPracticeTodo = user.newTodo(
    "Guitar Practice: New Song",
    "Learn 'Stairway to Heaven' solo, focusing on rhythm and lead sections.",
    "", // No specific date
    "medium",
    creativeId,
    null
  );
  user.addToProject(guitarPracticeTodo, creativeId);
  const section1GuitarTodo = user.newTodo(
    "Master Section 1 (0:00-0:30)",
    "Focus on accurate finger placement and clear notes.",
    "", // No specific date
    "high",
    creativeId,
    guitarPracticeTodo.getId()
  );
  guitarPracticeTodo.addSubTodo(section1GuitarTodo);
  section1GuitarTodo.addSubTodo(
    user.newTodo(
      "Practice scales D minor pentatonic",
      "",
      "",
      "medium",
      creativeId,
      section1GuitarTodo.getId()
    )
  );
  section1GuitarTodo.addSubTodo(
    user.newTodo(
      "Slow tempo drill (60 bpm)",
      "",
      "",
      "low",
      creativeId,
      section1GuitarTodo.getId()
    )
  );
  //End demo
};
