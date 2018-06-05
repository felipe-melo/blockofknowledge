import { connect } from 'react-redux';
import WaitVoteModal from '../components/WaitVoteModal';
import { endVote, fetchBlocksError, handleErrors, passTime, vote } from '../actions/blocks';
import addSocketMessage from '../commom/util';


const mapStateToProps = state => ({
    isOpen: state.blocksReducer.isVoteModalOpen,
    text: state.blocksReducer.knowledgeToBeVote,
    acceptVotes: state.blocksReducer.acceptVotes,
    denyVotes: state.blocksReducer.denyVotes,
    timer: state.blocksReducer.timer,
});

const mapDispatchToProps = (dispatch) => {
    addSocketMessage(5, (message) => {
        dispatch(vote(message.data));
    });

    return {
        endVote: (data) => {
            dispatch(endVote());

            const config = {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    data,
                }),
            };
            return fetch('/newBlock/', config)
                .then(handleErrors)
                .catch(error => dispatch(fetchBlocksError(error)));
        },
        passTime: () => {
            dispatch(passTime());
        },
    };
};

const WaitVote = connect(
    mapStateToProps,
    mapDispatchToProps,
)(WaitVoteModal);

export default WaitVote;
