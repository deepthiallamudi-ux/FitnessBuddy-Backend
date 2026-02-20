# FitnessBuddy Backend API

Complete Node.js/Express REST API for the FitnessBuddy fitness social platform.

**Live Deployment:** [Deploy on Render](#-deployment)
https://fitnessbuddy-backend.onrender.com

## 🎯 Project Overview

FitnessBuddy Backend is a comprehensive REST API powering the FitnessBuddy fitness social platform.

### ✅ Core Features
- **User Profiles** - CRUD operations, search, and discovery
- **Workout Tracking** - Log, track, and share fitness activities  
- **Goals Management** - Set and track fitness goals with progress
- **Achievements & Badges** - Unlock badges based on milestones
- **Buddy System** - Connect with other fitness enthusiasts
- **Real-time Chat** - Message buddies with read status tracking
- **Leaderboard** - Global rankings with intelligent points calculation
- **Gym Finder** - Search nearby gyms using Google Places API

### 📊 Advanced Features
- **Workout Statistics** - Total workouts, duration, calories, distance
- **Read/Unread Messages** - Message status tracking
- **Progress Tracking** - Real-time goal progress updates
- **Cohort Leaderboards** - Rankings among buddy connections
- **Profile Search** - Find users by username, location, goal, or workout type

---

## 🛠️ Tech Stack

### Backend Framework
| Technology | Purpose | Version |
|-----------|---------|---------|
| **Node.js** | JavaScript runtime | v16+ |
| **Express.js** | Web framework & routing | 5.2.1 |
| **JavaScript** | Language with async/await | ES6+ |

### Database & Auth
| Technology | Purpose |
|-----------|---------|
| **Supabase** | PostgreSQL database + Auth |
| **PostgreSQL** | Relational database engine |
| **Row-Level Security** | Row-based access control |

### External Services
| Service | Purpose |
|---------|---------|
| **Google Places API** | Nearby gym finder |

### Dependencies
```json
{
  "@supabase/supabase-js": "^2.96.0",
  "axios": "^1.13.5",
  "bcrypt": "^6.0.0",
  "cors": "^2.8.6",
  "dotenv": "^17.3.1",
  "express": "^5.2.1",
  "jsonwebtoken": "^9.0.3",
  "nodemon": "^3.1.11" (dev only)
}
```

---

## 📥 Installation Steps

### 1. Prerequisites
- Node.js v16+ installed
- Git installed  
- Supabase account: https://app.supabase.com
- Google API key (Places API enabled)

### 2. Clone Repository
```bash
git clone https://github.com/your-username/FitnessBuddy-Backend.git
cd FitnessBuddy-Backend/BackEnd
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Create `.env` File
Create `.env` in the `BackEnd` directory:

```env
PORT=5000
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
GOOGLE_API_KEY=your_google_places_api_key
NODE_ENV=development
```

**Get Your Credentials:**
- **Supabase**: [app.supabase.com](https://app.supabase.com) → Project Settings → API
- **Google API**: [console.cloud.google.com](https://console.cloud.google.com) → Enable Places API

### 5. Run Server
**Development:**
```bash
npm run dev
```

**Production:**
```bash
npm start
```

Server runs on `http://localhost:5000`

### 6. Verify Installation
```bash
curl http://localhost:5000/health
# Expected response: { "status": "ok" }
```

## 🔌 API Documentation

**Full API details:** See [API_DOCUMENTATION.md](API_DOCUMENTATION.md)

### Base URL
```
http://localhost:5000/api
```

### 41 Total Endpoints (All Tested ✅)

#### **Profiles (5 endpoints)**
```
GET    /api/profiles                    Get all profiles
GET    /api/profiles/:userId            Get single profile
GET    /api/profiles/search/query       Search profiles by query
PUT    /api/profiles/:userId            Update profile
DELETE /api/profiles/:userId            Delete profile
```

#### **Workouts (6 endpoints)**
```
GET    /api/workouts/all                Get all workouts
GET    /api/workouts/user/:userId       Get user's workouts
GET    /api/workouts/stats/:userId      Get workout statistics
POST   /api/workouts                    Create workout
PUT    /api/workouts/:workoutId         Update workout
DELETE /api/workouts/:workoutId         Delete workout
```

#### **Goals (7 endpoints)**
```
GET    /api/goals/all                   Get all goals
GET    /api/goals/user/:userId          Get user's goals
POST   /api/goals                       Create goal
PUT    /api/goals/:goalId               Update goal
PUT    /api/goals/:goalId/progress      Update goal progress
PUT    /api/goals/:goalId/complete      Mark goal complete
DELETE /api/goals/:goalId               Delete goal
```

#### **Achievements (5 endpoints)**
```
GET    /api/achievements/all            Get all achievements
GET    /api/achievements/user/:userId   Get user achievements
GET    /api/achievements/counts         Get achievement counts
POST   /api/achievements                Create achievement
DELETE /api/achievements/:achievementId Delete achievement
```

#### **Buddy System (6 endpoints)**
```
GET    /api/buddies/user/:userId        Get user's buddies
GET    /api/buddies/pending/:userId     Get pending requests
POST   /api/buddies                     Create buddy request
POST   /api/buddies/accept              Accept request
POST   /api/buddies/reject              Reject request
POST   /api/buddies/remove              Remove buddy
```

#### **Chat (7 endpoints)**
```
GET    /api/chat/user/:userId           Get user's chats
GET    /api/chat/unread/:userId         Get unread count
GET    /api/chat/conversation/:userId/:buddyId  Get conversation
POST   /api/chat/send                   Send message
PUT    /api/chat/:messageId/read        Mark message read
PUT    /api/chat/conversation/:userId/:senderId/read  Mark conversation read
DELETE /api/chat/:messageId             Delete message
```

#### **Leaderboard (3 endpoints)**
```
GET    /api/leaderboard                 Global leaderboard
GET    /api/leaderboard/rank/:userId    Get user rank
GET    /api/leaderboard/cohort/:userId  Buddy leaderboard
```

#### **Gym Finder (1 endpoint)**
```
GET    /api/gyms/nearby                 Find nearby gyms
```

#### **Health Check (1 endpoint)**
```
GET    /health                          Health status

---

## 🗄️ Database Schema

### Core Tables

#### **Profiles**
```sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  username TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  age INTEGER,
  location TEXT,
  goal TEXT,           -- e.g., "Weight Loss", "Flexibility"
  workout TEXT,        -- e.g., "Swimming", "Cycling"
  weekly_goal INTEGER DEFAULT 150,
  avatar_url TEXT,
  latitude DECIMAL,
  longitude DECIMAL,
  bio TEXT,
  weight INTEGER,
  height INTEGER,
  target_weight INTEGER,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### **Workouts**
```sql
CREATE TABLE workouts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  type TEXT NOT NULL,       -- e.g., "Running", "Yoga", "Gym"
  duration INTEGER NOT NULL, -- minutes
  distance DECIMAL,         -- km
  calories INTEGER,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### **Goals**
```sql
CREATE TABLE goals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT,
  goal_type TEXT,           -- "daily", "weekly", "monthly"
  target INTEGER,
  current INTEGER DEFAULT 0,
  unit TEXT,
  completed BOOLEAN DEFAULT FALSE,
  deadline DATE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### **Achievements**
```sql
CREATE TABLE achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  achievement TEXT,
  badge_type TEXT,          -- "gold", "silver", "bronze"
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### **Buddies**
```sql
CREATE TABLE buddies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  buddy_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'pending', -- "pending", "connected"
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, buddy_id)
);
```

#### **Chat Messages**
```sql
CREATE TABLE chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  receiver_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Data Relationships
```
profiles (1) ← → (many) workouts
profiles (1) ← → (many) goals
profiles (1) ← → (many) achievements
profiles (1) ← → (many) buddies
profiles (1) ← → (many) chat_messages
```

### Row-Level Security (RLS)
- Users can view all profiles for discovery
- Users can only update their own profile
- Users can only access their own workouts, goals, achievements
- Users can only view messages they sent or received
- Buddy relationships are bidirectional

**Full deployment guide:** See [RENDER_DEPLOYMENT_GUIDE.md](../RENDER_DEPLOYMENT_GUIDE.md)

## 🧪 Testing

### Using cURL
```bash
# Get all profiles
curl http://localhost:5000/api/profiles

# Create a workout
curl -X POST http://localhost:5000/api/workouts \
  -H "Content-Type: application/json" \
  -d '{
    "userId":"0013b281-a81e-46ff-be50-679de6424b6b",
    "type":"Running",
    "duration":45,
    "distance":5,
    "calories":300
  }'

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| Server won't start | Check PORT not in use, verify `.env` file exists |
| API returns 500 | Check Supabase connection, verify RLS policies |
| Database errors | Ensure SUPABASE_SERVICE_ROLE_KEY is correct, not anon key |
| CORS errors | Verify frontend URL is in CORS whitelist |
| Missing environment variables | Create `.env` file with all required variables |

**Next Step:** Deploy on [Render](https://render.com) or your preferred hosting platform!
