const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Property = require('./models/Property');

dotenv.config();

// Connect to DB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/toptier', {
      serverSelectionTimeoutMS: 5000,
      family: 4
    });
    console.log('MongoDB Connected for seeding');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Sample properties
const properties = [
  {
    title: 'Luxury Modern Villa with Ocean View',
    description: 'Experience unparalleled luxury in this stunning modern villa featuring floor-to-ceiling windows, infinity pool, and breathtaking ocean views. This architectural masterpiece offers smart home integration, wine cellar, and private beach access.',
    price: 4500000,
    location: { address: '123 Ocean Drive', city: 'Miami', state: 'FL', zipCode: '33139' },
    type: 'villa',
    status: 'available',
    bedrooms: 6,
    bathrooms: 7,
    sqft: 8500,
    yearBuilt: 2022,
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200'
    ],
    features: ['Infinity Pool', 'Smart Home', 'Wine Cellar', 'Private Beach', 'Home Theater', 'Elevator'],
    featured: true,
    agent: { name: 'Sarah Johnson', email: 'sarah@toptier.com', phone: '+1 (305) 555-0123', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200' }
  },
  {
    title: 'Downtown Penthouse Suite',
    description: 'A prestigious penthouse in the heart of downtown featuring 360-degree city views, private rooftop terrace, and concierge service. Designed for the sophisticated urbanite.',
    price: 2800000,
    location: { address: '456 Skyline Tower', city: 'New York', state: 'NY', zipCode: '10001' },
    type: 'apartment',
    status: 'available',
    bedrooms: 3,
    bathrooms: 3.5,
    sqft: 4200,
    yearBuilt: 2021,
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200'
    ],
    features: ['Rooftop Terrace', 'Concierge', 'Private Elevator', 'Gym Access', 'Valet Parking'],
    featured: true,
    agent: { name: 'Michael Chen', email: 'michael@toptier.com', phone: '+1 (212) 555-0456', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200' }
  },
  {
    title: 'Contemporary Hillside Estate',
    description: 'Nestled in the Hollywood Hills, this contemporary estate offers ultimate privacy with floor-to-ceiling glass walls, heated outdoor living spaces, and a state-of-the-art recording studio.',
    price: 6200000,
    location: { address: '789 Hillside Drive', city: 'Los Angeles', state: 'CA', zipCode: '90069' },
    type: 'house',
    status: 'available',
    bedrooms: 5,
    bathrooms: 6,
    sqft: 7200,
    yearBuilt: 2023,
    images: [
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200'
    ],
    features: ['Recording Studio', 'Heated Pool', 'Outdoor Kitchen', 'Fire Pit', 'Panoramic Views'],
    featured: true,
    agent: { name: 'David Park', email: 'david@toptier.com', phone: '+1 (310) 555-0789', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200' }
  },
  {
    title: 'Seaside Condo with Private Marina',
    description: 'Waterfront living at its finest. This exclusive condo includes a private marina slip, wraparound balconies, and access to a world-class yacht club.',
    price: 1850000,
    location: { address: '321 Harbor Boulevard', city: 'San Diego', state: 'CA', zipCode: '92101' },
    type: 'condo',
    status: 'available',
    bedrooms: 2,
    bathrooms: 2.5,
    sqft: 2800,
    yearBuilt: 2020,
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498e?w=1200',
      'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=1200'
    ],
    features: ['Private Marina', 'Yacht Club', 'Ocean View', 'Gourmet Kitchen', 'Spa Bathroom'],
    featured: false,
    agent: { name: 'Emily Rodriguez', email: 'emily@toptier.com', phone: '+1 (619) 555-0321', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200' }
  },
  {
    title: 'Historic Brownstone Renovation',
    description: 'Meticulously restored historic brownstone combining original architectural details with modern luxury. Features a private garden, chef kitchen, and four fireplaces.',
    price: 3200000,
    location: { address: '555 Beacon Street', city: 'Boston', state: 'MA', zipCode: '02108' },
    type: 'house',
    status: 'available',
    bedrooms: 4,
    bathrooms: 3.5,
    sqft: 5600,
    yearBuilt: 1890,
    images: [
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1200',
      'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=1200'
    ],
    features: ['Original Details', 'Private Garden', 'Fireplaces', 'Chef Kitchen', 'Wine Room'],
    featured: false,
    agent: { name: 'James Wilson', email: 'james@toptier.com', phone: '+1 (617) 555-0654', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200' }
  },
  {
    title: 'Minimalist Desert Retreat',
    description: 'An architectural gem in the desert featuring rammed earth construction, solar power, and seamless indoor-outdoor living with stunning mountain views.',
    price: 2100000,
    location: { address: '888 Desert Ridge Road', city: 'Phoenix', state: 'AZ', zipCode: '85054' },
    type: 'villa',
    status: 'available',
    bedrooms: 3,
    bathrooms: 3,
    sqft: 3800,
    yearBuilt: 2023,
    images: [
      'https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?w=1200',
      'https://images.unsplash.com/photo-1600566752229-250ed79470f8?w=1200',
      'https://images.unsplash.com/photo-1600585153490-76fb20a32601?w=1200'
    ],
    features: ['Solar Power', 'Rammed Earth', 'Mountain Views', 'Outdoor Living', 'Stargazing Deck'],
    featured: true,
    agent: { name: 'Lisa Martinez', email: 'lisa@toptier.com', phone: '+1 (602) 555-0987', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200' }
  },
  {
    title: 'Waterfront Townhouse in Georgetown',
    description: 'Elegant waterfront townhouse offering Potomac River views, private dock, and luxury finishes throughout. Steps from Georgetown shopping and dining.',
    price: 2750000,
    location: { address: '111 Water Street', city: 'Washington', state: 'DC', zipCode: '20007' },
    type: 'house',
    status: 'available',
    bedrooms: 4,
    bathrooms: 4,
    sqft: 4500,
    yearBuilt: 2019,
    images: [
      'https://images.unsplash.com/photo-1600047509358-9dc75507daeb?w=1200',
      'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=1200',
      'https://images.unsplash.com/photo-1600210491369-e753d80a41f3?w=1200'
    ],
    features: ['Private Dock', 'River Views', 'Rooftop Deck', 'Smart Home', 'Wine Storage'],
    featured: false,
    agent: { name: 'Robert Taylor', email: 'robert@toptier.com', phone: '+1 (202) 555-0145', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200' }
  },
  {
    title: 'Modern Lake House Retreat',
    description: 'Stunning contemporary lake house with walls of glass, cantilevered decks, and direct lake access. Perfect for entertaining or peaceful retreats.',
    price: 3400000,
    location: { address: '777 Lake Shore Drive', city: 'Chicago', state: 'IL', zipCode: '60611' },
    type: 'house',
    status: 'pending',
    bedrooms: 5,
    bathrooms: 5,
    sqft: 6000,
    yearBuilt: 2022,
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=1200'
    ],
    features: ['Lake Access', 'Cantilevered Decks', 'Floor-to-Ceiling Glass', 'Boathouse', 'Guest Cottage'],
    featured: true,
    agent: { name: 'Amanda White', email: 'amanda@toptier.com', phone: '+1 (312) 555-0278', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200' }
  }
];

// Seed data
const seedData = async () => {
  await connectDB();
  
  try {
    await Property.deleteMany();
    await User.deleteMany();

    // Create admin user
    const adminUser = await User.create({
      name: 'Admin User',
      email: process.env.ADMIN_EMAIL || 'admin@toptier.com',
      password: process.env.ADMIN_PASSWORD || 'Toptier123!',
      role: 'admin'
    });

    console.log('Admin user created:', adminUser.email);

    // Create properties
    const createdProperties = await Property.insertMany(properties);
    console.log(`${createdProperties.length} properties created`);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedData();

