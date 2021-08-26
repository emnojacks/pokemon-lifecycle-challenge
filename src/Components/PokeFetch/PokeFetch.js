import React, { Component } from 'react'
import './PokeFetch.css';


class PokeFetch extends Component {
  constructor() {
    super()
    this.state = {
      pokeInfo: '',
      pokeSprite: '',
      pokeName: '',
      time: {},
      seconds: 10
    };
    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
    }
  

  //method to change time into seconds
  secondsToTime(secs){
    let hours = Math.floor(secs / (60 * 60));
    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);
    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    let obj = {
      "h": hours,
      "m": minutes,
      "s": seconds
    };
    return obj;
  }

  componentDidMount() {
    //pass in seconds into formatting method once the component mounts
    let timeLeft = this.secondsToTime(this.state.seconds);
    //set the state of the time to timeLeft variable
    this.setState({ time: timeLeft });
  }

  startTimer() {
    if (this.timer === 0 && this.state.seconds > 0) {
      this.timer = setInterval(this.countDown, 1000);
    }
  }

  countDown() {
    // Remove one second, set state so a re-render happens.
    let seconds = this.state.seconds - 1;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds,
    });
    
    // Check if we're at zero.
    if (seconds === 0) { 
      clearInterval(this.timer)
      this.displayPoke();
    }
  }
  
  fetchPokemon() {
    let min = Math.ceil(1);
    let max = Math.floor(152);
    let pokeNum = Math.floor(Math.random() * (max - min) + min);
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeNum}`, {
      method: 'GET'
    }).then(res => res.json())
      .then(res => {
        this.setState({
          pokeInfo: res,
          pokeSprite: res.sprites.front_default,
          pokeName: res.species.name
        })
      })
      .catch((err) => console.log(err))
  }
  
  displayPoke() {
    let pokemonImage = document.getElementById('pokeImg');
    let pokemonName = document.getElementById('pokeName');
    console.log(pokemonName);
    pokemonName.style.visibility = "visible";
    pokemonImage.style.filter = "brightness(100%)";
  }
  
  render() {
    return (
      <div className={'wrapper'}>
        <button className={'start'} onClick={() => { this.fetchPokemon(); this.startTimer(); }} >Start!</button>
        
        <h1 className={'timer'}>
           Seconds left: {this.state.time.s}
        </h1>
        
        <div className={'pokeWrap'}>
          <img id={'pokeImg'}
            src={this.state.pokeSprite} />
          
          <h1 id={'pokeName'}>
            {this.state.pokeName}
          </h1>
        </div>
      </div>
    )
  };
}

class Timer extends Component {
  
  render() {
    return(
      <div>
        Seconds left: {this.state.time.s}
      </div>
    );
  }
}


export default PokeFetch;