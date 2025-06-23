import React from 'react';
import Slider from 'react-slick';
import './Testimonials.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Testimonials = () => {
  // Sample testimonials data
  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Web Development Student',
      image: '/images/test-2-avatar-1.png',
      text: 'The courses offered here have completely transformed my career path. The instructors are knowledgeable and supportive, making complex concepts easy to understand.'
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'UI/UX Design Graduate',
      image: '/images/test-2-avatar-2.png',
      text: 'I\'ve taken several design courses, and the quality of instruction is consistently excellent. The practical projects helped me build a portfolio that landed me my dream job.'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      role: 'Data Science Professional',
      image: '/images/test-2-avatar-3.png',
      text: 'The data science program exceeded my expectations. The curriculum is up-to-date with industry standards, and the mentorship program provided valuable guidance for my career.'
    }
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <section className="testimonials-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">What Our Students Say</h2>
        </div>
        
        <div className="testimonials-slider-container">
          <Slider {...settings}>
            {testimonials.map(testimonial => (
              <div className="testimonial-slide" key={testimonial.id}>
                <div className="testimonial-card">
                  <div className="testimonial-content">
                    <div className="quote-icon">❝</div>
                    <p className="testimonial-text">{testimonial.text}</p>
                  </div>
                  <div className="testimonial-author">
                    <img 
                      src={testimonial.image} 
                      alt={`${testimonial.name} - ${testimonial.role}`} 
                      className="testimonial-avatar" 
                    />
                    <div className="testimonial-info">
                      <h4 className="testimonial-name">{testimonial.name}</h4>
                      <p className="testimonial-role">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;