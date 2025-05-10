import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/HomePage.css';

function HomePage() {
  const [htmlContent, setHtmlContent] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/index.html')
      .then(response => response.text())
      .then(html => {
        setHtmlContent(html);
      })
      .catch(error => console.error('Error loading HTML:', error));
  }, []);

  // useEffect(() => {
    
  //   const handleClick = (e) => {
      
  //     if (
  //       e.target.textContent.includes('ADOPTION') ||
  //       e.target.closest('.box')?.querySelector('h5')?.textContent.includes('ADOPTION')
  //     ) {
  //       e.preventDefault();
  //       navigate('/adoption');
  //     }
  //   };

  //   document.addEventListener('click', handleClick);
  //   return () => document.removeEventListener('click', handleClick);
  // }, [navigate]);

  return (
    <div className="home-page-container">
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </div>
  );
}

export default HomePage;