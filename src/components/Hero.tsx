import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { ArrowDown, Pause, Play } from '@phosphor-icons/react';
import { HeroSkyline, HeroSpurKonferSign, SpurHacksEvent, SpurHacksStage } from '@assets';
import { CONTACT_HREF } from '@utils/site';

// Drop a self-hosted clip (e.g. hero.webm + hero.mp4) into src/assets/hero/ and it replaces the photo reel
const videoFiles = import.meta.glob<string>('../assets/hero/*.{webm,mp4}', {
    eager: true,
    query: '?url',
    import: 'default',
});
const videoSources = Object.entries(videoFiles)
    .map(([path, url]) => ({ url, type: path.endsWith('.webm') ? 'video/webm' : 'video/mp4' }))
    .sort((a) => (a.type === 'video/webm' ? -1 : 1));

const slides = [
    { image: SpurHacksEvent, label: 'SpurHacks 2025' },
    { image: HeroSkyline, label: 'Collision 2024 yacht after-party' },
    { image: SpurHacksStage, label: 'SpurHacks 2025 main stage' },
    { image: HeroSpurKonferSign, label: 'SPUR Community BBQ Festival' },
];

// Staggers the CSS entrance animations
const delay = (ms: number) => ({ '--delay': `${ms}ms` }) as CSSProperties;

const Hero = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const reduceMotion = useReducedMotion();
    const [hasVideo, setHasVideo] = useState(videoSources.length > 0);
    const [playing, setPlaying] = useState(true);
    const [index, setIndex] = useState(0);

    // Autoplaying media starts paused for reduced-motion users
    useEffect(() => {
        if (reduceMotion) setPlaying(false);
    }, [reduceMotion]);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;
        if (playing) video.play().catch(() => setPlaying(false));
        else video.pause();
    }, [playing, hasVideo]);

    // As the hero scrolls away, the media frame pulls in to a rounded card and the copy drifts up
    const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
    const clipPath = useTransform(
        scrollYProgress,
        (p) => `inset(${p * 8}% ${p * 5}% ${p * 8}% ${p * 5}% round ${p * 40}px)`
    );
    const mediaTransform = useTransform(scrollYProgress, (p) => `scale(${1 + p * 0.15})`);
    const copyTransform = useTransform(scrollYProgress, (p) => `translateY(${p * -18}%)`);
    const copyOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

    const playLabel = hasVideo ? 'background video' : 'slideshow';

    return (
        <section ref={sectionRef} id="hero" className="relative isolate flex min-h-[100dvh] flex-col justify-end overflow-hidden">
            <motion.div
                aria-hidden="true"
                className="absolute inset-0 -z-20 overflow-hidden bg-ink-raised"
                style={reduceMotion ? undefined : { clipPath }}
            >
                <motion.div className="absolute inset-0" style={reduceMotion ? undefined : { transform: mediaTransform }}>
                    {hasVideo ? (
                        <video
                            ref={videoRef}
                            muted
                            loop
                            playsInline
                            autoPlay={!reduceMotion}
                            className="size-full object-cover opacity-75"
                        >
                            {videoSources.map((source, i) => (
                                <source
                                    key={source.url}
                                    src={source.url}
                                    type={source.type}
                                    // The last source failing means no format played; fall back to the reel
                                    onError={i === videoSources.length - 1 ? () => setHasVideo(false) : undefined}
                                />
                            ))}
                        </video>
                    ) : (
                        <AnimatePresence initial={false}>
                            <motion.img
                                key={index}
                                src={slides[index].image}
                                alt=""
                                className="absolute inset-0 size-full object-cover"
                                initial={{ opacity: 0, transform: 'scale(1.12)' }}
                                animate={{ opacity: 0.75, transform: 'scale(1)' }}
                                exit={{ opacity: 0 }}
                                transition={{
                                    opacity: { duration: 1.2, ease: 'easeInOut' },
                                    transform: { duration: 7, ease: [0.23, 1, 0.32, 1] },
                                }}
                            />
                        </AnimatePresence>
                    )}
                </motion.div>

                {/* Scrim: heavier toward the bottom-left where the copy sits */}
                <div className="absolute inset-0 bg-[linear-gradient(to_top,#0B0C0E_0%,rgb(11_12_14/0.8)_30%,rgb(11_12_14/0.2)_70%,rgb(11_12_14/0.6)_100%)]" />
            </motion.div>

            {/* Media controls; each slide's progress bar doubles as the reel's timer */}
            <div className="absolute inset-x-0 top-20 mx-auto flex max-w-page items-center justify-end gap-3 px-5 md:top-24 md:px-8">
                {!hasVideo && (
                    <>
                        <p aria-live="polite" className="hidden text-sm text-paper/80 sm:block">
                            {slides[index].label}
                        </p>
                        <div className="flex">
                            {slides.map((slide, i) => (
                                <button
                                    key={slide.label}
                                    type="button"
                                    onClick={() => setIndex(i)}
                                    aria-label={`Show ${slide.label}`}
                                    aria-current={i === index}
                                    className="group grid h-11 w-9 place-items-center"
                                >
                                    <span className="block h-0.5 w-7 overflow-hidden rounded-full bg-white/25 transition-colors duration-200 group-hover:bg-white/45">
                                        <span
                                            key={i === index ? `active-${index}` : `idle-${i}`}
                                            onAnimationEnd={() => setIndex((index + 1) % slides.length)}
                                            className="block h-full origin-left bg-paper"
                                            style={
                                                i === index
                                                    ? {
                                                          animation: 'progress 6000ms linear both',
                                                          animationPlayState: playing ? 'running' : 'paused',
                                                      }
                                                    : { transform: `scaleX(${i < index ? 1 : 0})` }
                                            }
                                        />
                                    </span>
                                </button>
                            ))}
                        </div>
                    </>
                )}
                <button
                    type="button"
                    onClick={() => setPlaying((p) => !p)}
                    aria-label={`${playing ? 'Pause' : 'Play'} ${playLabel}`}
                    className="btn btn-ghost size-11 bg-ink/40 px-0 backdrop-blur-sm"
                >
                    {playing ? <Pause size={16} weight="fill" /> : <Play size={16} weight="fill" />}
                </button>
            </div>

            <motion.div
                className="mx-auto w-full max-w-page px-5 pt-40 pb-12 md:px-8 md:pb-20"
                style={reduceMotion ? undefined : { transform: copyTransform, opacity: copyOpacity }}
            >
                <h1 className="font-display-wide text-[clamp(2.75rem,9.5vw,8.5rem)] leading-[0.9] font-extrabold tracking-[-0.02em] uppercase">
                    <span className="block overflow-hidden py-[0.04em]">
                        <span className="line-reveal">High impact</span>
                    </span>
                    <span className="block overflow-hidden py-[0.04em]">
                        <span className="line-reveal text-azure-soft" style={delay(110)}>
                            initiatives
                        </span>
                    </span>
                </h1>

                <div className="mt-8 flex flex-col gap-8 md:mt-10 md:flex-row md:items-end md:justify-between">
                    <p className="rise max-w-[34ch] text-lg leading-relaxed text-paper/85 md:text-xl" style={delay(380)}>
                        A Canadian consultancy that plans and runs hackathons, conferences, networking nights and yacht
                        parties.
                    </p>

                    <div className="rise flex flex-wrap items-center gap-3" style={delay(460)}>
                        <a href={CONTACT_HREF} className="btn btn-primary h-12 px-6 text-base">
                            Get in Touch
                        </a>
                        <a href="#featured" className="btn btn-ghost group h-12 px-6 text-base">
                            See Our Work
                            <ArrowDown
                                size={16}
                                className="transition-transform duration-200 ease-out group-hover:translate-y-0.5"
                            />
                        </a>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export { Hero };
