import { connect } from 'react-redux';
import { closeVoteKnowledgeModal, removeKnowledge } from '../actions/search';
import VoteKnowledgeModal from '../components/VoteKnowledgeModal';


const mapStateToProps = state => ({
    isOpen: state.search.isVoteKnowledgeModalOpen,
    text: state.search.newKnowledges.length ? state.search.newKnowledges[0].text : '',
    owner: state.search.newKnowledges.length ? state.search.newKnowledges[0].owner : '',
});

const mapDispatchToProps = dispatch => ({
    close: () => {
        dispatch(closeVoteKnowledgeModal());
    },
    accept: (ip) => {
        const config = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                type: 5,
                vote: true,
                owner: ip,
            }),
        };
        return fetch('/vote/', config)
            .then(() => {
                dispatch(closeVoteKnowledgeModal());
                dispatch(removeKnowledge());
            })
            .catch(error => console.log(error));
    },
    deny: (ip) => {
        const config = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                type: 5,
                vote: false,
                owner: ip,
            }),
        };
        return fetch('/vote/', config)
            .then(() => {
                dispatch(closeVoteKnowledgeModal());
            })
            .catch(error => console.log(error));
    },
});

const VoteKnowledge = connect(
    mapStateToProps,
    mapDispatchToProps,
)(VoteKnowledgeModal);

export default VoteKnowledge;
