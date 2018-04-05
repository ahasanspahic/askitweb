import React from 'react';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import Homepage from './Homepage.jsx';
import Profile from './User/Profile.jsx';
import Login from './Login/Login.jsx';
import Logout from './Login/Logout.jsx';
import Register from './Login/Register.jsx';
import QuestionDetails from './Question/QuestionDetails.jsx';
import Questions from './Question/QuestionPage.jsx';
import AskQuestion from './Question/AskQuestion.jsx';
import { connect } from 'react-redux';
import { fetchUser, setUserAge, isValid } from '../actions/userActions';
import { getLatestQuestions } from '../actions/questionActions';
import { Route, Link } from 'react-router-dom';
import MyQuestions from './Question/MyQuestions.jsx';
import SingleQuestionPage from './Question/SingleQuestionPage.jsx';

class App extends React.Component {
    constructor() {
        super();
    }

    componentDidMount() {         
    }
    componentWillMount() {
      this.props.dispatch(isValid(this.props.users.user.token));

        //this.props.dispatch(createQuestion(1,"Question number 1")); 
    }
    render() {
      let marginTop = {paddingTop: '70px'};
      return (
          <div>  
              
          <Header nameProp = {this.props.users.user.name} isLoggedProp = {this.props.users.logged} /> 
            <main className="container" style={marginTop}>           
            <Route exact path="/" render={() => (<Homepage latestQuestionsProp={this.props.questions.questions} 
                                                popularQuestionsProp={this.props.questions.popularQuestions}
                                                mostActiveUsersProp={this.props.users.mostActiveUsers} 
                                                dispatchProp= {this.props.dispatch}/>)} />
            <Route exact path="/my-questions" render={() => (<MyQuestions myQuestionsProp={this.props.questions.myQuestions} 
                                                                            tokenProp={this.props.users.user.token}
                                                                            dispatchProp={this.props.dispatch} 
                                                                            answerPostingProp={this.props.questions.answerPosting}
                                                                            isLoggedProp={this.props.users.logged}
                                                                            answerPostingErrorProp={this.props.questions.answerPostingError}/>)} />
            <Route exact  path='/question/:id' render={() => (<SingleQuestionPage tokenProp={this.props.users.user.token}
                                                                    dispatchProp={this.props.dispatch}
                                                                    answerPostingProp={this.props.questions.answerPosting}
                                                                    answerPostingErrorProp={this.props.questions.answerPostingError}
                                                                    locationProp={this.props.location} 
                                                                    questionsProp={this.props.questions.questions}/>)}/>
            <Route exact path='/questions' render={() => (<Questions questionsProp={this.props.questions.questions}
                                                                    tokenProp={this.props.users.user.token}
                                                                    dispatchProp={this.props.dispatch} 
                                                                    answerPostingProp={this.props.questions.answerPosting}
                                                                    questionPageProp={this.props.questions.questionPage}
                                                                    showLoadMoreProp={this.props.questions.showLoadMore}/>)}/>
            <Route exact path='/ask' render={() => (<AskQuestion    tokenProp={this.props.users.user.token}
                                                                    dispatchProp={this.props.dispatch}
                                                                    questionPostingProp={this.props.questions.questionPosting}
                                                                    createQuestionErrorProp={this.props.questions.createQuestionError} />)}/>
            
            <Route exact path='/login' render={() => (<Login isLoggedProp={this.props.users.logged}
                                                            dispatchProp={this.props.dispatch}
                                                            loggingErrorProp={this.props.users.loginError}
                                                            previousPageProp={this.props.users.previousPage} />)}/>
            <Route exact path='/logout' render={() => (<Logout dispatchProp={this.props.dispatch}
                                                            isLoggedProp={this.props.users.logged} />)}/>
            <Route exact path='/register' render={() => (<Register fetchingProp={this.props.users.fetching}
                                                                    dispatchProp={this.props.dispatch}
                                                                    loggingErrorProp={this.props.users.error}
                                                                    isLoggedProp={this.props.users.logged}
                                                                    successMessageShowedProp={this.props.users.successMessageShowed}
                                                                    registerErrorProp={this.props.users.registerError}/>)}/>
            <Route exact path='/profile' render={() => (<Profile usernameProp={this.props.users.user.name}
                                                                userIdProp={this.props.users.user.id}
                                                                tokenProp={this.props.users.user.token}
                                                                dispatchProp={this.props.dispatch}
                                                                isLoggedProp={this.props.users.logged}
                                                                successMessageShowedProp={this.props.users.successMessageShowed} 
                                                                fetchingProp={this.props.users.fetching}
                                                                changePasswordErrorProp={this.props.users.changePasswordError}/>)}/>
            <Footer/>
            </main>           
         </div>
      );
   }
}

const mapStateToProps = state => {
    return {
      users : state.users,
      questions: state.questions,
    }
  }
  
  /*const mapDispatchToProps = dispatch => {
    return {
        setUserAge : (age) => dispatch({
        type : 'SET_USER_AGE',
        payload: age
      }),
      fetchUser : () => dispatch({
          type: 'FETCH_USER',
          payload: {name:"aldin", age:24}
      })
    }
  }*/
//export default App;
/*const connectedApp = connect(mapStateToProps,mapDispatchToProps)(App);
export { connectedApp as App }; */
/*
export default connect(
    mapStateToProps//,
    //mapDispatchToProps
  )(App)*/
/* This jiberish is required to render changes on routing events because App.jsx is not matched in any Route path */
import { withRouter } from 'react-router-dom'
export default withRouter(connect(mapStateToProps)(App))