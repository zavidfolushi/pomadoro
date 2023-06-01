import React, { useContext, useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { SettingsContext } from '../../context/SettingsContext';
import './Timer.scss';
import MainBtn from '../UI/MainButton/MainBtn';
import SecondaryBtn from '../UI/SecondaryButton/SecondaryBtn';
import Settings from '../Settings/Settings';
import Plate from '../UI/Plate/Plate';
import { toast } from 'react-toastify';
import { NotificationContext } from '../../context/NotificationContext';

const Timer = () => {
    const { focusMinutes, shortBreakMinutes, longBreakMinutes, setMainMode } = useContext(SettingsContext);
    const { notification } = useContext(NotificationContext)
    const [showSettings, setShowSettings] = useState(false);
    const [isPaused, setIsPaused] = useState(true);
    const [mode, setMode] = useState('focus');
    const [secondsLeft, setSecondsLeft] = useState(0);

    const secondsLeftRef = useRef(secondsLeft);
    const isPausedRef = useRef(isPaused);
    const modeRef = useRef(mode);

    const tick = useCallback(() => {
        secondsLeftRef.current--;
        setSecondsLeft(secondsLeftRef.current);
    }, []);

    const toggleElements = useCallback(() => {
        const elements = ['focus', 'shortBreak', 'focus', 'longBreak'];
        let currentIndex = 0;

        return function () {
            const currentElement = elements[currentIndex];
            currentIndex = (currentIndex + 1) % elements.length;
            return currentElement;
        };
    }, []);

    const toggle = useMemo(() => {
        return toggleElements();
    }, [toggleElements]);

    const switchMode = useCallback(() => {
        const nextMode = toggle();
        let nextSeconds;

        setMainMode(nextMode);

        if (nextMode === 'focus') {
            nextSeconds = focusMinutes * 60;
        } else if (nextMode === 'shortBreak') {
            nextSeconds = shortBreakMinutes * 60;
        } else {
            nextSeconds = longBreakMinutes * 60;
        }

        setMode(nextMode);
        modeRef.current = nextMode;

        setSecondsLeft(nextSeconds);
        secondsLeftRef.current = nextSeconds;
    }, [toggle, setMainMode, focusMinutes, shortBreakMinutes, longBreakMinutes]);

    useEffect(() => {
        toggle();
    }, []);

    useEffect(() => {
        let seconds;

        if (mode === 'focus') {
            seconds = focusMinutes * 60;
        } else if (mode === 'shortBreak') {
            seconds = shortBreakMinutes * 60;
        } else {
            seconds = longBreakMinutes * 60;
        }

        secondsLeftRef.current = seconds;
        setSecondsLeft(seconds);

        const interval = setInterval(() => {
            if (isPausedRef.current) {
                return;
            }
            if (secondsLeftRef.current === 0) {
                if (notification) toast(mode === 'focus' ? `You've done a good job, it's time to take a break` : mode === 'shortBreak' ? `A short break is never enough, it's time to get back to work` : `Haven't you forgotten that it's time to work? The long break is over`);
                return switchMode();
            }

            tick();
        }, 1000);

        return () => clearInterval(interval);
    }, [focusMinutes, shortBreakMinutes, longBreakMinutes, mode, switchMode, tick]);

    const minutes = Math.floor(secondsLeft / 60);
    const seconds = secondsLeft % 60;

    return (
        <div className={`mode ${'mode__' + mode}`}>
            {showSettings ? (
                <Settings onClick={() => setShowSettings((prev) => !prev)} />
            ) : null}
            <div className={`dial ${isPaused ? 'pause__time' : ''}`}>
                <Plate name={mode} />
                <span>{minutes < 10 ? '0' + minutes : minutes}</span>
                <span>{seconds < 10 ? '0' + seconds : seconds}</span>
            </div>
            <div className="control_btn">
                <SecondaryBtn onClick={() => setShowSettings((prev) => !prev)} role="settings" />
                <MainBtn
                    state={isPaused}
                    onClick={() => {
                        setIsPaused((prev) => !prev);
                        isPausedRef.current = !isPausedRef.current;
                    }}
                />
                <SecondaryBtn onClick={switchMode} role="next" />
            </div>
        </div>
    );
};

export default Timer;
