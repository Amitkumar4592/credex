import OpenAI from 'openai';

// Initialize OpenAI client with API key from environment variables
// IMPORTANT: In production, NEVER expose API keys in client-side code
// This is for demo purposes only. In a real app, use a backend service to make API calls.
const apiKey = import.meta.env.VITE_OPENAI_API_KEY || '';

// Create OpenAI client instance
let openai = null;

// Log API key status (not the actual key) for debugging
if (apiKey) {
  console.log('OpenAI API key is configured');
  
  try {
    openai = new OpenAI({
      apiKey: apiKey,
      dangerouslyAllowBrowser: true // Only for demo purposes
    });
    console.log('OpenAI client initialized successfully');
  } catch (error) {
    console.error('Error initializing OpenAI client:', error.message);
  }
} else {
  console.log('No OpenAI API key found. Using fallback responses.');
}

/**
 * Get a response from OpenAI API
 * @param {string} message - User message
 * @returns {Promise<string>} - AI response
 */
export const getChatResponse = async (message) => {
  if (!openai) {
    // Return fallback response if API key is not available
    return getFallbackResponse(message);
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful customer service agent for SoftSell, a software license resale platform. Keep responses brief (under 100 words) and focused on helping customers sell their software licenses. SoftSell helps businesses recoup value from unused software licenses through a 3-step process: Upload License, Get Valuation, Get Paid. We purchase Microsoft, Adobe, Autodesk, Oracle, and many other software licenses."
        },
        {
          role: "user",
          content: message
        }
      ],
      max_tokens: 150,
      temperature: 0.7,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    return "I'm sorry, I'm having trouble connecting to our service right now. Please try again later or contact us directly at support@softsell.com";
  }
};

/**
 * Get a fallback response if API is not available
 * @param {string} message - User message
 * @returns {string} - Fallback response
 */
const getFallbackResponse = (message) => {
  const lcMessage = message.toLowerCase();
  
  if (lcMessage.includes('sell') && lcMessage.includes('license')) {
    return 'To sell your license, follow our 3-step process: Upload your license details, receive a valuation within 24 hours, and get paid once you accept our offer!';
  } else if (lcMessage.includes('valuation') || lcMessage.includes('worth')) {
    return 'Our pricing depends on the license type, age, and demand. Upload your license details through our portal for a quick, no-obligation valuation.';
  } else if (lcMessage.includes('payment') || lcMessage.includes('paid')) {
    return 'We offer payments via bank transfer, PayPal, or cryptocurrency. Funds are typically processed within 48 hours of completing the sale.';
  } else if (lcMessage.includes('process') || lcMessage.includes('how')) {
    return 'Our process is simple: 1) Upload your license details, 2) Receive a valuation from our team, 3) Accept the offer and get paid!';
  } else if (lcMessage.includes('types') || lcMessage.includes('what licenses')) {
    return 'We purchase a wide range of software licenses including Microsoft, Adobe, Autodesk, Oracle, and many more. Enterprise, OEM, and perpetual licenses are all accepted.';
  } else {
    return 'Thanks for your message! If you have specific questions about selling software licenses, I\'d be happy to help.';
  }
};
