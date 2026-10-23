import { useEffect, useRef } from 'react';
import { animate, motion, useInView, useReducedMotion } from 'motion/react';
import { ArrowUpRight } from '@phosphor-icons/react';
import { SpurHacksCampus, SpurHacksDoors, SpurHacksStage, SpurHacksWayfinding } from '@assets';
import { Reveal } from './Reveal';

// Figures come from the SpurHacks 2025 wrap-up
const stats = [
    { value: 1400, prefix: '', suffix: '+', label: 'attendees' },
    { value: 291, prefix: '', suffix: '', label: 'projects submitted' },
    { value: 100, prefix: '$', suffix: 'k+', label: 'in prizes' },
    { value: 350, prefix: '$', suffix: 'k+', label: 'budget' },
    { value: 4, prefix: '', suffix: '', label: 'floors of the BlackBerry campus' },
    { value: 3, prefix: '', suffix: '', label: 'months from zero to doors open' },
];

const formatNumber = new Intl.NumberFormat('en-CA').format;

/*
 *
 * @description Counts up once when scrolled into view. Writes straight to the DOM so
 * React doesn't re-render every frame; screen readers get the final figure only.
 *
 */
const CountUp = ({ value, prefix, suffix }: { value: number; prefix: string; suffix: string }) => {
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true, amount: 0.8 });
    const reduceMotion = useReducedMotion();

    useEffect(() => {
        const el = ref.current;
        if (!inView || !el || reduceMotion) return;

        const controls = animate(0, value, {
            duration: 1.6,
            ease: [0.23, 1, 0.32, 1],
            onUpdate: (v) => {
                el.textContent = formatNumber(Math.round(v));
            },
        });
        return () => controls.stop();
    }, [inView, reduceMotion, value]);

    return (
        <>
            <span aria-hidden="true">
                {prefix}
                <span ref={ref}>{formatNumber(value)}</span>
                {suffix}
            </span>
            <span className="sr-only">{`${prefix}${formatNumber(value)}${suffix}`}</span>
        </>
    );
};

const photos = [
    {
        src: SpurHacksStage,
        alt: 'The crowd and camera crew in front of the main stage at SpurHacks 2025',
        className: 'col-span-2 row-span-2',
    },
    { src: SpurHacksDoors, alt: 'Attendees arriving under purple and black balloons at SpurHacks 2025', className: '' },
    {
        src: SpurHacksWayfinding,
        alt: 'SpurHacks signage pointing hackers to their rooms on the BlackBerry campus',
        className: '',
    },
    { src: SpurHacksCampus, alt: 'The BlackBerry campus in Waterloo at dusk during SpurHacks 2025', className: 'col-span-2' },
];

const Featured = () => {
    return (
        <section id="featured" aria-labelledby="featured-heading" className="mx-auto max-w-page px-5 py-24 md:px-8 md:py-36">
            <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
                <Reveal>
                    <p className="text-sm font-medium tracking-[0.16em] text-azure-soft uppercase">Featured event</p>
                    <h2
                        id="featured-heading"
                        className="font-display-wide mt-5 text-[clamp(2.25rem,5vw,4.5rem)] leading-[0.9] font-extrabold tracking-[-0.02em] uppercase"
                    >
                        SpurHacks
                        <br />
                        2025
                    </h2>
                    <p className="mt-8 max-w-[30ch] text-2xl leading-snug font-medium md:text-3xl">
                        Canada’s largest in-person hackathon by project submissions.
                    </p>
                    <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-paper-muted">
                        SpurHacks went from nothing to 1,400+ people in three months, across four floors of the old
                        BlackBerry campus in Waterloo. Konfer ran it end to end, from stage and production to the
                        platform that handled applications, ticketing, scheduling and networking.
                    </p>
                    <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
                        <a href="https://spurhacks.com" target="_blank" rel="noopener noreferrer" className="btn btn-ghost group">
                            Visit SpurHacks
                            <ArrowUpRight
                                size={16}
                                aria-hidden="true"
                                className="transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                            />
                            <span className="sr-only">(opens in a new tab)</span>
                        </a>
                        <p className="text-[15px] text-paper-muted">June 20 to 22, 2025 in Waterloo, ON</p>
                    </div>
                </Reveal>

                <dl className="grid grid-cols-2 content-start gap-x-6 gap-y-10 border-t border-ink-line pt-10 lg:mt-3 lg:border-t-0 lg:pt-0">
                    {stats.map((stat, i) => (
                        <Reveal key={stat.label} delay={i * 0.05} className="flex flex-col-reverse border-t border-white/15 pt-5">
                            <dt className="mt-2 text-[15px] leading-snug text-paper-muted">{stat.label}</dt>
                            <dd className="font-display text-5xl font-bold tracking-tight tabular-nums md:text-6xl">
                                <CountUp value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                            </dd>
                        </Reveal>
                    ))}
                </dl>
            </div>

            {/* Four photos fill a 4x2 grid exactly: the stage takes a 2x2 block */}
            <div className="mt-16 grid auto-rows-[minmax(9rem,22vw)] grid-cols-2 gap-3 md:mt-24 md:auto-rows-[minmax(10rem,16vw)] md:grid-cols-4 md:gap-4 xl:auto-rows-[13.5rem]">
                {photos.map((photo, i) => (
                    <motion.figure
                        key={photo.src}
                        className={`overflow-hidden rounded-xl bg-ink-raised ${photo.className}`}
                        // Image reveal: the frame opens from a smaller, rounded window as it scrolls in
                        initial={{ clipPath: 'inset(10% 10% 10% 10% round 24px)', opacity: 0 }}
                        whileInView={{ clipPath: 'inset(0% 0% 0% 0% round 12px)', opacity: 1 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.9, delay: i * 0.08, ease: [0.23, 1, 0.32, 1] }}
                    >
                        <img
                            src={photo.src}
                            alt={photo.alt}
                            loading="lazy"
                            decoding="async"
                            className="size-full object-cover"
                        />
                    </motion.figure>
                ))}
            </div>
        </section>
    );
};

export { Featured };
