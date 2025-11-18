/**
 * Animation Variants for Framer Motion
 * Based on design system specifications
 */

import { Variants } from 'framer-motion';

// Scroll Animations
export const fadeSlideUp: Variants = {
  hidden: { 
    opacity: 0, 
    y: 30 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.0, 0.0, 0.2, 1] // Decelerate curve
    }
  }
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05
    }
  }
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.0, 0.0, 0.2, 1]
    }
  }
};

// Page Transitions
export const pageTransition: Variants = {
  exit: {
    opacity: 0,
    scale: 0.98,
    transition: { duration: 0.2 }
  },
  enter: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, delay: 0.1 }
  }
};

// Modal Animations
export const modalBackdrop: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.3 }
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2 }
  }
};

export const modalContent: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0.95,
    y: 20
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.0, 0.0, 0.2, 1]
    }
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.2 }
  }
};

// Drawer/Sheet Animations
export const drawerSlide = (direction: 'left' | 'right' = 'right'): Variants => ({
  hidden: { 
    x: direction === 'right' ? '100%' : '-100%',
    opacity: 0
  },
  visible: { 
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: [0.4, 0.0, 0.2, 1] // Sharp curve
    }
  },
  exit: {
    x: direction === 'right' ? '100%' : '-100%',
    opacity: 0,
    transition: { duration: 0.3 }
  }
});

// Success/Error Animations
export const successCheckmark: Variants = {
  hidden: { 
    scale: 0,
    opacity: 0
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.34, 1.56, 0.64, 1] // Bounce easing
    }
  }
};

export const errorShake: Variants = {
  shake: {
    x: [-10, 10, -10, 10, 0],
    transition: {
      duration: 0.4,
      ease: 'easeInOut'
    }
  }
};

// Toast Animations
export const toastSlideIn: Variants = {
  hidden: { 
    x: '100%',
    opacity: 0
  },
  visible: { 
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: [0.4, 0.0, 0.2, 1]
    }
  },
  exit: {
    x: '100%',
    opacity: 0,
    transition: { duration: 0.2 }
  }
};

// Notification Badge
export const badgePop: Variants = {
  hidden: { scale: 0 },
  visible: {
    scale: [0, 1.2, 1],
    transition: {
      duration: 0.4,
      ease: [0.34, 1.56, 0.64, 1]
    }
  }
};

// Hover Animations (for whileHover prop)
export const liftEffect = {
  y: -6,
  boxShadow: '0 12px 32px rgba(0, 0, 0, 0.15)',
  transition: {
    duration: 0.25,
    ease: [0.4, 0.0, 0.2, 1]
  }
};

export const glowEffect = {
  boxShadow: '0 0 20px rgba(124, 58, 237, 0.4)',
  transition: {
    duration: 0.3
  }
};

// Button Press
export const buttonPress = {
  scale: 0.96,
  transition: { duration: 0.1 }
};

// Continuous Animations
export const floatingAnimation = {
  y: [-10, 10],
  transition: {
    duration: 4,
    ease: 'easeInOut',
    repeat: Infinity,
    repeatType: 'reverse' as const
  }
};

export const pulseGlow = {
  opacity: [0.5, 1],
  scale: [1, 1.05],
  transition: {
    duration: 2,
    ease: 'easeInOut',
    repeat: Infinity,
    repeatType: 'reverse' as const
  }
};

// Utility: Viewport detection config
export const viewportConfig = {
  once: true,
  amount: 0.3, // 30% visibility
  margin: '0px 0px -20% 0px' // Trigger slightly before entering viewport
};
