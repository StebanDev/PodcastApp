import ChannelGrid from '../components/ChannelGrid';
import Layout from '../components/Layout';
import PodcastList from '../components/PodcastList';
import Error from './_error';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = { openPodcast: null };
  }

  static async getInitialProps({ query, res }) {
    const id = query.id;

    try {
      let [reqChannel, reqAudios, reqSeries] = await Promise.all([
        fetch(`https://api.audioboom.com/channels/${id}`),
        fetch(
          `https://api.audioboom.com/channels/${id}/audio_clips`
        ),
        fetch(
          `https://api.audioboom.com/channels/${id}/child_channels`
        )
      ]);

      if (reqChannel.status >= 400) {
        res.statusCode = reqChannel.status;
        return {
          channel: null,
          audioClips: null,
          series: null,
          statusCode: reqChannel.status
        };
      }

      const dataChannel = await reqChannel.json();
      const channel = dataChannel.body.channel;

      const dataAudios = await reqAudios.json();
      const audioClips = dataAudios.body.audio_clips;

      const dataSeries = await reqSeries.json();
      const series = dataSeries.body.channels;

      return { channel, audioClips, series, statusCode: 200 };
    } catch (e) {
      res.statusCode = 503;
      return {
        channel: null,
        audioClips: null,
        series: null,
        statusCode: 503
      };
    }
  }
  openPodcast = (event, podcast) => {
    event.preventDefault();
    this.setState({
      openPodcast: podcast
    });
  };

  render() {
    const { channel, audioClips, series, statusCode } = this.props;
    const { openPodcast } = this.state;

    if (statusCode !== 200) {
      return <Error statusCode={statusCode} />;
    }

    return (
      <Layout title={channel.title}>
        <h1>{channel.title}</h1>

        {series.length > 0 && (
          <React.Fragment>
            <h2>Series</h2>
            <ChannelGrid channels={series} />
          </React.Fragment>
        )}

        {openPodcast && <div>Podcast opened!!</div>}

        <h2>Últimos PodCasts</h2>
        <PodcastList
          audioClips={audioClips}
          onClickPodcast={this.openPodcast}
        />
      </Layout>
    );
  }
}
