import FLAGS from '../actions/constants';

const initialState = {
    newKnowledges: [],
    filter: '',
    isVoteKnowledgeModalOpen: false,
    isAddKnowledgeModalOpen: false,
};

const searchReducer = (state = initialState, action) => {
    switch (action.type) {
    case FLAGS.SEARCH.FILTER:
        return {
            ...state,
            filter: action.filter,
        };
    case FLAGS.SEARCH.NEW_KNOWLEDGE:
        return {
            ...state,
            newKnowledges: [
                ...state.newKnowledges,
                {
                    text: action.text,
                    owner: action.owner,
                },
            ],
        };
    case FLAGS.SEARCH.CHANGE_VOTE_MODAL_STATUS:
        return {
            ...state,
            isVoteKnowledgeModalOpen: action.isModalOpen,
        };
    case FLAGS.SEARCH.CHANGE_ADD_MODAL_STATUS:
        return {
            ...state,
            isAddKnowledgeModalOpen: action.isModalOpen,
        };
    case FLAGS.SEARCH.REMOVE_KNOWLEDGE:
        state.newKnowledges.shift();
        return {
            ...state,
        };
    default:
        return state;
    }
};

export default searchReducer;
