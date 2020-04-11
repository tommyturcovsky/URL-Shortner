import React from "react";
import {connect} from 'react-redux';
import { generalUrlRequest, customUrlRequest } from '../actions/home.action'
import Axios from 'axios';

import './stylesheets/home.css';

class UserLogin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    // handleChange(event, value) {
    //     this.setState({[value]: event.target.value || ''});
    // }

    // handleSubmit(event) {
    //     this.props.login(this.state);
    //     event.preventDefault();
    // }

    _handleCustomFormUpdate(event, value) {
        this.setState({
            [value]: event.target.value || ''
        })
    }

    _customUrlRequest() {
        this.props.customUrlRequest(this.state);
        event.preventDefault();
    }

    _handleGeneralFormUpdate(event, value) {
        this.setState({
            generalFullUrl: event.target.value || '',
        })
    }

    _generalUrlRequest() {
        this.props.generalUrlRequest(this.state);
        event.preventDefault();
    }

    componentDidMount() {

        // this.props.clear();
        // this.setState({username: '', password: ''});
    }

    render() {
        // let error;
        // if (this.props.error) {
        //     error = (<h3>{this.props.error}</h3>)
        // }
        async function redirect() {
            let redirect = await Axios.get(`/api/shortUrls${window.location.pathname}`);
            window.location.replace(redirect.data);
        }

        if (window.location.pathname.startsWith("/url/")  && !window.location.pathname.endsWith("edit")) {
            redirect();
        }

        return (
            <div>
                <div className="home-container">
                    <div className="head">
                        <h1>SHORTEN THAT URL</h1>
                    </div>
                    <div className="shortner-containers">
                        <div className="shortner-container">
                            <h3>General Shortner</h3>
                            <form className="url-form mt-4" onSubmit={(e) => this._generalUrlRequest(e)}>
                                <input type="text"
                                        className="url-input my-1"
                                        placeholder="URL to shorten..."
                                        disabled={this.props.inFlight}
                                        value={this.state.generalFullUrl}
                                        onChange={e => this._handleGeneralFormUpdate(e, 'generalFullUrl')}/>
                                <input
                                    type="submit"
                                    className="my-1"
                                    value="Submit" disabled={this.props.inFlight}
                                />
                            </form>
                            {this._renderMostRecentGeneralUrl()}
                        </div>
                        <div className="shortner-container">
                            <h3>Custom Shortner</h3>
                            <form className="url-form" onSubmit={(e) => this._customUrlRequest(e)}>
                                <input type="text"
                                        className="url-input my-1"
                                        placeholder="URL to shorten..."
                                        disabled={this.props.inFlight}
                                        value={this.state.customFullUrl}
                                        onChange={(e) => this._handleCustomFormUpdate(e, 'customFullUrl')}/>
                                <input type="text"
                                        className="url-input my-1"
                                        placeholder="Custom Route Ending..."
                                        disabled={this.props.inFlight}
                                        value={this.state.customShortUrl}
                                        onChange={(e) => this._handleCustomFormUpdate(e, 'customShortUrl')}/>
                                <input
                                    type="submit"
                                    className="my-1"
                                    value="Submit" disabled={this.props.inFlight}
                                />
                            </form>
                            {this._renderMostRecentCustomUrl()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    _renderMostRecentGeneralUrl() {
        if (this.props.mostRecentGeneralUrl) {
            return (
                <div>
                    <a href={window.location.protocol +'//'+ window.location.host + '/url/' + this.props.mostRecentGeneralUrl}>
                        {window.location.protocol +'//'+ window.location.host + '/url/' + this.props.mostRecentGeneralUrl}
                    </a>
                </div>
            )
        } else {
            return null;
        }
    }

    _renderMostRecentCustomUrl() {
        if (this.props.mostRecentCustomUrl) {
            return (
                <div>
                    <a href={window.location.protocol +'//'+ window.location.host + '/url/' + this.props.mostRecentCustomUrl}>
                        {window.location.protocol +'//'+ window.location.host + '/url/' + this.props.mostRecentCustomUrl}
                    </a>
                </div>
            )
        } else {
            return null;
        }
    }
}


function mapDispatchToProps(dispatch, props) {
    return {
        generalUrlRequest: (urlRequest) => dispatch(generalUrlRequest(urlRequest)),
        customUrlRequest: (urlRequest) => dispatch(customUrlRequest(urlRequest))
    }
};


function mapStateToProps(state, props) {
    return {
        mostRecentGeneralUrl: state.mostRecentGeneralUrl.shortUrl,
        mostRecentCustomUrl: state.mostRecentCustomUrl.shortUrlCustom,
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserLogin)