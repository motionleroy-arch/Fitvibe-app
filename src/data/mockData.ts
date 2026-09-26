import { Habit, Exercise, MealRecipe } from '../types';

export const INITIAL_HABITS: Habit[] = [
  {
    id: 'habit-1',
    title: 'Morning Sobolo & Water Protocol',
    subtitle: '500ml warm water + Prekese & ginger infusion for bile flow',
    tag: 'Hydration & Motility',
    completed: true,
    points: 20,
  },
  {
    id: 'habit-2',
    title: 'Ghanaian Prebiotic Lunch',
    subtitle: 'Kontomire greens, wild steamed tilapia & boiled green plantain',
    tag: 'Digestive Flora',
    completed: true,
    points: 20,
  },
  {
    id: 'habit-3',
    title: '10-Min Core & TVA Circuit',
    subtitle: 'Deep transverse abdominis activation & gut peristalsis',
    tag: 'Flat Tummy & Core',
    completed: false,
    points: 20,
  },
];

export const CORE_EXERCISES: Exercise[] = [
  {
    id: 1,
    name: 'Stomach Vacuum & TVA Holds',
    subtitle: 'Deep "corset" muscle contraction',
    durationSeconds: 60,
    formTip: 'Exhale all air completely, pull belly button back toward spine without holding chest tension. Hold 10s, release, repeat.',
    debloatMechanism: 'Activates the internal transverse abdominis wall, gently compresses viscera to stimulate sluggish digestion.',
    category: 'Core Compression',
    instructionSteps: [
      'Exhale every drop of air from your lungs.',
      'Pull your navel directly inward and upward toward your ribs.',
      'Hold the vacuum isometric for 8-10 seconds while taking shallow sips of air.',
      'Slowly release and repeat for 4-5 cycles.',
    ],
  },
  {
    id: 2,
    name: 'Slow Deadbug Cross-Extensions',
    subtitle: 'Anti-extension stability with low back flush',
    durationSeconds: 90,
    formTip: 'Press lower back firmly into floor so no paper could slide underneath. Move opposite arm and leg at half-speed.',
    debloatMechanism: 'Strengthens deep stabilizers without increasing intra-abdominal pressure that leads to abdominal distension.',
    category: 'Pelvic Stability',
    instructionSteps: [
      'Lie supine with arms pointing straight up, knees bent at 90 degrees.',
      'Exhale as you slowly lower your right arm overhead and left leg toward floor.',
      'Do not let your lumbar spine arch off the floor.',
      'Inhale to return, then alternate sides smoothly.',
    ],
  },
  {
    id: 3,
    name: 'Cat-Cow into Pelvic Bridge Roll',
    subtitle: 'Spinal wave & trapped gas release',
    durationSeconds: 90,
    formTip: 'Move fluidly with breath: inhale to drop belly gently, exhale to round spine and roll into a low glute squeeze.',
    debloatMechanism: 'Alternating spinal flexion and extension gently massages intestines, encouraging release of trapped gas pockets.',
    category: 'Motility Wave',
    instructionSteps: [
      'Start on all fours: inhale, gently arch back and look forward.',
      'Exhale deeply, tuck tailbone, arch back high toward the ceiling.',
      'Transition onto back for 3 gentle glute bridge rolls, squeezing glutes at the top.',
      'Keep movement smooth and unhurried.',
    ],
  },
  {
    id: 4,
    name: 'Forearm Plank with Subtle Knee Taps',
    subtitle: 'Endurance wall brace without bulging',
    durationSeconds: 90,
    formTip: 'Push elbows down into mat, keep neck neutral. Lightly tap alternating knees to the floor without shifting hips.',
    debloatMechanism: 'Builds true 360-degree cylindrical endurance without the bulging pressure caused by traditional sit-ups.',
    category: 'Endurance Brace',
    instructionSteps: [
      'Rest on forearms directly under shoulders, legs straight behind you.',
      'Zip up your lower abdomen like a tight jacket.',
      'Tap right knee softly to the mat, lift it back, then tap left knee.',
      'Keep your pelvis rock-steady and level with the ground.',
    ],
  },
  {
    id: 5,
    name: 'Supine Windshield Wipers & Decompress',
    subtitle: 'Gut peristalsis & lower ribcage reset',
    durationSeconds: 90,
    formTip: 'Keep shoulders glued to the ground as knees drift side to side. Let gravity gently stretch the lower abdomen.',
    debloatMechanism: 'Twisting mobility decompresses the ascending and descending colon, enhancing digestive transit time.',
    category: 'Gut Motility',
    instructionSteps: [
      'Lie on your back with arms extended out into a T position.',
      'Bend knees at 90 degrees or feet flat on the mat.',
      'Gently lower knees to the right side, exhaling deeply.',
      'Inhale back to center, then let knees drift to the left side.',
    ],
  },
];

export const RECIPES: MealRecipe[] = [
  // Debloat Lunches (Ghanaian Superfood Lunches)
  {
    id: 'lunch-1',
    category: 'debloat_lunches',
    title: 'Steamed Wild Tilapia & Kontomire Greens Ampesi',
    timeToMake: '15 mins',
    calories: 410,
    protein: 38,
    keyIngredient: 'Kontomire & Green Plantain',
    benefit: 'Kontomire (cocoyam leaves) is rich in magnesium; boiled green plantain delivers resistant starch to soothe intestines.',
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=700&q=80',
    ingredients: [
      'Fresh Lake Volta Tilapia fillet (160g)',
      'Tender steamed Kontomire (cocoyam leaves)',
      'Boiled green plantain rounds (Ampesi)',
      'Muddled shallots & crushed kpakpo shito',
      'Cold-pressed unrefined red palm oil (1 tsp)'
    ],
  },
  {
    id: 'lunch-2',
    category: 'debloat_lunches',
    title: 'Prekese & Ginger-Poached Chicken with Fonio',
    timeToMake: '14 mins',
    calories: 390,
    protein: 42,
    keyIngredient: 'Prekese (Aidan Fruit) & Kakadur',
    benefit: 'Aromatic Prekese bioactive saponins ignite gastric motility, while ancient African fonio is naturally gluten-free and light.',
    imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=700&q=80',
    ingredients: [
      'Lean chicken breast (160g)',
      'Simmered Prekese (Aidan fruit pod) broth',
      'Fresh grated Kakadur (wild ginger) & garlic',
      'Steamed fluffy Fonio grain (1/2 cup)',
      'Tender baby spinach & chopped scallions'
    ],
  },
  {
    id: 'lunch-3',
    category: 'debloat_lunches',
    title: 'Warm Garden Egg (Ntroba) Stew with Flaked Mackerel',
    timeToMake: '12 mins',
    calories: 360,
    protein: 34,
    keyIngredient: 'African Eggplant & Omega-3s',
    benefit: 'Garden eggs provide soluble pectin fiber that sweeps through the GI tract without causing gas fermentation.',
    imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=700&q=80',
    ingredients: [
      'Steamed mashed Garden Eggs (Ntroba, 3 pcs)',
      'Coastal smoked mackerel flakes (130g)',
      'Vine-ripened plum tomatoes & purple shallots',
      'Boiled sweet potato medallions (1 small)',
      'Crushed Momoni umami essence & sea salt'
    ],
  },

  // Quick Dinners (Light Ghanaian Evening Soups & Grilled Delights)
  {
    id: 'dinner-1',
    category: 'quick_dinners',
    title: 'Aromatic Ebunuebunu (Kontomire & Tilapia Light Soup)',
    timeToMake: '18 mins',
    calories: 340,
    protein: 37,
    keyIngredient: 'Blended Cocoyam Greens & Prekese',
    benefit: 'Ghana’s premier detox soup. Zero heavy oils, high potassium, deeply hydrating, and flushes excess sodium overnight.',
    imageUrl: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=700&q=80',
    ingredients: [
      'Fresh cut Tilapia or Red Fish (180g)',
      'Finely pureed fresh Kontomire greens',
      'Slow-steeped Prekese herbal broth',
      'Crushed red peppers & garden tomatoes',
      'Tender steamed mushroom caps'
    ],
  },
  {
    id: 'dinner-2',
    category: 'quick_dinners',
    title: 'Ginger-Hwentia Pepper Light Soup with Lean Goat',
    timeToMake: '16 mins',
    calories: 380,
    protein: 41,
    keyIngredient: 'Hwentia (Selim Pods) & Kakadur',
    benefit: 'Hwentia pods and wild ginger create a thermogenic broth that stimulates stomach acid and eliminates evening water puffiness.',
    imageUrl: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=700&q=80',
    ingredients: [
      'Tender lean pasture-raised goat cuts (150g)',
      'Roasted plum tomato & garlic broth',
      'Crushed Grains of Selim (Hwentia pods)',
      'Fragrant African wild basil (Akoko mesa)',
      'Diced ginger root & green kpakpo shito'
    ],
  },
  {
    id: 'dinner-3',
    category: 'quick_dinners',
    title: 'Spiced Grilled Snapper with Fresh Kpakpo Shito Salsa',
    timeToMake: '15 mins',
    calories: 350,
    protein: 38,
    keyIngredient: 'Wild Coastal Snapper & Capsaicin',
    benefit: 'Lean sea protein seasoned with native botanicals; kpakpo shito delivers bioflavonoids to reduce abdominal fluid retention.',
    imageUrl: 'https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=700&q=80',
    ingredients: [
      'Whole Red Snapper fillet (180g)',
      'Fresh chopped tomato & red onion salsa',
      'Crushed green kpakpo shito cherry peppers',
      'Steamed cassava-cauliflower mash',
      'Fresh Key lime juice & sea salt'
    ],
  },

  // Hydrating Snacks (Ghanaian Tropical Botanicals & Elixirs)
  {
    id: 'snack-1',
    category: 'hydrating_snacks',
    title: 'Chilled Artisanal Sobolo (Hibiscus & Ginger Elixir)',
    timeToMake: '3 mins',
    calories: 45,
    protein: 1,
    keyIngredient: 'Hibiscus Sabdariffa & Hwentia',
    benefit: 'Ghana’s beloved ruby elixir. Acts as a natural diuretic that flushes cellular bloat with zero refined sugars.',
    imageUrl: 'https://images.unsplash.com/photo-1589984662646-e7b2e4962f18?auto=format&fit=crop&w=700&q=80',
    ingredients: [
      'Steeped dried hibiscus calyces (Sobolo)',
      'Fresh cold-pressed ginger juice',
      'Bruised Grains of Selim (Hwentia) & cloves',
      'Natural pineapple core infusion',
      'Crushed mint leaves & ice'
    ],
  },
  {
    id: 'snack-2',
    category: 'hydrating_snacks',
    title: 'Golden Pawpaw (Papaya) with Lime & Efom Wisa',
    timeToMake: '4 mins',
    calories: 120,
    protein: 2,
    keyIngredient: 'Papain Enzymes & Efom Wisa',
    benefit: 'Natural papain effortlessly breaks down complex meal proteins, wiping out lower abdominal distension within 30 minutes.',
    imageUrl: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=700&q=80',
    ingredients: [
      'Fresh ripe Ghanaian Pawpaw cubes (2 cups)',
      'Freshly squeezed coastal lime juice',
      'Pinch of crushed Efom Wisa (Grains of Paradise)',
      'Fresh tender coconut slivers (1 tbsp)'
    ],
  },
  {
    id: 'snack-3',
    category: 'hydrating_snacks',
    title: 'Chilled Atadwe (Tiger Nut) & Coconut Prebiotic Chia',
    timeToMake: '5 mins',
    calories: 170,
    protein: 7,
    keyIngredient: 'Atadwe Resistant Starch & Chia',
    benefit: 'Tiger nuts (Atadwe) are a beloved Ghanaian prebiotic tuber rich in insoluble fiber that regulates bowel transit smoothly.',
    imageUrl: 'https://images.unsplash.com/photo-1506484381205-f7945653044d?auto=format&fit=crop&w=700&q=80',
    ingredients: [
      'Fresh pressed Tiger Nut milk (Atadwe, 150ml)',
      'Organic chia seeds (1.5 tbsp)',
      'Fresh diced sweet golden mango',
      'Grated nutmeg & ground wild cinnamon'
    ],
  },
];
