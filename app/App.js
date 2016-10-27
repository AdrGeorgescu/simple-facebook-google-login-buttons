import React from 'react';
import styles from './css/App.css';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import loadingImage from './img/loading3.gif';
import checkedImage from './img/checked.png';
import ApiKeys from '../ApiKeys.json';

export default class App extends React.Component {

    /**
     * Constructor
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {
            showButtons: true,
            showLoading: false,
            showChecked: false
        };
    }

    /**
     *
     * @param response
     */
    responseFacebook = (response) => {
        if (response && response.name && response.accessToken) {
            this.checked();
        } else if (response && response.status === 'not_authorized') {
            this.buttons();
        }
    }

    /**
     *
     * @param response
     */
    responseGoogle = (response) => {
        console.log(response);
        if (response && response.accessToken) {
            this.checked();
        } else if (response && response.type === 'tokenFailed') {
            this.buttons();
        }
    }

    /**
     * Changes the state to Check icon
     */
    checked = () => {
        this.setState({
            showChecked: true,
            showLoading: false
        })
    }

    /**
     * Changes the state to Login Buttons
     */
    buttons = () => {
        this.setState({
            showLoading: false,
            showButtons: true
        })
    }

    /**
     * Changes the state to Loding icon
     */
    loading = () => {
        this.setState({
            showButtons: false,
            showLoading: true
        });
    }

    render() {

        var showB = this.state.showButtons ? 'show': 'hide';
        var showL = this.state.showLoading ? 'show': 'hide';
        var showC = this.state.showChecked ? 'show': 'hide';

        return (
            <div>
                <div className={styles.app + ' ' + styles[showB] }>

                    <FacebookLogin
                        appId={ApiKeys.FBKey}
                        autoLoad={true}
                        fields="name,email,picture"
                        scope="public_profile,user_friends,user_actions.books"
                        callback={this.responseFacebook}
                        autoLoad={false}
                        cssClass={styles.loginBtn + ' ' + styles['loginBtn--facebook']}
                        onClick={this.loading.bind(this)}
                    />

                    {/**
                    * Wrap the Google Login Button into a div because
                    * the GoogleLogin doesn't support the onClick fuction ATM
                    */}
                    <div onClick={this.loading.bind(this) } className={styles.gButton}>
                        <GoogleLogin
                            clientId={ApiKeys.GKey}
                            onSuccess={this.responseGoogle}
                            onFailure={this.responseGoogle}
                            className={styles.loginBtn + ' ' + styles['loginBtn--google']}

                        />
                    </div>
                </div>
                {/* Loding Image */}
                <div className={styles[showL] + ' ' + styles.loadingGif}>
                    <img src={loadingImage} />
                </div>

                {/* Checked Image */}
                <div className={styles[showC] + ' ' + styles.loadingGif}>
                    <img src={checkedImage} width="150" />
                </div>
            </div>
        );
    }
}
