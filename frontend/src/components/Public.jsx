import { Link } from 'react-router-dom';

const Public = () => {
  const content = (
    <section className="public">
      <header>
        <h1>
          Welcome to <span className="nowrap">Just Fix It!</span>
        </h1>
      </header>
      <main className="public__main">
        <p>
          Located in Beautiful Bishkek City, Just Fix It! provides a trained
          staff ready to meet your tech repair needs.
        </p>
        <address className="public__addr">
          Just Fix It!
          <br />
          555 Fixit Street
          <br />
          Bishkek City, 720000
          <br />
          <a href="tel:+15555555555">(555) 555-5555</a>
        </address>
        <br />
        <p>Owner: Erkin K.</p>
      </main>
      <footer>
        <Link to="/login">Employee Login</Link>
      </footer>
    </section>
  );
  return content;
};
export default Public;
