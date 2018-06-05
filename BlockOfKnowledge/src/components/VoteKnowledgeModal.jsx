import React from 'react';
import PropTypes from 'prop-types';


const VoteKnowledgeModal = ({
    accept,
    deny,
    isOpen,
    close,
    text,
    owner,
}) => (
    <dialog
        className="newKownledge"
        open={isOpen}
    >
        <button onClick={close}>X</button>
        <p>{ text }</p>
        <button onClick={(event) => {
            event.preventDefault();
            accept(owner);
        }}
        >
            Aceitar
        </button>
        <button onClick={(event) => {
            event.preventDefault();
            deny(owner);
        }}
        >
            Negar
        </button>
    </dialog>
);

VoteKnowledgeModal.defaultProps = {
    isOpen: false,
    text: '',
};

VoteKnowledgeModal.propTypes = {
    accept: PropTypes.func.isRequired,
    deny: PropTypes.func.isRequired,
    close: PropTypes.func.isRequired,
    text: PropTypes.string,
    isOpen: PropTypes.bool,
    owner: PropTypes.string.isRequired,
};

export default VoteKnowledgeModal;
