import logo from '../assets/spotify.png';
import Button  from '../Components/Button';
import AnalysisPage from './AnalysisPage';

const TrendsPage = () => {
    return (
        <div className="trends">

        <p className = "getstarted">Click here to get started!</p>
        <Button to ="QueryUs"> New Trend</Button>
        </div>
    )
}
  
export default TrendsPage;