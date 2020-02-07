import React from 'react';
import './MovieThumb.css';

const MovieThumb = (props)=>{

    //console.log(props.image);

   return(
   <div className="rmdb-moviethumb">
       <img src={props.image} alt="moviethumb"/>
   </div>
   );
}

export default MovieThumb;