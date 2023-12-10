import { Button } from "reactstrap";
import { useTransition, animated, easings } from "@react-spring/web";
import { useEffect } from "react";
import { post, put } from '../utils/fetch';
import '../css/login-page.css';

export default function LoginPage() {

    const handleLogin = () => {
        window.open("https://us-central1-grandma-8ed4c.cloudfunctions.net/api/users/auth/facebook", "_self");
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
                <Button className='login-btn' onClick={handleLogin}>Login with Facebook</Button>
            </animated.div>
        </div>
    ))
}
