import React from "react";
import {connect} from 'react-redux';
import {
    generalUrlRequest,
    customUrlRequest,
    editUrlRequest,
    deleteCustomUrl
} from '../actions/home.action'
import Axios from 'axios';

import './stylesheets/home.css';
import {Modal, Button} from 'react-bootstrap'

class UserLogin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showEditModal: false
        };
    }

    openEditModal() {
        this.setState({
            showEditModal: true
        })
    }

    closeEditModal() {
        this.setState({
            showEditModal: false
        })
    }

    _handleEditFormUpdate(event, value) {
        this.setState({
            [value]: event.target.value || ''
        })
    }

    _editUrlRequest() {
        let urlToUpdate = this.props.mostRecentCustomUrl
        this.props.editUrlRequest(urlToUpdate, this.state);
        event.preventDefault();
        this.setState({
            showEditModal: false
        })
    }

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
        this.setState({
            customFullUrl: '',
            customShortUrl: ''
        })
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
                            <form className="url-form general-form" onSubmit={(e) => this._generalUrlRequest(e)}>
                                <input type="text"
                                        className="url-input my-1"
                                        placeholder="URL to shorten..."
                                        disabled={this.props.inFlight}
                                        value={this.state.generalFullUrl}
                                        onChange={e => this._handleGeneralFormUpdate(e, 'generalFullUrl')}/>
                                <input
                                    type="submit"
                                    className="my-1"
                                    value="Shorten!" disabled={this.props.inFlight}
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
                                    value="Shorten!" disabled={this.props.inFlight}
                                />
                            </form>
                            {this._renderMostRecentCustomUrl()}
                        </div>
                    </div>
                </div>

                {/* Modal to Edit Custom Url */}
                <Modal show={this.state.showEditModal} onHide={() => this.closeEditModal()}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Custom Url: {this.props.mostRecentCustomUrl}</Modal.Title>
                    </Modal.Header>
                    <form onSubmit={(e) => this._editUrlRequest(e)}>
                    <Modal.Body>
                        <input type="text"
                            className="url-input my-1"
                            placeholder="New Custom Route Ending..."
                            disabled={this.props.inFlight}
                            value={this.state.editShortUrl}
                            onChange={(e) => this._handleEditFormUpdate(e, 'editShortUrl')}/>   
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.closeEditModal()}>
                            Cancel
                        </Button>
                        <input
                            type="submit"
                            className="my-1"
                            value="Submit" disabled={this.props.inFlight}
                        />
                    </Modal.Footer>
                    </form>
                </Modal>
            </div>
        );
    }

    _renderMostRecentGeneralUrl() {
        if (this.props.mostRecentGeneralUrl) {
            return (
                <div className="short-url-link-container">
                    <p className="link-label">Shortened Url:</p>
                    <a className="short-url-link" href={window.location.protocol +'//'+ window.location.host + '/url/' + this.props.mostRecentGeneralUrl}>
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
                <div className="url-container border-top">
                    <div className="short-url-link-container">
                        <p className="link-label">Shortened Url:</p>
                        <a className="short-url-link"href={window.location.protocol +'//'+ window.location.host + '/url/' + this.props.mostRecentCustomUrl}>
                            {window.location.protocol +'//'+ window.location.host + '/url/' + this.props.mostRecentCustomUrl}
                        </a>
                    </div>
                    <div className="short-url-options">
                        <button onClick={() => this.openEditModal()}>
                            Edit
                        </button>
                        <button onClick={(e) => this.props.deleteCustomUrl(this.props.mostRecentCustomUrl)}>
                            Delete
                        </button>
                    </div>
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
        customUrlRequest: (urlRequest) => dispatch(customUrlRequest(urlRequest)),
        editUrlRequest: (urlToUpdate, urlRequest) => dispatch(editUrlRequest(urlToUpdate, urlRequest)),
        deleteCustomUrl: (customUrl) => dispatch(deleteCustomUrl(customUrl)),
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