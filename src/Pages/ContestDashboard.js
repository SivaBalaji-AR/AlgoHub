import React, { useState, useEffect } from "react";
import fetchProblemOfTheDay from "../Functions/fetchProblemOfTheDay.js";
import fetchContests from "../Functions/fetchContests.js";

const ContestDashboard = () => {
  const [problemOfTheDay, setProblemOfTheDay] = useState(null);
  const [contests, setContests] = useState([]);

  useEffect(() => {
    fetchProblemOfTheDay().then(setProblemOfTheDay).catch(console.error);
    fetchContests().then(setContests).catch(console.error);
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Coding Challenges & Contests</h1>
      
      {problemOfTheDay ? (
        <div className="mb-6 p-4 bg-gray-100 rounded-lg">
          <h2 className="text-xl font-semibold">Problem of the Day</h2>
          <p className="mt-2">
            <a href={problemOfTheDay.url} className="text-blue-600 hover:underline">
              {problemOfTheDay.title}
            </a>
          </p>
        </div>
      ) : (
        <p>Loading problem of the day...</p>
      )}
      
      <div className="bg-gray-100 p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Upcoming Contests</h2>
        {contests.length > 0 ? (
          <ul className="list-disc pl-5">
            {contests.map((contest, index) => (
              <li key={index} className="mt-2">
                <a href={contest.url} className="text-blue-600 hover:underline">
                  {contest.name} - {new Date(contest.startTime).toLocaleString()}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p>No upcoming contests.</p>
        )}
      </div>
    </div>
  );
};

export default ContestDashboard;
