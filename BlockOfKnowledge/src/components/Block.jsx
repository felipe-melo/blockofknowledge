import React from 'react';
import { blockShape } from '../commom/shapes';

const Block = ({ block }) => (
    <div className={block.wasAccept ? 'block' : 'block deny'}>
        <div>
            <p>{block.data}</p>
        </div>
    </div>
);

Block.propTypes = {
    block: blockShape.isRequired,
};

export default Block;
