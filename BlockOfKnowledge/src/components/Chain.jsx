import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Block from './Block';
import { blockShape } from '../commom/shapes';
import WaitVote from '../containers/WaitVote';


class Chain extends Component {
    componentDidMount() {
        this.props.fetchBlocks();
    }

    render() {
        const { error, isLoading, blocks } = this.props;
        if (error) {
            return <div>Error! {error.message}</div>;
        }

        if (isLoading) {
            return <div>Loading...</div>;
        }

        return (
            <div>
                {
                    blocks.map(block =>
                        (<Block
                            key={block.hash}
                            block={block}
                            voteBlock={value => console.log(value)}
                        />))
                }
                <WaitVote />
            </div>
        );
    }
}

Chain.defaultProps = {
    blocks: [],
    isLoading: false,
    error: null,
};

Chain.propTypes = {
    blocks: PropTypes.arrayOf(blockShape),
    error: PropTypes.object, // eslint-disable-line
    isLoading: PropTypes.bool,
    fetchBlocks: PropTypes.func.isRequired,
};

export default Chain;
