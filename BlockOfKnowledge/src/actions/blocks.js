import FLAGS from './constants';


export function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

export const fetchBlocksBegin = () => ({
    type: FLAGS.FETCH_BLOCKS_BEGIN,
    isLoading: true,
});

export const fetchBlocksError = error => ({
    type: FLAGS.FETCH_BLOCKS_FAILURE,
    error,
});

export const fetchBlocksSuccess = blocks => ({
    type: FLAGS.FETCH_BLOCKS_SUCCESS,
    blocks,
});

export const fetchNewBlockBegin = () => ({
    type: FLAGS.BLOCK.NEW_BLOCK_BEGIN,
    isLoading: true,
});

export const fetchNewBlockSuccess = block => ({
    type: FLAGS.BLOCK.NEW_BLOCK_SUCCESS,
    block,
});

export const fetchAddKnowledgeSuccess = text => ({
    type: FLAGS.BLOCK.ADD_KNOWLEDGE_TO_VOTE_SUCCESS,
    text,
});

export const endVote = () => ({
    type: FLAGS.BLOCK.END_VOTE,
});

export const vote = data => ({
    type: FLAGS.BLOCK.VOTE,
    vote: data.vote,
});

export const passTime = () => ({
    type: FLAGS.BLOCK.PASS_TIME,
});

export const updateBlock = data => ({
    type: FLAGS.BLOCK.UPDATE_BLOCK,
    data,
});
