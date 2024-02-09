import { Heading } from "@chakra-ui/react";
import { useMediaQuery } from "@chakra-ui/react";

export const Header = () => {
  const [isLessThan62em] = useMediaQuery("(max-width: 62em)");
  return (
    <Heading fontSize={["lg", "xl", "2xl"]} w="full">
      Syllable Text Editor
    </Heading>
  );
};
