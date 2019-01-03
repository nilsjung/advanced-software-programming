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

    renderEmojiPicker = () => {
        if (this.state.showEmojis) {
            return (
                <span
                    style={styles.emojiPicker}
                    ref={(el) => {
                        this.emojiPicker = el;
                    }}
                >
                    <Picker onSelect={this.addEmoji} />
                </span>
            );
        }
        return '';
    };

    render() {
        const activeClass = this.state.showEmojis ? ' active' : '';

        return (
            <div
                className={'btn btn-outline-secondary' + activeClass}
                type="button"
                onClick={this.showEmojis}
            >
                <i className="fa fa-smile-o" />
                {this.renderEmojiPicker()}
            </div>
        );
    }
}

export default EmojiPicker;

const styles = {
    emojiPicker: {
        position: 'absolute',
        bottom: 50,
    },
};
