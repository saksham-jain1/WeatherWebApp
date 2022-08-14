import { Avatar, Box, Text } from '@chakra-ui/react';
import React from 'react'

const DailyData = ({data,degree}) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "June",
      "July",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ];
  return (
    <Box
      w="300px"
      m=".5rem"
      px="1rem"
      mx="1.2rem"
      bg="whiteAlpha.200"
      flex="0 0 auto"
      borderRadius="xl"
      style={{ boxShadow: "0 0 5px #fff" }}
    >
      <Text textAlign="center" fontSize="1rem" p=".5rem">
        <Avatar size="sm" src={data.day.condition.icon} />
        {data.date.slice(8)} - {months[data.date.slice(5, 7) - 1]} {" . "}
        {data.day.condition.text}
      </Text>
      <Box display="flex">
        <Text textAlign="center" w="50%">
          Day : {degree ? `${data.day.maxtemp_c} ℃` : `${data.day.maxtemp_f} ℉`}
        </Text>
        <Text textAlign="center" w="50%">
          Night :{" "}
          {degree ? `${data.day.mintemp_c} ℃` : `${data.day.mintemp_f} ℉`}
        </Text>
      </Box>
      <Box display="flex">
        <Text textAlign="center" w="50%">
          Humidity : {data.day.avghumidity} %
        </Text>
        <Text textAlign="center" w="50%">
          Wind : {data.day.maxwind_kph} km/h
        </Text>
      </Box>
      <Box display="flex">
        <Text textAlign="center" w="55%">
          Rain Chances: {data.day.daily_chance_of_rain} %
        </Text>
        <Text textAlign="center" w="45%">
          Visibility: {data.day.avgvis_km} km
        </Text>
      </Box>
    </Box>
  );
}

export default DailyData