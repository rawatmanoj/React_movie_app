import React from 'react';
import './HeroImage.css';
import Swiper from 'react-id-swiper';

const HeroImage = (props)=>{
 console.log(4);

 const params = {
    pagination: {
      el: '.swiper-pagination',
      type: 'progressbar',
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    }
  }
     return(
        <Swiper {...params}>

         <div className="rmdb-heroimage"
          style={{
              background:
              `linear-gradient(to bottom,rgba(0,0,0,0)
              39%,rgba(0,0,0,0)
              41%,rgba(0,0,0,0.65)100%),
              url('${props.image}'),#1c1c1c`
          }}
         >
            <div className="rmdb-heroimage-content">
                <div className="rmdb-heroimage-text">
                   <h1>{props.title}</h1>
                   <p>{props.text}</p>
                </div>
            </div>
         </div>
         
         </Swiper>

     );

}

export default HeroImage;
// const HeroImage = () => {
//     const params = {
//       pagination: {
//         el: '.swiper-pagination',
//         type: 'progressbar',
//       },
//       navigation: {
//         nextEl: '.swiper-button-next',
//         prevEl: '.swiper-button-prev',
//       }
//     }
//     return (
//       <Swiper {...params}>
//         <div>Slide #1</div>
//         <div>Slide #2</div>
//         <div>Slide #3</div>
//         <div>Slide #4</div>
//         <div>Slide #5</div>
//       </Swiper>
//     )
//   };
//   export default HeroImage;