import React, {Component} from "react";
import "./App.css";
import Web3 from "web3";
import lottery_contract from "../abis/loteria.json";
import winner from "../imagenes/winner.png";
import {Icon} from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

class Premios extends Component {

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
        }
    }

    //Function to select a winner
    selectWinner = async(message) => {
        try {
            console.log(message)
            const web3 = window.web3
            const accounts = await web3.eth.getAccounts()
            await this.state.contract.methods.GenerarGanador().send({from: accounts[0]})
        } catch(err) {
            this.setState({errorMessage: err.message})
        } finally {
            this.setState({loading: false})
        }
    }

    //Function to see the winner
    seeWinner = async(message) => {
        try {
            console.log(message)
            const winner = await this.state.contract.methods.direccion_ganador().call()
            alert(winner)
        } catch(err) {
            this.setState({errorMessage: err.message})
        } finally {
            this.setState({loading: false})
        }
    }

    //Function to exchange the tokens
    changeTokens = async(numTokens, message) => {
        try {
            console.log(message)
            const web3 = window.web3
            const accounts = await web3.eth.getAccounts()
            await this.state.contract.methods.DevolverTokens(numTokens).send({from: accounts[0]})
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

                    <h2>Lottery Prizes</h2>

                    <a  href="https://github.com/IvanFitro"
                        target="_blank"
                        rel="noopener noreferrer">
                        
                        <p></p>
                        <img src={winner} width="400" height="400" alt=""></img>
                    </a>
                    <p></p>

                    <h3> <Icon circular inverted color="yellow" name="winner"></Icon> Select Winner</h3>

                     <form form onSubmit={(event) => {
                        event.preventDefault()
                        const message = "Selecting winner"
                        this.selectWinner(message)
                    }
                    
                }>

                    <input  type="submit"
                            className="bbtn btn-block btn-warning btn-sm"
                            value="Select Winner"> 
                    
                    </input>



                     </form>

                     <h3> <Icon circular inverted color="green" name="winner"></Icon> See Winner</h3>

                     <form form onSubmit={(event) => {
                        event.preventDefault()
                        const message = "See winner"
                        this.seeWinner(message)
                    }
                    
                }>

                    <input  type="submit"
                            className="bbtn btn-block btn-success btn-sm"
                            value="See Winner"> 
                    
                    </input>



                     </form>

                     <h3> <Icon circular inverted color="red" name="ethereum"></Icon> Change Tokens</h3>

                     <form form onSubmit={(event) => {
                        event.preventDefault()
                        const numTokens = this.numTokens.value
                        const message = "Changing tokens"
                        this.changeTokens(numTokens, message)
                    }
                    
                }>
                    <input  type="text" 
                            className="form-control mb-1"
                            placeholder="Token Quantity"
                            ref={(input) => this.numTokens = input}>
                    </input>

                    <input  type="submit"
                            className="bbtn btn-block btn-danger btn-sm"
                            value="Change"> 
                    
                    </input>



                     </form>

                    </div>
            </main>
          </div>
        </div>
      </div>
          
        );
    }
}

export default Premios

