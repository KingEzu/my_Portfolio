import React, { useRef } from 'react';
import Hero from './sub-componetnts/Hero';
import TimeLine from './sub-componetnts/TimeLine';
import Skills from './sub-componetnts/Skills';
import Portfolio from './sub-componetnts/Portfolio';
import Apps from './sub-componetnts/Apps';
import About from './sub-componetnts/About';
import Contact from './sub-componetnts/Contact';
import ContactMe from './mini-home/contactMe';

const AboutMe = () => {
  // Create a ref for the contact section
  const contactRef = useRef(null);

  // Scroll to contact section
  const scrollToContact = () => {
    console.log("Scroll to Contact triggered");
    contactRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <article className="px-5 mt-10 sm:mt-14 md:mt-16 lg:mt-24 xl:mt-32 sm:mx-auto w-full max-w-[1050] flex flex-col gap-14">
      <Hero scrollToContact={scrollToContact} />
      <About />
      <TimeLine />
      <Skills />
      <Apps />
      <Portfolio />
      
      {/* Pass the scroll function to the ContactMe button */}

      
      {/* Contact Section, attach the ref here */}
      <section className="h-[50.9vh] w-full">
      <div ref={contactRef}>
        <Contact />
      </div>
      </section>
      
    </article>
  );
};

export default AboutMe;
