import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react';
import { PartiesImage, ConferencesImage, NetworkingImage, SeminarsImage } from '@assets';
import { Reveal } from './Reveal';

const expertiseData = [
    {
        title: 'Parties',
        description: 'Yacht parties, after-parties and community socials, planned down to the guest list.',
        tags: ['Yacht parties', 'After-parties', 'Socials'],
        image: PartiesImage,
        surface: 'bg-ink-raised text-paper',
        muted: 'text-paper-muted',
    },
    {
        title: 'Conferences',
        description: 'Programs, speakers and sponsors under one roof, run on schedule.',
        tags: ['Hackathons', 'Case competitions', 'Keynotes'],
        image: ConferencesImage,
        surface: 'bg-[#181B21] text-paper',
        muted: 'text-paper-muted',
    },
    {
        title: 'Networking',
        description: 'Rooms where companies meet the talent they want to hire, and students meet the teams they want to join.',
        tags: ['Mixers', 'Recruiting nights', 'Panels'],
        image: NetworkingImage,
        surface: 'bg-[#1D2129] text-paper',
        muted: 'text-paper-muted',
    },
    {
        title: 'Seminars',
        description: 'Workshops and talks that teach something useful, run by people who do the work.',
        tags: ['Workshops', 'Tech talks', 'Fireside chats'],
        image: SeminarsImage,
        surface: 'bg-azure text-ink',
        muted: 'text-ink/75',
    },
];

interface CardProps {
    item: (typeof expertiseData)[number];
    index: number;
    progress: MotionValue<number>;
    reduceMotion: boolean;
}

const Card = ({ item, index, progress, reduceMotion }: CardProps) => {
    const count = expertiseData.length;
    // Each card shrinks a little once the cards after it start stacking on top
    const targetScale = 1 - (count - 1 - index) * 0.04;
    const transform = useTransform(progress, [index / count, 1], [`scale(1)`, `scale(${targetScale})`]);

    return (
        <div
            // The last card needs no runway after it, so it drops the min-height
            className={`sticky flex items-start justify-center ${
                index < expertiseData.length - 1 ? 'min-h-[70vh] md:min-h-[80vh]' : 'pb-4'
            }`}
            // Offsetting each card's sticky top leaves the edges of earlier cards visible
            style={{ top: `calc(5.5rem + ${index * 1.25}rem)` }}
        >
            <motion.article
                className={`grid w-full origin-top grid-cols-1 gap-5 overflow-hidden rounded-2xl p-5 shadow-[0_-12px_40px_rgb(5_6_8/0.5)] md:grid-cols-[minmax(0,1fr)_minmax(0,28rem)] md:gap-10 md:p-10 lg:p-12 ${item.surface}`}
                style={reduceMotion ? undefined : { transform }}
            >
                <div className="flex flex-col">
                    <h3 className="font-display-wide text-3xl font-extrabold tracking-tight uppercase sm:text-4xl md:text-6xl">
                        {item.title}
                    </h3>
                    <p className={`mt-4 max-w-[40ch] text-base leading-relaxed md:mt-6 md:text-xl ${item.muted}`}>
                        {item.description}
                    </p>
                    <ul className="mt-6 flex flex-wrap gap-2 md:mt-auto md:pt-10">
                        {item.tags.map((tag) => (
                            <li key={tag} className="rounded-full border border-current/20 px-3 py-1 text-sm">
                                {tag}
                            </li>
                        ))}
                    </ul>
                </div>
                <img
                    src={item.image}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="order-first aspect-[3/2] w-full rounded-xl object-cover md:order-none md:aspect-[4/3]"
                />
            </motion.article>
        </div>
    );
};

const Expertise = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const reduceMotion = useReducedMotion() ?? false;
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] });

    return (
        <section aria-labelledby="expertise-heading" className="mx-auto max-w-page px-5 pb-12 md:px-8 md:pb-24">
            <Reveal>
                <h2 id="expertise-heading" className="font-display text-5xl font-bold tracking-tight md:text-6xl">
                    What we run
                </h2>
            </Reveal>

            <div ref={containerRef} className="mt-10 md:mt-14">
                {expertiseData.map((item, i) => (
                    <Card key={item.title} item={item} index={i} progress={scrollYProgress} reduceMotion={reduceMotion} />
                ))}
            </div>
        </section>
    );
};

export { Expertise };
