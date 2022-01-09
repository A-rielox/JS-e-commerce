import React from 'react';
import styled from 'styled-components';
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs';

const Stars = ({ stars, reviews }) => {
   const tempStars = Array.from({ length: 5 }, (_, index) => {
      /* revisar la forma manual de abajo pa entender mejor */
      const number = index + 0.2;

      return (
         <span key={index}>
            {stars >= index + 1 ? (
               <BsStarFill />
            ) : stars >= number ? (
               <BsStarHalf />
            ) : (
               <BsStar />
            )}
         </span>
      );
   });

   return (
      <Wrapper>
         <div className="stars">{tempStars}</div>

         <p className="reviews">({reviews} customer reviews)</p>
      </Wrapper>
   );
};

/* forma manual de poner las estrellas 

<div className="stars">
   <span>
      {stars >= 1 ? (
         <BsStarFill />
      ) : stars >= 0.2 ? (
         <BsStarHalf />
      ) : (
         <BsStar />
      )}
   </span>
   <span>
      {stars >= 2 ? (
         <BsStarFill />
      ) : stars >= 1.2 ? (
         <BsStarHalf />
      ) : (
         <BsStar />
      )}
   </span>
   <span>
      {stars >= 3 ? (
         <BsStarFill />
      ) : stars >= 2.2 ? (
         <BsStarHalf />
      ) : (
         <BsStar />
      )}
   </span>
   <span>
      {stars >= 4 ? (
         <BsStarFill />
      ) : stars >= 3.2 ? (
         <BsStarHalf />
      ) : (
         <BsStar />
      )}
   </span>
   <span>
      {stars >= 5 ? (
         <BsStarFill />
      ) : stars >= 4.2 ? (
         <BsStarHalf />
      ) : (
         <BsStar />
      )}
   </span>
<div>
*/

const Wrapper = styled.div`
   display: flex;
   align-items: center;
   span {
      color: #ffb900;
      font-size: 1rem;
      margin-right: 0.25rem;
   }
   p {
      margin-left: 0.5rem;
      margin-bottom: 0;
   }
   margin-bottom: 0.5rem;
`;
export default Stars;
