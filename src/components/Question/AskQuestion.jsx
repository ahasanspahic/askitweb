import React from 'react';
import { createQuestion } from '../../actions/questionActions';
import { Link } from 'react-router-dom';
class AskQuestion extends React.Component {
    constructor() {
        super();
        this.state= {
            posting: false,
            showSuccessMessage: false,
            showErrorMessage: false,
            questionHeadline: '',
            headlineError: null,
            questionText: '',
            textError: null,
        }
        this.askQuestionHandler = this.askQuestion.bind(this);
        this.headlineHandler = this.updateQuestionHeadline.bind(this);
        this.textHandler = this.updateQuestionText.bind(this);
    }
    askQuestion(e) {
        e.preventDefault();
        let isValid = this.validateForm();
        if(isValid) {
            this.setState({posting: true});
            this.props.dispatchProp(createQuestion(this.state.questionHeadline,this.state.questionText,this.props.tokenProp));
        }
    }
    validateForm() {
        let isValid = true;
        if(this.state.questionHeadline.trim().length == 0){
            this.setState({headlineError: "Headline is required."});
            isValid=false;
        }
        else {
            this.setState({headlineError: null});
        }
        if(this.state.questionText.trim().length == 0){
            this.setState({textError: "Question text is required."});
            isValid = false;
        }
        else {
            this.setState({textError: null});
        }
        return isValid;
    }
    componentDidUpdate() {
        console.log(this.props);
        if(!this.props.questionPostingProp && this.state.posting && this.props.createQuestionErrorProp == null) { /* Just to clear the textbox */
            document.getElementById('questionText').value = '';
            document.getElementById('headlineText').value = '';
            this.setState({posting: false, showSuccessMessage: true});
        }
    }
    updateQuestionHeadline(e) {
        this.setState({questionHeadline: e.target.value});
    }
    updateQuestionText(e) {
        this.setState({questionText: e.target.value});
    }
    render() {
        let formGroupHeadline = this.state.headlineError == null ? "form-group" : "form-group has-error";
        let formGroupText = this.state.textError == null ? "form-group" : "form-group has-error";
        return (
            <div className="row">
                <div className="col-xs-offset-4 col-xs-4">
                <h4>Ask a question</h4>
                <form onSubmit={this.askQuestionHandler} className="form-horizontal">
                    <div className={formGroupHeadline}>
                        <label forname="headlineText" className="form-group"> Headline:</label>  
                        <input type="text" onChange = {this.headlineHandler} id="headlineText" className="form-control"/>                 
                        <label className="help-block">{this.state.headlineError}</label> 
                    </div>
                    <div className={formGroupText}>
                        <label forname="questionText" className="form-group">  Question text: </label>             
                        <textarea rows="4" cols="50" onChange = {this.textHandler} id="questionText" className="form-control"/>                        
                        <label className="help-block">{this.state.textError}</label> 
                    </div>
                    {
                        this.props.questionPostingProp && 
                        <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                    }
                    {
                        this.state.showSuccessMessage &&
                        <div className="alert alert-success form-group">
                            <strong>Success!</strong> Question created. Check at <Link to="/my-questions" >your questions</Link>
                        </div>
                    }
                    {
                            this.props.createQuestionErrorProp != null &&
                            <div className="alert alert-danger form-group">
                                <strong>Could not create question!</strong> {this.props.createQuestionErrorProp}
                            </div>
                        }
                    <input type="submit" value="ASK" className="btn btn-info" />
                </form>
                
            </div>
           </div>
        );
     }
 }

 export default AskQuestion;