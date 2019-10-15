import React from "react";
import {Dispatch} from "redux";
import {connect} from "react-redux";
import withStyles, {WithStyles} from "react-jss";
import {clockStyles} from "./styles";
import DateTime from "core/format/DateTime";
import Utils from "util/Utils";
import {ReduxState} from "app/redux/ReduxState";
import {SetClockValue} from "app/redux/ReduxActions";

interface ClockProps extends WithStyles<any> {

    isRed: boolean;
    value?: number;
    dispatch?: Dispatch<ReduxState>;
}

interface ClockState {

    isRed?: boolean;
}

class Clock extends React.Component<ClockProps, ClockState> {

    private _registration: any;

    constructor(props: ClockProps) {
        super(props);
        this.state = {};
    }

    public static getDerivedStateFromProps(nextProps: ClockProps, prevState: ClockState): ClockState {
        if (prevState.isRed !== nextProps.isRed) {
            return {
                isRed: nextProps.isRed
            };
        }
        return null;
    }

    public componentDidMount(): void {
        if (Utils.isNull(this._registration)) {
            this._registration = setInterval(() => {
                this.props.dispatch(new SetClockValue(new Date().getTime()));
            }, 100);
        }
    }

    public componentWillUnmount(): void {
        if (Utils.isNotNull(this._registration)) {
            clearInterval(this._registration);
            this._registration = null;
        }
    }

    public shouldComponentUpdate(nextProps: Readonly<ClockProps>, nextState: Readonly<ClockState>, nextContext: any): boolean {
        const seconds: number = new Date(nextProps.value).getSeconds();
        const asString: string = seconds.toString(10);
        return parseInt(asString.charAt(0), 10) % 2 !== 0;
    }

    public render() {
        const {classes, value} = this.props;
        const {isRed} = this.state;

        return (
            <div className={classes.root}>
                <div className={classes.timer + (isRed ? " red" : " black")}>
                    {DateTime.formatTimeSS(value)}
                </div>
            </div>
        );
    }
}

export default connect((state: ReduxState, ownProps: any) => {
        return Object.assign({}, ownProps, {
            value: state.clock.value
        });
    },
    (dispatch: Dispatch<ReduxState>, ownProps: ClockProps) => {
        return Object.assign({}, ownProps, {
            dispatch
        });
})(withStyles(clockStyles)(Clock));
