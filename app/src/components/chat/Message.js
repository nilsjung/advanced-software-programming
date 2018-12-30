import React from 'react';
import moment from 'moment';
import { DateFormat } from '../../config';

const formatDate = (d) => {
    return moment(d).format(DateFormat);
};

const Message = (props) => {
    return (
        <li className={props.className}>
            <small className="MessageHeader row">
                <span className="TimeStamp col-4">
                    {formatDate(props.timestamp)}
                </span>
                <span className="MessageAuthor col-8">{props.userName}</span>
            </small>
            <div className="MessageBody">{props.text}</div>
        </li>
    );
};

export default Message;
