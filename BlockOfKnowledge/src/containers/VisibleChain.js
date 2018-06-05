import { connect } from 'react-redux';
import Chain from '../components/Chain';
import { fetchBlocksBegin, fetchBlocksError, fetchBlocksSuccess, handleErrors, updateBlock } from '../actions/blocks';
import addSocketMessage from '../commom/util';


const getVisibleBlocks = (blocks, filter) => {
    switch (filter) {
    case 'FILTER_AGREED':
        return blocks.filter(t => t.active);
    case 'FILTER_DISAGREED':
        return blocks.filter(t => !t.active);
    default:
        return blocks;
    }
};

const mapStateToProps = state => ({
    blocks: getVisibleBlocks(state.blocksReducer.blocks, state.visibilityFilter),
    error: state.blocksReducer.error,
    isLoading: state.blocksReducer.isLoading,
});

const mapDispatchToProps = (dispatch) => {
    addSocketMessage(7, (message) => {
        dispatch(updateBlock(message.data));
    });

    return {
        fetchBlocks: () => {
            dispatch(fetchBlocksBegin());
            return fetch('/blocks/')
                .then(handleErrors)
                .then(res => res.json())
                .then((json) => {
                    dispatch(fetchBlocksSuccess(json));
                    return json;
                })
                .catch(error => dispatch(fetchBlocksError(error)));
        },
    };
};

const KnowledgeList = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Chain);

export default KnowledgeList;
