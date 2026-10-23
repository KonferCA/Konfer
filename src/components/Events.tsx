import { useState } from 'react';
import { ArrowUpRight } from '@phosphor-icons/react';
import { SpurHacksEvent, HawkHacksEvent, CollisionEvent, LCSEvent, BBQEvent } from '@assets';
import { Reveal } from './Reveal';

interface Stat {
    value: string;
    label: string;
}

interface PastEvent {
    title: string;
    detail: string;
    image: string;
    link: string;
    stats?: Stat[];
}

const events: PastEvent[] = [
    {
        title: 'SpurHacks 2025',
        detail: 'Hackathon, June 2025',
        image: SpurHacksEvent,
        link: 'https://spurhacks.com',
        // Its numbers live in the featured section directly above
    },
    {
        title: 'HawkHacks 2024',
        detail: 'Hackathon, May 2024',
        image: HawkHacksEvent,
        link: 'https://hawkhacks.ca',
        stats: [
            { value: '1,289', label: 'registrants' },
            { value: '35', label: 'sponsors' },
        ],
    },
    {
        title: 'Yacht After-Party',
        detail: 'Collision 2024, June 2024',
        image: CollisionEvent,
        link: 'https://lu.ma/8iwq9lxb',
        stats: [{ value: '#1', label: 'side event at Collision' }],
    },
    {
        title: 'SPUR Community BBQ Festival',
        detail: 'Konfer x SPUR Innovation Centre, October 2024',
        image: BBQEvent,
        link: 'https://lu.ma/aouu9bsq',
        stats: [{ value: '300', label: 'people' }],
    },
    {
        title: 'Laurier Computing Society',
        detail: 'Student community',
        image: LCSEvent,
        link: 'https://lauriercs.ca',
    },
];

const Stats = ({ stats, className = '' }: { stats: Stat[]; className?: string }) => (
    <dl className={`flex flex-wrap gap-x-8 gap-y-3 ${className}`}>
        {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col-reverse">
                <dt className="text-sm text-paper-muted">{stat.label}</dt>
                <dd className="font-display text-2xl font-semibold tracking-tight tabular-nums">{stat.value}</dd>
            </div>
        ))}
    </dl>
);

const Events = () => {
    const [active, setActive] = useState(0);
    const activeStats = events[active].stats;

    return (
        <section id="past-events" aria-labelledby="events-heading" className="mx-auto max-w-page px-5 py-24 md:px-8 md:py-32">
            <Reveal>
                <h2 id="events-heading" className="font-display text-5xl font-bold tracking-tight md:text-6xl">
                    Past events
                </h2>
            </Reveal>

            <div className="mt-12 grid gap-10 md:mt-16 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16">
                <ul className="border-t border-ink-line">
                    {events.map((event, i) => (
                        <li key={event.title} className="border-b border-ink-line">
                            <a
                                href={event.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                onPointerEnter={() => setActive(i)}
                                onFocus={() => setActive(i)}
                                className="group flex flex-col gap-5 py-6 lg:flex-row lg:items-center lg:justify-between lg:py-8"
                            >
                                {/* Inline image on small screens; the sticky preview takes over on desktop */}
                                <img
                                    src={event.image}
                                    alt=""
                                    loading="lazy"
                                    decoding="async"
                                    className="aspect-[2/1] w-full rounded-xl object-cover lg:hidden"
                                />
                                <div className="min-w-0">
                                    <span
                                        className={`font-display block text-2xl font-semibold tracking-tight transition-colors duration-200 md:text-3xl ${
                                            active === i ? 'lg:text-paper' : 'lg:text-paper-muted'
                                        }`}
                                    >
                                        {event.title}
                                    </span>
                                    <span className="mt-1 block text-[15px] text-paper-muted">{event.detail}</span>
                                </div>
                                <ArrowUpRight
                                    size={22}
                                    aria-hidden="true"
                                    className="hidden shrink-0 text-paper-muted transition-transform duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-azure lg:block"
                                />
                                <span className="sr-only">(opens in a new tab)</span>
                            </a>
                            {event.stats && <Stats stats={event.stats} className="pb-6 lg:hidden" />}
                        </li>
                    ))}
                </ul>

                <div className="relative hidden lg:block">
                    <div className="sticky top-24">
                        <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-ink-raised">
                            {events.map((event, i) => (
                                <img
                                    key={event.title}
                                    src={event.image}
                                    alt=""
                                    loading="lazy"
                                    decoding="async"
                                    className={`absolute inset-0 size-full object-cover transition-[opacity,scale,filter] duration-300 ease-out motion-reduce:scale-100 motion-reduce:blur-none ${
                                        active === i ? 'scale-100 opacity-100 blur-none' : 'scale-[1.04] opacity-0 blur-xs'
                                    }`}
                                />
                            ))}
                        </div>
                        {/* Keyed so each event's numbers fade in fresh; height reserved so the panel never jumps */}
                        <div className="mt-6 min-h-16">
                            {activeStats && (
                                <Stats
                                    key={active}
                                    stats={activeStats}
                                    className="animate-[fade_300ms_var(--ease-out)_both]"
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export { Events };
