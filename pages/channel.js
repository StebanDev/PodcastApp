import Link from 'next/link';

export default class extends React.Component {
  static async getInitialProps({ query }) {
    const id = query.id;

    let [reqChannel, reqAudios, reqSeries] = await Promise.all([
      fetch(`https://api.audioboom.com/channels/${id}`),
      fetch(
        `https://api.audioboom.com/channels/${id}/audio_clips`
      ),
      fetch(
        `https://api.audioboom.com/channels/${id}/child_channels`
      )
    ]);

    const dataChannel = await reqChannel.json();
    const channel = dataChannel.body.channel;

    const dataAudios = await reqAudios.json();
    const audioClips = dataAudios.body.audio_clips;

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

        <h2>Series</h2>
        <div className="channels">
          {series.map(serie => (
            <div className="channel">
              <img src={serie.urls.logo_image.original} alt="" />
              <h3>{serie.title}</h3>
            </div>
          ))}
        </div>

        <h2>Últimos PodCasts</h2>
        {audioClips.map(clip => (
          <Link href={`/podcast?id=${clip.id}`}>
            <a className="podcast">
              <h3>{clip.title}</h3>
              <div className="meta">
                {Math.ceil(clip.duration / 60)} minutes
              </div>
            </a>
          </Link>
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
            .podcast {
              display: block;
              text-decoration: none;
              color: #333;
              padding: 15px;
              border-bottom: 1px solid rgba(0, 0, 0, 0.2);
              cursor: pointer;
            }
            .podcast:hover {
              color: #000;
            }
            .podcast h3 {
              margin: 0;
            }
            .podcast .meta {
              color: #666;
              margin-top: 0.5em;
              font-size: 0.8em;
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
