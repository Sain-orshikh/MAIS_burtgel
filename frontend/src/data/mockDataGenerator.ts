import { User } from '@/types';

// School names for random generation
const schoolNames = [
  'International School of Ulaanbaatar',
  'American School of Ulaanbaatar',
  'Elite School of Mongolia',
  'New Horizon International School',
  'School of Mathematics and Natural Sciences',
  'Cambridge International School',
  'British School of Ulaanbaatar',
  'Mongolian National University',
  'Eastern International School',
  'Peace Bridge International Academy'
];

// Random name generator
const firstNames = ['Bat', 'Oyun', 'Bolor', 'Enkh', 'Munkh', 'Tsetseg', 'Altai', 'Dulam', 'Naran', 'Solongo'];
const lastNames = ['Dorj', 'Batbold', 'Erdene', 'Tsogt', 'Ganbaatar', 'Bayar', 'Suren', 'Jargal', 'Ochir', 'Munkhbat'];

// Random essay fragments
const essayFragments = [
  'The importance of education in today\'s rapidly changing world cannot be overstated.',
  'My journey through academic life has been filled with challenges and opportunities.',
  'I believe that a strong educational foundation is essential for personal growth.',
  'Throughout my academic journey, I have always been passionate about learning new concepts.',
  'My interest in this field began when I was introduced to the subject in high school.',
  'I am committed to making a positive impact on society through my education and skills.',
  'The challenges we face today require innovative solutions and fresh perspectives.',
  'My experiences have taught me the value of perseverance and determination.',
  'I aspire to contribute to the advancement of knowledge in my chosen field.',
  'Education has the power to transform lives and create positive change in communities.'
];

/**
 * Generate a random integer between min and max (inclusive)
 */
function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Generate a random phone number in Mongolian format
 */
function generatePhoneNumber(): string {
  return `+9769${getRandomInt(1, 9)}${getRandomInt(100000, 999999)}`;
}

/**
 * Generate a random national registration number
 */
function generateNationalRegNumber(): string {
  return `MN${getRandomInt(10000000, 99999999)}`;
}

/**
 * Generate a random email based on name
 */
function generateEmail(firstName: string, lastName: string): string {
  const domains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'example.com'];
  const randomDomain = domains[Math.floor(Math.random() * domains.length)];
  return `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${randomDomain}`;
}

/**
 * Generate a random essay
 */
function generateEssay(): string {
  // Select 3-5 random fragments
  const count = getRandomInt(3, 5);
  let selectedFragments = [];
  
  for (let i = 0; i < count; i++) {
    const randomFragment = essayFragments[Math.floor(Math.random() * essayFragments.length)];
    if (!selectedFragments.includes(randomFragment)) {
      selectedFragments.push(randomFragment);
    }
  }
  
  return selectedFragments.join(' ');
}

/**
 * Generate a specified number of mock users
 */
export function generateMockUsers(count: number): User[] {
  const users: User[] = [];
  
  for (let i = 1; i <= count; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const fullName = `${firstName} ${lastName}`;
    
    const createdDate = new Date();
    // Set date to somewhere in the last 30 days
    createdDate.setDate(createdDate.getDate() - getRandomInt(0, 30));
      // Create a weighted distribution of statuses: 50% pending, 30% approved, 20% rejected
    let status: 'pending' | 'approved' | 'rejected';
    const statusRandom = Math.random();
    if (statusRandom < 0.5) {
      status = 'pending';
    } else if (statusRandom < 0.8) {
      status = 'approved';
    } else {
      status = 'rejected';
    }
    
    const updatedDate = new Date(createdDate);
    // If status is not pending, update date is 1-5 days after creation
    if (status !== 'pending') {
      updatedDate.setDate(updatedDate.getDate() + getRandomInt(1, 5));
    }    users.push({
      id: `user_${i}_${Math.random().toString(36).substring(2, 10)}`,
      name: fullName,
      email: generateEmail(firstName, lastName),
      phoneNumber: generatePhoneNumber(),
      nationalRegistrationNumber: generateNationalRegNumber(),
      school: {
        name: schoolNames[Math.floor(Math.random() * schoolNames.length)],
        averageGrade: getRandomInt(70, 100)
      },
      paymentConfirmation: {
        imageUrl: 'https://placehold.co/400x300/png?text=Payment+Receipt',
        uploadedAt: createdDate // Fixed: Use the same date object instead of creating a new one
      },
      essay: generateEssay(),
      status: status,
      createdAt: createdDate,
      updatedAt: updatedDate
    });
  }
  
  return users;
}
