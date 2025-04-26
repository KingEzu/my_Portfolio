import React from 'react';
import Service from './mini-home/Service';
//import FHome from './mini-home/FHome';
//import PricingCarousel from './mini-home/PricingCarousel';
import ContactMe from './mini-home/contactMe';
//import CallToAction from './mini-home/CallToAction';
import MatrixRainV12 from './mini-home/MatrixRainV12';
import Subscribe from './mini-home/Subscribe';


const Home = () => {
  return (
    <article className="px-5 mt-10 sm:mt-14 md:mt-16 lg:mt-24 xl:mt-32 sm:mx-auto w-full max-w-[1050] flex flex-col gap-14">
      {/* FHome section */}
      <section className="h-[99.9vh] w-full mt-0">
  <MatrixRainV12 />
</section>

     {/* <section className="h-[90.9vh] w-full">
        <PricingCarousel />
      </section>

       Service section */}
   
   <section className="w-full sm:h-[67vh] h-[150vh]">
  <Service />
</section>
<section className="w-full mt-8 sm:h-[68vh] h-[50vh]">
  <Subscribe />
</section>



<section className="w-full sm:h-[68vh] h-[90vh]">
  <ContactMe />
</section>

    

    </article>


  );
};

export default Home;
