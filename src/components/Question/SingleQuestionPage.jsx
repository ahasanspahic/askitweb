import React from 'react'
import QuestionDetails from './QuestionDetails.jsx';
import { Link } from 'react-router-dom';
import AskQuestion from './AskQuestion.jsx';
class SingleQuestionPage extends React.Component {
    constructor() {
        super();
        this.state = {
            question: undefined
        };
    }
    componentWillMount() {
        
    }
    render() {
        let s = this.props.locationProp.pathname.split('/');
        return (
           <div>
                <QuestionDetails questionProp={this.props.questionsProp.filter(q => q._id == s[2])[0]} 
            tokenProp = {this.props.tokenProp} dispatchProp = {this.props.dispatchProp}
            answerPostingProp={this.props.answerPostingProp}/>
           </div>
        );
     }
 }

 export default SingleQuestionPage;