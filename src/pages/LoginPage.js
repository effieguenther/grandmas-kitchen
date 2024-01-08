import { Button } from "reactstrap";
import { Link } from "react-router-dom";
import { slideUp } from "../utils/animations";
import { useTransition, animated } from "@react-spring/web";
import '../css/login-page.css';

export default function LoginPage() {

    //unable to login with facebook in production - no business verification 

    // const facebookLogin = () => {
    //     window.open("https://grandma-8ed4c.web.app/api/users/auth/facebook", "_self");
    // }

    const googleLogin = () => {
        window.open("https://grandma-8ed4c.web.app/api/users/auth/google", "_self");
    }

    const transition = useTransition(true, slideUp);

    return transition((style, item) => 
        item && (<div className='background'>
            <animated.div style={style} className='login-pane'>
                <h2 className='login-text'>Log in</h2>
                {/* <Button className='login-btn' onClick={facebookLogin}>Login with Facebook</Button> */}
                <Button className='login-btn' onClick={googleLogin}>Log in with Google</Button>
                <Link to='/recipes' className='continue-as-guest'>
                    <Button className='continue-as-guest grey-btn'>Continue as guest</Button>
                </Link>
            </animated.div>
        </div>
    ))
}
