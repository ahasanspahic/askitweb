import React from 'react';
import { Link } from 'react-router-dom';
import {  getPopularQuestions, getLatestQuestions } from '../actions/questionActions';
import { getActiveUsers } from '../actions/userActions';
class Homepage extends React.Component {
    constructor() {
        super();
        this.state = {
            page: 0,
            pageSize: 20
        }
    }
    componentWillMount() {
        this.props.dispatchProp(getLatestQuestions(0,20));
        this.props.dispatchProp(getPopularQuestions(this.state.page,this.state.pageSize)); 
        this.props.dispatchProp(getActiveUsers(this.state.page, this.state.pageSize));   
    }
    render() {
        const questions = this.props.latestQuestionsProp.map(q => <div key={q._id}><Link key={q._id} to={"/question/"+q._id}>{q.headline}</Link></div>)
        const popularQuestions = this.props.popularQuestionsProp.map(q => <div key={q._id}><Link key={q._id} to={"/question/"+q._id}>{q.headline} - {q.likeCount} likes</Link></div>)
        const mostActiveUsers = this.props.mostActiveUsersProp.map(u => <li key={u._id}>{u.username} - {u.answerCount} answers</li>)
        let flex = {display: 'flex', margin: '0px'};
        return (
        <div>
            <h1>Welcome to Ask.it</h1>
            <div className="row" style={flex}>            
                <div className="col-md-4 col-xs-6 bg-success">
                    <h4>New questions</h4>
                    {questions}
                </div>
                <div className="col-md-4 col-xs-6 bg-danger">
                    <h4>Popular questions</h4>
                    {popularQuestions}
                </div>
                <div className="col-md-4 col-xs-6 bg-info">
                    <h4>Users with most answers</h4>
                    <ol>
                        {mostActiveUsers}
                    </ol>
                </div>
            </div>
        </div>
       );
    }
 }

 export default Homepage;