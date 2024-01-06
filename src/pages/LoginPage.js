import { Button } from "reactstrap";
import { useTransition, animated, easings } from "@react-spring/web";
import { Link } from "react-router-dom";
import '../css/login-page.css';

export default function LoginPage() {

    //unable to login with facebook in production - no business verification 

    // const facebookLogin = () => {
    //     window.open("https://grandma-8ed4c.web.app/api/users/auth/facebook", "_self");
    // }

    const googleLogin = () => {
        window.open("https://grandma-8ed4c.web.app/api/users/auth/google", "_self");
    }

    const transition = useTransition(true, {
        from: { opacity: 0, transform: 'translate3d(0, 40vh, 0)' },
        enter: { opacity: 1, transform: 'translate3d(0, 0, 0)' },
        leave: { opacity: 0, transform: 'translate3d(0, -40vh, 0)' },
        config: { duration: 500, easing: easings.easeOutSine },
        exitBeforeEnter: true
    });

    return transition((style, item) => 
        item && (<div className='login-container'>
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
