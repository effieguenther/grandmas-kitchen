import { easings } from "@react-spring/web";

export const slideUp = {
    from: { opacity: 0, transform: 'translate3d(0, 40vh, 0)' },
    enter: { opacity: 1, transform: 'translate3d(0, 0, 0)' },
    leave: { opacity: 0, transform: 'translate3d(0, -40vh, 0)' },
    config: { duration: 500, easing: easings.easeOutSine },
    exitBeforeEnter: true
};

export const cardSwipe = {
    from: { opacity: 0, transform: "scaleX(0) translateZ(10px)" },
    enter: { opacity: 1, transform: "scaleX(1) translateZ(0px)" },
    leave: { opacity: 0, transform: "scaleX(0) translateZ(10px)" },
    exitBeforeEnter: true,
    config: { duration: 200 }
};