import React from 'react'

export default class Input extends React.Component {
    render() {
        const {placeholder, Id, label, type, className} = this.props;
        const inputId = Id || Symbol('input');
        const renderLabel = label ? <label htmlFor={inputId}>{label}</label> : '';
        return (
            <div className='form-group'>
                {renderLabel}
                <input type={type} className='form-control' placeholder={placeholder} id={inputId}/>
            </div>
        )
    }
}