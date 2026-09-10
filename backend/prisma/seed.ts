import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const cities = [
  'Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad', 'Pune', 'Ahmedabad',
  'Jaipur', 'Lucknow', 'Kanpur', 'Nagpur', 'Indore', 'Thane', 'Bhopal', 'Visakhapatnam',
  'Pimpri', 'Patna', 'Vadodara', 'Ghaziabad', 'Ludhiana', 'Agra', 'Nashik', 'Faridabad',
  'Meerut', 'Rajkot', 'Varanasi', 'Srinagar', 'Aurangabad', 'Dhanbad', 'Amritsar', 'Navi Mumbai',
  'Allahabad', 'Ranchi', 'Howrah', 'Coimbatore', 'Jabalpur', 'Gwalior', 'Vijayawada', 'Jodhpur',
  'Madurai', 'Raipur', 'Kota', 'Guwahati', 'Chandigarh', 'Solapur', 'Hubli', 'Mysore',
  'Tiruchirappalli', 'Bareilly', 'Aligarh', 'Tiruppur', 'Gurgaon', 'Moradabad', 'Jalandhar'
];

const states = [
  'Maharashtra', 'Delhi', 'Karnataka', 'Tamil Nadu', 'West Bengal', 'Telangana', 'Gujarat',
  'Rajasthan', 'Uttar Pradesh', 'Madhya Pradesh', 'Andhra Pradesh', 'Punjab', 'Bihar', 'Jharkhand',
  'Odisha', 'Kerala', 'Haryana', 'Uttarakhand', 'Chhattisgarh', 'Assam', 'Jammu and Kashmir'
];

const collegePrefixes = [
  'Indian Institute of Technology', 'National Institute of Technology', 'Birla Institute of Technology',
  'Delhi University', 'Anna University', 'Jawaharlal Nehru University', 'Banaras Hindu University',
  'University of Mumbai', 'University of Delhi', 'Amrita University', 'Vellore Institute of Technology',
  'SRM University', 'Symbiosis International', 'Manipal University', 'Christ University',
  'Loyola College', 'St. Xaviers College', 'Fergusson College', 'Hindu College', 'Miranda House',
  'Lady Shri Ram College', 'Hansraj College', 'Kirori Mal College', 'Ramjas College', 'Stephen\'s College'
];

const collegeSuffixes = [
  'College of Engineering', 'Institute of Technology', 'School of Management', 'College of Arts',
  'Institute of Science', 'College of Commerce', 'School of Law', 'Institute of Medical Sciences',
  'College of Architecture', 'School of Design', 'Institute of Pharmacy', 'College of Agriculture'
];

const courseNames = [
  'Computer Science Engineering', 'Mechanical Engineering', 'Electrical Engineering',
  'Civil Engineering', 'Electronics Engineering', 'Chemical Engineering', 'Information Technology',
  'Biotechnology', 'Aerospace Engineering', 'Petroleum Engineering', 'Metallurgical Engineering',
  'Mining Engineering', 'Environmental Engineering', 'Industrial Engineering', 'Production Engineering',
  'Automobile Engineering', 'Mechatronics', 'Robotics', 'Artificial Intelligence', 'Data Science',
  'Cyber Security', 'Software Engineering', 'Business Administration', 'Economics', 'Psychology',
  'English Literature', 'Political Science', 'Sociology', 'History', 'Philosophy', 'Mathematics',
  'Physics', 'Chemistry', 'Biology', 'Statistics', 'Commerce', 'Accounting', 'Finance', 'Marketing',
  'Human Resources', 'Law', 'Medicine', 'Dentistry', 'Pharmacy', 'Nursing', 'Architecture', 'Design'
];

const reviewComments = [
  'Excellent faculty and great infrastructure. The placement cell is very supportive.',
  'Good college with decent placement opportunities. Campus life is vibrant.',
  'Outstanding academic curriculum. The professors are highly knowledgeable.',
  'Great learning environment with modern facilities. Highly recommended.',
  'The college provides excellent exposure to industry through internships.',
  'Strong alumni network and good placement record. Worth the investment.',
  'Beautiful campus with well-equipped laboratories. Research opportunities are ample.',
  'Quality education with focus on overall development. Sports facilities are excellent.',
  'The college has a good reputation and strong industry connections.',
  'Affordable fees with good return on investment. Placement support is commendable.',
  'World-class infrastructure and experienced faculty members.',
  'The curriculum is updated regularly to match industry standards.',
  'Good balance between academics and extracurricular activities.',
  'The college has a diverse student community and inclusive culture.',
  'Excellent research facilities and opportunities for innovation.'
];

const reviewAuthors = [
  'Rahul Sharma', 'Priya Patel', 'Amit Kumar', 'Sneha Reddy', 'Vikram Singh',
  'Anjali Gupta', 'Rajesh Verma', 'Pooja Mehta', 'Suresh Iyer', 'Kavita Nair',
  'Deepak Joshi', 'Neha Kapoor', 'Vijay Malhotra', 'Ritu Agarwal', 'Manoj Bhatia',
  'Sunita Das', 'Ashok Choudhury', 'Meena Krishnan', 'Ravi Pillai', 'Lakshmi Iyer'
];

const companies = [
  'Google', 'Microsoft', 'Amazon', 'Apple', 'Meta', 'Netflix', 'Adobe', 'Oracle',
  'IBM', 'Cisco', 'Intel', 'NVIDIA', 'Salesforce', 'VMware', 'SAP', 'Deloitte',
  'Accenture', 'TCS', 'Infosys', 'Wipro', 'HCL', 'Cognizant', 'Tech Mahindra',
  'L&T', 'Reliance', 'Tata', 'Mahindra', 'Maruti', 'Honda', 'Toyota', 'Hyundai'
];

function getRandomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomFloat(min: number, max: number, decimals: number = 1): number {
  return parseFloat((Math.random() * (max - min) + min).toFixed(decimals));
}

async function main() {
  console.log('Starting seed...');

  // Clear existing data
  await prisma.review.deleteMany();
  await prisma.course.deleteMany();
  await prisma.placement.deleteMany();
  await prisma.savedCollege.deleteMany();
  await prisma.comparison.deleteMany();
  await prisma.college.deleteMany();
  await prisma.user.deleteMany();

  console.log('Cleared existing data');

  // Create demo user
  const hashedPassword = await bcrypt.hash('demo123', 10);
  const demoUser = await prisma.user.create({
    data: {
      email: 'demo@example.com',
      password: hashedPassword,
      name: 'Demo User',
    },
  });
  console.log('Created demo user');

  // Create colleges
  const colleges = [];
  for (let i = 1; i <= 60; i++) {
    const prefix = getRandomItem(collegePrefixes);
    const suffix = getRandomItem(collegeSuffixes);
    const city = getRandomItem(cities);
    const state = getRandomItem(states);
    const fees = getRandomFloat(50000, 500000, 0);
    const rating = getRandomFloat(3.0, 5.0, 1);

    const college = await prisma.college.create({
      data: {
        name: `${prefix}, ${city} - ${suffix}`,
        city,
        state,
        fees,
        rating,
        overview: `${prefix} in ${city} is a premier educational institution offering world-class education in various disciplines. With state-of-the-art facilities, experienced faculty, and strong industry connections, the college has established itself as a leader in higher education.`,
        imageUrl: `https://via.placeholder.com/400x300/1e3a8a/ffffff?text=College+${i}`,
      },
    });
    colleges.push(college);
  }
  console.log(`Created ${colleges.length} colleges`);

  // Create placements
  for (const college of colleges) {
    await prisma.placement.create({
      data: {
        collegeId: college.id,
        averagePackage: getRandomFloat(5, 25, 1),
        highestPackage: getRandomFloat(30, 80, 1),
        placementRate: getRandomFloat(70, 98, 1),
        companiesVisited: getRandomInt(50, 200),
      },
    });
  }
  console.log('Created placements');

  // Create courses
  for (const college of colleges) {
    const numCourses = getRandomInt(5, 15);
    const shuffledCourses = [...courseNames].sort(() => Math.random() - 0.5);
    
    for (let i = 0; i < numCourses; i++) {
      await prisma.course.create({
        data: {
          collegeId: college.id,
          name: shuffledCourses[i],
          duration: getRandomItem(['3 Years', '4 Years', '5 Years', '2 Years']),
          fees: getRandomFloat(college.fees * 0.8, college.fees * 1.2, 0),
        },
      });
    }
  }
  console.log('Created courses');

  // Create reviews
  for (const college of colleges) {
    const numReviews = getRandomInt(3, 10);
    
    for (let i = 0; i < numReviews; i++) {
      await prisma.review.create({
        data: {
          collegeId: college.id,
          rating: getRandomFloat(3.0, 5.0, 1),
          comment: getRandomItem(reviewComments),
          author: getRandomItem(reviewAuthors),
        },
      });
    }
  }
  console.log('Created reviews');

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
