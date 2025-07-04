import React from 'react';
import styles from './HomePage.module.css';
import Hero from '../../components/Hero/Hero';
import Categories from '../../components/Categories/Categories';
import PopularCourses from '../../components/PopularCourses/PopularCourses';
import Instructors from '../../components/Instructors/Instructors';
import Testimonials from '../../components/Testimonials/Testimonials';
import Contact from '../../components/Contact/Contact';
import News from '../../components/News/News';

const HomePage = () => {
  return (
    <div className={styles.homePage}>
      <Hero />
      <Categories />
      {/* <PopularCourses /> */}
      <Instructors />
      <Testimonials />
      <Contact />
      <News />
    </div>
  );
};

export default HomePage;