import { useTransition, animated, easings } from "@react-spring/web"
import { useRouteError } from "react-router-dom";
import '../css/error.css';

const Error = (props) => {

    const transition = useTransition(true, {
        from: { opacity: 0, transform: 'translate3d(0, 40vh, 0)' },
        enter: { opacity: 1, transform: 'translate3d(0, 0, 0)' },
        leave: { opacity: 0, transform: 'translate3d(0, -40vh, 0)' },
        config: { duration: 500, easing: easings.easeOutSine },
        exitBeforeEnter: true
    });

    const error = useRouteError();
    console.log("error", error);

    return transition((style, item) => 
        item && (<div className='background'>
            <animated.div style={style} className='error-pane'>
                <p>{error.message}</p>
                <a href='https://grandma-8ed4c.web.app/' className='try-again'>Try again</a>
            </animated.div>
        </div>)
    )
}

export default Error;