import React from "react";
import {Dispatch} from "redux";
import {connect} from "react-redux";
import withStyles, {WithStyles} from "react-jss";
import {formStyles} from "./styles";
import {ReduxState} from "app/redux/ReduxState";
import {SetEmail, SetName, SetPhone} from "app/redux/ReduxActions";

interface IProps extends WithStyles<any> {

    name: string;
    email: string;
    phone: string;
    dispatch?: Dispatch<ReduxState>;
}

const Form: React.FunctionComponent<IProps> = ({classes, name, email, phone, dispatch}: IProps) => {

    return (
        <div className={classes.root}>
            <div className={classes.section}>
                <div className={classes.title}>Name:</div>
                <input type="text" value={name} className={classes.input}
                       onChange={(e) => {
                           dispatch(new SetName(e.target.value));
                       }}
                />
            </div>
            <div className={classes.section}>
                <div className={classes.title}>Email:</div>
                <input type="text" value={email} className={classes.input}
                       onChange={(e) => {
                           dispatch(new SetEmail(e.target.value));
                       }}
                />
            </div>
            <div className={classes.section}>
                <div className={classes.title}>Phone Number:</div>
                <input type="text" value={phone} className={classes.input}
                       onChange={(e) => {
                           dispatch(new SetPhone(e.target.value));
                       }}
                />
            </div>
        </div>
    );
};

export default connect((state: ReduxState, ownProps: any) => {
        const {name, email, phone} = state.form;
        return Object.assign({}, ownProps, {
            name,
            email,
            phone
        });
    },
    (dispatch: Dispatch<ReduxState>, ownProps: IProps) => {
        return Object.assign({}, ownProps, {
            dispatch
        });
    })(withStyles(formStyles)(Form));
