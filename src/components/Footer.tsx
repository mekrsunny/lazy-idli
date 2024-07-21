import React, { useEffect, useRef, useState } from 'react';
import BannerImage1 from '../assets/BANER-SHANNH 1.png';
import BannerImage2 from '../assets/main-bg.png';
import '../styles/Footer.css';

const delay = 5000;

const AutoScrollingFooter: React.FC = () => {
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef<number | null>(null);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = window.setTimeout(
      () => setIndex((prevIndex) => (prevIndex === 1 ? 0 : prevIndex + 1)),
      delay
    );

    return () => {
      resetTimeout();
    };
  }, [index]);

  return (
    <footer>
      <div className="slideshow">
        <div
          className="slideshowSlider"
          style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
        >
          <div className="slide">
            <img src={BannerImage1} alt="Scrolling Footer 1" className="scrolling-image" />
          </div>
          <div className="slide">
            <img src={BannerImage2} alt="Scrolling Footer 2" className="scrolling-image" />
          </div>
        </div>
      </div>
      <div id="footer-2">
        <p className="scroll-text">Footer: Disclaimers/ Announcements/ etc</p>
      </div>
    </footer>
  );
};

export default AutoScrollingFooter;
