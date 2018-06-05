import FLAGS from '../actions/constants';

const initialState = {
    blocks: [],
    isLoading: false,
    error: null,
    knowledgeToBeVote: '',
    isVoteModalOpen: false,
    acceptVotes: 0,
    denyVotes: 0,
    timer: 0,
};

const blocksReducer = (state = initialState, action) => {
    switch (action.type) {
    case FLAGS.FETCH_BLOCKS_SUCCESS:
        return {
            ...state,
            isLoading: false,
            blocks: action.blocks,
        };
    case FLAGS.FETCH_BLOCKS_FAILURE:
        return {
            ...state,
            isLoading: false,
            error: action.error,
            blocks: [],
        };
    case FLAGS.FETCH_BLOCKS_BEGIN:
        return {
            ...state,
            isLoading: true,
            error: null,
        };
    case FLAGS.BLOCK.ADD_KNOWLEDGE_TO_VOTE_SUCCESS:
        return {
            ...state,
            isLoading: false,
            error: null,
            isVoteModalOpen: true,
            timer: 60000,
            knowledgeToBeVote: action.text,
            acceptVotes: 0,
            denyVotes: 0,
        };
    case FLAGS.BLOCK.END_VOTE:
        return {
            ...state,
            isVoteModalOpen: false,
            acceptVotes: 0,
            denyVotes: 0,
        };
    case FLAGS.BLOCK.PASS_TIME:
        return {
            ...state,
            timer: state.timer - 1000,
        };
    case FLAGS.BLOCK.VOTE:
        return {
            ...state,
            acceptVotes: action.vote ? (state.acceptVotes + 1) : state.acceptVotes,
            denyVotes: !action.vote ? (state.denyVotes + 1) : state.denyVotes,
        };
    case FLAGS.BLOCK.UPDATE_BLOCK:
        return {
            ...state,
            blocks: [
                ...state.blocks,
                action.data,
            ],
        };
    default:
        return state;
    }
};

export default blocksReducer;
