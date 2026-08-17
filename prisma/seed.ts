import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding Circlely database...');

  // Clean existing data
  await prisma.contactSubmission.deleteMany();
  await prisma.auditLog.deleteMany();
  await prisma.report.deleteMany();
  await prisma.block.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.message.deleteMany();
  await prisma.conversationMember.deleteMany();
  await prisma.conversation.deleteMany();
  await prisma.connection.deleteMany();
  await prisma.activityParticipant.deleteMany();
  await prisma.activity.deleteMany();
  await prisma.eventAttendee.deleteMany();
  await prisma.event.deleteMany();
  await prisma.pollVote.deleteMany();
  await prisma.poll.deleteMany();
  await prisma.like.deleteMany();
  await prisma.comment.deleteMany();
  await prisma.post.deleteMany();
  await prisma.communityModerator.deleteMany();
  await prisma.communityMember.deleteMany();
  await prisma.community.deleteMany();
  await prisma.userInterest.deleteMany();
  await prisma.interest.deleteMany();
  await prisma.profile.deleteMany();
  await prisma.user.deleteMany();

  // Password hash for all test accounts
  const passwordHash = await bcrypt.hash('password123', 10);

  // 1. Create Interests
  const interestsData = [
    { name: 'Gaming', slug: 'gaming', icon: '🎮', category: 'Entertainment' },
    { name: 'Music', slug: 'music', icon: '🎵', category: 'Entertainment' },
    { name: 'Movies', slug: 'movies', icon: '🎬', category: 'Entertainment' },
    { name: 'Travel', slug: 'travel', icon: '✈️', category: 'Lifestyle' },
    { name: 'Books', slug: 'books', icon: '📚', category: 'Culture' },
    { name: 'Art & Design', slug: 'art-design', icon: '🎨', category: 'Creativity' },
    { name: 'Technology', slug: 'technology', icon: '💻', category: 'Professional' },
    { name: 'Fitness & Wellness', slug: 'fitness-wellness', icon: '🏋️', category: 'Health' },
    { name: 'Food & Cooking', slug: 'food-cooking', icon: '🍳', category: 'Lifestyle' },
    { name: 'Photography', slug: 'photography', icon: '📸', category: 'Creativity' },
    { name: 'Career & Networking', slug: 'career-networking', icon: '💼', category: 'Professional' },
    { name: 'Personal Growth', slug: 'personal-growth', icon: '🌱', category: 'Wellness' },
  ];

  const createdInterests = [];
  for (const item of interestsData) {
    const interest = await prisma.interest.create({ data: item });
    createdInterests.push(interest);
  }

  // 2. Create Users & Profiles (20 Users + 1 Admin)
  const usersSeed = [
    {
      name: 'Alex Johnson',
      email: 'alex@example.com',
      role: 'ADMIN',
      username: 'alex_j',
      bio: 'Community Lead & Tech Enthusiast. Building meaningful online circles.',
      age: 28,
      ageGroup: '25-34',
      city: 'San Francisco',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
    },
    {
      name: 'Elena Rostova',
      email: 'elena@example.com',
      role: 'MODERATOR',
      username: 'elena_r',
      bio: 'Photographer, travel addict & acoustic guitar player 🎸',
      age: 26,
      ageGroup: '25-34',
      city: 'New York',
      avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=300',
    },
    {
      name: 'Marcus Chen',
      email: 'marcus@example.com',
      role: 'USER',
      username: 'marcus_c',
      bio: 'Indie game developer and board game strategist 🎲',
      age: 24,
      ageGroup: '18-24',
      city: 'Seattle',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300',
    },
    {
      name: 'Sophia Patel',
      email: 'sophia@example.com',
      role: 'USER',
      username: 'sophia_p',
      bio: 'Yoga practitioner, bookworm and sourdough baker 🍞',
      age: 31,
      ageGroup: '25-34',
      city: 'Austin',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=300',
    },
    {
      name: 'David Kim',
      email: 'david@example.com',
      role: 'USER',
      username: 'david_k',
      bio: 'Marathon runner and tech startup founder 🏃‍♂️',
      age: 35,
      ageGroup: '35-49',
      city: 'Chicago',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300',
    },
    {
      name: 'Maya Lin',
      email: 'maya@example.com',
      role: 'USER',
      username: 'maya_l',
      bio: 'Digital artist & UI designer exploring generative art 🎨',
      age: 22,
      ageGroup: '18-24',
      city: 'Los Angeles',
      avatarUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=300',
    },
    {
      name: 'James Wilson',
      email: 'james@example.com',
      role: 'USER',
      username: 'james_w',
      bio: 'Hiking enthusiast, camper, and specialty coffee nerd ☕',
      age: 42,
      ageGroup: '35-49',
      city: 'Denver',
      avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=300',
    },
    {
      name: 'Aaliyah Taylor',
      email: 'aaliyah@example.com',
      role: 'USER',
      username: 'aaliyah_t',
      bio: 'Film critic, podcast host, and vinyl record collector 🎧',
      age: 29,
      ageGroup: '25-34',
      city: 'London',
      avatarUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=300',
    },
    {
      name: 'Oliver Garcia',
      email: 'oliver@example.com',
      role: 'USER',
      username: 'oliver_g',
      bio: 'Culinary adventurer exploring street food worldwide 🌮',
      age: 38,
      ageGroup: '35-49',
      city: 'Miami',
      avatarUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=300',
    },
    {
      name: 'Emma Thompson',
      email: 'emma@example.com',
      role: 'USER',
      username: 'emma_t',
      bio: 'Gardener, eco-activist & mindfulness practitioner 🌿',
      age: 52,
      ageGroup: '50-64',
      city: 'Portland',
      avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300',
    },
    {
      name: 'Lucas Silva',
      email: 'lucas@example.com',
      role: 'USER',
      username: 'lucas_s',
      bio: 'Esports fan and competitive FPS player 🎮',
      age: 20,
      ageGroup: '18-24',
      city: 'Toronto',
      avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=300',
    },
    {
      name: 'Nora Al-Mansoor',
      email: 'nora@example.com',
      role: 'USER',
      username: 'nora_am',
      bio: 'Architect, sketching urban spaces & historical heritage 🏛️',
      age: 33,
      ageGroup: '25-34',
      city: 'Dubai',
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300',
    },
    {
      name: 'Carlos Mendez',
      email: 'carlos@example.com',
      role: 'USER',
      username: 'carlos_m',
      bio: 'Salsa dancer, guitarist and home chef 🍳',
      age: 27,
      ageGroup: '25-34',
      city: 'San Diego',
      avatarUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=300',
    },
    {
      name: 'Zoe Miller',
      email: 'zoe@example.com',
      role: 'USER',
      username: 'zoe_m',
      bio: 'Sci-fi novelist and cosmic astronomy enthusiast ✨',
      age: 23,
      ageGroup: '18-24',
      city: 'Boston',
      avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=300',
    },
    {
      name: 'Robert Hastings',
      email: 'robert@example.com',
      role: 'USER',
      username: 'robert_h',
      bio: 'Retired physics professor, chess master and watercolor painter 🎨',
      age: 67,
      ageGroup: '65+',
      city: 'Oxford',
      avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=300',
    },
    {
      name: 'Priya Sharma',
      email: 'priya@example.com',
      role: 'USER',
      username: 'priya_s',
      bio: 'Product Manager building AI for social good 💡',
      age: 30,
      ageGroup: '25-34',
      city: 'San Francisco',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
    },
    {
      name: 'Benjamin Vance',
      email: 'benjamin@example.com',
      role: 'USER',
      username: 'ben_v',
      bio: 'Cyclist, woodworker and vinyl DJ 🚴‍♂️',
      age: 36,
      ageGroup: '35-49',
      city: 'Seattle',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300',
    },
    {
      name: 'Chloe Bennett',
      email: 'chloe@example.com',
      role: 'USER',
      username: 'chloe_b',
      bio: 'Fashion researcher, thrift enthusiast and tea connoisseur ☕',
      age: 25,
      ageGroup: '25-34',
      city: 'New York',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=300',
    },
    {
      name: 'Hannah Brooks',
      email: 'hannah@example.com',
      role: 'USER',
      username: 'hannah_b',
      bio: 'Dog mom, trail runner and plant lover 🐶',
      age: 29,
      ageGroup: '25-34',
      city: 'Denver',
      avatarUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=300',
    },
    {
      name: 'Admin Circlely',
      email: 'admin@circlely.app',
      role: 'ADMIN',
      username: 'admin',
      bio: 'Circlely Platform Administrator',
      age: 35,
      ageGroup: '35-49',
      city: 'San Francisco',
      avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=300',
    },
  ];

  const createdUsers = [];
  for (const uData of usersSeed) {
    const user = await prisma.user.create({
      data: {
        name: uData.name,
        email: uData.email,
        passwordHash,
        role: uData.role,
        isVerified: true,
        status: 'ACTIVE',
        profile: {
          create: {
            username: uData.username,
            bio: uData.bio,
            age: uData.age,
            ageGroup: uData.ageGroup,
            city: uData.city,
            avatarUrl: uData.avatarUrl,
            isOnboarded: true,
          },
        },
      },
      include: { profile: true },
    });
    createdUsers.push(user);

    // Attach 2 random interests
    const randomInterests = createdInterests
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
    for (const interest of randomInterests) {
      await prisma.userInterest.create({
        data: {
          userId: user.id,
          interestId: interest.id,
        },
      });
    }
  }

  // 3. Create Communities (10 Communities)
  const communitiesSeed = [
    {
      name: 'Young Professionals Circle',
      slug: 'young-professionals-circle',
      description: 'Career growth, networking, travel, and weekend social mixers for ambitious young professionals.',
      category: 'Professional',
      ageGroup: '25-34',
      icon: '💼',
      coverImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800',
      rules: JSON.stringify(['Be respectful and professional', 'No blatant spam or self-promotion without context', 'Constructive networking only']),
    },
    {
      name: 'Gaming Community',
      slug: 'gaming-community',
      description: 'Casual & competitive gaming, game dev discussions, multiplayer weekend tournaments and voice hangouts.',
      category: 'Entertainment',
      ageGroup: 'All Ages',
      icon: '🎮',
      coverImage: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=800',
      rules: JSON.stringify(['No toxic behavior or harassment', 'GG mindset always', 'Share gamertags safely']),
    },
    {
      name: 'Travel & Exploration Circle',
      slug: 'travel-circle',
      description: 'Trip planning, backpacking guides, solo traveler tips, and photo sharing from around the world.',
      category: 'Lifestyle',
      ageGroup: 'All Ages',
      icon: '✈️',
      coverImage: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&q=80&w=800',
      rules: JSON.stringify(['Authentic travel experiences', 'Respect local cultures', 'Provide helpful travel advice']),
    },
    {
      name: 'Creative & Visual Art Circle',
      slug: 'creative-circle',
      description: 'Digital illustration, photography, 3D art, portfolio reviews, and weekly creative challenges.',
      category: 'Creativity',
      ageGroup: 'All Ages',
      icon: '🎨',
      coverImage: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=800',
      rules: JSON.stringify(['Credit original creators', 'Provide constructive feedback', 'Encourage all skill levels']),
    },
    {
      name: 'Fitness & Outdoor Warriors',
      slug: 'fitness-circle',
      description: 'Calisthenics, running groups, nutrition talk, yoga sessions, and outdoor weekend hikes.',
      category: 'Health',
      ageGroup: 'All Ages',
      icon: '🏋️',
      coverImage: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=800',
      rules: JSON.stringify(['Body positivity & encouragement', 'No medical advice claims', 'Safety first during outdoors']),
    },
    {
      name: 'Cinema & Music Enthusiasts',
      slug: 'movie-music-circle',
      description: 'Film analysis, album listening parties, concert meetups, and indie cinema highlights.',
      category: 'Entertainment',
      ageGroup: 'All Ages',
      icon: '🎬',
      coverImage: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&q=80&w=800',
      rules: JSON.stringify(['Use spoiler tags for movies', 'Respect diverse musical tastes', 'Friendly banter allowed']),
    },
    {
      name: 'Tech & AI Pioneers',
      slug: 'tech-ai-circle',
      description: 'Artificial intelligence, web development, open-source projects, and future technology trends.',
      category: 'Professional',
      ageGroup: 'All Ages',
      icon: '💻',
      coverImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800',
      rules: JSON.stringify(['Knowledge sharing welcome', 'Keep debates civil', 'Code snippets encouraged']),
    },
    {
      name: 'Book Lovers & Writers Guild',
      slug: 'book-lovers-writers',
      description: 'Monthly book club picks, fiction workshops, literary critique, and reading challenges.',
      category: 'Culture',
      ageGroup: 'All Ages',
      icon: '📚',
      coverImage: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=800',
      rules: JSON.stringify(['No plot spoilers without warning', 'Constructive critique for writers', 'All genres welcome']),
    },
    {
      name: 'Foodies & Home Chefs',
      slug: 'foodies-home-chefs',
      description: 'Recipe swaps, restaurant recommendations, baking tips, and international cuisine explorations.',
      category: 'Lifestyle',
      ageGroup: 'All Ages',
      icon: '🍳',
      coverImage: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=800',
      rules: JSON.stringify(['Share complete recipes', 'Respect dietary choices', 'Include appetizing photos']),
    },
    {
      name: 'Life & Growth Circle (35+)',
      slug: 'life-growth-35plus',
      description: 'Mid-life career transitions, parenting wisdom, financial wellness, and life balance discussions.',
      category: 'Wellness',
      ageGroup: '35-49',
      icon: '🌱',
      coverImage: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=800',
      rules: JSON.stringify(['Empathetic environment', 'Confidentiality respected', 'Supportive community ethos']),
    },
  ];

  const createdCommunities = [];
  for (let i = 0; i < communitiesSeed.length; i++) {
    const creator = createdUsers[i % createdUsers.length];
    const cData = communitiesSeed[i];
    const community = await prisma.community.create({
      data: {
        name: cData.name,
        slug: cData.slug,
        description: cData.description,
        category: cData.category,
        ageGroup: cData.ageGroup,
        icon: cData.icon,
        coverImage: cData.coverImage,
        rules: cData.rules,
        creatorId: creator.id,
        memberCount: 5 + (i * 3),
      },
    });
    createdCommunities.push(community);

    // Make creator an admin member
    await prisma.communityMember.create({
      data: {
        communityId: community.id,
        userId: creator.id,
        role: 'ADMIN',
      },
    });

    // Add 4 additional random members to each community
    const otherMembers = createdUsers
      .filter((u) => u.id !== creator.id)
      .sort(() => 0.5 - Math.random())
      .slice(0, 4);

    for (const member of otherMembers) {
      await prisma.communityMember.create({
        data: {
          communityId: community.id,
          userId: member.id,
          role: 'MEMBER',
        },
      });
    }
  }

  // 4. Create Activities (20 Activities)
  const activityCategories = ['Games', 'Discussions', 'Fitness', 'Workshops', 'Creative', 'Travel', 'Networking', 'Online'];
  for (let i = 1; i <= 20; i++) {
    const comm = createdCommunities[i % createdCommunities.length];
    const host = createdUsers[i % createdUsers.length];
    await prisma.activity.create({
      data: {
        communityId: comm.id,
        creatorId: host.id,
        title: `Activity #${i}: ${comm.name} Interactive Hangout`,
        description: `Join us for an exciting interactive activity organized by ${host.name}. Meet active members, exchange ideas, and participate!`,
        category: activityCategories[i % activityCategories.length],
        isOnline: i % 2 === 0,
        city: host.profile?.city || 'San Francisco',
        location: i % 2 === 0 ? 'Zoom / Discord Live Link' : `${host.profile?.city} Downtown Central Hub`,
        activityDate: new Date(Date.now() + i * 86400000 * 1.5),
        maxParticipants: 15 + i,
        participantsCount: 3 + (i % 5),
        icon: comm.icon || '🎯',
      },
    });
  }

  // 5. Create Events (10 Events)
  for (let i = 1; i <= 10; i++) {
    const comm = createdCommunities[i % createdCommunities.length];
    const host = createdUsers[i % createdUsers.length];
    await prisma.event.create({
      data: {
        communityId: comm.id,
        creatorId: host.id,
        title: `Official Event: ${comm.name} Summit ${2026}`,
        description: `Annual flagship event for ${comm.name}. Featuring guest talks, panel discussions, interactive breakout rooms, and networking sessions.`,
        category: comm.category,
        isOnline: i % 2 === 1,
        city: host.profile?.city || 'New York',
        location: i % 2 === 1 ? 'Circlely Live Auditorium (Online)' : `${host.profile?.city} Innovation Center`,
        coverImage: comm.coverImage,
        startDate: new Date(Date.now() + i * 86400000 * 3),
        endDate: new Date(Date.now() + i * 86400000 * 3 + 7200000),
        maxAttendees: 50 + i * 10,
        attendeesCount: 8 + i * 2,
      },
    });
  }

  // 6. Create Posts (30 Posts) & Comments (50 Comments)
  for (let i = 1; i <= 30; i++) {
    const comm = createdCommunities[i % createdCommunities.length];
    const author = createdUsers[i % createdUsers.length];
    const isPoll = i % 5 === 0;

    const post = await prisma.post.create({
      data: {
        communityId: comm.id,
        authorId: author.id,
        content: isPoll
          ? `Question for the community: What is your primary goal for this month in ${comm.name}?`
          : `Hello everyone in ${comm.name}! Glad to be part of this circle. Here is a thought on our recent topic: step by step collaboration yields the best results! What are your experiences?`,
        type: isPoll ? 'POLL' : i % 3 === 0 ? 'IMAGE' : 'TEXT',
        imageUrl: i % 3 === 0 ? comm.coverImage : null,
        likesCount: i * 2 + 1,
        commentsCount: 2,
      },
    });

    if (isPoll) {
      await prisma.poll.create({
        data: {
          postId: post.id,
          question: `What is your primary focus this season in ${comm.name}?`,
          options: JSON.stringify(['Skill Building & Workshops', 'Networking & Socializing', 'Collaborative Projects', 'Casual Fun']),
        },
      });
    }

    // Add 2 comments per post
    for (let c = 1; c <= 2; c++) {
      const commenter = createdUsers[(i + c) % createdUsers.length];
      await prisma.comment.create({
        data: {
          postId: post.id,
          authorId: commenter.id,
          content: `Great share @${author.profile?.username}! Totally agree with this approach. Looking forward to our next meetup!`,
          likesCount: c + 1,
        },
      });
    }
  }

  // 7. Create Connections, Conversations & Messages
  const userA = createdUsers[0];
  const userB = createdUsers[1];
  const userC = createdUsers[2];

  // Connection
  await prisma.connection.create({
    data: {
      requesterId: userA.id,
      receiverId: userB.id,
      status: 'ACCEPTED',
    },
  });

  // Conversation
  const conv = await prisma.conversation.create({
    data: {
      isGroup: false,
      members: {
        create: [
          { userId: userA.id },
          { userId: userB.id },
        ],
      },
    },
  });

  await prisma.message.createMany({
    data: [
      {
        conversationId: conv.id,
        senderId: userA.id,
        content: 'Hey Elena! Welcome to Circlely. Glad to connect with you.',
        isRead: true,
      },
      {
        conversationId: conv.id,
        senderId: userB.id,
        content: 'Hi Alex! Thanks for the warm welcome. Excited about the photography circle!',
        isRead: true,
      },
      {
        conversationId: conv.id,
        senderId: userA.id,
        content: 'Awesome! We have a weekend photowalk event coming up.',
        isRead: false,
      },
    ],
  });

  // 8. Create Notifications
  await prisma.notification.createMany({
    data: [
      {
        userId: userA.id,
        actorId: userB.id,
        type: 'CONNECTION',
        title: 'Connection Accepted',
        message: 'Elena Rostova accepted your connection request.',
        link: '/messages',
      },
      {
        userId: userA.id,
        actorId: userC.id,
        type: 'COMMENT',
        title: 'New Comment',
        message: 'Marcus Chen commented on your post in Young Professionals Circle.',
        link: '/communities/young-professionals-circle',
      },
    ],
  });

  // 9. Create Moderation Report
  await prisma.report.create({
    data: {
      reporterId: userC.id,
      targetType: 'POST',
      targetId: createdCommunities[0].id,
      reason: 'Spam',
      details: 'Test report for moderation queue review verification.',
      status: 'PENDING',
    },
  });

  console.log('✅ Circlely database successfully seeded with 20+ users, 10 communities, 20 activities, 10 events, posts, comments, messages & reports!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
