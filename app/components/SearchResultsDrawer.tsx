import { Box } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { PropsWithChildren } from "react";

type SearchResultsDrawerProps = PropsWithChildren<{}>;

const MotionBox = motion(Box);

export const SearchResultsDrawer = ({ children }: SearchResultsDrawerProps) => {
  const [initialY, setInitialY] = useState(0);
  const [topConstraint, setTopConstraint] = useState(0);
  const [bottomConstraint, setBottomConstraint] = useState(0);

  useEffect(() => {
    // const vh = window.innerHeight * 0.01; // Calculate the value of 1vh in pixels
    // setInitialY(75 * vh);
    // setTopConstraint(15 * vh);
    // setBottomConstraint(-10 * vh); // For example, -50vh as the top drag constraint
    const vh = window.innerHeight * 0.01;
    setInitialY(55 * vh);
    setTopConstraint(90 * vh);
    setBottomConstraint(85 * vh - 20);
  }, []);

  return (
    <MotionBox
      bgColor="purple.900"
      px={4}
      borderRadius="lg"
      initial={{ y: initialY }} // Set initial position
      animate={{ y: initialY }}
      drag="y"
      dragConstraints={{
        top: 0, // Allow to drag up to the header
        bottom: bottomConstraint, // Allow to hide outside the viewport
      }}
      dragElastic={1}
      width="100%"
      height="90vh"
      overflow="hidden"
    >
      {children}
    </MotionBox>
  );
};
