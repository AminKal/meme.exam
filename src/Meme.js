import React, { Component } from "react";

class Meme extends Component {
  constructor() {
    super();
    this.state = {
      text: "",
      img: "",
      imgUrls: [],
      dragging: false,
      position: {
        x: 0,
        y: 0
      },
      startingPosition: {
        x: 0,
        y: 0
      },
      textColor: "#ffffff" 
    };

    this.printText = this.printText.bind(this);
    this.changeImg = this.changeImg.bind(this);
  }

  componentDidMount() {
    fetch("https://api.imgflip.com/get_memes")
      .then(res => res.json())
      .then(res => {
        const { memes } = res.data;
        this.setState({
          imgUrls: memes
        });
      });
  }

  printText(event) {
    const value = event.target.value;
    this.setState({ text: value });
  }

  changeImg() {
    const randNum = Math.floor(Math.random() * this.state.imgUrls.length);
    const randImg = this.state.imgUrls[randNum].url;
    this.setState({ img: randImg });
  }

  handleMouseDown = e => {
    const startX = e.pageX - this.state.position.x;
    const startY = e.pageY - this.state.position.y;

    this.setState({
      dragging: true,
      startingPosition: {
        x: startX,
        y: startY
      }
    });

    e.preventDefault();
  };

  handleMouseMove = e => {
    if (this.state.dragging) {
      this.setState({
        position: {
          x: e.pageX - this.state.startingPosition.x,
          y: e.pageY - this.state.startingPosition.y
        }
      });
      e.preventDefault();
    }
  };

  handleMouseUp = () => {
    this.setState({ dragging: false });
  };

  handleColorChange = e => {
    const newColor = e.target.value;
    this.setState({ textColor: newColor });
  };

  render() {
    const styleImg = {
      height: "600px",
      width: "600px"
    };

    const memeContainerStyle = {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh"
    };

    const memeWrapperStyle = {
      position: "relative",
      height: "600px",
      width: "600px"
    };

    const textStyle = {
      position: "absolute",
      top: `${this.state.position.y}px`,
      left: `${this.state.position.x}px`,
      fontSize: "40px",
      color: this.state.textColor, 
      textShadow: "2px 2px #000000"
    };

    return (
      <div
        style={memeContainerStyle}
        onMouseMove={this.handleMouseMove}
        onMouseUp={this.handleMouseUp}
      >
        <div>
          <h1>Meme Exam</h1>
          <input type="text" placeholder="Type anything" onChange={this.printText} />
          <button onClick={this.changeImg}>Générer</button>
          {}
          <input type="color" onChange={this.handleColorChange} value={this.state.textColor} />
          <div
            style={memeWrapperStyle}
            onMouseDown={this.handleMouseDown}
            onMouseUp={this.handleMouseUp}
          >
            <h2 style={textStyle}>{this.state.text}</h2>
            <img src={this.state.img} alt="" style={styleImg} />
          </div>
        </div>
      </div>
    );
  }
}

export default Meme;
