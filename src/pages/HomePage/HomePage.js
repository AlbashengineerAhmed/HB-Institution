import React from 'react';
import './HomePage.css';
import Hero from '../../components/Hero/Hero';
import PopularCourses from '../../components/PopularCourses/PopularCourses';
import Instructors from '../../components/Instructors/Instructors';
import Testimonials from '../../components/Testimonials/Testimonials';
import Contact from '../../components/Contact/Contact';
import News from '../../components/News/News';

const HomePage = () => {
  return (
    <div className="home-page">
      <Hero />
      <PopularCourses />
      <Instructors />
      <Testimonials />
      <Contact />
      <News />
    </div>
  );
};

export default HomePage;