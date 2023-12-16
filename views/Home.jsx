const { Link } = ReactRouterDOM

export function Home() {
  return (
    <section className="home-container">
      <div className="home-content">
        <h1 className="home-title">Welcome to the Home Page!</h1>
        <p className="home-description">
          Explore the amazing features of our app and stay organized with ease.
        </p>
        <div className="app-icons flex justify-center">
          <Link to="/mail">
            <img className="app-icon" src="assets/img/gmail-logo.png" alt="Gmail Logo" />
          </Link>
          <Link to="/note">
            <img className="app-icon" src="/assets/img/keep.png" alt="Keep Logo" />
          </Link>
        </div>
      </div>
    </section>
  );
}
