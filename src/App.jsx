import React, { useEffect } from "react";
import "./App.css";
import { useStateContext } from "./Context";
import { BackgroundLayout, WeatherCard, MiniCard } from "./Components";
import SearchBar from "./Components/SearchBar";
import Settings from "./Components/Setting";
import logo from "./assets/icons/logo.png";
import PullToRefreshComponent from "./Components/PullToRefreshComponent";
import { Routes, Route } from "react-router-dom";
import NotFound from "./Components/404";
import CityCard from "./Components/CityCards";
import LocationCard from "./Components/LocationCard";

const defaultCities = ["Delhi", "Jaipur", "Kolkata"];

function App() {
	const {
		weather,
		thisLocation,
		values,
		place,
		setPlace,
		fetchWeather,
		fetchWeatherByCoords,
	} = useStateContext();
	const [unit, setUnit] = React.useState("C");
	const [currentLocs, setCurrentLocs] = React.useState(() => {
		const storedArray = localStorage.getItem("currentLocs");
		return storedArray ? JSON.parse(storedArray) : defaultCities;
	});

	useEffect(() => {
		localStorage.setItem("currentLocs", JSON.stringify(currentLocs));
	}, [currentLocs]);

	const convertTemperature = (temp) => {
		return unit === "C" ? temp : Math.round(temp * 1.8) + 32;
	};

	const handleRefresh = async () => {
		console.log("Refreshing weather data...");
		await fetchWeather();
	};

	const handleCityClick = async (city) => {
		setPlace(city);
		await fetchWeather();
	};

	const handleLocationClick = async () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				async (position) => {
					const { latitude, longitude } = position.coords;
					await fetchWeatherByCoords(latitude, longitude);
				},
				(error) => {
					console.error("Error getting location:", erro
