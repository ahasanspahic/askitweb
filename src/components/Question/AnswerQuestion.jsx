import React from 'react';
import { addAnswer } from '../../actions/questionActions';
class AnswerQuestion extends React.Component {
    constructor() {
        super();
        this.state= {
            posting: false,
            answer: '',
            answerError: null,
        }
        this.answerHandler = this.answerQuestion.bind(this);
        this.updateAnswerHandler = this.updateAnswer.bind(this);
    }
    
    updateAnswer(e) {
        this.setState({answer: e.target.value});
    }
    answerQuestion(e) {
        e.preventDefault();
        this.setState({posting: true});
        this.props.dispatchProp(addAnswer(this.state.answer,this.props.questionProp._id, this.props.tokenProp));
    }
    componentWillMount() {
    }
    componentDidUpdate() {
        if(!this.props.answerPostingProp && this.state.posting) { /* Just to clear the textbox */
            document.getElementById('answerText').value = '';
            this.setState({posting: false});
        }
    }
    validateForm() {
        let isValid = true;
        if(this.state.answer.trim().length == 0){
            this.setState({answerError: "Answer text is required."});
            isValid=false;
        }
        else {
            this.setState({answerError: null});
        }
        return isValid;
    }
    render() {
        let marginBottom = {marginBottom: '20px'};
        return(
            <div style={marginBottom}>
                Add an answer:
                <form onSubmit={this.answerHandler} className="form-horizontal">
                    <div className="form-group">
                        <label forname="answerText" className="form-group">  Answer text: </label>             
                        <textarea rows="4" cols="50" onChange = {this.updateAnswerHandler} id="answerText" className="form-control"/>                        
                    </div>
                    {
                        this.props.answerPostingProp && 
                        <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                    }
                    {
                        this.state.answerError != null &&
                        <div className="alert alert-danger form-group">
                            <strong>{this.state.answerError}</strong>
                        </div>
                    }
                    {
                        this.props.answerPostingErrorProp != null &&
                        <div className="alert alert-danger form-group">
                            <strong>Could not answer the question!</strong> {this.props.answerPostingErrorProp}
                        </div>
                    }
                    <input type="submit" value="Answer" className="btn btn-primary"/>
                </form>
            </div>
        )
    }
}

export default AnswerQuestion;