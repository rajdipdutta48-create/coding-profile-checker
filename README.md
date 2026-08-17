# 🚀 Coding Profile Checker

A full-stack web application that brings your **Codeforces, LeetCode, and GitHub profiles together in one place** and uses AI to provide a personalized analysis of your coding journey.

Users can securely create an account, connect their coding profiles, view detailed statistics, and receive an AI-generated assessment containing strengths, weaknesses, recommended topics, practice strategies, and a personalized roadmap.

---

## 📑 Table of Contents

- [✨ Features](#-features)
- [🧠 AI-Powered Analysis](#-ai-powered-analysis)
- [🛠️ Tech Stack](#️-tech-stack)
- [🏗️ Project Architecture](#️-project-architecture)
- [📂 Project Structure](#-project-structure)
- [🔐 Authentication](#-authentication)
- [📊 Supported Platforms](#-supported-platforms)
- [🔌 API Endpoints](#-api-endpoints)
- [⚙️ Environment Variables](#️-environment-variables)
- [🚀 Getting Started](#-getting-started)
- [💻 Running the Project](#-running-the-project)
- [🤖 How AI Analysis Works](#-how-ai-analysis-works)
- [🧪 Testing](#-testing)
- [🔒 Security](#-security)
- [🌱 Future Improvements](#-future-improvements)
- [👨‍💻 Author](#-author)
- [📄 License](#-license)

---

## ✨ Features

### 🔐 User Authentication

- User registration
- User login
- Password hashing with bcrypt
- JWT-based authentication
- Protected authentication flow
- Persistent login using browser local storage
- Logout functionality
- Duplicate email prevention
- Input validation
- Authentication error handling

### 👤 Coding Profile Aggregation

Connect multiple coding platforms from a single dashboard:

- Codeforces
- LeetCode
- GitHub

The application fetches profile information from each platform and displays the available statistics in a unified interface.

### 📈 Codeforces Analytics

The application collects:

- Current rating
- Maximum rating
- Current rank
- Maximum rank
- Contribution
- Total submissions
- Accepted submissions
- Unique problems solved
- Problem rating distribution
- Recent submissions
- Programming languages used
- Problem tags

### 🧩 LeetCode Analytics

The application collects:

- Global ranking
- Reputation
- Total problems solved
- Easy problems
- Medium problems
- Hard problems
- Contest participation
- Contest rating
- Global contest ranking
- Top percentage
- Contest badge
- Recent accepted submissions
- Problem topics
- Topic frequency

### 🐙 GitHub Analytics

The application collects:

- Username
- Name
- Profile URL
- Avatar
- Bio
- Public repositories
- Followers
- Following
- Total contributions
- Contribution activity

### 🤖 AI Coding Mentor

The application uses Groq-powered AI to analyze the collected profile data.

The AI provides:

- Overall assessment
- Strengths
- Weaknesses
- Recommended topics
- Practice strategy
- Personalized roadmap

The AI analysis considers all available platforms instead of treating them independently.

### 🎨 Interactive UI

- Modern dark-themed interface
- Responsive design
- Glassmorphism-inspired cards
- Animated background effects
- Interactive authentication scene
- Custom login/register experience
- Responsive profile dashboard
- AI analysis dashboard
- Mobile-friendly layout

---

## 🧠 AI-Powered Analysis

The AI component transforms raw profile statistics into actionable feedback.

### Data Flow

```text
Codeforces ─┐
            │
LeetCode ───┼──→ Profile Service
            │          │
GitHub ─────┘          ↓
                  Profile Data
                       │
                       ↓
                AI Data Preparation
                       │
                       ↓
                    Groq API
                       │
                       ↓
              AI Profile Analysis
                       │
                       ↓
                React Dashboard