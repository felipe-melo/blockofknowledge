import { connect } from 'react-redux';
import {
    searchKnowledge,
    openModal,
    newKnowledge,
    openVoteKnowledgeModal,
} from '../actions/search';
import Search from '../components/Search';
import addSocketMessage from '../commom/util';

const mapStateToProps = state => ({
    filter: state.search.filter,
    quantNewKnowledge: state.search.newKnowledges.length,
});

const mapDispatchToProps = (dispatch, ownProps) => {
    addSocketMessage(6, message => dispatch(newKnowledge(message.data)));

    return {
        searchKnowledge: () => {
            dispatch(searchKnowledge(ownProps.query));
        },
        openAddModal: () => {
            dispatch(openModal());
        },
        openNewKnowledge: () => {
            dispatch(openVoteKnowledgeModal());
        },
    };
};

const SearchBar = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Search);

export default SearchBar;
