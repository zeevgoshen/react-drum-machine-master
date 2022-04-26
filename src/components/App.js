import React, { Component } from "react";
import styled, { ThemeProvider } from "styled-components";

import { theme } from "../styles/theme";
import drums from "../drums";
import DrumPads from "components/DrumPads";
import { renderAudioForDrums } from "../audioHelper";

const AppWrapper = styled.div`
  background-color: ${(props) => props.theme.color.mainBackground};
  height: 100vh;
  display: grid;
  justify-content: center;
  align-content: center;
`;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playing: false,
      currentDrum: -1,
    };

    this.drums = [];
  }

  componentDidMount() {
    this.drums = renderAudioForDrums(drums);
  }

  onPlay = () => {
    this.setState({ playing: true });
  };

  onPause = () => {
    this.drums.map((drum) => drum.pause());
    this.drums.map((drum) => (drum.currentTime = 0));
    this.setState({ playing: false });
  };

  onPadClick = (i) => {
    if (this.state.playing) {
      this.setState({ currentDrum: i });
      let drum = this.drums[i];

      if (drum.currentTime > 0) {
        drum.pause();
        drum.currentTime = 0;
      } else {
        drum.currentTime = 0;
        drum.play();
        drum.loop = true;
      }
    }
  };

  render() {
    const { playing, currentDrum } = this.state;
    return (
      <ThemeProvider theme={theme}>
        <AppWrapper>
          <div className="">
            <div className="inputArea">
              <header className="">
                <h1>Loop Machine</h1>
              </header>
              <button
                onClick={playing ? this.onPause : this.onPlay}
                className="powerButton"
              >
                {playing ? "Off" : "On"}
              </button>
            </div>
            <DrumPads
              drums={drums}
              onPadClick={this.onPadClick}
              currentDrum={currentDrum}
            />
            <div id="audio-wrapper" />
          </div>
        </AppWrapper>
      </ThemeProvider>
    );
  }
}

export default App;
