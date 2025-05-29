import { User } from '@/types';

// Mock user data for development purposes
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@example.com',
    phoneNumber: '+97699001122',
    nationalRegistrationNumber: 'MN12345678',
    school: {
      name: 'International School of Ulaanbaatar',
      averageGrade: 92.5
    },
    paymentConfirmation: {
      imageUrl: 'https://placehold.co/400x300/png?text=Payment+Receipt',
      uploadedAt: new Date('2025-05-10')
    },
    essay: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent euismod, nisl eget aliquam ultricies, nunc nisl ultricies nunc, vitae aliquam nisl nisl vitae nisl. Praesent euismod, nisl eget aliquam ultricies, nunc nisl ultricies nunc, vitae aliquam nisl nisl vitae nisl.',
    status: 'pending',
    createdAt: new Date('2025-05-10'),
    updatedAt: new Date('2025-05-10')
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
    phoneNumber: '+97699334455',
    nationalRegistrationNumber: 'MN87654321',
    school: {
      name: 'American School of Ulaanbaatar',
      averageGrade: 88.7
    },
    paymentConfirmation: {
      imageUrl: 'https://placehold.co/400x300/png?text=Payment+Receipt',
      uploadedAt: new Date('2025-05-11')
    },
    essay: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
    status: 'approved',
    createdAt: new Date('2025-05-11'),
    updatedAt: new Date('2025-05-15')
  },
  {
    id: '3',
    name: 'Bat Dorj',
    email: 'bat.dorj@example.com',
    phoneNumber: '+97699778899',
    nationalRegistrationNumber: 'MN54321678',
    school: {
      name: 'School of Mathematics and Natural Sciences',
      averageGrade: 95.2
    },
    paymentConfirmation: {
      imageUrl: 'https://placehold.co/400x300/png?text=Payment+Receipt',
      uploadedAt: new Date('2025-05-12')
    },
    essay: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.',
    status: 'rejected',
    createdAt: new Date('2025-05-12'),
    updatedAt: new Date('2025-05-16')
  },
  {
    id: '4',
    name: 'Enkhjargal Tsogt',
    email: 'enkhjargal@example.com',
    phoneNumber: '+97699112233',
    nationalRegistrationNumber: 'MN98765432',
    school: {
      name: 'Elite School of Mongolia',
      averageGrade: 90.8
    },
    paymentConfirmation: {
      imageUrl: 'https://placehold.co/400x300/png?text=Payment+Receipt',
      uploadedAt: new Date('2025-05-14')
    },
    essay: 'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur.',
    status: 'pending',
    createdAt: new Date('2025-05-14'),
    updatedAt: new Date('2025-05-14')
  },
  {
    id: '5',
    name: 'Oyun-Erdene Batbold',
    email: 'oyunerdene@example.com',
    phoneNumber: '+97699445566',
    nationalRegistrationNumber: 'MN13579246',
    school: {
      name: 'New Horizon International School',
      averageGrade: 86.5
    },
    paymentConfirmation: {
      imageUrl: 'https://placehold.co/400x300/png?text=Payment+Receipt',
      uploadedAt: new Date('2025-05-18')
    },
    essay: 'Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur.',
    status: 'pending',
    createdAt: new Date('2025-05-18'),
    updatedAt: new Date('2025-05-18')
  }
];
