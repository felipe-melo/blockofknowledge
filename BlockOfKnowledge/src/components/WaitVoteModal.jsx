import React, { Component } from 'react';
import PropTypes from 'prop-types';


class WaitVoteModal extends Component {
    componentDidMount() {
        this.timerID = setInterval(() => this.tick(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        if (this.props.timer === 0) {
            const data = {
                acceptVotes: this.props.acceptVotes,
                denyVotes: this.props.denyVotes,
                text: this.props.text,
            };
            if ((data.acceptVotes + data.denyVotes) > 0 && data.acceptVotes >= data.denyVotes) {
                this.props.endVote(data);
            } else if ((data.acceptVotes + data.denyVotes) > 0 && data.acceptVotes < data.denyVotes) {
                this.props.endVote(data);
            }
        } else {
            this.props.passTime();
        }
    }

    render() {
        let milisec = this.props.timer;
        const ms = milisec % 1000;
        milisec = (milisec - ms) / 1000;
        const secs = milisec % 60;
        milisec = (milisec - secs) / 60;
        const mins = milisec % 60;

        return (
            <div>
                <dialog
                    open={this.props.isOpen}
                >
                    <p>{this.props.text}</p>
                    <p>Votos por sim: {this.props.acceptVotes}</p>
                    <p>Votos por não: {this.props.denyVotes}</p>
                    <p>tempo de votação: { mins }:{ secs }</p>
                </dialog>
            </div>
        );
    }
}

WaitVoteModal.defaultProps = {
    isOpen: false,
    acceptVotes: 0,
    denyVotes: 0,
};

WaitVoteModal.propTypes = {
    timer: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    isOpen: PropTypes.bool,
    acceptVotes: PropTypes.number,
    denyVotes: PropTypes.number,
    endVote: PropTypes.func.isRequired,
    passTime: PropTypes.func.isRequired,
};

export default WaitVoteModal;
