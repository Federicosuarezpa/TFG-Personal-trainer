import { useState, useEffect } from 'react';
import '../../styles/ProgressBar.css';
import PropTypes from "prop-types";

const ProgressBar = ({ loading, complete, onComplete }) => {
    const [progress, setProgress] = useState(0);
    const [visible, setVisible] = useState(false);
    const [intervalId, setIntervalId] = useState(null);

    useEffect(() => {
        let id;

        if (loading) {
            setVisible(true);
            setProgress(0);

            id = setInterval(() => {
                setProgress(prevProgress => {
                    let step = calculateStep(prevProgress);
                    if (prevProgress >= 98.0) {
                        step = 0.01;
                    }
                    let newProgress = Math.min(prevProgress + step, 99.9);
                    return newProgress;
                });
            }, 100);

            setIntervalId(id);
        }

        if (complete) {
            setProgress(100);
            setTimeout(() => {
                setVisible(false);
                if (onComplete) {
                    onComplete();
                }
            }, 2000);
        }

        return () => {
            if (id) {
                clearInterval(id);
            }
        };
    }, [loading, complete, onComplete]);

    const calculateStep = (currentProgress) => {
        const maxStep = 0.9;
        const minStep = 0.001;
        const progressRatio = currentProgress / 100;
        const accelerationFactor = 3;

        const step = maxStep * (1 - Math.pow(progressRatio, accelerationFactor)) + minStep;

        return step;
    };

    let formattedProgress = progress.toFixed(2);

    if (complete) {
        formattedProgress = 100;
    }

    return (
        visible && (
            <div className="progress-container">
                <div
                    className="progress-bar"
                    style={{ width: `${formattedProgress}%` }}
                    aria-valuenow={formattedProgress}
                    aria-valuemin="0"
                    aria-valuemax="100"
                ></div>
                <div className="progress-text">
                    {formattedProgress}%
                </div>
            </div>
        )
    );
};

ProgressBar.propTypes = {
    loading: PropTypes.bool.isRequired,
    complete: PropTypes.bool.isRequired,
    onComplete: PropTypes.func,
};

export default ProgressBar;