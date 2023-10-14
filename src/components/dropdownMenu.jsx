import React from "react";
import { createPortal } from "react-dom";
import styles from '@/styles/dropdown.module.css';

const Popper = ({ children, menuRef }) => {
    return createPortal(children, menuRef.current);
};

export const MenuItem = ({ children, ...props }) => {
    return (
        <li className={`${styles['menu-item']}`} {...props}>
            {children}
        </li>
    );
};

export const Menu = ({ children, open, onSelect, menuRef }) => {
    const menuItems = React.Children.map(children, (child) => {
        if (child.type !== MenuItem) {
            throw new Error(`Not a valid MenuItem: ${child.type}`);
        }

        const childProps = {
            onClick: (e) => {
                const _onClick = child.props.onClick;
                const text = child.props.children.trim();

                onSelect(text);
                _onClick ?? _onClick?.(e);
            }
        };

        return React.cloneElement(child, childProps);
    });

    if (!open) return null;

    return (
        <Popper menuRef={menuRef}>
            <ul className={`${styles.menu} '${styles.active}`}>{menuItems}</ul>
        </Popper>
    );
};
