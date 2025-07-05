export interface MythologyData {
  god: string;
  role: string;
  personality: string;
  story: string;
  affirmation: string;
}

export const mythologyData: Record<string, MythologyData> = {
  mercury: {
    god: 'Hermes',
    role: 'Messenger of the Gods',
    personality: 'Witty, curious, adaptable, expressive',
    story: 'With winged sandals, he dances between worlds, a silver-tongued trickster of the cosmos.',
    affirmation: 'Your thoughts flow with divine clarity and speed today.',
  },
  venus: {
    god: 'Aphrodite',
    role: 'Goddess of Love & Beauty',
    personality: 'Graceful, charming, sensual, harmonious',
    story: 'Born of seafoam, her beauty stills the heavens and inspires mortal hearts to love.',
    affirmation: 'You are a magnet for love, beauty, and pleasure.',
  },
  earth: {
    god: 'Gaia',
    role: 'Primordial Goddess of Earth',
    personality: 'Nurturing, grounded, patient, life-giving',
    story: 'From her body, all life springs, a constant, silent hum of creation.',
    affirmation: 'You are grounded, supported, and abundant.',
  },
  mars: {
    god: 'Ares',
    role: 'God of War',
    personality: 'Bold, impulsive, driven, courageous',
    story: 'His fiery spirit ignites the warrior within, a force of untamed will and desire.',
    affirmation: 'You burn with an unstoppable, passionate fire today.',
  },
  jupiter: {
    god: 'Zeus',
    role: 'King of the Gods',
    personality: 'Expansive, optimistic, wise, generous',
    story: 'From his throne on Olympus, he casts lightning bolts of luck and expansion.',
    affirmation: 'Abundance and wisdom flow to you effortlessly.',
  },
  saturn: {
    god: 'Cronus',
    role: 'God of Time & Discipline',
    personality: 'Disciplined, responsible, patient, structured',
    story: 'The ancient father of time, whose rings represent life’s beautiful, binding lessons.',
    affirmation: 'You build lasting foundations with patience and discipline.',
  },
  uranus: {
    god: 'Ouranos',
    role: 'Primordial God of the Sky',
    personality: 'Innovative, rebellious, eccentric, liberating',
    story: 'The cosmic awakener, whose energy shatters old forms to reveal a brilliant future.',
    affirmation: 'Embrace your unique genius and inspire revolution.',
  },
  neptune: {
    god: 'Poseidon',
    role: 'God of the Sea & Dreams',
    personality: 'Mystical, intuitive, compassionate, elusive',
    story: 'In his deep, watery realm, dreams and reality merge into a cosmic ocean of possibility.',
    affirmation: 'Your intuition is your compass in the cosmic ocean.',
  },
};