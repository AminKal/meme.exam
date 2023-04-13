import React, { Component } from "react";

class Meme extends Component {
    constructor() {
        super()
        this.state={
            text:"",
            img:"",
            imgUrls:[]
        }
        
        this.printText = this.printText.bind(this)
        this.changeImg = this.changeImg.bind(this)
    }

    componentDidMount() {
        fetch("https://api.imgflip.com/get_memes")
            .then(res=>res.json()).then(res=>{
                const {memes} = res.data
                this.setState({
                    imgUrls:memes
                })
            })
    }

    printText(event) {
        const value=event.target.value
        this.setState({text:value})
    }

    changeImg() {
        const randNum = Math.floor(Math.random() * this.state.imgUrls.length)
        const randImg = this.state.imgUrls[randNum].url
        this.setState({img : randImg})
    }

    render() {

        const styleImg = {
            height:"600px",
            width:"600px"
        }

        const memeContainerStyle = {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
        }

        const memeWrapperStyle = {
            position: "relative",
            height: "600px",
            width: "600px",
        }

        const textStyle = {
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontSize: "40px",
            color: "white",
            textShadow: "2px 2px #000000",
        }

        return(
            <div style={memeContainerStyle}>
                <div>
                    <input
                        type="text" 
                        placeholder="Type anything"
                        onChange={this.printText}
                    />
                    <button onClick={this.changeImg}>Générer</button>
                    <div style={memeWrapperStyle}>
                        <h2 style={textStyle}>{this.state.text}</h2>
                        <img src={this.state.img} style={styleImg} />
                    </div>
                </div>
            </div>
        )
    }
}

export default Meme;
