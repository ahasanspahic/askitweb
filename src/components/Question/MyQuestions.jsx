import React from 'react'
import QuestionDetails from './QuestionDetails.jsx';
import AskQuestion from './AskQuestion.jsx';
import {getMyQuestions} from '../../actions/questionActions.js';
import {history}  from "../../store.js";
import { isValid } from '../../actions/userActions.js';

class MyQuestions extends React.Component {
    constructor() {
        super();
    }
    componentWillMount() {
        if(!this.props.isLoggedProp){
            history.push('/login');
        }
        this.props.dispatchProp(isValid(this.props.tokenProp));
        this.props.dispatchProp(getMyQuestions(0,Number.MAX_SAFE_INTEGER,this.props.tokenProp));
    }
    render() {
        const questionsMapped = this.props.myQuestionsProp.map(q => <QuestionDetails questionProp={q} key={q._id} 
            tokenProp = {this.props.tokenProp} dispatchProp = {this.props.dispatchProp} answerPostingErrorProp={this.props.answerPostingErrorProp}
            answerPostingProp={this.props.answerPostingProp}/>);
        return (
           <div>
                <h4>My questions page</h4>
                {questionsMapped}
            </div>
        );
     }
 }

 export default MyQuestions;