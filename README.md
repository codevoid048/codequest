# CodeQuest

**A modern coding platform for competitive programming and skill development**

CodeQuest is a comprehensive coding platform that provides daily challenges, leaderboards, and problem sets from multiple competitive programming platforms. Built for students and developers who want to improve their algorithmic thinking and coding skills.

![CodeQuest Homepage](./homepage.png)

## Features

- **Daily Challenges** - Fresh coding problems every day with varying difficulty levels
- **Leaderboard** - Track your progress and compete with other coders
- **Problem Sets** - Browse problems by categories (Arrays, Dynamic Programming, etc.)
- **Multi-Platform Integration** - Problems from LeetCode, GeeksforGeeks, CodeChef, and Codeforces
- **User Profiles** - Personal dashboards with solve statistics and streaks
- **Progress Tracking** - Monitor your coding journey with detailed analytics
- **Responsive Design** - Seamless experience across desktop and mobile devices

## Technology Stack

### Frontend
- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + shadcn/ui components
- **State Management**: React Context API
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Animations**: Framer Motion

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT + Passport.js
- **File Upload**: Cloudinary
- **Email Service**: Custom email utilities
- **Search**: TypeSense integration

### DevOps & Deployment
- **Frontend Hosting**: Cloudflare Pages
- **Backend Hosting**: AWS Lambda
- **CI/CD**: GitHub Actions

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB
- Git

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/codevoid048/codequest.git
   cd codequest
   ```

2. **Setup Backend**
   ```bash
   cd server
   npm install
   
   # Create .env file with your configuration
   cp .env.example .env
   # Edit .env with your MongoDB URL, JWT secret, etc.
   
   # Start the server
   npm run dev
   ```

3. **Setup Frontend**
   ```bash
   cd client-test
   npm install
   
   # Create .env file
   echo "VITE_API_BASE_URL=http://localhost:5000" > .env
   
   # Start the development server
   npm run dev
   ```

4. **Access the application**
   - Frontend: `http://localhost:5173`
   - Backend: `http://localhost:5000`

### Environment Variables

**Backend (.env)**
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
```

**Frontend (.env)**
```env
VITE_API_BASE_URL=http://localhost:5000
```

## Project Structure

```
codequest/
├── client-test/                 # Frontend React application
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   │   ├── Home/          # Homepage components
│   │   │   ├── Challenges/    # Challenge-related components
│   │   │   ├── Leaderboard/   # Leaderboard components
│   │   │   ├── ProblemSet/    # Problem browsing components
│   │   │   └── ui/            # shadcn/ui components
│   │   ├── context/           # React Context providers
│   │   ├── lib/               # Utility functions and configurations
│   │   └── styles/            # Global styles
│   ├── public/                # Static assets
│   └── package.json
├── server/                     # Backend Node.js application
│   ├── controllers/           # Route controllers
│   ├── models/               # MongoDB models
│   ├── routes/               # API routes
│   ├── middleware/           # Custom middleware
│   ├── utils/                # Utility functions
│   └── config/               # Configuration files
├── .github/
│   └── workflows/            # GitHub Actions CI/CD
└── README.md
```

## Contributing

We welcome contributions from the community! Here's how you can help:

### Getting Started
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

### Code Style Guidelines
- Use TypeScript for type safety
- Follow ESLint configuration
- Use Prettier for code formatting
- Write meaningful commit messages
- Add comments for complex logic

### Areas for Contribution
- Bug fixes and performance improvements
- New features and enhancements
- Documentation improvements
- UI/UX improvements
- Test coverage expansion

### Development Workflow
1. **Issues**: Check existing issues or create a new one
2. **Discussion**: Discuss your approach in the issue
3. **Development**: Work on your feature/fix
4. **Testing**: Ensure your changes work correctly
5. **Pull Request**: Submit with clear description

## Acknowledgments

- **SRKR Coding Club** - For the initiative and support
- **Open Source Community** - For the amazing tools and libraries
- **Contributors** - For making this project better

## Support

- **Bug Reports**: [Open an issue](https://github.com/codevoid048/codequest/issues)
- **Feature Requests**: [Open an issue](https://github.com/codevoid048/codequest/issues)

---