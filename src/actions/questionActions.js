import axios from "axios";
import {LOCALHOST_API, PRODUCTION_LIKE_API} from '../../config.js'; 
const url = PRODUCTION_LIKE_API;
/* Latest questions */
export function getLatestQuestions(page,pageSize) {
  return function(dispatch) {
    dispatch({type: "FETCHING_QUESTIONS"});

    axios.get(url+"questions/"+page+"/"+pageSize)
      .then((response) => {
        dispatch({type:"SET_QUESTION_PAGE", payload: page});
        dispatch({type: "FETCHED_QUESTIONS", payload: response.data});
      })
      .catch((err) => {
        dispatch({type: "FETCH_QUESTIONS_FAILED", payload: err})
      })
  }
}
/* Popular questions */
export function getPopularQuestions(page,pageSize) {
  return function(dispatch) {
    dispatch({type: "FETCHING_POPULAR_QUESTIONS"});

    axios.get(url+"questions/popular/"+page+"/"+pageSize)
      .then((response) => {
        dispatch({type: "FETCHED_POPULAR_QUESTIONS", payload: response.data})
      })
      .catch((err) => {
        dispatch({type: "FETCH_POPULAR_QUESTIONS_FAILED", payload: err})
      })
  }
}
/* My questions */
export function getMyQuestions(page,pageSize, token) {
  return function(dispatch) {
    dispatch({type: "FETCHING_MY_QUESTIONS"});

    axios.get(url+"questions/myquestions/"+page+"/"+pageSize,
    {headers: {
      "Authorization" : token
    }
    })
      .then((response) => {
        dispatch({type: "FETCHING_MY_QUESTIONS_SUCCESS", payload: response.data})
      })
      .catch((err) => {
        dispatch({type: "FETCHING_MY_QUESTIONS_FAILED", payload: err.response.data.message})
      })
  }
}
/* Get question details */
export function getQuestionDetails(questionId) {
  return function(dispatch) {
    dispatch({type: "FETCH_QUESTION_DETAILS"});
    axios.get(url+"questions/"+questionId)
      .then((response) => {
        dispatch({type: "FETCH_QUESTION_DETAILS_SUCCESS", payload: response.data})
      })
      .catch((err) => {
        dispatch({type: "FETCH_QUESTION_DETAILS_FAILED", payload: err})
      })
  }
}
/* Create question */
export function createQuestion(headline,text,token) {
  return function(dispatch) {
    dispatch({type: "CREATE_QUESTION"});      
    axios.post(url+"questions/",{
      text: text,
      headline: headline
    },
    {headers: {
      "Authorization" : token
    }
    })
    .then((response) => {
      dispatch({type: "CREATE_QUESTION_SUCCESS", payload: response.data});
      dispatch(getMyQuestions(0,Number.MAX_SAFE_INTEGER,token));
    })
    .catch((err) => {
      dispatch({type: "CREATE_QUESTION_FAILED", payload: err.response.data.message})
    })
  }
}

export function addAnswer(text,questionId,token) {
  return function(dispatch) {
    dispatch({type: "ADD_ANSWER"});    
    axios.put(url+"questions/answer/"+questionId,{
      answer: text
    },
    {headers: {
      "Authorization" : token
    }
    })
    .then((response) => {
      dispatch({type: "ADD_ANSWER_SUCCESS", payload: response.data});
      dispatch(getQuestionDetails(questionId));
    })
    .catch((err) => {
      dispatch({type: "ADD_ANSWER_FAILED", payload: err.response.data.message})
    })
  }
}
/* Like/Dislike question */
export function likeQuestion(questionId,token) {
  return function(dispatch) {
    dispatch({type: "LIKE_QUESTION"});      
    axios.put(url+"questions/like/"+questionId,{
      like: true
    },
    {headers: {
      "Authorization" : token
    }
    })
    .then((response) => {
      dispatch({type: "LIKE_QUESTION_SUCCESS", payload: response.data});
      dispatch(getQuestionDetails(questionId));
    })
    .catch((err) => {
      if(err.response.status != "304")
        dispatch({type: "LIKE_QUESTION_FAILED", payload: err.response.data.message})
    })
  }
}

export function dislikeQuestion(questionId,token) {
  return function(dispatch) {
    dispatch({type: "DISLIKE_QUESTION"});      
    axios.put(url+"questions/like/"+questionId,{
      like: false
    },
    {headers: {
      "Authorization" : token
    }
    })
    .then((response) => {
      dispatch({type: "DISLIKE_QUESTION_SUCCESS", payload: response.data});
      dispatch(getQuestionDetails(questionId));
    })
    .catch((err) => {
      if(err.response.status != "304")
        dispatch({type: "DISLIKE_QUESTION_FAILED", payload: err.response.data.message})
    })
  }
}

/* Like/Dislike answer */
export function likeAnswer(answerId,questionId,token) {
  return function(dispatch) {
    dispatch({type: "LIKE_ANSWER"});      
    axios.put(url+"questions/answer/like/"+answerId+"/"+questionId,{
      like: true
    },
    {headers: {
      "Authorization" : token
    }
    })
    .then((response) => {
      dispatch({type: "LIKE_ANSWER_SUCCESS", payload: response.data});
      dispatch(getQuestionDetails(questionId));
    })
    .catch((err) => {
      if(err.response.status != "304")
        dispatch({type: "LIKE_ANSWER_FAILED", payload: err.response.data.message})
    })
  }
}

export function dislikeAnswer(answerId,questionId,token) {
  return function(dispatch) {
    dispatch({type: "DISLIKE_ANSWER"});      
    axios.put(url+"questions/answer/like/"+answerId+"/"+questionId,{
      like: false
    },
    {headers: {
      "Authorization" : token
    }
    })
    .then((response) => {
      dispatch({type: "DISLIKE_ANSWER_SUCCESS", payload: response.data});
      dispatch(getQuestionDetails(questionId));
    })
    .catch((err) => {
      if(err.response.status != "304") /* Otherwise user has already liked/disliked */
        dispatch({type: "DISLIKE_ANSWER_FAILED", payload: err.response.data.message})
    })
  }
}