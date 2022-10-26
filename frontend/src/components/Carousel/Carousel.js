import '../../css/Carousel.css';
import { useState, useEffect, useRef } from "react";

const Carousel = (props) => {
    const { children } = props;
    const [index, setIndex] = useState(0);
    const delay = 4500;
    const timeoutRef = useRef(null);

    function resetTimeout() {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      }

    useEffect(() => {
        resetTimeout();
       timeoutRef.current = setTimeout(
            () =>
                setIndex((prevIndex) =>
                    prevIndex === children.length - 1 ? 0 : prevIndex + 1
                ),
            delay
        );

        return () => {
            resetTimeout();
        };
    }, [index]);

    return (
        <div className="slideshow">
            <div
                className="slideShowSlider"
                style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
            >
                {children.map((child, idx) => {
                    return (<div
                        className="slide"
                        key={idx}>{child}</div>)
                })}
            </div>

            <div className="slideshowDots">
                {children.map((_, idx) => (
                    <div
                    key={idx}
                    className={`slideshowDot${index === idx ? " active" : ""}`}
                    onClick={() => {
                        setIndex(idx);
                      }}
                    ></div>
                ))}
            </div>
        </div>

    )
}

export default Carousel;
