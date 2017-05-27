import React, {Component} from 'react'

class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playingUrl: '',
      audio: null,
      playing: false
    }
  }

  playAudio(previewUrl) {
    let audio = new Audio(previewUrl)
    if(!this.state.playing) {
      audio.play()
      this.setState({
        playing: true,
        playingUrl: previewUrl,
        audio
      })
    } else {
      if(this.state.playingUrl === previewUrl) {
        this.state.audio.pause();
        this.setState({
          playing: false
        })
      } else {
        this.state.audio.pause()
        audio.play()
        this.setState({
          playing: true,
          playingUrl: previewUrl,
          audio
        })
      }
    }
  }

  render() {
    console.log('Gallery props', this.props)
    const { tracks } = this.props;
    return(
        <div>
          { tracks.map((tracks, k) => {
            const trackImg = tracks.album.images[0].url;
            return(
              <div
                key={k}
                className="track"
                onClick={() => this.playAudio(tracks.preview_url)}
                >
                <img
                  src={trackImg}
                  className="track-img"
                  alt="track"
                />

                <div className="track-play">
                  <div className="track-play-inner">
                    {
                      this.state.playingUrl === tracks.preview_url
                      ? <span>| |</span>
                      :<span>&#9654;</span>
                    }
                  </div>
                </div>
                <p className="track-text">
                  {tracks.name}
                </p>
              </div>
            )
          })}
        </div>
    )
  }
}

export default Gallery
