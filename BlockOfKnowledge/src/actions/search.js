import FLAGS from './constants';


export const searchKnowledge = filter => ({
    type: FLAGS.SEARCH.FILTER,
    filter,
});

export const openModal = () => ({
    type: FLAGS.SEARCH.CHANGE_ADD_MODAL_STATUS,
    isModalOpen: true,
});

export const closeModal = () => ({
    type: FLAGS.SEARCH.CHANGE_ADD_MODAL_STATUS,
    isModalOpen: false,
});

export const newKnowledge = data => ({
    type: FLAGS.SEARCH.NEW_KNOWLEDGE,
    text: data.data,
    owner: data.owner,
});

export const openVoteKnowledgeModal = () => ({
    type: FLAGS.SEARCH.CHANGE_VOTE_MODAL_STATUS,
    isModalOpen: true,
});

export const closeVoteKnowledgeModal = () => ({
    type: FLAGS.SEARCH.CHANGE_VOTE_MODAL_STATUS,
    isModalOpen: false,
});

export const removeKnowledge = () => ({
    type: FLAGS.SEARCH.REMOVE_KNOWLEDGE,
});
