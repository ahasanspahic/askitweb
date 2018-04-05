import React from 'react'
import QuestionDetails from './QuestionDetails.jsx';
import { Link } from 'react-router-dom';
import {  getPopularQuestions, getLatestQuestions } from '../../actions/questionActions';
import AskQuestion from './AskQuestion.jsx';
class Questions extends React.Component {
    constructor() {
        super();
        this.state= {
            pageSize:20
        }
        this.loadMoreHandler = this.loadMore.bind(this);
    }
    componentWillMount() {
        this.props.dispatchProp(getLatestQuestions(0,this.state.pageSize));   
    }
    loadMore() {
        this.props.dispatchProp(getLatestQuestions(this.props.questionPageProp+1,this.state.pageSize));
    }
    render() {
        const questions = this.props.questionsProp;
        const questionsMapped = questions.map(q => <QuestionDetails questionProp={q} key={q._id} 
            tokenProp = {this.props.tokenProp} dispatchProp = {this.props.dispatchProp} answerPostingErrorProp={this.props.answerPostingErrorProp}
            answerPostingProp={this.props.answerPostingProp}/>);
        return (
           <div>
                {questionsMapped}
                {this.props.showLoadMoreProp && <div><button className="btn btn-primary" onClick={this.loadMoreHandler}>LOAD MORE</button></div>}          
                <div> Have a question?? Feel free to <Link to="/ask" >ask</Link> us anything.</div >
           </div>
        );
     }
 }

 export default Questions;