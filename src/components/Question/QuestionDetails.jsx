import React from 'react';
import AnswerQuestion from './AnswerQuestion.jsx';
import SingleAnswer from './SingleAnswer.jsx';
import {likeQuestion, dislikeQuestion} from '../../actions/questionActions.js';
import {Glyphicon, Button} from 'react-bootstrap';
import {history}  from "../../store.js";
class QuestionDetails extends React.Component {
    constructor() {
        super();
        this.likeQuestionHandler = this.likeQuestion.bind(this);
        this.dislikeQuestionHandler = this.dislikeQuestion.bind(this);
    }
    likeQuestion() {
        if(this.props.tokenProp == null){
            history.push('/login');
        }
        else {
            this.props.dispatchProp(likeQuestion(this.props.questionProp._id, this.props.tokenProp));
        }
    }
    dislikeQuestion() {
        if(this.props.tokenProp == null){
            history.push('/login');
        }
        else {
            this.props.dispatchProp(dislikeQuestion(this.props.questionProp._id, this.props.tokenProp));
        }
    }
    render() {
        const answers = this.props.questionProp.answers;
        const mappedAnswers = answers.map(a => <SingleAnswer key={a._id} 
            answerProp={a} 
            dispatchProp={this.props.dispatchProp}
            questionIdProp={this.props.questionProp._id}
            tokenProp={this.props.tokenProp}/>);
        let showAnwers = mappedAnswers.length > 0 ? mappedAnswers : "No answers for this question yet. Feel free to answer :)";

        let answerForm = this.props.tokenProp != null ? 
        <AnswerQuestion questionProp={this.props.questionProp} tokenProp={this.props.tokenProp} 
        dispatchProp={this.props.dispatchProp} answerPostingProp={this.props.answerPostingProp} answerPostingErrorProp={this.props.answerPostingErrorProp}/> 
        : '';
        let flex = {display: 'flex', margin: '0px'};
        let border = {border: '3px dashed #ccc', margin: '0px 0px 10px 0px'};
        let rightBorder = {borderRight: '3px dashed #ccc'};
        let center = {textAlign: 'center'};
        let textLeft = {textAlign: 'left'};
        return (
           <div className="row">
              
              <div className="row bg-danger" style={border}>
              <h4 className="col-md-12">Question: {this.props.questionProp.headline}</h4>
                <div className="col-md-2 bg-danger" >
                    <div>
                        <div className="col-xs-6">Likes:{this.props.questionProp.likeCount}</div>
                        <Button bsSize="small" onClick= {this.likeQuestionHandler} className="col-xs-6">
                            <Glyphicon glyph="glyphicon glyphicon-thumbs-up"/>Like
                        </Button>
                    </div>
                    <div>
                    <div className="col-xs-6">Dislikes:{this.props.questionProp.dislikeCount}</div>
                        <Button bsSize="small" onClick= {this.dislikeQuestionHandler} className="col-xs-6"> 
                            <Glyphicon glyph="glyphicon glyphicon-thumbs-down"/>Dislike
                        </Button>
                    </div>
                </div>
                <div className="col-md-10 bg-danger">
                    <p style={textLeft}>{this.props.questionProp.text}</p>
                    <span>Asked at: {this.props.questionProp.dateTime}</span>
                </div>
              </div>
              <div><h4>Answers</h4>
                {showAnwers}
              </div> 
              {answerForm}   
           </div>
        );
     }
 }

 export default QuestionDetails;