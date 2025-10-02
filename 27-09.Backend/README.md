# Social Media Application

A full-stack social media application built with Node.js, Express, MongoDB, and React with modern UI/UX design.

## 🚀 Features

### Authentication & User Management
- ✅ User registration and login
- ✅ JWT-based authentication with secure cookies
- ✅ Password hashing with bcrypt
- ✅ Protected routes and middleware

### Profile Management
- ✅ Comprehensive user profiles with extended fields
- ✅ Profile and cover photo upload
- ✅ Real-time profile editing
- ✅ Social media links integration
- ✅ Interests and bio management
- ✅ Contact information display

### User Interface
- ✅ Modern, responsive design with Tailwind CSS
- ✅ Dark theme with beautiful gradients
- ✅ Smooth animations and hover effects
- ✅ Mobile-first responsive layout
- ✅ Custom scrollbars and styling

### Home Dashboard
- ✅ Personalized dashboard with user data
- ✅ Quick stats display (posts, followers, following)
- ✅ Recent activity feed
- ✅ Contact information sidebar
- ✅ Social links integration
- ✅ Post creation interface

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Multer** - File upload handling
- **CORS** - Cross-origin resource sharing

### Frontend
- **React** - UI library
- **React Router** - Client-side routing
- **Tailwind CSS** - Styling framework
- **Lucide React** - Icon library
- **React Toastify** - Notifications
- **Axios** - HTTP client

## 📁 Project Structure

```
├── backend/
│   ├── src/
│   │   ├── controllers/     # Route controllers
│   │   ├── models/         # Database models
│   │   ├── routes/         # API routes
│   │   ├── middlewares/    # Custom middlewares
│   │   ├── utils/          # Utility functions
│   │   ├── database/       # Database connection
│   │   └── app.js          # Express app configuration
│   ├── public/
│   │   └── uploads/        # File uploads directory
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── pages/          # React pages
│   │   ├── Context/        # React context
│   │   ├── utils/          # Utility functions
│   │   └── App.jsx         # Main App component
│   └── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd social-media-app
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Environment Setup**
   Create a `.env` file in the backend directory:
   ```env
   MONGO_URL=mongodb://localhost:27017
   JWT_SECRET=your_super_secret_jwt_key_here
   PORT=5000
   NODE_ENV=development
   FRONTEND_URL=http://localhost:5173
   ```

5. **Start the application**
   
   **Backend (Terminal 1):**
   ```bash
   cd backend
   npm start
   ```
   
   **Frontend (Terminal 2):**
   ```bash
   cd frontend
   npm run dev
   ```

6. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## 📱 User Interface

### Login/Signup Pages
- Modern card-based design
- Smooth animations and transitions
- Form validation and error handling
- Responsive layout for all devices

### Home Dashboard
- Personalized welcome message
- User statistics display
- Recent activity feed
- Quick access to profile editing
- Post creation interface

### Profile Page
- Comprehensive profile display
- Photo upload functionality
- Real-time editing capabilities
- Social links integration
- Interests and bio management

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Profile Management
- `GET /api/auth/me` - Get current user profile
- `PUT /api/auth/updateprofile` - Update user profile
- `POST /api/auth/upload-profile-pic` - Upload profile picture
- `POST /api/auth/upload-cover-pic` - Upload cover picture

## 🎨 Design Features

### Color Scheme
- Primary: Blue (#3B82F6)
- Secondary: Purple (#8B5CF6)
- Background: Dark Gray (#111827)
- Cards: Medium Gray (#1F2937)
- Text: White with gray variations

### Typography
- System fonts for optimal performance
- Clear hierarchy with proper font weights
- Responsive text sizing

### Animations
- Smooth hover effects
- Fade-in animations
- Button press feedback
- Card hover transformations

## 🔒 Security Features

- JWT token-based authentication
- Password hashing with bcrypt
- Secure cookie handling
- CORS configuration
- Input validation and sanitization
- File upload restrictions

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints for tablets and desktops
- Flexible grid layouts
- Touch-friendly interface elements
- Optimized for all screen sizes

## 🚀 Performance Optimizations

- Efficient database queries
- Image optimization
- Lazy loading components
- Optimized bundle sizes
- Caching strategies

## 🛠️ Development

### Available Scripts

**Backend:**
- `npm start` - Start development server with nodemon
- `npm run build` - Build for production

**Frontend:**
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Code Quality
- ESLint configuration
- Consistent code formatting
- Error handling patterns
- TypeScript-ready structure

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🎯 Future Enhancements

- [ ] Real-time messaging
- [ ] Post creation and management
- [ ] Like and comment system
- [ ] Follow/unfollow functionality
- [ ] Push notifications
- [ ] Advanced search
- [ ] Content moderation
- [ ] Analytics dashboard

---

**Built with ❤️ using modern web technologies**
