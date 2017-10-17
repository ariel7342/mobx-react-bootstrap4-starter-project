/**
 * Created by ariel7342 on 27/09/2017.
 */
import * as React from 'react';
import { Log } from '../../BuildLogComponents/Log';
import { AvForm, AvField, AvGroup, AvInput, AvFeedback, AvRadioGroup, AvRadio } from 'availity-reactstrap-validation';
import { Jumbotron,Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import RegularExpressionView from "../RegularExpressionView/index";
import * as style from './style.css';

// import * as style from './style.css';

export interface LogViewState {
    id:string
    name: string
    path: string
    regularExpressions: Array<string>
    typeRolling: string
    typeSpecial: string
    startLine: string
    endLine: string
}
export interface LogViewProps {
    log : any
    onRemoveLog() : void
}
export class LogView extends React.Component<LogViewProps,LogViewState> {

    constructor(props) {
        super(props);
        this.state = {id:this.props.log.id,
            name: this.props.log.name,
            path: this.props.log.path,
            regularExpressions: this.props.log.regularExpressions,
            typeRolling: this.props.log.typeRolling,
            typeSpecial: this.props.log.typeSpecial,
            startLine:  this.props.log.startLine,
            endLine:  this.props.log.endLine
        };
        this.onRemoveLog = this.onRemoveLog.bind(this);
    }

    onRemoveLog(){
        this.props.onRemoveLog();
    }


    render() {
        const style1 = style.cardShadow + " pt-3 pb-3";
        let regularExpressionLoop = this.state.regularExpressions.map(regularExpression => {
            return <RegularExpressionView key={regularExpression} regularExpression={regularExpression}/>
        });
        const typeSpecialCase = (
            <div className="col-12">
                <div className="row">
                    <p className="col-4 lead">תחילת שורה :</p><span className="col-8 mt-1 p-0">{this.state.startLine}</span>
                    <p className="col-4 lead">סוף שורה :</p><span className="col-8 mt-1 p-0">{this.state.endLine}</span>
                </div>
            </div>
        );
        return(

            <div className="col-6 d-inline-block">
                    <div  >
                        <div className="container pt-4">
                        <Jumbotron className={style1}>
                            <h3 className="">שם הלוג - {this.state.name} </h3>
                                <div className="row align-self-end">
                                    <p className="col-4 lead">נתיב הלוג : </p><span className="mt-1 col-8 p-0">{this.state.path}</span>
                                </div>
                                <div className="row align-self-end">
                                    <p className="col-6 lead">האם הלוג מתגלגל ?</p>
                                    <div className="col-6 mt-1">
                                        {this.state.typeRolling !== "regular" ?
                                            <p className="p-0">כן</p> :
                                            <p className="p-0">לא</p>
                                        }
                                    </div>
                                    <p className="col-6 lead">האם הלוג מיוחד ?</p>
                                    {this.state.typeSpecial !== "regular" ?
                                        <div className="col-6 mt-1">
                                            <p className="p-0">כן</p>
                                        </div> :
                                        <p className="p-0">לא</p>
                                    }
                                    {this.state.typeSpecial !== "regular" ?
                                        typeSpecialCase:
                                        ""
                                    }
                                </div>
                                <div className="row align-self-end">
                                    <div className="col-12">
                                        <p className="lead">הביטוי הרגולרי : </p>
                                        <ul className="col-12">{regularExpressionLoop}</ul>
                                        <hr className="my-2" />
                                    </div>
                                </div>
                                <div className="row justify-content-center">
                                    <Button className="btn-outline-primary m-1 col-4">עריכה</Button>
                                    <Button className="btn-outline-danger m-1 col-4" onClick={this.onRemoveLog}>מחיקה</Button>
                                </div>

                        </Jumbotron>
                    </div>
                </div>
            </div>
        );
    }
}

export default LogView;