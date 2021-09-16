import React from "react";
import withStyles, {WithStyles} from "react-jss";
import {headerStyles} from "./styles";

interface IProps extends WithStyles<any> {

}

const Header: React.FunctionComponent<IProps> = ({classes}: IProps) => {

    return (
        <div className={classes.root}>
            <div className={classes.logo}></div>
        </div>
    );
};

export default withStyles(headerStyles)(Header);
