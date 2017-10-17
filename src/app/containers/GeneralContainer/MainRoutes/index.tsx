import {inject} from "mobx-react";
import {STORE_LOG_ARRAY, STORE_ROUTER} from "../../../constants/stores";
import {Route, RouteComponentProps, Router, Switch} from "react-router";
import {LOG_FILTER_LOCATION_HASH, LogFilter} from "../../../constants/appRouts";
import * as React from "react";
import NavBarContainer from "../../../components/GeneralComponents/NavBarContainer/index";
import LogArrayStore from "../../../stores/LogArrayStore";
import * as style from './style.css';
import RouterStore from "../../../stores/RouterStore";
import Form from "../../BuildLogContainer/Form/index";
import LogView from "../../../components/ViewLogComponents/LogView/index";
import createBrowserHistory from "history/createBrowserHistory";

export interface MainRoutesProps extends RouteComponentProps<any> {
    // /** MobX Stores will be injected via @inject() **/
    //  [STORE_ROUTER]: RouterStore;
    //  [STORE_LOG_ARRAY]: LogArrayStore;
}


export interface MainRoutesState {
    filter: LogFilter;
}
@inject(STORE_LOG_ARRAY, STORE_ROUTER)
export class MainRoutes extends React.Component<MainRoutesProps,MainRoutesState> {
    constructor(props: MainRoutesProps, context?: any) {
        super(props, context);
        this.state = { filter: LogFilter.BUILD };

        this.handleFilter = this.handleFilter.bind(this);

    }

    componentWillMount() {
        this.checkLocationChange();
    }

    componentWillReceiveProps(nextProps: MainRoutesProps, nextContext: any) {
        this.checkLocationChange();
    }

    checkLocationChange() {
        // const router = this.props[STORE_ROUTER] as RouterStore;
        // const filter = Object.keys(LOG_FILTER_LOCATION_HASH)
        //     .map((key) => Number(key) as TodoFilter)
        //     .find((filter) => LOG_FILTER_LOCATION_HASH[filter] === router.location.hash);
        // this.setState({ filter });
    }

    handleFilter(filter: LogFilter) {
        const router = this.props[STORE_ROUTER] as RouterStore;
        const currentHash = router.location.hash;
        const nextHash = LOG_FILTER_LOCATION_HASH[filter];
        if (currentHash !== nextHash) {
            router.replace(nextHash);
        }
    }

    render() {
        const history = createBrowserHistory();

        const logArrayStore = this.props[STORE_LOG_ARRAY] as LogArrayStore;

        const { filter } = this.state;
        const nav = (
            <NavBarContainer filter={filter}
                             logsCount={logArrayStore.logs.length}
                             onChangeFilter={this.handleFilter} />
        ) ;
        return(
            <div>
                <div className="container mt-5">
                    <div className={style.bodyBorder}>
                        {nav}
                    </div>
                </div>
            </div>

        );
    }
}

export default MainRoutes;