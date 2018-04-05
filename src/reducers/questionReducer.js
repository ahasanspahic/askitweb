export default function reducer(
    state={
    questions: [],
    questionPage: 0,
    showLoadMore: true,
    popularQuestions: [],
    myQuestions: [],
    questionsFetching: false,
    questionsFetched: false,
    questionsError: null,
    questionPosting: false,
    answerPosting: false,
    answerLike: false,
    questionLike: false,
    likeError: null,
    createQuestionError: null,
    answerPostingError: null,
  }, action) {

    switch (action.type) {
      /* Latest questions */ 
      case "FETCHING_QUESTIONS": {
        return {...state, fetching: true}
      }
      case "FETCH_QUESTIONS_FAILED": {
        return {...state, fetching: false, error: action.payload}
      }
      case "FETCHED_QUESTIONS": {
        if(state.questionPage == 0) {
          return {
            ...state,
            fetching: false,
            fetched: true,
            questions: action.payload,
            showLoadMore: action.payload.length>0
          }
        }
        else {
          return {
            ...state,
            fetching: false,
            fetched: true,
            questions: state.questions.concat(action.payload),
            showLoadMore: action.payload.length>0
          }
        }
      }
      case "SET_QUESTION_PAGE": {
        return {
          ...state,
          questionPage: action.payload
        }
      }
      
      /* Specific question details  */ 
      case "FETCH_QUESTION_DETAILS": {
        return {...state, fetching: true}
      }
      case "FETCH_QUESTION_DETAILS_FAILED": {
        return {...state, fetching: false, error: action.payload}
      }
      case "FETCH_QUESTION_DETAILS_SUCCESS": {
        console.log(action.payload);
        return {
          ...state,
          fetching: false,
          fetched: true,
          questions: state.questions.map((q,index) => q._id === action.payload._id ? action.payload : q ),
          myQuestions: state.myQuestions.map((q,index) => q._id === action.payload._id ? action.payload : q ),
          popularQuestions: state.popularQuestions.map((q,index) => q._id === action.payload._id ? action.payload : q ),
        }
      }
      /* Popular questions */
      case "FETCHING_POPULAR_QUESTIONS": {
        return {...state, fetching: true}
      }
      case "FETCH_POPULAR_QUESTIONS_FAILED": {
        return {...state, fetching: false, error: action.payload}
      }
      case "FETCHED_POPULAR_QUESTIONS": {
        return {
          ...state,
          fetching: false,
          fetched: true,
          popularQuestions: action.payload,
        }
      }
      /* My Questions */
      case "FETCHING_MY_QUESTIONS": {
        return {...state, fetching: true}
      }
      case "FETCHING_MY_QUESTIONS_FAILED": {
        return {...state, fetching: false, error: action.payload}
      }
      case "FETCHING_MY_QUESTIONS_SUCCESS": {
        return {
          ...state,
          fetching: false,
          fetched: true,
          myQuestions: action.payload,
        }
      }
      case "LOGOUT_SUCCESS": {
        return {
          ...state,
          myQuestions: [],
        }
      }
      /* Create question */
      case "CREATE_QUESTION": {
        return {
          ...state,
          questionPosting: true
        }
      }
      case "CREATE_QUESTION_SUCCESS": {
        return {
          ...state,
          questionPosting: false,
          createQuestionError: null
        }
      }
      case "CREATE_QUESTION_FAILED": {
        return {
          ...state,
          questionPosting: false,
          createQuestionError: action.payload
        }
      }
      /* Add answer*/
      case "ADD_ANSWER": {
        return {
          ...state,
          answerPosting: true
        }
      }
      case "ADD_ANSWER_SUCCESS": {
        return {
          ...state,
          answerPosting: false,
          answerPostingError: null
        }
      }
      case "ADD_ANSWER_FAILED": {
        return {
          ...state,
          answerPosting: false,
          answerPostingError: action.payload
        }
      }
      /* Like / dislike answer */
      case "LIKE_ANSWER": {
        return state;
      }
      case "LIKE_ANSWER_SUCCESS": {
        return {...state, likeError: null};
      }
      case "LIKE_ANSWER_FAILED": {
        return {...state, likeError: action.payload};
      }
      case "DISLIKE_ANSWER": {
        return state;
      }
      case "DISLIKE_ANSWER_SUCCESS": {
        return {...state, likeError: null};
      }
      case "DISLIKE_ANSWER_FAILED": {
        return {...state, likeError: action.payload};
      }
    }
    return state
}