import { useNavigate } from "react-router-dom";

const Button = ({ to }) => {

	const navigate = useNavigate();

	return (
		<button className="my-button" onClick={() =>
			{ navigate(`/${to}`) }}>
			{to === '' ? "home" : to}
		</button>
	)
}

export default Button;
