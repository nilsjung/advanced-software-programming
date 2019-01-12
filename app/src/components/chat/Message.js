import moment from 'moment';
import React from 'react';
import { MultiLineParser } from 'text-emoji-parser';
import { DateFormat } from '../../config';
import { Emoji } from 'emoji-mart';
import TranslatorPopup from './../mixins/TranslatorPopup';

/**
 * This functions returns the formatted date given by the format in the configs
 *
 * @param {string} d the date to format, recieved from the message stored on the server
 */
const formatDate = (d) => {
    return moment(d).format(DateFormat);
};

/**
 * Renders a **Message Component**
 *
 * containing the message header and the message body.
 * could be stored in seperated components
 *
 */
const Message = (props) => {
    return (
        <li className={props.className}>
            <small className="MessageHeader row">
                <span className="TimeStamp col-4">
                    {formatDate(props.timestamp)}
                </span>
                <span className="MessageAuthor col-5">{props.userName}</span>
                <span className="col-1">
                    <TranslatorPopup value={props.text} />
                </span>
            </small>
            <div className="MessageBody">
                {MultiLineParser(
                    props.text,
                    {
                        SplitLinesTag: 'p',
                        Rule: /(?:\:[^\:]+\:(?:\:skin-tone-(?:\d)\:)?)/gi,
                    },
                    (Rule, ruleNumber) => {
                        return <Emoji emoji={Rule} size={48} />;
                    }
                )}
            </div>
            {retrieveYoutubeURLs(props.text)}
        </li>
    );
};

/**
 * This function parses the message input text for a youtube link.
 * Returns a Array with the plyr-video-player for each link that could be found.
 *
 * @param {string} text the input text to parse
 * @returns The array with plyr-containers if a link was found. Otherwise returns an empty array.
 */
function retrieveYoutubeURLs(text) {
    const urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;
    const urls = text.match(urlRegex);
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    let returnValue = [];
    if (urls != null) {
        urls.forEach((element, index) => {
            const match = element.match(regExp);
            if (match && match[2].length == 11) {
                const youtubeUrl = 'https://www.youtube.com/embed/' + match[2];
                returnValue.push(
                    <div key={index} className="plyr__video-embed" id="player">
                        <iframe
                            src={youtubeUrl}
                            allowFullScreen
                            allowtransparency={''}
                            allow="autoplay"
                        />
                    </div>
                );
            }
        });
        return returnValue;
    }
}
export default Message;
