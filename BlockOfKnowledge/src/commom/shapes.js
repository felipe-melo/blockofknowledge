import PropTypes from 'prop-types';

const blockShape = PropTypes.shape({
    hash: PropTypes.string.isRequired,
    data: PropTypes.string.isRequired,
    wasAccept: PropTypes.bool,
});

const chainShape = PropTypes.shape({
    data: PropTypes.string.isRequired,
});

export { blockShape, chainShape };
