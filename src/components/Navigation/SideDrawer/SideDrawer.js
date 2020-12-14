import NavigationItems from '../NavigationItems/NavigationItems';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import BackDrop from '../../UI/Backdrop/Backdrop';
import classes from './SideDrawer.module.css';
import Logo from '../../Logo/Logo';
import React from 'react';

const SideDrawer = (props) => {

    let atthachedClasses = [classes.SideDrawer, classes.Close];

    if(props.open){
        atthachedClasses = [classes.SideDrawer, classes.Open];
    }

    return (
        <Auxiliary>
            <BackDrop show={props.open} clicked={props.closed} />
            <div className={atthachedClasses.join(' ')} onClick={props.closed}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems
                    clicked={props.closed}
                        isAuthenticated={props.isAuth}
                    />
                </nav>
            </div>
        </Auxiliary>
    );
}

export default SideDrawer;