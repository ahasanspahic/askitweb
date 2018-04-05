import React from 'react';
import {likeAnswer, dislikeAnswer} from '../../actions/questionActions.js';
import {Glyphicon, Button} from 'react-bootstrap';
import {history}  from "../../store.js";
class SingleAnswer extends React.Component {
    constructor() {
        super();
        this.likeAnswerHandler = this.likeAnswer.bind(this);
        this.dislikeAnswerHandler = this.dislikeAnswer.bind(this);
    }
    componentDidMount() {
    }
    likeAnswer() {
        if(this.props.tokenProp == null){
            history.push('/login');
        }
        else {
            this.props.dispatchProp(likeAnswer(this.props.answerProp._id,this.props.questionIdProp, this.props.tokenProp));
        }        
    }
    dislikeAnswer() {
        if(this.props.tokenProp == null){
            history.push('/login');
        }
        else {
            this.props.dispatchProp(dislikeAnswer(this.props.answerProp._id,this.props.questionIdProp,this.props.tokenProp));
        }
    }
    render() {
        let flex = {display: 'flex', margin: '0px'};
        let border = {border: '3px dashed #ccc', borderRadius: '5px'};
        let margin = {margin: '0px 0px 10px 0px'};
        let rightBorder = {borderRight: '3px dashed #ccc'};
        let center = {textAlign: 'center'};
        let answerStyle = {
            backgroundColor: '#666',
            color: '#fff',
            fontWeight: 'bold',
            padding: '10px',
            borderRadius: '5px'
        }
        return(
            <div className="row" style={margin}>
                <div className="row" style={flex}> 
                    <div className="col-md-3 bg-info" style={border}>
                        Answer by: {this.props.answerProp.username}
                        <div className="row"  >  
                            <div className="col-md-12">
                                <div className="col-xs-6">Likes: {this.props.answerProp.likeCount} </div>
                                <Button bsSize="small" onClick= {this.likeAnswerHandler} className="col-xs-6">
                                    <Glyphicon glyph="glyphicon glyphicon-thumbs-up"/>Like
                                </Button>
                            </div>
                            <div className="col-md-12">
                                <div className="col-xs-6">Dislikes: {this.props.answerProp.dislikeCount}</div>
                                <Button bsSize="small" onClick= {this.dislikeAnswerHandler} className="col-xs-6">
                                    <Glyphicon glyph="glyphicon glyphicon-thumbs-down"/>Dislike
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-9 bg-info" style={answerStyle}>{this.props.answerProp.text}</div>
                </div>
            </div>
        )
    }
}

export default SingleAnswer;