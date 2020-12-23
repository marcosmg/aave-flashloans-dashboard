import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import styled from 'styled-components';



const Container = styled.div`
  display: block;
  flex-direction: column;
  justify-content: space-between;
  margin: 0 auto 100px auto;
  width: 60%;
  height: auto;
  max-width:1200px;
  word-break: break-word;
  border: 2px solid black;
  border-radius: 50px;

  @media (max-width: 1200px) {
    margin: 0 auto;
    width: 90%;
  }

  p {
    font-size: 0.7rem;
    padding: 0px 10px;
  }

  li {
    padding: 20px 0;
    list-style: none;
    border-bottom: 0.5px solid black;

  }
  li:hover {
      box-shadow: 5px 5px 11px -10px #888;
      transform: scale(1.01);
    }
`
const Button = styled.button`
  display: block;
  font-size: 1.5rem;
  color: white;
  margin: 40px auto;
  border: 2px solid white;
  border-radius: 50px;
  padding: 20px 50px;
  background-color: transparent;
  font-weight: 900;
  cursor: pointer;

  button:hover {
    transform: scale(1.1);
    color: orange;
  }
  
`


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flashloans: [],
    }
    
  }

  componentDidMount() {
    this.fetchFlashloans();
  }

  fetchFlashloans = async () => {
    try {

    const result = await axios.post(
        'https://api.thegraph.com/subgraphs/name/aave/protocol',
        {
            query: `
            {
                flashLoans(first: 10, orderBy: amount, orderDirection: desc ) {
                    id
                    reserve {
                        name
                        symbol
                    }
                    amount
                    target
                    timestamp
                }
            }
            `
        }
    );
    console.log(result.data.data.flashLoans);

    this.setState({
      flashloans: result.data.data.flashLoans
    })
    

    } catch(error) {
        console.error(error);
    }
  }

 



  render() {

    return (
      <div className="App">

        <section className="heroSection">
          <div className="heroContent">
            <img src="./logoaave.png" width="150" height="150" alt="logo_aave"/>
            <h1>AAVE FLASHLOANS</h1>
            <a href="#flashloans"><Button type="button" onClick={this.fetchFlashloans}>See Top 10 Flashloans</Button></a>
          </div>
        </section>
        
        <Container id="flashloans">
  
          {this.state.flashloans.map(flashloan => 
            <li key={flashloan.id}>
            <p><strong>TX ID:</strong> {flashloan.id}</p>
            <p><strong>Token:</strong> {flashloan.reserve.symbol}</p>
            <p><strong>Amount:</strong> {flashloan.amount}</p>
            <p><strong>Target:</strong> {flashloan.target}</p>
            </li>)
          }
        </Container>

    </div>
    );
  }
}


export default App;
