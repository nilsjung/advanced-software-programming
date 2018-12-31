import '../../CSS/emoji-mart.css';
import { Picker } from 'emoji-mart';
import React from 'react';

class EmojiPicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            showEmojis: false,
        };
    }

    addEmoji = (event) => {
        this.setState(
            {
                value: event.colons,
                showEmojis: false,
            },
            this.props.onSelect(event.colons)
        );
    };

    closeMenu = (event) => {
        if (
            this.emojiPicker !== null &&
            !this.emojiPicker.contains(event.target)
        ) {
            this.setState(
                {
                    showEmojis: false,
                },
                () => document.removeEventListener('click', this.closeMenu)
            );
        }
    };

    showEmojis = (event) => {
        this.setState(
            {
                showEmojis: true,
            },
            () => document.addEventListener('click', this.closeMenu)
        );
    };

    render() {
        return (
            <div className="input-group-append">
                {this.state.showEmojis ? (
                    <span
                        style={styles.emojiPicker}
                        ref={(el) => (this.emojiPicker = el)}
                    >
                        <Picker onSelect={this.addEmoji} />
                    </span>
                ) : (
                    <button
                        style={styles.getEmojiButton}
                        onClick={this.showEmojis}
                    >
                        {String.fromCodePoint(0x1f60a)}
                    </button>
                )}
            </div>
        );
    }
}

export default EmojiPicker;

const styles = {
    getEmojiButton: {
        cssFloat: 'right',
        border: 'none',
        margin: 0,
        cursor: 'pointer',
    },
    emojiPicker: {
        display: 'flex',
        position: 'absolute',
        bottom: 10,
        right: 0,
        cssFloat: 'right',
        marginLeft: '200px',
    },
};
