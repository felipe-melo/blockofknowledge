import { connect } from 'react-redux';
import {
    fetchNewBlockBegin,
    fetchBlocksError,
    handleErrors,
    fetchAddKnowledgeSuccess,
} from '../actions/blocks';
import { closeModal } from '../actions/search';
import AddKnowledgeModal from '../components/AddKnowledgeModal';

const mapStateToProps = state => ({
    isOpen: state.search.isAddKnowledgeModalOpen,
});

const mapDispatchToProps = dispatch => ({
    close: () => {
        dispatch(closeModal());
    },
    addKnowledge: (text) => {
        dispatch(fetchNewBlockBegin());
        const config = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                data: text,
            }),
        };
        return fetch('/addKnowledge/', config)
            .then(handleErrors)
            .then(() => {
                dispatch(fetchAddKnowledgeSuccess(text));
                dispatch(closeModal());
                return text;
            })
            .catch(error => dispatch(fetchBlocksError(error)));
    },
});

const AddKnowledge = connect(
    mapStateToProps,
    mapDispatchToProps,
)(AddKnowledgeModal);

export default AddKnowledge;
