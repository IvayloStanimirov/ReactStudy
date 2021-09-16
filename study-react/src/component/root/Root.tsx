import React from "react";
// @ts-ignore
import withStyles, {WithStyles} from "react-jss";
import {rootStyles} from "./styles";
import {AppContext} from "app/context/AppContext";
import Header from "component/header/Header";
import Content from "component/content/Content";

interface IProps extends WithStyles<any> {

    classes: any;
}

const Root: React.FunctionComponent<IProps> = ({classes}: IProps) => {

    return (
        <AppContext>
            <div className={classes.root}>
                <Header/>
                <Content/>
            </div>
        </AppContext>
    );
};

export default withStyles(rootStyles)(Root);
