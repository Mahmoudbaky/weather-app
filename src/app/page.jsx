"use client";
import Image from "next/image";
import React from "react";
import axios from "axios";
import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import Weather from "../app/sections/weather";
import Spinner from "../app/sections/Spinner";

export default function Home() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(false);

  const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
  const BASE_URL = process.env.NEXT_PUBLIC_WEATHER_BASE_URL;

  const url = `${BASE_URL}?q=${city}&units=metric&appid=${API_KEY}`;

  const getWeather = (e) => {
    e.preventDefault();
    setLoading(true);
    axios.get(url).then((response) => {
      setWeather(response.data);
      // console.log(response.data);
    });
    setCity("");
    setLoading(false);
  };

  if (loading) {
    return <Spinner />;
  } else {
    return (
      <div>
        {/** Background Image */}
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/40 z-[1]" />
        <Image
          src={
            "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1774&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          alt="bg"
          layout="fill"
          className="object-cover"
        />

        {/** Search bar */}
        <div className="relative flex justify-between items-center max-w-[500px] w-full m-auto mt-5 text-white z-10">
          <form
            onSubmit={getWeather}
            className="flex justify-between items-center w-full m-auto p-3  bg-transparent border border-gray-300 rounded-2xl"
          >
            <div>
              <input
                onChange={(e) => setCity(e.target.value)}
                type="text"
                placeholder="Type your city"
                className="bg-transparent border-none text-white focus:outline-none text-2xl"
              />
            </div>
            <button onClick={getWeather}>
              <BsSearch />
            </button>
          </form>
        </div>

        {/** Weather */}
        {weather.main && <Weather data={weather} />}
      </div>
    );
  }
}
