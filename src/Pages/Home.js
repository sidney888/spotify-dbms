import logo from '../assets/spotify.png';
import Button  from '../Components/Button';

const Home = () => {
    return (
        <div className="profile">
                    <img src={logo} alt="Spotify Logo" className="logo" />
        <h1 className="welcome-message">Welcome to CIS4301 DataBases Project</h1>
        <h2 className= "stampdef"> STAMP: Spotify Trend Analysis for Musical Professionals</h2>
        <p className = "welcome- paragraph"> Welcome to STAMP, our application allows you to create complex queries based on various musical metrics and data from Spotify’s massive database. To start the application, click the image on the right and begin to create your own queries and find trends!

        </p>
        
        <p className = "getstarted">Click here to get started!</p>
        <Button to="QueryUs"> Query Us!</Button>
        </div>
    )
}
  
export default Home;