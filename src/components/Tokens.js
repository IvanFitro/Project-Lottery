import React, {Component} from "react";
import "./App.css";
import Web3 from "web3";
import lottery_contract from "../abis/loteria.json";
import tokens from "../imagenes/tokens.png";
import {Icon} from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

class Tokens extends Component {
    
    async componentWillMount() {
        await this.loadWeb3()
        await this.loadBlockchainData()
    }
    
    //Loading web3
    async loadWeb3() {
        if(window.ethereum) {
            window.web3 = new Web3(window.ethereum)
            await window.ethereum.enable()
        }
        else if(window.web3) {
            window.web3 = new Web3(window.web3.currentProvider)
        }
        else {
            window.alert("Non browser detected")
        }
    }
    
    //Loading blockchain data
    async loadBlockchainData(){
        const web3 = window.web3
        const accounts = await web3.eth.getAccounts()
        this.setState({account: accounts[0]})
        console.log("Account", this.state.account)
        const newtworkId= "5777"
        console.log("networkId", newtworkId)
        const networkData = lottery_contract.networks[newtworkId]
        console.log("NetworkData", networkData)
    
        if(networkData) {
            const abi= lottery_contract.abi
            const address = networkData.address
            console.log("address", address)
            const contract = new web3.eth.Contract(abi, address)
            this.setState({contract})
        } else {
            window.alert("Smart Contract not deployed in the network")
        }
    }   

    //Constructor
    constructor(props) {
        super(props)
        this.state = {
            contract: null,
            loading: false,
            errorMessage: "",
            account: "",
            buyer: "",
            quantity: "",
        }
    }

    //Function to buy tokens
    send = async(buyer, quantity, ethers, message) => {
        try {
            console.log(message)
            const web3 = window.web3
            const accounts = await web3.eth.getAccounts()
            await this.state.contract.methods.CompraTokens(buyer, quantity).send({from: accounts[0], value: ethers})
        } catch(err) {
            this.setState({errorMessage: err.message})
        } finally {
            this.setState({loading: false})
        }
    }

    //Function to see the balance of tokens
    seeBalance = async(address, message) => {
        try {
            console.log(message)
            const balance = await this.state.contract.methods.MisTokens(address).call()
            alert(parseFloat(balance))
        } catch(err) {
            this.setState({errorMessage: err.message})
        } finally {
            this.setState({loading: false})
        }
    }

    //Function to see the balance of tokens
    seeContractBalance = async(message) => {
        try {
            console.log(message)
            const contractBalance = await this.state.contract.methods.TokensDisponibles().call()
            alert(parseFloat(contractBalance))
        } catch(err) {
            this.setState({errorMessage: err.message})
        } finally {
            this.setState({loading: false})
        }
    }

    //Function to generate tokens
    generateTokens = async(tokens, message) => {
        try {
            console.log(message)
            const web3 = window.web3
            const accounts = await web3.eth.getAccounts()
            await this.state.contract.methods.GeneraTokens(tokens).send({from: accounts[0]})
        } catch(err) {
            this.setState({errorMessage: err.message})
        } finally {
            this.setState({loading: false})
        }
    }

    render() {
        return (
            
            <div>
            <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
              <a
                className="navbar-brand col-sm-3 col-md-2 mr-0"
                href="https://frogames.es/rutas-de-aprendizaje"
                target="_blank"
                rel="noopener noreferrer"
              >
                DApp ERC20
              </a>
              <ul className='navbar-nav px-3'>
                <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
                  <small className='text-white'><span id='account'>{this.state.account}</span></small>
                </li>
              </ul>
    
            </nav>
            <div className="container-fluid mt-5">
              <div className="row">
                <main role="main" className="col-lg-12 d-flex text-center">
                  <div className="content mr-auto ml-auto">

                    <h1>Lottery with Tokens ERC20</h1>

                    <h2>Tokens Lottery Managment</h2>

                    <a  href="https://github.com/IvanFitro"
                        target="_blank"
                        rel="noopener noreferrer">
                        
                        <p></p>
                        <img src={tokens} width="450" height="400" alt=""></img>
                    </a>
                    <p></p>

                    <h3> <Icon circular inverted color="red" name="cart"></Icon>Buy Tokens ERC20</h3>
                    
                    <form onSubmit={(event) => {
                        event.preventDefault()
                        const buyer = this.buyer.value
                        const quantity = this.quantity.value
                        const web3 = window.web3
                        const ethers = web3.utils.toWei(this.quantity.value, "ether")
                        const message = "Buying tokens running"
                        this.send(buyer, quantity, ethers, message)
                    }
                    
                }>
                    <input  type="text" 
                            className="form-control mb-1"
                            placeholder="Address"
                            ref={(input) => this.buyer = input}>
                    </input>

                    <input  type="text" 
                            className="form-control mb-1"
                            placeholder="Token Quantity"
                            ref={(input) => this.quantity = input}>
                    </input>

                    <input  type="submit"
                            className="bbtn btn-block btn-danger btn-sm"
                            value="Buy Tokens"> 
                    
                    </input>
                        
                     </form>

                     <h3> <Icon circular inverted color="yellow" name="bitcoin"></Icon> Balance of Tokens</h3>

                     <form form onSubmit={(event) => {
                        event.preventDefault()
                        const address = this.address.value
                        const message = "See Balance running"
                        this.seeBalance(address, message)
                    }
                    
                }>
                    <input  type="text" 
                            className="form-control mb-1"
                            placeholder="Address"
                            ref={(input) => this.address = input}>
                    </input>

                    <input  type="submit"
                            className="bbtn btn-block btn-success btn-sm"
                            value="Balance"> 
                    
                    </input>



                     </form>

                     <h3> <Icon circular inverted color="black" name="bitcoin"></Icon> Contract Balance</h3>

                     <form form onSubmit={(event) => {
                        event.preventDefault()
                        const message = "See Contract Balance running"
                        this.seeContractBalance(message)
                    }
                    
                }>

                        <input  type="submit"
                        className="bbtn btn-block btn-dark btn-sm"
                        value="Contract Balance"> 
                        </input>

                     </form>

                     <h3> <Icon circular inverted color="blue" name="bitcoin"></Icon> Generate New Tokens</h3>

                     <form form onSubmit={(event) => {
                        event.preventDefault()
                        const tokens = this.tokens.value
                        const message = "Generating tokens running"
                        this.generateTokens(tokens, message)
                    }
                    
                }>
                    <input  type="text" 
                            className="form-control mb-1"
                            placeholder="Tokens"
                            ref={(input) => this.tokens = input}>
                    </input>

                    <input  type="submit"
                            className="bbtn btn-block btn-primary btn-sm"
                            value="Generate Tokens"> 
                    
                    </input>



                     </form>

                     
                     

                     <p></p>

                  </div>
            </main>
          </div>
        </div>
      </div>
          
        )
    }
}



export default Tokens

