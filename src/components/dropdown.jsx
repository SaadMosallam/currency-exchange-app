
import ClickAwayListener from "react-click-away-listener";
import { Menu, MenuItem } from './dropdownMenu';
import { useState, useRef } from "react";
import styles from '@/styles/dropdown.module.css';
import Image from "next/image";
import downSvg from '@/assets/images/arrowDown.svg';

const Dropdown = ({ id }) => {
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
            <div style={{ display: 'inline-flex' }} >
                <button ref={menuButtonRef} className={`${styles['menu-button']} ${open && styles['active']}`} onClick={() => setOpen(!open)}>
                    Open Menu
                    <Image width={15} height={15} src={downSvg} alt="arrow down" />
                </button>

                <Menu open={open} onSelect={handleSelectedMenuItem} menuRef={menuButtonRef}>
                    <MenuItem>Bacon</MenuItem>
                    <MenuItem> Tuna </MenuItem>
                    <MenuItem> Tuna pants </MenuItem>

                </Menu>
            </div>
        </ClickAwayListener>
    )
};

export default Dropdown;
