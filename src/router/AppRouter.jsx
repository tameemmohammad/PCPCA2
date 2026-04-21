import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useApp } from "../context/AppContent";
import { useState } from "react";
const ActivityCard = ({ a }) => (
  <div style={{ border: "1px solid gray", margin: 10, padding: 10 }}>
    <h3>{a.name || "Unknown"}</h3>
    <p>Date: {a.date || "No Date"}</p>
    <p>Steps: {a.steps}</p>
    <p>Calories: {a.caloriesBurned}</p>
    <p>Workout: {a.workoutMinutes}</p>
    <p>Goal: {a.goalAchied ? "Yes" : "No"}</p>
  </div>
);
const FilterPage = () => {
  const { activities } = useApp();
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const validActivities = activities.filter((a) =>
    a.steps > 0 &&
    a.caloriesBurned > 0 &&
    a.workoutMinutes > 0 &&
    typeof a.goalAchied === "boolean"
  );
  const handleFilter = () => {
    if (input === "") {
      setError("Please enter a value");
      return;
    }
    if (isNaN(input) || Number(input) < 0) {
      setError("Invalid input");
      return;
    }
    setError("");
  };
  const filtered = validActivities.filter(
    (a) => a.steps >= Number(input || 0)
  );
  return (
    <div>
      <h2>Filter Activities</h2>
      <input type="text" placeholder="Enter steps" value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={handleFilter}>Filter</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!error &&
        filtered.map((a, i) => <ActivityCard key={i} a={a} />)}
    </div>
  );
};
const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/activities" element={<div>Activities Page</div>} />
        <Route path="/activities/:id" element={<div>Details Page</div>} />
        <Route path="/filters" element={<FilterPage />} />
      </Routes>
    </BrowserRouter>
  );
};
export default AppRouter;