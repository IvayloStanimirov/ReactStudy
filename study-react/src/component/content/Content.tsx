import React from "react";
// @ts-ignore
import withStyles, {WithStyles} from "react-jss";
import {contentStyles} from "./styles";
import {AppContextConsumer, AppContextValue} from "app/context/AppContext";
import {ViewType} from "app/ViewType";
import RadioButtonGroup from "component/radio/RadioButtonGroup";
import Clock from "component/clock/Clock";
import Utils from "util/Utils";
import Timer from "component/timer/Timer";

interface IProps extends WithStyles<any> {

    classes: any;
}

interface IState {

    isRedClock?: boolean;
}

class Content extends React.Component<IProps, IState> {

    private _clockSwitcher: any;

    public constructor(props) {
        super(props);
        this.state = {};
    }

    private content(viewType: ViewType): JSX.Element {
        if (Utils.isNotNull(this._clockSwitcher)) {
            clearInterval(this._clockSwitcher);
            this._clockSwitcher = null;
        }
        switch (viewType) {
            case ViewType.Clock:
                this._clockSwitcher = setInterval(() => {
                    this.setState({
                        isRedClock: !this.state.isRedClock
                    });
                }, 10000);
                return <Clock isRed={this.state.isRedClock}/>;
            case ViewType.TimerFunctional:
                return <Timer />;
        }
        return null;
    }

    public componentWillUnmount(): void {
        if (Utils.isNotNull(this._clockSwitcher)) {
            clearInterval(this._clockSwitcher);
            this._clockSwitcher = null;
        }
    }

    public render() {
        const {classes} = this.props;

        return (
            <div className={classes.root}>
                <AppContextConsumer>
                    {(value: AppContextValue) =>
                        <>
                            <RadioButtonGroup />
                            <div className={classes.content}>
                                <div className={classes.contentHeader}>
                                    {value.viewType}
                                </div>
                                <div className={classes.contentPageWrapper}>
                                    {
                                        this.content(value.viewType)
                                    }
                                </div>
                            </div>
                            <div className={classes.sideBar}></div>
                        </>
                    }
                </AppContextConsumer>
            </div>
        );
    }
}

export default withStyles(contentStyles)(Content);
