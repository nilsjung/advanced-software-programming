import React from 'react';

import { YANDEX } from './../../config';

class Translator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            showTranslator: false,
        };
    }

    closeMenu = (event) => {
        if (
            event.target.id === 'text' ||
            event.target.id === 'language' ||
            event.target.parentElement.id === 'language'
        ) {
            return;
        }
        {
            this.setState(
                {
                    showTranslator: false,
                },
                () => document.removeEventListener('click', this.closeMenu)
            );
        }
    };

    showTranslator = (event) => {
        this.setState(
            {
                showTranslator: true,
            },
            () => document.addEventListener('click', this.closeMenu)
        );
    };

    translate = (event) => {
        translateText(
            document.querySelector('#text').value,
            document.querySelector('#language').value,
            this.props
        );
    };
    renderTranslator() {
        //i have chosen only those languages more are of course available
        if (this.state.showTranslator) {
            return (
                <div className="c-translator popup-box">
                    <form>
                        <div className="form-group row">
                            <div className="col-sm-12">
                                <textarea
                                    className="form-control"
                                    defaultValue="Oh hello there how are you?"
                                    id="text"
                                />
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-sm-6">
                                <select
                                    className="form-control"
                                    defaultValue="de"
                                    name="to"
                                    id="language"
                                >
                                    <option value="en">English</option>
                                    <option value="es">Spanish</option>
                                    <option value="it">Italien</option>
                                    <option value="de">German</option>
                                    <option value="ru">Russian</option>
                                    <option value="fr">French</option>
                                </select>
                            </div>
                            <div className="col-sm-6">
                                <button
                                    className="btn btn-secondary"
                                    id="translate"
                                    type="button"
                                    onClick={this.translate}
                                >
                                    Translate
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            );
        }
        return '';
    }

    render() {
        const activeClass = this.state.showTranslator ? ' active' : '';

        return (
            <div
                className={'btn btn-outline-secondary' + activeClass}
                type="button"
                onClick={this.showTranslator}
            >
                <i>&#8466;</i>
                {this.renderTranslator()}
            </div>
        );
    }
}

function translateText(text, language, props) {
    const request = new XMLHttpRequest(),
        keyAPI = YANDEX.apiKey,
        url = YANDEX.url,
        textAPI = text,
        langAPI = language,
        data = 'key=' + keyAPI + '&text=' + textAPI + '&lang=' + langAPI;

    request.open('POST', url, true);
    request.setRequestHeader(
        'Content-type',
        'application/x-www-form-urlencoded'
    );
    request.send(data);
    request.onreadystatechange = function() {
        const response = this.responseText;
        try {
            const json = JSON.parse(response);
            if (json.code == 200 && json.text[0]) {
                props.onTranslate(json.text[0]);
                // for some reason we get multple responses from yandex so we abort the request on the first none empty result
                request.abort();
            } else {
                // 'woops something went wrong'
            }
        } catch (error) {
            // 'woops something went wrong';
        }
    };
}

export default Translator;
