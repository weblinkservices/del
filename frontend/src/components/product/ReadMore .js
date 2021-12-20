import React, { useState } from 'react';

const ReadMore = ({text}) => {
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {setIsReadMore(!isReadMore)};

  return (
    <p className='testimonials__quote__text'>
      {isReadMore ? text.slice(0, 350): text }
      {text.length > 350 &&
        <span className="link-des" onClick={toggleReadMore}>
          {isReadMore ? ' ... Show full description' : ' Hide full description'}
        </span>
      }
    </p>
  )
}

export default ReadMore;