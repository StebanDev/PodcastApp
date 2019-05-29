import Link from 'next/link';
import Head from 'next/head';

class Layout extends React.Component {
  render() {
    const { title, children } = this.props;
    return (
      <div>
        <Head>
          <title>{title}</title>
        </Head>

        <header>
          <Link href="/">
            <a>{title}</a>
          </Link>
        </header>

        {children}

        <style jsx>
          {`
            header {
              color: #fff;
              background: #8756ca;
              padding: 15px;
              text-align: center;
            }
            header a {
              color: #fff;
              text-decoration: none;
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

export default Layout;
