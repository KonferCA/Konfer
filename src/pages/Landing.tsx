import { Header, Hero, Partners, Bridge, Expertise, Featured, Events, Gallery, About, Team, Footer } from '@components';

const Landing = () => {
    return (
        <>
            <a href="#main" className="btn btn-primary fixed top-3 left-4 z-50 -translate-y-20 focus-visible:translate-y-0">
                Skip to content
            </a>
            <Header />
            <main id="main">
                <Hero />
                <Partners />
                <Bridge />
                <Expertise />
                <Featured />
                <Events />
                <Gallery />
                <About />
                <Team />
            </main>
            <Footer />
            <div aria-hidden="true" className="grain" />
        </>
    );
};

export { Landing };
