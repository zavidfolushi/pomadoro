import React, { FC, useContext } from 'react';
import styles from './Switch.module.scss'
import cn from 'classnames'
import { SettingsContext } from '../../../context/SettingsContext';

interface SwitchProps {
    isActive: boolean;
    onClick: () => void;
}

const Switch: FC<SwitchProps> = ({ isActive, ...props }) => {
    const { mainMode } = useContext(SettingsContext)

    return (
        <button className={cn(styles.dark_mode_switch, styles[mainMode], { [styles.active]: isActive })} {...props} />
    );
};

export default Switch;