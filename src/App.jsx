import { useState, useEffect, useRef } from 'react';
import './App.css';
import { 
  FaUpload, FaMoneyBillWave, FaClipboardCheck, 
  FaShieldAlt, FaClock, FaHandshake, FaHeadset,
  FaComments, FaTimes, FaArrowRight, FaMoon, FaSun 
} from 'react-icons/fa';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    licenseType: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [showChat, setShowChat] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { sender: 'bot', text: 'Hi there! How can I help you with selling your software licenses today?' }
  ]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const chatRef = useRef(null);

  // Toggle dark/light mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Apply dark mode to document if enabled
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  // Scroll to bottom of chat when new messages arrive
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [chatMessages]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field when user types
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Validate form before submission
  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) errors.name = 'Name is required';
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email';
    }
    
    if (!formData.company.trim()) errors.company = 'Company is required';
    if (!formData.licenseType) errors.licenseType = 'Please select a license type';
    if (!formData.message.trim()) errors.message = 'Message is required';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // In a real app, you would send the data to a server here
      alert('Form submitted successfully! We will contact you soon.');
      // Reset form
      setFormData({
        name: '',
        email: '',
        company: '',
        licenseType: '',
        message: ''
      });
    }
  };

  // Handle chat message submission with OpenAI integration
  const handleChatSubmit = async (e) => {
    e.preventDefault();
    console.log('Chat submit triggered');
    
    if (!currentMessage.trim()) {
      console.log('Empty message, not sending');
      return;
    }
    
    const userMessage = currentMessage;
    console.log('Sending message:', userMessage);
    
    // Add user message
    setChatMessages(prev => [...prev, { sender: 'user', text: userMessage }]);
    
    // Clear input field immediately
    setCurrentMessage('');
    
    // Show typing indicator
    setChatMessages(prev => [...prev, { sender: 'bot', text: '...', isTyping: true }]);
    
    try {
      // Import the OpenAI service
      console.log('Importing OpenAI service...');
      const { getChatResponse } = await import('./services/openai');
      
      // Get response from OpenAI
      console.log('Calling OpenAI API...');
      const response = await getChatResponse(userMessage);
      console.log('Received response from API');
      
      // Remove typing indicator and add actual response
      setChatMessages(prev => {
        const newMessages = prev.filter(msg => !msg.isTyping);
        return [...newMessages, { sender: 'bot', text: response }];
      });
    } catch (error) {
      console.error('Error in chat:', error);
      
      // Remove typing indicator and add error message
      setChatMessages(prev => {
        const newMessages = prev.filter(msg => !msg.isTyping);
        return [...newMessages, { 
          sender: 'bot', 
          text: 'Sorry, I experienced a technical issue. Please try again later.' 
        }];
      });
    }
  };

  // Handle predefined questions using the OpenAI API
  const handlePredefinedQuestion = async (question) => {
    // Add user question to chat
    setChatMessages(prev => [...prev, { sender: 'user', text: question }]);
    
    // Show typing indicator
    setChatMessages(prev => [...prev, { sender: 'bot', text: '...', isTyping: true }]);
    
    try {
      // Import the OpenAI service
      const { getChatResponse } = await import('./services/openai');
      
      // Get response from OpenAI
      const response = await getChatResponse(question);
      
      // Remove typing indicator and add actual response
      setChatMessages(prev => {
        const newMessages = prev.filter(msg => !msg.isTyping);
        return [...newMessages, { sender: 'bot', text: response }];
      });
    } catch (error) {
      console.error('Error in predefined question:', error);
      
      // Fallback responses if API fails
      let fallbackResponse;
      
      switch(question) {
        case 'How do I sell my license?':
          fallbackResponse = 'To sell your license, follow our 3-step process: Upload your license details, receive a valuation within 24 hours, and get paid once you accept our offer!';
          break;
        case 'How long does the process take?':
          fallbackResponse = 'The entire process typically takes 2-5 business days. Valuation is provided within 24 hours, and payment is processed within 48 hours of accepting the offer.';
          break;
        case 'What types of licenses do you buy?':
          fallbackResponse = 'We purchase a wide range of software licenses including Microsoft, Adobe, Autodesk, Oracle, and many more. Enterprise, OEM, and perpetual licenses are all accepted.';
          break;
        default:
          fallbackResponse = 'Thanks for your question! Our team will be happy to provide more information.';
      }
      
      // Remove typing indicator and add fallback response
      setChatMessages(prev => {
        const newMessages = prev.filter(msg => !msg.isTyping);
        return [...newMessages, { sender: 'bot', text: fallbackResponse }];
      });
    }
  };

  return (
    <div className={`app-container ${darkMode ? 'dark-mode' : ''}`}>
      {/* Header with Dark Mode Toggle */}
      <header>
        <div className="logo">
          <span>Soft</span>Sell
        </div>
        <div className="dark-mode-toggle" onClick={toggleDarkMode}>
          {darkMode ? <FaSun /> : <FaMoon />}
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Transform Unused Software Licenses Into Cash</h1>
          <p>SoftSell helps businesses recoup value from unused or legacy software licenses with our quick, secure, and transparent resale platform.</p>
          <div className="cta-buttons">
            <button className="cta-primary">Sell My Licenses</button>
            <button className="cta-secondary">Get a Quote</button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works-section">
        <h2>How It Works</h2>
        <div className="steps-container">
          <div className="step">
            <div className="step-icon">
              <FaUpload />
            </div>
            <h3>Upload License</h3>
            <p>Submit your software license details through our secure portal for review.</p>
          </div>
          <div className="step">
            <div className="step-icon">
              <FaClipboardCheck />
            </div>
            <h3>Get Valuation</h3>
            <p>Receive a fair market valuation within 24 hours from our expert team.</p>
          </div>
          <div className="step">
            <div className="step-icon">
              <FaMoneyBillWave />
            </div>
            <h3>Get Paid</h3>
            <p>Accept our offer and receive payment through your preferred method.</p>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="why-choose-us-section">
        <h2>Why Choose Us</h2>
        <div className="benefits-container">
          <div className="benefit">
            <div className="benefit-icon">
              <FaShieldAlt />
            </div>
            <h3>Secure & Compliant</h3>
            <p>All transactions follow legal compliance procedures to ensure safe license transfers.</p>
          </div>
          <div className="benefit">
            <div className="benefit-icon">
              <FaClock />
            </div>
            <h3>Fast Processing</h3>
            <p>From valuation to payment, our streamlined process takes just 2-5 business days.</p>
          </div>
          <div className="benefit">
            <div className="benefit-icon">
              <FaHandshake />
            </div>
            <h3>Best Market Value</h3>
            <p>Our pricing algorithms ensure you get the maximum value for your software licenses.</p>
          </div>
          <div className="benefit">
            <div className="benefit-icon">
              <FaHeadset />
            </div>
            <h3>Expert Support</h3>
            <p>Our dedicated team of software licensing specialists is available to assist at every step.</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <h2>What Our Customers Say</h2>
        <div className="testimonials-container">
          <div className="testimonial">
            <p>"SoftSell helped our organization recover over $50,000 from unused enterprise licenses after a company restructuring. Their process was straightforward and efficient."</p>
            <div className="testimonial-author">
              <h4>Sarah Johnson</h4>
              <p>CTO, TechVision Inc.</p>
            </div>
          </div>
          <div className="testimonial">
            <p>"We were skeptical at first, but SoftSell delivered on their promises. The valuation was fair, and the payment was processed quickly. Highly recommended for any IT department looking to optimize costs."</p>
            <div className="testimonial-author">
              <h4>Michael Chen</h4>
              <p>IT Director, Global Solutions LLC</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="contact-section" id="contact">
        <h2>Get in Touch</h2>
        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={formErrors.name ? 'error' : ''}
            />
            {formErrors.name && <p className="error-message">{formErrors.name}</p>}
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={formErrors.email ? 'error' : ''}
            />
            {formErrors.email && <p className="error-message">{formErrors.email}</p>}
          </div>
          
          <div className="form-group">
            <label htmlFor="company">Company</label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleInputChange}
              className={formErrors.company ? 'error' : ''}
            />
            {formErrors.company && <p className="error-message">{formErrors.company}</p>}
          </div>
          
          <div className="form-group">
            <label htmlFor="licenseType">License Type</label>
            <select
              id="licenseType"
              name="licenseType"
              value={formData.licenseType}
              onChange={handleInputChange}
              className={formErrors.licenseType ? 'error' : ''}
            >
              <option value="">Select a license type</option>
              <option value="Microsoft">Microsoft</option>
              <option value="Adobe">Adobe</option>
              <option value="Oracle">Oracle</option>
              <option value="Autodesk">Autodesk</option>
              <option value="VMware">VMware</option>
              <option value="Other">Other</option>
            </select>
            {formErrors.licenseType && <p className="error-message">{formErrors.licenseType}</p>}
          </div>
          
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              className={formErrors.message ? 'error' : ''}
              rows="4"
            ></textarea>
            {formErrors.message && <p className="error-message">{formErrors.message}</p>}
          </div>
          
          <button type="submit" className="submit-button">Submit</button>
        </form>
      </section>

      {/* Chat Widget */}
      <div className={`chat-widget ${showChat ? 'open' : ''}`}>
        <div className="chat-header" onClick={() => setShowChat(!showChat)}>
          <span>{showChat ? 'Close Chat' : 'Chat with Us'}</span>
          {showChat ? <FaTimes /> : <FaComments />}
        </div>
        
        {showChat && (
          <div className="chat-body">
            <div className="chat-messages" ref={chatRef}>
              {chatMessages.map((msg, index) => (
                <div key={index} className={`message ${msg.sender}`}>
                  {msg.text}
                </div>
              ))}
            </div>
            
            <div className="predefined-questions">
              <button onClick={() => handlePredefinedQuestion('How do I sell my license?')}>
                How do I sell my license?
              </button>
              <button onClick={() => handlePredefinedQuestion('How long does the process take?')}>
                How long does the process take?
              </button>
              <button onClick={() => handlePredefinedQuestion('What types of licenses do you buy?')}>
                What types of licenses do you buy?
              </button>
            </div>
            
            <form onSubmit={handleChatSubmit} className="chat-input-form">
              <input
                type="text"
                placeholder="Type your message..."
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleChatSubmit(e);
                  }
                }}
                autoComplete="off"
                aria-label="Chat message"
              />
              <button 
                type="submit"
                aria-label="Send message"
                onClick={(e) => {
                  e.preventDefault();
                  handleChatSubmit(e);
                }}
              >
                <FaArrowRight />
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer>
        <div className="footer-content">
          <div className="footer-logo">
            <span>Soft</span>Sell
          </div>
          <p>&copy; {new Date().getFullYear()} SoftSell. All rights reserved.</p>
          <div className="footer-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App
