import classes from './NavigationItem.module.css';
import { NavLink } from 'react-router-dom';
import React from 'react';

const NavigationItem = (props) => (

    <li className={classes.NavigationItem}>
        <NavLink
            exact={props.exact}
            to={props.link}
            activeClassName={classes.active}
        >{props.children}</NavLink>
    </li>
);

export default NavigationItem;