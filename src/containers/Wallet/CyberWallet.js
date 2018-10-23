import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";
import * as cyberActions from "../../redux/cyber";
import {AddAccount, WalletAccountsList} from "../../components/Wallet/Wallet";
import Container from "../../components/Container/Container";

class CyberWallet extends Component {

    importAccount = (privateKey) => {
        this.props.importAccount(privateKey);
    };

    restoreAccount = (seedPhrase) => {
        this.props.restoreAccount(seedPhrase);
    };

    setDefaultAccount = (address) => {
        this.props.setDefaultCyberAccount(address);
    };

    createCyberAccount = () => {
        this.props.createCyberAccount();
    };

    forgetAccount = (address) => {
        this.props.forgetCyberAccount(address)
    };

    render() {
        const defaultAccount = this.props.defaultAccount;
        const accounts = this.props.accounts;

        return (
            <Container>
                <h3>Current account</h3>
                {defaultAccount}

                <h3>Accounts</h3>

                <WalletAccountsList
                    accounts={accounts}
                    setDefaultCallback={this.setDefaultAccount}
                    forgetCallback={this.forgetAccount}
                />
                <hr/>

                <h3>Management</h3>
                <button onClick={this.createCyberAccount}>Create new account</button>
                <AddAccount
                    addMethodName='Recover'
                    placeholder='seed phrase'
                    addCallback={this.restoreAccount}
                />
                <AddAccount
                    addMethodName='Import'
                    placeholder='private key'
                    addCallback={this.importAccount}
                />
            </Container>
        );
    }
}

export default connect(
    ({cyber}) => ({
        accounts: cyber.accounts,
        defaultAccount: cyber.defaultAccount
    }),
    cyberActions
)(CyberWallet);

