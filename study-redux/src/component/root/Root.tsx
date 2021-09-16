import React from "react";
// @ts-ignore
import withStyles, {WithStyles} from "react-jss";
import {rootStyles} from "./styles";
import Header from "component/header/Header";
import Content from "component/content/Content";

interface IProps extends WithStyles<any> {

}

const Root: React.FunctionComponent<IProps> = ({classes}: IProps) => {

    return (
        <div className={classes.root}>
            <Header />
            <Content />
        </div>
    );
};

export default withStyles(rootStyles)(Root);
