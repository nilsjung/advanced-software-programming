import React, {Component} from 'react';
// would take most urls correctly, we could possible filter by youtube url later, href any other url ?
const urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;

class TextInput extends Component {
    constructor(props) {
        super(props);

        this.handleChange = (event) => {
            this.props.onChange(event.target.value);
        }

        this.handleKeyPress = (event) => {
            if (event.which === 13) {
                const message = this.props.value.trim();
                
                this.textInput(message);

                event.preventDefault();
            }
        }

        this.handleClick = (event) => {
            const message = document.getElementById('messageInput').value.trim();

            this.textInput(message);

            event.preventDefault();
        }
    }

    textInput(message) {
        if (message) {

            this.props.onSubmit({
                userId: this.props.userId,
                text: message,
                urls:message.match(urlRegex),
                youtubeEmbed:getId(message.match(urlRegex)),
                timestamp: new Date(),
            });
        }
    }

    render() {
        return (
            <div className='InputContainer'>
                <input id='messageInput'
                    type='text'
                    value={this.props.value}
                    className='MessageInput'
                    onKeyPress={this.handleKeyPress.bind(this)}
                    onChange={this.handleChange}
                    placeholder='enter text...'>
                </input>
                <button className='btn btn-primary' type='submit' onClick={this.handleClick}>Send!</button>
            </div>
        )
    }
}

// will take the first youtube link within a message only , its for testing purpose but it works rather well oO 
function getId(url) {

    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    if(url !=null){
    var match = url[0].match(regExp);

    if (match && match[2].length == 11) {
        return match[2];
    } else {
        return "";
    }
}
}

export default TextInput