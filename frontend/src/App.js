// Importing necessary dependencies and components
import logo from './logo.svg'; // Importing logo image
import './App.css'; // Importing CSS styles
import { Button, Paper } from '@mui/material'; // Importing Button and Paper components from Material-UI

import TypingGame from './game/typinggame2'; // Importing TypingGame component
import { useEffect, useState } from 'react'; // Importing useEffect and useState hooks
import HasLoggedIn from './0LoggedIn/LoggedIn'; // Importing HasLoggedIn component
import NotLoggedIn from './0LoggedIn/notLoggedIn'; // Importing NotLoggedIn component
import { blue, red } from '@mui/material/colors';

// Main App component
function App() {
  // State variables using useState hook to manage component state
  const [loggedIn, setloggedIn] = useState(false); // State for user's login status
  const [wpmStat, setWpmStat] = useState(""); // State for words per minute statistic
  const [accuracyStat, setAccuracyStat] = useState(""); // State for accuracy statistic
  const [username, setUsername] = useState(""); // State for username


  // Fetching token and user data
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("username");
  const userwpm = localStorage.getItem("userwpm");
  const useraccuracy = localStorage.getItem("useraccuracy");

  // useEffect to check for token and auto-login if available
  useEffect(() => {
    if (token && !loggedIn) {
      console.log("token still available: " + token);
      handleLogin();
    }
    console.log("token:" + token)
    console.log("yo");
  }, []);

  // useEffect to update stats when wpmStat or accuracyStat changes
  useEffect(() => {
    if (loggedIn) {
      putStats();
    }
  }, [wpmStat, accuracyStat]);

  // Function to send user stats to the server
  const putStats = () => {
    console.log("username: " + user);
    const stats = {
      username: user,
      averageWpm: wpmStat,
      averageAccuracy: accuracyStat
    };
    async function postData() {
      await fetch(`http://localhost:8080/api/stats/postuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(stats)
      })
        .then((response) => response.json())
        .then((actualData) => console.log(actualData))
        .then(() => getStats());
    }
    postData();
  };
  // Function to fetch user stats from the server
  const getStats = () => {
    async function getData() {
      await fetch(`http://localhost:8080/api/stats/getuser/${user}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` }
      })
        .then((response) => response.json())
        .then((actualData) => {
          console.log("data " + actualData);
          localStorage.setItem("userwpm", actualData[1]); localStorage.setItem("useraccuracy", actualData[0]);
        });
    }
    getData();
  };

  // Function to handle user login
  const handleLogin = () => {
    setloggedIn(true);
  };

  // Function to handle user logout
  const handleLogout = () => {
    setloggedIn(false);
    localStorage.removeItem("token");
  };

  // JSX returned by the App component
  return (
    <div>
      <div id='main' className='main'>
        {/* Conditional rendering based on login status */}
        {loggedIn ? (
          <div>
            <HasLoggedIn username={username} handleLogout={handleLogout} />
            <p style={{paddingLeft:"100px"}}>User: {user} <br/> Wpm: {userwpm} <br/> Accuracy: {useraccuracy}%</p>
          </div>
        ) : (
          <NotLoggedIn setUsername={setUsername} handleLogin={handleLogin} />
        )}
        {/* TypingGame component with props */}
        <TypingGame setWpmStat={setWpmStat} setAccuracyStat={setAccuracyStat} />
        {/* Displaying user-specific stats */}

      </div>
    </div>
  );
}

// Exporting the App component as default
export default App;

// Fix suggestions
// - Implement error catching

