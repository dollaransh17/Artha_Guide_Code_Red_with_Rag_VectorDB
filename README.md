# ArthaGuide - Financial Clarity for India's Gig Workers

**Tagline:** Your money. Your language. Your guide.

## Tech Stack

### Frontend
- React.js (with Vite)
- Tailwind CSS
- Chart.js & react-chartjs-2
- React-i18next (multilingual support)
- Axios (API calls)

### Backend
- FastAPI
- JWT Authentication
- MongoDB (with Motor async driver)
- OpenAI/Gemini/Groq LLM APIs
- Custom SMS Parser & Analytics Engine

### Database & Storage
- MongoDB
- Firebase Storage (for document storage)

## Project Structure

```
_Fintech_/
├── frontend/           # React + Vite frontend
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── services/    # API services
│   │   ├── i18n/        # Internationalization
│   │   └── utils/       # Utility functions
│   └── package.json
│
├── backend/            # FastAPI backend
│   ├── app/
│   │   ├── api/         # API routes
│   │   ├── models/      # Data models
│   │   ├── services/    # Business logic
│   │   └── core/        # Core configs
│   ├── requirements.txt
│   └── .env.example
│
└── index.html          # Original prototype (can be archived)
```

## Setup Instructions

### Prerequisites
- Node.js 18+ & npm
- Python 3.9+
- MongoDB (local or Atlas)
- OpenAI API Key

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will run on http://localhost:3000

### Backend Setup

```bash
cd backend

# Create virtual environment
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
cp .env.example .env

# Edit .env and add your:
# - MongoDB URL
# - OpenAI API Key
# - Secret key for JWT

# Run the server
uvicorn app.main:app --reload --port 8000
```

The backend will run on http://localhost:8000

### Environment Variables

Create `.env` in `backend/` directory:

```env
MONGODB_URL=mongodb://localhost:27017
DATABASE_NAME=arthaguide
SECRET_KEY=your-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
OPENAI_API_KEY=your-openai-api-key-here
CORS_ORIGINS=http://localhost:3000
```

## Features

✅ **SMS-Based Transaction Tracking**  
- Automatic SMS parsing using regex
- Category detection (Food, Travel, Bills, etc.)
- No manual entry required

✅ **Multilingual Support**  
- English, Hindi, Kannada
- Full UI and chatbot support

✅ **Financial Analytics**  
- Income/Expense tracking
- Spending pattern visualization
- Financial Health Score
- Cash flow predictions

✅ **AI Loan Advisor**  
- Powered by OpenAI GPT
- Context-aware advice
- Loan eligibility calculator
- Multilingual responses

## API Endpoints (To be implemented)

```
POST   /api/auth/register      # User registration
POST   /api/auth/login         # User login
POST   /api/sms/parse          # Parse SMS transactions
GET    /api/transactions       # Get user transactions
GET    /api/analytics/summary  # Financial summary
GET    /api/analytics/health-score  # Health score
POST   /api/advisor/chat       # Chat with AI advisor
```

## Development

### Frontend Development
```bash
cd frontend
npm run dev     # Start dev server
npm run build   # Production build
```

### Backend Development
```bash
cd backend
source venv/bin/activate
uvicorn app.main:app --reload
```

## Next Steps

1. **Add OpenAI API Key** in `backend/.env`
2. **Set up MongoDB** (local or cloud)
3. **Complete API routes** in `backend/app/api/`
4. **Connect frontend to backend** - Update API calls
5. **Test full flow** - SMS parsing → Analytics → AI Advisor

## Team
**Hackistanis** - Ramaiah Institute of Technology  
Built for **CODE RED 3.0** Hackathon

## License
© 2025 ArthaGuide. All rights reserved.
