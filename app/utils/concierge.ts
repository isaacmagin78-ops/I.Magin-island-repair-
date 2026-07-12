interface ConciergeResponse {
  answer: string;
  category: string;
  suggestedTasks?: string[];
}

export const CONCIERGE_KNOWLEDGE_BASE: Record<string, ConciergeResponse> = {
  'renter insurance': {
    category: 'finances',
    answer:
      'Renter\'s insurance protects your belongings in the dorm from theft, fire, and other damage. It typically costs $10-20/month and covers personal property, liability, and additional living expenses. Many insurance companies offer student rates. Your college may even have a recommended provider.',
    suggestedTasks: ['Plan renter\'s insurance'],
  },
  "renter's insurance": {
    category: 'finances',
    answer:
      'Renter\'s insurance protects your belongings in the dorm from theft, fire, and other damage. It typically costs $10-20/month and covers personal property, liability, and additional living expenses. Many insurance companies offer student rates. Your college may even have a recommended provider.',
    suggestedTasks: ['Plan renter\'s insurance'],
  },
  'mattress size': {
    category: 'housing',
    answer:
      'Most college dorms use Twin XL mattresses, which are 38" wide by 80" long. This is longer than a standard twin bed but narrower than a full bed. When shopping for sheets and a mattress pad, specifically look for "Twin XL" to ensure proper fit. Some colleges have different sizes, so check with your housing office.',
    suggestedTasks: ['Measure dorm room', 'Purchase bedding for dorm'],
  },
  'roommate': {
    category: 'housing',
    answer:
      'Great question! Here are key topics to discuss with your roommate: who brings major items (fridge, microwave, rug), sleep schedules, guest policies, cleaning expectations, temperature preferences, and noise levels. Exchange contact info, maybe use a group chat, and create a roommate agreement. Most colleges provide templates. Try to get to know each other before move-in to build trust.',
    suggestedTasks: ['Coordinate with roommate'],
  },
  'prescription': {
    category: 'medical',
    answer:
      'Before college, ensure you have enough medication to last through your first term. Get prescriptions refilled and bring them in their original bottles with your name and dosage clearly labeled. Set up a relationship with your campus health center and pharmacy. Many colleges have mail-order pharmacy services. If traveling, keep medication in carry-on luggage.',
    suggestedTasks: ['Refill prescriptions', 'Find campus health center'],
  },
  'medication': {
    category: 'medical',
    answer:
      'Before college, ensure you have enough medication to last through your first term. Get prescriptions refilled and bring them in their original bottles with your name and dosage clearly labeled. Set up a relationship with your campus health center and pharmacy. Many colleges have mail-order pharmacy services. If traveling, keep medication in carry-on luggage.',
    suggestedTasks: ['Refill prescriptions', 'Find campus health center'],
  },
  'meningitis vaccine': {
    category: 'medical',
    answer:
      'Most colleges require or strongly recommend the meningitis vaccine (especially meningococcal B vaccine). This is typically given by your doctor or at a local health clinic. Check your college\'s specific requirements and get it done during your physical exam. Many students get it during their pre-college health appointment.',
    suggestedTasks: ['Schedule physical exam', 'Verify immunizations'],
  },
  'immunization': {
    category: 'medical',
    answer:
      'Colleges typically require proof of vaccinations including MMR (measles, mumps, rubella), meningitis, tetanus, and polio. Some require COVID-19 vaccination. Check your college\'s specific requirements on their website and get your records from your doctor. You\'ll need these before move-in.',
    suggestedTasks: ['Verify immunizations', 'Get health insurance card'],
  },
  'budget': {
    category: 'finances',
    answer:
      'A typical first-year student budget includes: tuition/room/board (varies widely), books ($300-500), personal supplies ($200-300), clothing ($300+), and entertainment ($200+). Beyond tuition, expect $3,000-5,000 for the year. Create a detailed budget with your family and decide together how much spending money is appropriate. Use our budget planner to track expenses.',
    suggestedTasks: ['Set college budget', 'Plan renter\'s insurance'],
  },
  'move-in day': {
    category: 'housing',
    answer:
      'Move-in day is typically during the few days before classes begin. Your housing office will assign a specific time slot. Arrive early to avoid lines. Bring essential items (bedding, toiletries, important documents) and plan to complete most moving within a few hours. Your roommate and parent can help. Leave decorating for after, and avoid parking problems by coordinating timing.',
    suggestedTasks: ['Confirm arrival date with housing', 'Pack for move-in'],
  },
  'first aid kit': {
    category: 'medical',
    answer:
      'Pack a basic dorm first-aid kit with: bandages (various sizes), pain relievers (ibuprofen, acetaminophen), cold medicine, antibiotic ointment, hydrocortisone cream, tweezers, medical tape, and a small thermometer. Add anything specific to you (allergy meds, asthma inhaler, etc.). Keep it in an accessible container. Most of these items are inexpensive and available at any drugstore.',
    suggestedTasks: ['Build first-aid kit'],
  },
  'packing': {
    category: 'packing',
    answer:
      'Pack for college by starting with essentials: important documents, prescriptions, identification. Then add: seasonal clothing, undergarments, socks, shoes, toiletries, bedding, and a few comfort items. Remember you\'ll have limited space, so be strategic. Many students ship items later in the year. Check with your college about prohibited items (candles, hot plates, etc.). Create a packing list to stay organized.',
    suggestedTasks: ['Pack for move-in'],
  },
  'technology': {
    category: 'technology',
    answer:
      'Check your major\'s specific tech requirements on the college website. Minimum needs: a laptop (check if Mac or PC preferred by your program), phone with reliable service, charging cables and a power strip. Consider a laptop stand for ergonomics. Most students also bring headphones, a webcam for Zoom classes, and a portable charger. Don\'t overbuy—you can add tech later if needed.',
    suggestedTasks: ['Check college tech requirements', 'Purchase phone plan'],
  },
  'laptop': {
    category: 'technology',
    answer:
      'For college, choose a laptop that\'s portable and meets your major\'s requirements. Most programs prefer either Mac or PC—check with your department. Budget $800-1,500. Popular options: MacBook Air, Dell XPS, or Lenovo ThinkPad. Make sure it has good battery life and can run required software. Visit the college bookstore for recommendations and potential student discounts.',
    suggestedTasks: ['Purchase laptop if needed'],
  },
  'laundry': {
    category: 'laundry',
    answer:
      'Help your student learn to do laundry before college. Key lessons: sort colors from whites, use cold water for darks, don\'t overload machines, use appropriate detergent amounts, clean the lint trap in dryers. Bring laundry detergent, stain remover, and dryer sheets. Get a collapsible hamper to save space. Some dorms have laundry rooms, others require paying per machine. Budget a small amount monthly for laundry costs.',
    suggestedTasks: ['Buy laundry supplies', 'Learn laundry basics'],
  },
  'campus safety': {
    category: 'safety',
    answer:
      'Research your college\'s safety resources: emergency alert system, campus police, emergency phones, safe escort services, and counseling. Walk the campus to identify well-lit areas. Avoid isolated spots late at night. Know the campus emergency number and location of security offices. Many colleges offer self-defense training. Share this info with family.',
    suggestedTasks: ['Research campus safety'],
  },
  'vehicle': {
    category: 'travel',
    answer:
      'If bringing a vehicle to college, ensure it\'s properly maintained: oil change, tire check, battery test. Verify auto insurance covers your college location and get proof of coverage. Register the vehicle in the state where college is located. Some colleges have limited parking or charge parking fees. Check your college\'s vehicle policies and parking permit process before arriving.',
    suggestedTasks: ['Prepare car if driving'],
  },
  'car': {
    category: 'travel',
    answer:
      'If bringing a vehicle to college, ensure it\'s properly maintained: oil change, tire check, battery test. Verify auto insurance covers your college location and get proof of coverage. Register the vehicle in the state where college is located. Some colleges have limited parking or charge parking fees. Check your college\'s vehicle policies and parking permit process before arriving.',
    suggestedTasks: ['Prepare car if driving'],
  },
  'textbook': {
    category: 'academics',
    answer:
      'Wait until the first day of class before buying textbooks—many professors have alternatives like library copies, online access codes, or make them optional. When you do buy, compare prices: college bookstore, Amazon, Chegg, ThriftBooks. Consider renting if available to save money. Some classes need books immediately, others you can borrow. Check the syllabus or ask your professor.',
    suggestedTasks: ['Get course textbooks'],
  },
  'class registration': {
    category: 'academics',
    answer:
      'Most colleges assign an orientation and registration date based on your class year. Registration happens online through your college portal. Popular classes fill quickly, so register promptly at your assigned time. Balance hard and easier classes, consider your preferred class times, and review course requirements. Talk to your academic advisor if unsure. Attend orientation first to get guidance.',
    suggestedTasks: ['Register for classes'],
  },
  'financial aid': {
    category: 'finances',
    answer:
      'Complete FAFSA (Free Application for Federal Student Aid) early, even if you think you won\'t qualify. This determines eligibility for federal loans, grants, and work-study. Many colleges also require CSS Profile. Check deadlines at your college\'s financial aid website. Keep important documents organized and respond promptly to any aid office requests. Meet with your financial aid advisor to understand your package.',
    suggestedTasks: ['Get financial aid paperwork'],
  },
  'meal plan': {
    category: 'food',
    answer:
      'Most colleges require first-year students to purchase a meal plan. Plans typically offer 7-21 meals per week plus dining dollars. Visit the college\'s dining website to see options and pricing. Start with a standard plan—you can usually adjust after first semester. Consider your eating habits and dietary restrictions. Meal plans usually cover breakfast, lunch, and dinner.',
    suggestedTasks: ['Purchase meal plan'],
  },
  'orientation': {
    category: 'academics',
    answer:
      'Orientation is typically 1-3 days of events, workshops, and social activities before classes start. You\'ll register for classes, learn campus resources, meet advisors, and connect with peers. Attendance is usually required and invaluable for finding your way around, making friends, and understanding college life. It\'s a great time to ask questions and get your bearings.',
    suggestedTasks: ['Attend orientation'],
  },
};

export function findConciergeResponse(question: string): { answer: string; category: string; suggestedTasks?: string[] } {
  const lowerQuestion = question.toLowerCase().trim();

  // Try exact match with keywords
  for (const [key, response] of Object.entries(CONCIERGE_KNOWLEDGE_BASE)) {
    if (lowerQuestion.includes(key)) {
      return response;
    }
  }

  // Categorize by keywords
  if (lowerQuestion.includes('room') || lowerQuestion.includes('dorm') || lowerQuestion.includes('housing')) {
    return {
      category: 'housing',
      answer:
        'This question relates to your housing and dorm preparation. Housing is a key part of college readiness! Check our Housing section for tasks like measuring your room, coordinating with your roommate, purchasing bedding, and confirming your move-in details. If you need specific housing advice, check your college\'s housing website or contact the housing office.',
      suggestedTasks: ['Select and confirm housing', 'Coordinate with roommate'],
    };
  }

  if (lowerQuestion.includes('medical') || lowerQuestion.includes('health') || lowerQuestion.includes('doctor')) {
    return {
      category: 'medical',
      answer:
        'This relates to your health and medical preparation. Before college, schedule a physical, verify your immunizations, and gather health records. If you take medication, refill prescriptions and build a first-aid kit. Set up a relationship with your campus health center early. Check our Medical section for a complete checklist.',
      suggestedTasks: ['Schedule physical exam', 'Find campus health center'],
    };
  }

  if (lowerQuestion.includes('money') || lowerQuestion.includes('budget') || lowerQuestion.includes('cost') || lowerQuestion.includes('pay')) {
    return {
      category: 'finances',
      answer:
        'Financial planning is essential for college. Set a realistic budget, open a student bank account, understand your financial aid, and discuss spending expectations with your student. Consider renter\'s insurance and other costs. Use our Budget Planner to track expenses. Meet with your college\'s financial aid office to understand your aid package.',
      suggestedTasks: ['Set college budget', 'Plan renter\'s insurance'],
    };
  }

  if (lowerQuestion.includes('travel') || lowerQuestion.includes('drive') || lowerQuestion.includes('flight') || lowerQuestion.includes('transport')) {
    return {
      category: 'travel',
      answer:
        'Travel planning for move-in is important. Book flights or transportation early if needed, plan your route, and if bringing a car, ensure it\'s maintained and insured. Coordinate timing with your college\'s move-in schedule. Check our Travel section for preparation tasks.',
      suggestedTasks: ['Book move-in travel', 'Plan travel to college'],
    };
  }

  if (lowerQuestion.includes('safe') || lowerQuestion.includes('security') || lowerQuestion.includes('emergency')) {
    return {
      category: 'safety',
      answer:
        'Safety is paramount. Research your college\'s safety resources, establish a regular check-in routine with your family, and share emergency contacts. Learn about campus security, well-lit areas, and emergency procedures. Discuss personal safety strategies together. Our Safety section has a complete preparation checklist.',
      suggestedTasks: ['Research campus safety', 'Establish check-in routine'],
    };
  }

  if (lowerQuestion.includes('tech') || lowerQuestion.includes('computer') || lowerQuestion.includes('laptop') || lowerQuestion.includes('phone')) {
    return {
      category: 'technology',
      answer:
        'Technology is essential for college success. Check your major\'s specific tech requirements, purchase or confirm you have a suitable laptop, ensure a reliable phone plan, and gather cables and chargers. Set up your college email and test portal access. See our Technology section for the complete tech checklist.',
      suggestedTasks: ['Check college tech requirements', 'Purchase laptop if needed'],
    };
  }

  if (lowerQuestion.includes('document') || lowerQuestion.includes('paperwork') || lowerQuestion.includes('id') || lowerQuestion.includes('record')) {
    return {
      category: 'documents',
      answer:
        'Important documents include: government ID, health insurance card, immunization records, prescription list, housing agreement, and financial aid paperwork. Start gathering these early—some take time to obtain. Keep copies organized in one place. Our Documents section has a complete tracking list.',
      suggestedTasks: ['Get financial aid paperwork', 'Create emergency contacts list'],
    };
  }

  if (lowerQuestion.includes('class') || lowerQuestion.includes('academic') || lowerQuestion.includes('course') || lowerQuestion.includes('textbook')) {
    return {
      category: 'academics',
      answer:
        'Academic preparation includes registering for classes, getting textbooks, and attending orientation. Register on your assigned date to get better course selections. Wait on textbooks until the first day. Orientation is invaluable. Check our Academics section for all preparation tasks.',
      suggestedTasks: ['Register for classes', 'Attend orientation'],
    };
  }

  // Fallback
  return {
    category: 'general',
    answer:
      'That\'s a great question! While our College Concierge is still learning, this seems like an important topic to explore. Consider checking your college\'s website, contacting the admissions office, or checking the relevant section of your checklist. You might also want to turn this into a task so you remember to follow up. What topic does this fall under?',
  };
}
