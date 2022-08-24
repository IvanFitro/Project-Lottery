import React, {Component} from "react";
import "./App.css";
import Web3 from "web3";
import lottery_contract from "../abis/loteria.json";
import tokens from "../imagenes/loteria.png";
import {Icon} from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

class Loteria extends Component {

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

    //Function to see the lottery jackpot
    seeJackpot = async(message) => {
        try {
            console.log(message)
            const jackpot = await this.state.contract.methods.Bote().call()
            alert(parseFloat(jackpot))
        } catch(err) {
            this.setState({errorMessage: err.message})
        } finally {
            this.setState({loading: false})
        }
    }

    //Function to see the tickets price
    ticketsPrice = async(message) => {
        try {
            console.log(message)
            const price = await this.state.contract.methods.PrecioBoleto().call()
            alert(parseFloat(price))
        } catch(err) {
            this.setState({errorMessage: err.message})
        } finally {
            this.setState({loading: false})
        }
    }

    //Function to buy tickets
    buyTickets = async(tickets, message) => {
        try {
            console.log(message)
            const web3 = window.web3
            const accounts = await web3.eth.getAccounts()
            alert("Good luck!")
            await this.state.contract.methods.CompraBoleto(tickets).send({from: accounts[0]})
        } catch(err) {
            this.setState({errorMessage: err.message})
        } finally {
            this.setState({loading: false})
        }
    }

    //Function to see your tickets
    myTickets = async(message) => {
        try {
            console.log(message)
            const ownedTiekts = await this.state.contract.methods.TusBoletos().call()
            alert(ownedTiekts.join(","))
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

                    <h2>Tickets Lottery Managment</h2>

                    <a  href="https://github.com/IvanFitro"
                        target="_blank"
                        rel="noopener noreferrer">
                        
                        <p></p>
                        <img src={tokens} width="500" height="350" alt=""></img>
                    </a>
                    <p></p>


                     <h3> <Icon circular inverted color="green" name="money bill alternate"></Icon> Jackpot</h3>

                     <form form onSubmit={(event) => {
                        event.preventDefault()
                        const message = "See Jackpot running"
                        this.seeJackpot(message)
                    }
                    
                }>

                        <input  type="submit"
                        className="bbtn btn-block btn-success btn-sm"
                        value="Jackpot"> 
                        </input>

                     </form>

                     <h3> <Icon circular inverted color="red" name="ticket"></Icon> Tickets Price</h3>

                     <form form onSubmit={(event) => {
                        event.preventDefault()
                        const message = "See Tickets Price running"
                        this.ticketsPrice(message)
                    }
                    
                }>

                        <input  type="submit"
                        className="bbtn btn-block btn-danger btn-sm"
                        value="Tickets Price"> 
                        </input>

                     </form>

                

                     <h3> <Icon circular inverted color="blue" name="payment"></Icon> Buy Tickets</h3>

                     <form form onSubmit={(event) => {
                        event.preventDefault()
                        const tickets = this.tickets.value
                        const message = "Buying tickets running"
                        this.buyTickets(tickets, message)
                    }
                    
                }>
                    <input  type="text" 
                            className="form-control mb-1"
                            placeholder="Tickets"
                            ref={(input) => this.tickets = input}>
                    </input>

                    <input  type="submit"
                            className="bbtn btn-block btn-primary btn-sm"
                            value="Buy Tickets"> 
                    
                    </input>
                    </form>

                    <h3> <Icon circular inverted color="black" name="ticket"></Icon> My Tickets</h3>

                     <form form onSubmit={(event) => {
                        event.preventDefault()
                        const message = "See My Tickets running"
                        this.myTickets(message)
                    }
                    
                }>

                        <input  type="submit"
                        className="bbtn btn-block btn-dark btn-sm"
                        value="My Tickets"> 
                        </input>

                     </form>

            
                </div>

                    
            </main>
          </div>
        </div>
      </div>
          
          
        )
    }
}

export default Loteria

