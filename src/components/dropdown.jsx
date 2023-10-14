
import ClickAwayListener from "react-click-away-listener";
import { Menu, MenuItem } from './dropdownMenu';
import { useState, useRef } from "react";
import styles from '@/styles/dropdown.module.css';
import Image from "next/image";
import downSvg from '@/assets/images/arrowDown.svg';

const PLACEHOLDER = 'Currency';

const Dropdown = ({ label, currenciesList }) => {
    const [open, setOpen] = useState(false);
    const menuButtonRef = useRef();
    const [selected, setSelected] = useState(null);

    const handleSelectedMenuItem = (value) => {
        setSelected(value);
        setOpen(false);
    };
    return (
        <ClickAwayListener
            onClickAway={(event) => {
                setOpen(false);
            }}
        >
            <div className={`${styles.wrapper}`}>
                <label>{label}</label>
                <button ref={menuButtonRef} className={`${styles['menu-button']} ${open && styles['active']}`} onClick={() => setOpen(!open)}>
                    {PLACEHOLDER}
                    <Image width={15} height={15} src={downSvg} alt="arrow down" />
                </button>

                <Menu open={open} onSelect={handleSelectedMenuItem} menuRef={menuButtonRef}>
                    {
                        currenciesList.map(currency => (
                            <MenuItem key={currency}>{currency}</MenuItem>
                        ))
                    }
                </Menu>
            </div>
        </ClickAwayListener>
    )
};

export default Dropdown;
