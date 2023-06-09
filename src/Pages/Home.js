import React, { useState, useEffect } from 'react';
import logo from '../assets/spotify.png';
import Button  from '../Components/Button';

const Home = () => {
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);
    const [count, setCount] = useState(null);
  
    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);
  
    const showButton = () => {
      if (window.innerWidth <= 960) {
        setButton(false);
      } else {
        setButton(true);
      }
    };
  
    useEffect(() => {
      showButton();
    }, []); 
    
    function countTuples() {
	setCount("Loading...");
	fetch("/api/count")
	    .then((res) => res.json())
	    .then((count) => setCount(count));
    }

    return (
        <div className="profile">
        <img src={logo} alt="Spotify Logo" className="logo" />
        <h1 className="welcome-message">
            Welcome to CIS4301 DataBases Project</h1>

        <div className='content'>
            <h2 className= "stampdef">
            STAMP: Spotify Trend Analysis for Musical Professionals</h2>
            <p className = "welcome- paragraph">
            Welcome to STAMP, our application allows you to create complex queries based on various musical metrics and data from Spotify’s massive database.
            To start the application, click the image on the right and begin to create your own queries and find trends!
            </p>
        
            <p className = "getstarted">Click here to get started!</p>
            {<Button to="QueryUs">Query Us!</Button>}
	    <br/>
	    <br/>
	    {<Button onClick={countTuples}>Count Tuples!</Button>}
	    <br/>
	    <p>{!count ? "" : count}</p>
            </div>
        </div>
    )
}
  
export default Home;
