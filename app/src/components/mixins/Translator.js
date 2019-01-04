import React from 'react';

//This is my privat key don't use to many translation or it wont work after a while ..or i get a bill! #Marc Engelmann
const url = 'https://translate.yandex.net/api/v1.5/tr.json/translate',
    keyAPI =
        'trnsl.1.1.20190103T181139Z.7464426976138302.da0198e0cc346b526c18e9ffa40aa8144de2282d';

class Translator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            showTranslator: false,
        };
    }

    closeMenu = (event) => {
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
            }
            //,
            //() => document.addEventListener('click', this.closeMenu)
        );
    };

    onTranslate = (event) => {
        // this should call this.props.onSelect with the returned text, but the call is async and closes before the result is done, i tried async but bable doesnt like it ..not sure why..
        translateText(
            document.querySelector('#text').value,
            document.querySelector('#language').value
        );
    };
    renderTranslator() {
        if (this.state.showTranslator) {
            return (
                <div>
                    <textarea
                        defaultValue="Oh hello there how are you?"
                        id="text"
                    />
                    <select defaultValue="de" name="to" id="language">
                        <option value="en">English</option>
                        <option value="es">Spanish</option>
                        <option value="it">Italien</option>
                        <option value="de">German</option>
                        <option value="ru">Russian</option>
                        <option value="fr">French</option>
                    </select>
                    <button
                        id="translate"
                        type="button"
                        onClick={this.onTranslate}
                    >
                        Translate
                    </button>
                    <p id="translatedText" />
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

function translateText(text, language) {
    const request = new XMLHttpRequest(),
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
            if (json.code == 200) {
                //this could also just return the text
                document.querySelector('#translatedText').innerHTML =
                    json.text[0];
            } else {
                return 'woops something went wrong';
                //woops something went wrong
            }
        } catch (error) {
            return 'woops something went wrong';
            //oh well
        }
    };
}

export default Translator;
