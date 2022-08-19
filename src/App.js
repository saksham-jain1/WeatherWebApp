import { Box, Heading, Image, Input, Select, Text } from "@chakra-ui/react";
import React, { useEffect, useState, useRef } from "react";
import sunny from "./Backgrounds/sunny.jpg";
import clear from "./Backgrounds/clear.jpg";
import cloudsDay from "./Backgrounds/cloudsDay.jpg";
import cloudNight from "./Backgrounds/cloudNight.jpg";
import mistyDay from "./Backgrounds/mistyDay.jpg";
import mistNight from "./Backgrounds/mistNight.jpg";
import rainyDay from "./Backgrounds/rainyDay.jpg";
import rainyNight from "./Backgrounds/rainyNight.jpg";
import snowDay from "./Backgrounds/snowDay.jpg";
import snowNight from "./Backgrounds/snowNight.jpg";
import thunderstrom from "./Backgrounds/thunderstrom.jpg";
import HourlyData from "./Components/HourlyData";
import DailyData from "./Components/DailyData";
import "./index.css";

function App() {
  const [loading, setLoading] = useState(false);
  const [Data, setData] = useState();
  const [degree, setDegree] = useState(true);
  const [color, setColor] = useState("white");
  const [place, setPlace] = useState("Jhansi");
  const [time, setTime] = useState("");
  const [bg, setBg] = useState(sunny);

  setInterval(() => {
    const date = new Date();
    let hours = date.getHours();
    let hrs12 = hours % 12 || 12;
    let ampm = hours >= 12 ? "PM" : "AM";
    let min = date.getMinutes();
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    let month = months[date.getMonth()];
    let day = days[date.getDay()];
    if (min < 10) min = "0" + min;
    if (hrs12 < 10) hrs12 = "0" + hrs12;
    setTime([`${hrs12}:${min}`, ampm, `${day}, ${date.getDate()} ${month}`]);
  }, 1000);

  useEffect(() => {
    const url = `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${place}&days=3`;
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "446a409049msh47998da26c7a8b7p1e677bjsn1413f932d878",
        "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
      },
    };
    setData("");
    setLoading(true);
    if (place.length > 2)
      fetch(url, options)
        .then((res) => res.json())
        .then((json) => {
          setData(json);
          setLoading(false);
          setColor("white");
          let hours = json.current.last_updated.slice(11, 13);
          if (json.current.condition.code == 1000) {
            if (hours >= 18 || hours <= 6) {
              setBg(clear);
            } else {
              setBg(sunny);
            }
          } else if (
            json.current.condition.code >= 1003 &&
            json.current.condition.code <= 1009
          ) {
            if (hours >= 18 || hours <= 6) {
              setBg(cloudNight);
            } else {
              setBg(cloudsDay);
            }
          } else if (
            (json.current.condition.code >= 1117 &&
              json.current.condition.code <= 1147) ||
            json.current.condition.code == 1130
          ) {
            if (hours >= 18 || hours <= 6) {
              setBg(mistNight);
            } else {
              setBg(mistyDay);
              setColor("black");
            }
          } else if (
            (json.current.condition.code >= 1240 &&
              json.current.condition.code <= 1246) ||
            (json.current.condition.code >= 1150 &&
              json.current.condition.code <= 1195) ||
            json.current.condition.code == 1072 ||
            json.current.condition.code == 1063 ||
            json.current.condition.code == 1069
          ) {
            if (hours >= 18 || hours <= 6) {
              setBg(rainyNight);
            } else {
              setBg(rainyDay);
            }
          } else if (
            (json.current.condition.code >= 1249 &&
              json.current.condition.code <= 1264) ||
            (json.current.condition.code >= 1198 &&
              json.current.condition.code <= 1237) ||
            json.current.condition.code == 1114 ||
            json.current.condition.code == 1066
          ) {
            if (hours >= 18 || hours <= 6) {
              setBg(snowNight);
            } else {
              setBg(snowDay);
              setColor("black");
            }
          } else if (
            (json.current.condition.code >= 1273 &&
              json.current.condition.code <= 1282) ||
            json.current.condition.code == 1087
          ) {
            setBg(thunderstrom);
          }
        })
        .catch((err) => {
          setData("");
          setLoading(false);
          console.error("error:" + err);
        });
    else setLoading(false);
  }, [place]);

  return (
    <Box
      w="100vw"
      h="100vh"
      bgImage={bg}
      bgPosition="center"
      bgAttachment="fixed"
      backgroundSize="cover"
      bgRepeat="no-repeat"
      position="relative"
      color={color}
    >
      <Box
        p="1rem"
        w="100%"
        display="flex"
        bg="blackAlpha.400"
        alignItems="center"
      >
        <Input
          placeholder="Enter City"
          value={place}
          onChange={(e) => setPlace(e.target.value)}
          color={color}
          textTransform="capitalize"
        />
        <Select
          w="100px"
          mx="1rem"
          color="black"
          bg="whiteAlpha.400"
          fontWeight="bold"
          onChange={(e) => {
            setDegree(!degree);
          }}
        >
          <option p="1">&#8451;</option>
          <option p="1">&#8457;</option>
        </Select>
      </Box>
      <Box
        w="100%"
        px="3rem"
        display="flex"
        justifyContent="space-between"
        flexWrap="wrap"
      >
        <Box
          width={{ base: "100%", md: "50%" }}
          display="flex"
          alignItems="center"
          mb="2rem"
          justifyContent="center"
          flexDir="column"
        >
          <Box display="flex">
            <Text fontSize="5rem">{time[0]}</Text>
            <Text
              fontSize="2.5rem"
              display="flex"
              px="2rem"
              py="1rem"
              alignItems="flex-end"
            >
              {time[1]}
            </Text>
          </Box>
          <Text fontSize="1.8rem">{time[2]}</Text>
        </Box>
        {Data ? (
          <Box
            display="flex"
            flexDir="column"
            justifyContent="center"
            alignItems="center"
            width={{ base: "100%", md: "50%" }}
          >
            <Box display="flex" justifyContent="center" alignItems="center">
              <Text fontSize="2rem">
                {degree
                  ? `${Data?.current?.temp_c} ℃`
                  : `${Data?.current?.temp_f} ℉`}
              </Text>
              <Image boxSize="100px" src={Data?.current?.condition?.icon} />
            </Box>

            <Text fontSize="1.8rem">{Data?.current?.condition?.text}</Text>
          </Box>
        ) : (
          ""
        )}
      </Box>
      {Data ? (
        <>
          <Text position="absolute" right="1.5rem" top="4.2rem">
            {Data?.location?.name}, {Data?.location?.region}
          </Text>
          <Box
            display="flex"
            py=".3rem"
            bg="blackAlpha.400"
            mt={{ base: ".5rem", md: "5rem" }}
            h={{ base: "20%", md: "27%" }}
            flexDir="column"
            mb="0"
          >
            <Heading w="100%" textAlign="center">
              Hourly
            </Heading>
            <Box w="100%" display="flex" h="100%" overflowX="auto">
              {Data?.forecast?.forecastday[0]?.hour?.map((curr, id) => {
                return (
                  <HourlyData
                    key={id}
                    degree={degree}
                    data={curr}
                  />
                );
              })}
            </Box>
          </Box>
          <Box
            w="100%"
            display="flex"
            flexDir="column"
            bottom="0"
            mt="0"
            h={{ base: "24%", md: "26.5%" }}
            bg="blackAlpha.500"
            id="daily"
          >
            <Heading w="100%" textAlign="center">
              Daily Forecast
            </Heading>
            <Box w="100%" display="flex" h="100%" overflowX="auto">
              {Data?.forecast?.forecastday?.map((curr, id) => {
                return <DailyData key={id} data={curr} degree={degree} />;
              })}
            </Box>
          </Box>
        </>
      ) : (
        <Box
          w="100%"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Text fontSize="5rem">
            {loading
              ? "Searching..."
              : place.length > 2
              ? "No Data Found"
              : "Please Enter City Name"}
          </Text>
        </Box>
      )}
    </Box>
  );
}

export default App;



