import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Globe, Clock, Target } from 'lucide-react';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [socialProof, setSocialProof] = useState({
    athletes_count: 0,
    countries_count: 0,
    waitlist_count: 0
  });
  const [countersAnimated, setCountersAnimated] = useState(false);

  // Scroll to top and trigger animation when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
    // Trigger fade-in animation after a short delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Fetch social proof stats
  useEffect(() => {
    const fetchSocialProof = async () => {
      try {
        const res = await fetch(`${API_URL}/api/public/social-proof`);
        if (res.ok) {
          const data = await res.json();
          setSocialProof(data);
        }
      } catch (error) {
        console.error('Failed to fetch social proof:', error);
        // Use fallback values
        setSocialProof({
          athletes_count: 150,
          countries_count: 12,
          waitlist_count: 200
        });
      }
    };
    fetchSocialProof();
  }, []);

  // Animate counters when visible
  useEffect(() => {
    if (isVisible && !countersAnimated && socialProof.athletes_count > 0) {
      setCountersAnimated(true);
    }
  }, [isVisible, socialProof, countersAnimated]);

  // Animated counter component
  const AnimatedCounter = ({ end, duration = 2000, suffix = '' }) => {
    const [count, setCount] = useState(0);
    
    useEffect(() => {
      if (!countersAnimated) return;
      
      let startTime;
      const animate = (currentTime) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        setCount(Math.floor(easeOut * end));
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      requestAnimationFrame(animate);
    }, [end, duration, countersAnimated]);
    
    return <span>{count}{suffix}</span>;
  };

  return (
    <div className="about-page">
      <div className="about-container">
        {/* Hero Section */}
        <div className="about-hero-section">
          <h1 className="about-main-title">ABOUT RAZE</h1>
          <p className="about-subtitle">Built by Discipline. Made to Move.</p>
        </div>

        {/* Social Proof Section */}
        <section className={`social-proof-section ${isVisible ? 'animate-fade-in' : ''}`}>
          <div className="social-proof-container">
            <div className="social-proof-item">
              <div className="social-proof-icon">
                <Users size={32} />
              </div>
              <div className="social-proof-content">
                <span className="social-proof-number">
                  <AnimatedCounter end={socialProof.athletes_count || 150} />+
                </span>
                <span className="social-proof-label">Athletes Trust RAZE</span>
              </div>
            </div>
            
            <div className="social-proof-divider" />
            
            <div className="social-proof-item">
              <div className="social-proof-icon">
                <Globe size={32} />
              </div>
              <div className="social-proof-content">
                <span className="social-proof-number">
                  <AnimatedCounter end={socialProof.countries_count || 12} />+
                </span>
                <span className="social-proof-label">Countries Worldwide</span>
              </div>
            </div>
            
            <div className="social-proof-divider" />
            
            <div className="social-proof-item">
              <div className="social-proof-icon">
                <Clock size={32} />
              </div>
              <div className="social-proof-content">
                <span className="social-proof-number">
                  <AnimatedCounter end={socialProof.waitlist_count || 200} />+
                </span>
                <span className="social-proof-label">On the Waitlist</span>
              </div>
            </div>
          </div>
          
          <p className="social-proof-tagline">
            Join the growing community of gymnasts who train with RAZE
          </p>
        </section>

        {/* Main Content */}
        <div className="about-content">
          <section className="about-story-section">
            <p className="about-lead-text">
              Most sportswear is designed to look good — not to move properly.
            </p>
            <p className="about-paragraph">
              As gymnasts, we understand how frustrating it feels when clothing holds you back during real training:
            </p>
            <ul className="about-pain-points">
              <li>too tight in the shoulders and hips</li>
              <li>too loose during swings and landings</li>
              <li>uncomfortable when stretching, sprinting, or fully extending</li>
            </ul>
            <p className="about-paragraph about-mission">
              That's why RAZE was created — performance clothing designed for full range of movement, so athletes can train comfortably and focus on execution, not adjusting their outfit.
            </p>
          </section>

          {/* Brand Values Section */}
          <section className="brand-values-section">
            <h2 className="brand-values-title">WHAT WE STAND FOR</h2>
            <div className="brand-values-grid">
              <div className={`brand-value-card ${isVisible ? 'animate-fade-in-up' : ''}`}>
                <div className="brand-value-icon">
                  <Target size={28} />
                </div>
                <h3>Athletes First</h3>
                <p>Every design decision starts with performance. We build for the athlete, not the mannequin.</p>
              </div>
              <div className={`brand-value-card ${isVisible ? 'animate-fade-in-up delay-100' : ''}`}>
                <div className="brand-value-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
                    <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                    <path d="M2 17l10 5 10-5"/>
                    <path d="M2 12l10 5 10-5"/>
                  </svg>
                </div>
                <h3>Quality Over Quantity</h3>
                <p>We release fewer pieces, but each one is obsessively refined. No filler, no fast fashion.</p>
              </div>
              <div className={`brand-value-card ${isVisible ? 'animate-fade-in-up delay-200' : ''}`}>
                <div className="brand-value-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M12 6v6l4 2"/>
                  </svg>
                </div>
                <h3>Built to Last</h3>
                <p>Our gear is designed to survive thousands of training sessions. Durability is non-negotiable.</p>
              </div>
            </div>
          </section>

          {/* RAZE IN MOTION - Image Gallery Section */}
          <section className="about-gallery-section">
            <h2 className="about-gallery-title">RAZE IN MOTION</h2>
            <div className="about-gallery-grid about-gallery-two">
              {/* Image 1 - MAG Athlete with Animation */}
              <div className={`about-gallery-item about-gallery-main ${isVisible ? 'animate-fade-in-up' : ''}`}>
                <img 
                  src="/images/athletes/mag_athlete.jpg" 
                  alt="Male gymnast training - athletic performance"
                  className="about-gallery-image"
                  data-testid="about-image-main"
                />
                <span className="about-image-label">Men's Athletic Gymnastics</span>
              </div>
              
              {/* Image 2 - WAG Athlete */}
              <div className="about-gallery-item">
                <img 
                  src="/images/athletes/wag_athlete.jpg" 
                  alt="Female gymnast training - athletic performance"
                  className="about-gallery-image"
                  data-testid="about-image-lifestyle"
                />
                <span className="about-image-label">Women's Athletic Gymnastics</span>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="about-cta-section">
            <div className="about-cta-content">
              <p className="about-cta-text">Train with purpose. Move with confidence.</p>
              <Link to="/products" className="about-cta-button">
                Shop Collection <ArrowRight size={20} />
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;
