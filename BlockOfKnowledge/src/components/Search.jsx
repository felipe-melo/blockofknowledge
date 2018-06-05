import React from 'react';
import PropTypes from 'prop-types';
import AddKnowledge from '../containers/AddKnowledge';
import VoteKnowledge from '../containers/VoteKnowledge';


const Search = ({
    searchKnowledge,
    openAddModal,
    openNewKnowledge,
    quantNewKnowledge,
}) => {
    let input;

    return (
        <div>
            <div className="search">
                <input
                    placeholder="Escreva aqui uma nova tarefa..."
                    ref={(node) => {
                        input = node;
                    }}
                />
                <button onClick={
                    () => {
                        if (!input.value.trim()) {
                            return;
                        }
                        searchKnowledge(input.value);
                        input.value = '';
                    }
                }
                >
                    search
                </button>
                <button onClick={openAddModal}>add conhecimento</button>
                <button
                    onClick={openNewKnowledge}
                    disabled={quantNewKnowledge === 0}
                >
                    {`Novo(s) conhecimento(s) (${quantNewKnowledge})`}
                </button>
            </div>
            <AddKnowledge />
            <VoteKnowledge />
        </div>
    );
};

Search.defaultProps = {
    quantNewKnowledge: 0,
};

Search.propTypes = {
    openAddModal: PropTypes.func.isRequired,
    searchKnowledge: PropTypes.func.isRequired,
    openNewKnowledge: PropTypes.func.isRequired,
    quantNewKnowledge: PropTypes.number,
};

export default Search;
