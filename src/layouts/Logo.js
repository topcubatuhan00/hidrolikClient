import { ReactComponent as LogoDark } from "../assets/images/logos/newLogo2.svg";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/" className="d-flex justify-content-center w-100 mt-4">
      <LogoDark style={{width:'150px', height:'50px'}}/>
    </Link>
  );
};

export default Logo;
