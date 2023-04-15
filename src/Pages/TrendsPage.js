import logo from '../assets/spotify.png';
import Button  from '../Components/Button';
import AnalysisPage from './AnalysisPage';
import React, { useState, useEffect } from 'react';

const TrendsPage = () => {

    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);
  
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

    
    return (
        <div className="trends">
            <h1>Trend Analysis</h1>

        <p className = "getstarted">Click here to get started!</p>
        {button && <Button buttonStyle='btn--primary'to='/TrendsPage'>New Trend</Button>}
        </div>
    )
}
  
export default TrendsPage;