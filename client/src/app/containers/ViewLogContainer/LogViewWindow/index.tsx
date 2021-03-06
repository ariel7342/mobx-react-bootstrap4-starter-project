/**
 * Created by ariel7342 on 27/09/2017.
 */
import * as React from 'react';
import { AvForm, AvField, AvGroup, AvInput, AvFeedback, AvRadioGroup, AvRadio } from 'availity-reactstrap-validation';
import * as style from './style.css';
import {RouteComponentProps} from "react-router";
import {inject, observer} from "mobx-react";
import {STORE_ALERT, STORE_LOG_ARRAY, STORE_ROUTER} from "../../../constants/stores"
import {LogArrayStore} from "../../../stores/LogArrayStore";
import {ILogModel} from "../../../models/ILogModel";
import LogView from "../../../components/ViewLogComponents/LogView/index";
import {LOG_FILTER_LOCATION_HASH, LogFilter} from "../../../constants/appRouts";
import RouterStore from "../../../stores/RouterStore";
import AlertStore from "../../../stores/AlertStore";
import GenericModal from "../../../components/GeneralComponents/GenericModal/index";
import {IModalModel} from "../../../models/IModalModel";

export interface LogViewWindowState {
    modal ?: IModalModel;
    logs : ILogModel[];
}

export interface LogViewWindowProps extends RouteComponentProps<any> {
    logs: ILogModel[]
}

@inject(STORE_LOG_ARRAY, STORE_ROUTER,STORE_ALERT)
@observer
export class LogViewWindow extends React.Component<LogViewWindowProps,LogViewWindowState> {

    constructor(props: LogViewWindowProps, context?: any) {
        super(props, context);

        this.state = ({modal:{modalTitle:"",modalText:"",modalVisible:false},logs:[]});

        this.handleFilter = this.handleFilter.bind(this);
        this.onRemoveLog = this.onRemoveLog.bind(this);
    }
    componentDidMount(){
        const logArrayStore = this.props[STORE_LOG_ARRAY] as LogArrayStore;
        logArrayStore.getLogs
            .then((response) => {
                console.log(response);
                this.setState({logs:response.logs});

            })
            .catch( (error) => {
                console.log(error);
            });
    }

    handleFilter(filter: LogFilter) {
        const router = this.props[STORE_ROUTER] as RouterStore;
        const currentHash = router.location.hash;
        const nextHash = LOG_FILTER_LOCATION_HASH[filter];
        if (currentHash !== nextHash) {
            router.replace(nextHash);
        }
    }
    onRemoveLog(id : string){
        const logArrayStore = this.props[STORE_LOG_ARRAY] as LogArrayStore;
        const alertStore = this.props[STORE_ALERT] as AlertStore;
        logArrayStore.deleteLog(id);
        logArrayStore.getLogs
            .then((response) => {
                console.log(response);
                this.setState({logs:response.logs});

            })
            .catch( (error) => {
                console.log(error);
            });

        this.setState({modal:{modalText:"success",modalVisible:true, modalTitle:"הלוג נמחק בהצלחה"}});
        alertStore.setAlert({alertColor:"success" ,alertText : "הלוג נמחק בהצלחה" ,alertVisible :true });
        alertStore.setAlertVisible(true);
    }

    render() {
        const logArrayStore = this.props[STORE_LOG_ARRAY] as LogArrayStore;
        const style1 = style.shadowBorder + " row p-0";


        return(
            <div className="col-12">
                <div className={style1}>
                    {this.state.logs.length >0 ? this.state.logs.map(log =>
                        <LogView key={log.id} log={log} onRemoveLog={() => {this.onRemoveLog(log.id)}} onChangeFilter={this.handleFilter.bind(this)}/>
                    ) : <h2 className="row justify-content-center m-5">אין פריטים</h2>}
                </div>
                <GenericModal modal={this.state.modal}/>
            </div>

        );
    }
}

export default LogViewWindow;
