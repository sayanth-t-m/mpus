import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Party, Stars } from 'lucide-react';
import 'App.css';

const ProposalPage = () => {
  const [expression, setExpression] = useState('normal');
  const [character, setCharacter] = useState('panda');
  const [isNearNo, setIsNearNo] = useState(false);
  const [noHoverCount, setNoHoverCount] = useState(0);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState('');
  const [isCelebrating, setIsCelebrating] = useState(false);

  const messages = {
    normal: "Will you be mine? 💕",
    pleading: "Please don't go there... 🥺",
    sad: "No... don't do this... 😢",
    crying: "I'm going to cry... 😭",
    happy: "Yay! Come closer! 🥰",
    celebrating: "WOOHOO! I'M SO HAPPY! 🎉✨💖"
  };

  useEffect(() => {
    if (isNearNo) {
      setNoHoverCount(prev => prev + 1);
      if (noHoverCount > 2) {
        setExpression('crying');
        setMessage(messages.crying);
      } else {
        setExpression('sad');
        setMessage(messages.sad);
      }
    } else {
      if (!isCelebrating) {
        setExpression('normal');
        setMessage(messages.normal);
      }
    }
  }, [isNearNo]);

  const handleYes = () => {
    setExpression('celebrating');
    setMessage(messages.celebrating);
    setShowMessage(true);
    setIsCelebrating(true);
  };

  const handleNoButtonHover = () => {
    setIsNearNo(true);
    setShowMessage(true);
  };

  const handleNoButtonLeave = () => {
    setIsNearNo(false);
  };

  const handleYesHover = () => {
    if (!isCelebrating) {
      setExpression('happy');
      setMessage(messages.happy);
      setShowMessage(true);
    }
  };

  const handleYesLeave = () => {
    if (!isCelebrating) {
      setExpression('normal');
      setMessage(messages.normal);
    }
  };

  const CelebrationParticles = () => (
    <motion.div className="celebration-container">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="particle"
          initial={{ 
            x: "50%", 
            y: "50%", 
            scale: 0 
          }}
          animate={{ 
            x: `${Math.random() * 100}%`,
            y: `${Math.random() * 100}%`,
            scale: [0, 1, 0],
            rotate: [0, 360]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
            delay: i * 0.1
          }}
        >
          {i % 3 === 0 ? (
            <Heart className="heart-particle" size={24} />
          ) : i % 3 === 1 ? (
            <Stars className="star-particle" size={24} />
          ) : (
            <Party className="party-particle" size={24} />
          )}
        </motion.div>
      ))}
    </motion.div>
  );

  const Character = ({ type, expression }) => {
    return (
      <svg viewBox="0 0 200 200" className="character">
        <circle 
          cx="100" 
          cy="100" 
          r="55" 
          fill={type === 'panda' ? 'white' : '#ffddbb'} 
          stroke="black" 
          strokeWidth="2" 
        />
        {type === 'panda' ? (
          <>
            <circle cx="60" cy="55" r="18" fill="black" />
            <circle cx="140" cy="55" r="18" fill="black" />
            <circle cx="60" cy="55" r="12" fill="#ffdddd" />
            <circle cx="140" cy="55" r="12" fill="#ffdddd" />
          </>
        ) : (
          <>
            <path d="M50 50 L70 85 L90 50 Z" fill="#ffddbb" stroke="black" strokeWidth="2" />
            <path d="M110 50 L130 85 L150 50 Z" fill="#ffddbb" stroke="black" strokeWidth="2" />
          </>
        )}
        {expression === 'normal' && (
          <>
            <circle cx="80" cy="95" r="15" fill="black" />
            <circle cx="120" cy="95" r="15" fill="black" />
            <circle cx="85" cy="90" r="5" fill="white" />
            <circle cx="125" cy="90" r="5" fill="white" />
            <path d="M70 115 Q100 125 130 115" fill="none" stroke="black" strokeWidth="3" />
          </>
        )}
      </svg>
    );
  };

  return (
    <div className="proposal-page">
      <Character type={character} expression={expression} />
      {showMessage && <p className="message">{message}</p>}
      <div className="button-group">
        <motion.button
          className="yes-button"
          whileHover={{ scale: 1.1 }}
          onClick={handleYes}
          onHoverStart={handleYesHover}
          onHoverEnd={handleYesLeave}
        >
          Yes
        </motion.button>
        
        <motion.button
          className="no-button"
          whileHover={{
            x: Math.random() * 80 - 40,
            y: Math.random() * 80 - 40,
            scale: 1.1,
          }}
          onHoverStart={handleNoButtonHover}
          onHoverEnd={handleNoButtonLeave}
        >
          No
        </motion.button>
      </div>
      {isCelebrating && <CelebrationParticles />}
    </div>
  );
};

export default ProposalPage;
