# SoftSell - Software License Resale Platform

## Project Overview
SoftSell is a responsive, single-page marketing website for a fictional software resale startup, built using React and Vite. The website allows businesses to sell their unused software licenses through a streamlined process for maximum value.

## Live Demo
[View live demo](https://softsell-demo.netlify.app) (Note: Replace with actual deployment URL)

## Features Implemented

1. **Responsive Design**
   - Mobile-first approach with responsive layouts for all screen sizes
   - Clean, modern UI with intuitive navigation

2. **Core Sections**
   - **Hero Section**: Engaging headline with clear value proposition and dual CTA buttons
   - **How It Works**: Three-step process visualization with icons
   - **Why Choose Us**: Four key benefits with visual icons
   - **Customer Testimonials**: Two customer success stories
   - **Contact Form**: Complete lead capture form with validation

3. **Advanced Features**
   - **Dark/Light Mode Toggle**: User preference for color scheme
   - **AI-Powered Chat Widget**: Customer support chat with predefined questions
   - **Form Validation**: Client-side validation for all form fields
   - **Animations**: Subtle transitions and hover effects

4. **SEO Optimization**
   - Custom meta tags for better search engine visibility
   - Open Graph tags for social media sharing
   - Semantic HTML structure
   - Custom page title and description

5. **Accessibility**
   - Keyboard navigable interface
   - Appropriate contrast ratios
   - Semantic HTML elements

## Technical Implementation

### Tech Stack
- **Frontend Framework**: React.js with Vite
- **Styling**: Custom CSS (responsive design)
- **Icons**: React Icons library
- **Animation**: CSS transitions
- **Chat Implementation**: Simulated AI responses with predefined questions

### Design Choices

1. **Color Palette**
   - Primary: #4361ee (Blue) - Conveys trust and professionalism
   - Secondary: White and light grays - Clean, modern aesthetic
   - Dark Mode: Dark grays and modified blue tones for reduced eye strain

2. **Typography**
   - Primary Font: Segoe UI - Clean, modern, highly readable
   - Font Hierarchy: Clear size distinction between headings and body text

3. **Layout**
   - Card-based components for visual separation
   - Grid system for responsive alignment
   - Consistent padding and spacing

4. **UI Components**
   - Floating chat widget for easy access to support
   - Fixed header for easy navigation
   - Gradient backgrounds for visual interest

## Project Structure
```
src/
├── assets/
│   └── images/
├── App.jsx            # Main application component
├── App.css            # Global styles
├── index.css          # Base styles
├── main.jsx           # Application entry point
public/
├── favicon.svg        # Custom favicon
```

## Running the Project

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. **Set up OpenAI API (Optional):**
   - Sign up for an OpenAI account at [https://openai.com](https://openai.com) and get an API key
   - Create a `.env.local` file in the root of the project
   - Add your OpenAI API key to the file:
     ```
     VITE_OPENAI_API_KEY=your_openai_api_key_here
     ```
   - If no API key is provided, the chat will still work with predefined fallback responses
4. Start the development server:
   ```
   npm run dev
   ```
5. Build for production:
   ```
   npm run build
   ```

## Time Spent
- **Research & Planning**: 1 hour
- **UI/UX Design**: 2 hours
- **Core Development**: 4 hours
- **Responsive Design**: 1.5 hours
- **Chat Feature**: 1 hour
- **Testing & Bug Fixes**: 1 hour
- **Documentation**: 0.5 hour

**Total Time**: ~11 hours

## Future Improvements

1. **Backend Integration**
   - Real API endpoints for form submission
   - Database storage for leads

2. **Enhanced Features**
   - User accounts and dashboards
   - Real-time license valuation calculator
   - Integration with payment processors

3. **Performance Optimization**
   - Code splitting for faster initial load
   - Image optimization
   - Service worker for offline access

4. **Additional UX Improvements**
   - More advanced animations with Framer Motion
   - Multi-language support
   - A/B testing for conversion optimization

## License
This project is created for demonstration purposes.

