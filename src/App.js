import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import styled from 'styled-components';



const Container = styled.div`
  display: block;
  flex-direction: column;
  justify-content: space-between;
  margin: 0 auto 200px auto;
  width: 60%;
  height: auto;
  max-width:1200px;
  word-break: break-word;
  box-shadow: (5,5,10,-17,#eee);
 

  @media (max-width: 1200px) {
    margin: 0 auto;
    width: 90%;
  }

  p {
    font-size: 1rem;
    padding: 0px 10px;
  }

  li {
    padding: 20px 0;
    list-style: none;
    box-shadow: 5px 5px 11px -10px #888;
    

  }
  li:hover {
      box-shadow: 5px 5px 11px -8px #888;
      transform: scale(1.01);
    }
`
const Button = styled.button`
  display: block;
  font-size: 1.5rem;
  color: white;
  margin: 40px auto;
  -webkit-tap-highlight-color: rgba(0,0,0,0);
  -webkit-tap-highlight-color: transparent;
  border: none;
  background-color:transparent;
 padding: 20px 40px;
  border-radius:10px;
  box-shadow: -6px -6px 23px -11px #fdfdfd66,
              3px -4px 5px -6px #df31ff3d,
              7px 7px 20px 0px #0002,
              4px 4px 5px 0px #0001,
              inset 0px 0px 0px 0px #eebcff73,
              inset 5px 5px 15px 3px #e6aaff11,
              inset 2px 5px 29px -26px #e6b5ff99,
              inset 0px 0px 0px 0px #c689f511;
  transition:box-shadow 0.6s cubic-bezier(.79,.21,.06,.81);
  font-weight: 900;
  cursor: pointer;

  &:hover {
    transform: scale(0.98);
   
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

      const val = 1;

    const query = {
      query: `
      {
          flashLoans(first: ${val}, orderBy: amount, orderDirection: desc ) {
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
  };

    const result = await axios.post(
        'https://api.thegraph.com/subgraphs/name/aave/protocol',
        query
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
