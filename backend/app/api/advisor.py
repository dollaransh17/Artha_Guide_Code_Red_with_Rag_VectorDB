from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from openai import OpenAI
import os

router = APIRouter()

class AdvisorRequest(BaseModel):
    message: str
    language: str = "en"

class AdvisorResponse(BaseModel):
    response: str

# Initialize OpenAI client
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

@router.post("/chat", response_model=AdvisorResponse)
async def chat_with_advisor(request: AdvisorRequest):
    """
    AI Financial Advisor endpoint - generates personalized responses using OpenAI
    """
    try:
        # System prompts for different languages
        system_prompts = {
            "en": """You are ArthaGuide AI, a financial advisor for India's gig workers (Uber drivers, Swiggy delivery partners, freelancers).
            
Your role:
- Provide loan advice (eligibility, amounts, EMI calculations, best lenders)
- Credit score improvement tips
- Savings and investment guidance
- Answer in a friendly, conversational tone
- Keep responses concise (3-5 sentences max)
- Use emojis sparingly for clarity
- Focus on Indian financial products (MoneyTap, PaySense, KreditBee, etc.)
- Assume user has ₹45,000 monthly income, ₹32,000 expenses, ₹13,000 savings

Format responses with:
💰 for money topics
🏆 for recommendations
📅 for timeframes
💵 for EMI/payments
🏦 for lenders
✅ for tips
""",
            "hi": """आप ArthaGuide AI हैं, भारत के गिग वर्कर्स (Uber ड्राइवर, Swiggy डिलीवरी पार्टनर, फ्रीलांसर) के लिए एक वित्तीय सलाहकार हैं।

आपकी भूमिका:
- ऋण सलाह प्रदान करें (पात्रता, राशि, EMI गणना, सर्वश्रेष्ठ ऋणदाता)
- क्रेडिट स्कोर सुधार टिप्स
- बचत और निवेश मार्गदर्शन
- मित्रवत, संवादात्मक स्वर में उत्तर दें
- संक्षिप्त प्रतिक्रियाएँ रखें (अधिकतम 3-5 वाक्य)
- स्पष्टता के लिए इमोजी का कम उपयोग करें
- भारतीय वित्तीय उत्पादों पर ध्यान दें (MoneyTap, PaySense, KreditBee, आदि)
- मान लें कि उपयोगकर्ता की मासिक आय ₹45,000, खर्च ₹32,000, बचत ₹13,000 है
""",
            "kn": """ನೀವು ArthaGuide AI, ಭಾರತದ ಗಿಗ್ ವರ್ಕರ್ಸ್ (Uber ಚಾಲಕರು, Swiggy ಡೆಲಿವರಿ ಪಾಲುದಾರರು, ಫ್ರೀಲಾನ್ಸರ್‌ಗಳು) ಗಾಗಿ ಹಣಕಾಸು ಸಲಹೆಗಾರರು.

ನಿಮ್ಮ ಪಾತ್ರ:
- ಸಾಲ ಸಲಹೆ ನೀಡಿ (ಅರ್ಹತೆ, ಮೊತ್ತಗಳು, EMI ಲೆಕ್ಕಾಚಾರಗಳು, ಉತ್ತಮ ಸಾಲದಾತರು)
- ಕ್ರೆಡಿಟ್ ಸ್ಕೋರ್ ಸುಧಾರಣೆ ಸಲಹೆಗಳು
- ಉಳಿತಾಯ ಮತ್ತು ಹೂಡಿಕೆ ಮಾರ್ಗದರ್ಶನ
- ಸ್ನೇಹಪರ, ಸಂವಾದಾತ್ಮಕ ಸ್ವರದಲ್ಲಿ ಉತ್ತರಿಸಿ
- ಸಂಕ್ಷಿಪ್ತ ಪ್ರತಿಕ್ರಿಯೆಗಳನ್ನು ಇರಿಸಿ (ಗರಿಷ್ಠ 3-5 ವಾಕ್ಯಗಳು)
- ಸ್ಪಷ್ಟತೆಗಾಗಿ ಇಮೋಜಿಗಳನ್ನು ಸ್ವಲ್ಪವಾಗಿ ಬಳಸಿ
- ಭಾರತೀಯ ಹಣಕಾಸು ಉತ್ಪನ್ನಗಳ ಮೇಲೆ ಕೇಂದ್ರೀಕರಿಸಿ (MoneyTap, PaySense, KreditBee, ಇತ್ಯಾದಿ)
"""
        }
        
        system_prompt = system_prompts.get(request.language, system_prompts["en"])
        
        # Call OpenAI API
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": request.message}
            ],
            max_tokens=200,
            temperature=0.7
        )
        
        ai_response = response.choices[0].message.content
        
        return AdvisorResponse(response=ai_response)
        
    except Exception as e:
        # Fallback to basic response if OpenAI fails
        fallback_responses = {
            "en": "💬 I'm here to help with loans, savings, and credit advice. Could you please rephrase your question?",
            "hi": "💬 मैं ऋण, बचत और क्रेडिट सलाह में मदद के लिए यहां हूं। क्या आप कृपया अपना प्रश्न दोहरा सकते हैं?",
            "kn": "💬 ನಾನು ಸಾಲಗಳು, ಉಳಿತಾಯ ಮತ್ತು ಕ್ರೆಡಿಟ್ ಸಲಹೆಯೊಂದಿಗೆ ಸಹಾಯ ಮಾಡಲು ಇಲ್ಲಿದ್ದೇನೆ. ದಯವಿಟ್ಟು ನಿಮ್ಮ ಪ್ರಶ್ನೆಯನ್ನು ಮರುಹೊಂದಿಸಬಹುದೇ?"
        }
        
        return AdvisorResponse(
            response=fallback_responses.get(request.language, fallback_responses["en"])
        )

@router.get("/health")
async def advisor_health():
    """Health check for advisor service"""
    return {"status": "healthy", "service": "AI Advisor"}
