import Link from 'next/link';
import ChannelGrid from '../components/ChannelGrid';
import Layout from '../components/Layout';
import PodcastList from '../components/PodcastList';

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
      <Layout title={channel.title}>
        <h1>{channel.title}</h1>

        {series.length > 0 && (
          <React.Fragment>
            <h2>Series</h2>
            <ChannelGrid channels={series} />
          </React.Fragment>
        )}

        <h2>Últimos PodCasts</h2>
        <PodcastList audioClips={audioClips} />
      </Layout>
    );
  }
}
