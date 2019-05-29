export default class extends React.Component {
  static async getInitialProps({ query }) {
    const id = query.id;

    const reqChannel = await fetch(
      `https://api.audioboom.com/channels/${id}`
    );
    const dataChannel = await reqChannel.json();
    const channel = dataChannel.body.channel;

    const reqAudios = await fetch(
      `https://api.audioboom.com/channels/${id}/audio_clips`
    );
    const dataAudios = await reqAudios.json();
    const audioClips = dataAudios.body.audio_clips;

    const reqSeries = await fetch(
      `https://api.audioboom.com/channels/${id}/child_channels`
    );
    const dataSeries = await reqSeries.json();
    const series = dataSeries.body.channels;

    return { channel, audioClips, series };
  }
  render() {
    const { channel, audioClips, series } = this.props;
    return (
      <div>
        <header>Podcasts</header>

        <h1>{channel.title}</h1>

        <h2>PodCasts</h2>
        {audioClips.map(clip => (
          <div>{clip.title}</div>
        ))}

        <h2>Últimos Podcasts</h2>
        {series.map(serie => (
          <div>{serie.title}</div>
        ))}

        <style jsx>
          {`
            header {
              color: #fff;
              background: #8756ca;
              padding: 15px;
              text-align: center;
            }
            .channels {
              display: grid;
              grid-gap: 15px;
              padding: 15px;
              grid-template-columns: repeat(
                auto-fill,
                minmax(160px, 1fr)
              );
            }
            .channel {
              display: block;
              border-radius: 3px;
              box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.15);
              margin-bottom: 0.5em;
            }
            .channel img {
              width: 100%;
            }
            h2 {
              padding: 5px;
              font-size: 0.9em;
              font-weight: 600;
              margin: 0;
              text-align: center;
            }
          `}
        </style>
        <style jsx global>
          {`
            body {
              margin: 0;
              font-family: Arial;
              background-color: white;
            }
          `}
        </style>
      </div>
    );
  }
}
