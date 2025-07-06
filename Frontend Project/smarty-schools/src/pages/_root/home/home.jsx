const HomePage = () => {
    return (
        <main className="home-page_container">
            <div className="home-page_content">
                <h1 className="title-linear">
                    Inspiring Minds, Organizing Futures
                </h1>
                <p>
                    Unlock the potential of every student with Smarty Schools -
                    where educational journeys are nurtured, managed, and
                    brought to life. Join us in creating a world of learning
                    that&apos;s as limitless as your child&apos;s ambition.
                </p>
                <div className="home-page_buttons">
                    <button>Learn More</button>
                    <button>
                        <img
                            src="/images/icons/icon-play.svg"
                            alt="Play Icon"
                            title="Watch Our Videos"
                        />
                        Watch our welcome video
                    </button>
                </div>
            </div>
            <div className="home-page_banner-container">
                <img
                    src="/images/banner.png"
                    alt="Woman wearing orange sweater holding her notebooks with a smile and a bagpack on her back"
                    className="h-100 w-100 object-fit-cover d-block"
                />
            </div>
        </main>
    );
};

export default HomePage;
