import React, {Component} from 'react';


class MessagesList extends Component {
    render() {
        let {messages, userId} = this.props;
        return (
            <ol className='MessageContainer'>
                {messages.map((message, index) => {
                    let youtubeThingy
                    if(message.youtubeEmbed!=null){
                        let youtubeUrl = "https://www.youtube.com/embed/"+message.youtubeEmbed
                        youtubeThingy = <div class="plyr__video-embed" id="player">
                                            <iframe src={youtubeUrl} allowfullscreen allowtransparency allow="autoplay"></iframe>
                                        </div>
                    }
                    
                    let additionalClass = message.userId !== userId ? 'is-response' : ''
                    return (
                        
                        <li key={`message-${index}`} className={`MessageItem ${additionalClass}`}>
                            <div className='MessageHeader'>
                                <span className='TimeStamp'>{message.timestamp.toLocaleString()}</span>
                                <span className='MessageAuthor'>{message.userId}</span>
                            </div>
                            <div className='MessageBody'>
                                {message.text}
                            </div>
                                {youtubeThingy}
                        </li>              
                    )
                })}
            </ol>
        );
    }
}

export default MessagesList;