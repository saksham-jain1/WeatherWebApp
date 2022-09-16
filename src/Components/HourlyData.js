import { Avatar, Box, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";

const HourlyData = ({ data, degree }) => {
  const date = new Date();
  const hours = date.getHours();
  useEffect(() => {
    document.getElementById(hours)?.scrollIntoView({
      inline: "center",
      behavior: "smooth",
    });
  }, []);

  return (
    <Box
      w="100px"
      mx=".7rem"
      my=".4rem"
      bg={hours == data.time.slice(11, 13) ? "blue.300" : "whiteAlpha.400"}
      flex="0 0 auto"
      padding="10px"
      borderRadius="xl"
      display="flex"
      flexDir="column"
      justifyContent="center"
      alignItems="center"
      style={{ boxShadow: "0 0 5px #fff" }}
      id={data.time.slice(11, 13)}
      className="innerBox"
    >
      <Text h="100%" textAlign="center" fontSize="1rem">
        {hours == data.time.slice(11, 13)
          ? "Now"
          : `${data.time.slice(11, 13) % 12 || 12}${data.time.slice(13, 16)} ${
              data.time.slice(11, 13) >= 12 ? "PM" : "AM"
            }`}
      </Text>
      <Text>{data.gust_kph}&nbsp;k/h</Text>
      <Avatar size="sm" src={data.condition.icon} />
      <Text textAlign="center" fontSize="1rem">
        {degree ? `${data.temp_c} ℃` : `${data.temp_f} ℉`}
      </Text>
    </Box>
  );
};

export default HourlyData;
