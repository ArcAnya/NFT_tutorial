import React, { Component } from 'react';
import Web3 from 'web3';
import './App.css';
import Color from '../abis/Color.json' // need to import the specific smart contract abi to use it

class App extends Component {

  async componentWillMount() { // React lifecycle method: always triggered when gets attached to DOM successfully
    await this.loadWeb3() // will trigger on reload, i.e. => Web3.js => connects to Metamask
    await this.loadBlockchainData()
  }

  //loading Web3
  async loadWeb3() {
    // Modified to update according to post https://awantoch.medium.com/how-to-connect-web3-js-to-metamask-in-2020-fee2b2edf58a
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      window.ethereum.enable();
      return true;
    }
    return false;
  }

  async loadBlockchainData() { // fetch the smart contract and make sure that it's connected
    const web3 = window.web3
    //load account:
    const accounts = await web3.eth.getAccounts() // getting the accounts from Metamask
    this.setState({ account: accounts[0] }) // storing the first account received into the App State
    // get data from the smart contract to be able to show it on website:
    const networkId = await web3.eth.net.getId() // need it to find the right abi / address in abi files
    const networkData = Color.networks[networkId] // that fetches appropriate data from abi file
    
    if (networkData) {
      const abi = Color.abi // getting the abi from the abi file Color
      const address = networkData.address
      const contract = new web3.eth.Contract(abi, address) // you need abi and address to get the data of smart contract
      console.log(contract)
    } else {  // else it means smart contract is not deployed to this network so can't use it
              // means app only deployed on network where app actually exists
      window.alert('Smart contract not deployed to detected network.')
    }
  }
  // constructor from React 
  constructor(props) {
    // code from React to set the default state:
    super(props);
    this.state = {
      account: ''
    };
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a
            className="navbar-brand col-sm-3 col-md-2 mr-0"
            href="http://www.dappuniversity.com/bootcamp"
            target="_blank"
            rel="noopener noreferrer"
          >
            Color Tokens
          </a>
          <ul className="navbar-nav px-3">
            <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
              <small className="text-white"><span id="account">{this.state.account}</span></small>
            </li>
          </ul>
        </nav>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">

              </div>
            </main>
          </div>
          <table>
            <div className="row text-center">
              <p>Tokens go here...</p>
            </div>
          </table>
        </div>
      </div>
    );
  }
}

export default App;
