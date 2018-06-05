import React from 'react';
import PropTypes from 'prop-types';


const AddKnowledgeModal = ({ addKnowledge, isOpen, close }) => (
    <dialog
        className="newKownledge"
        open={isOpen}
    >
        <button onClick={close}>X</button>
        <p>Digite o conhecimento</p>
        <textarea
            ref={(node) => {
                this.input = node;
            }}
        />
        <button onClick={(event) => {
            if (!this.input.value.trim()) {
                return;
            }
            event.preventDefault();
            addKnowledge(this.input.value);
            this.input.value = '';
        }}
        >
            Salvar
        </button>
    </dialog>
);

AddKnowledgeModal.defaultProps = {
    isOpen: false,
};

AddKnowledgeModal.propTypes = {
    addKnowledge: PropTypes.func.isRequired,
    close: PropTypes.func.isRequired,
    isOpen: PropTypes.bool,
};

export default AddKnowledgeModal;
