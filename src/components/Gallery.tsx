import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react';
import { ArrowLeft, ArrowRight, X } from '@phosphor-icons/react';
import {
    BBQBeaverTailsFull,
    BBQBeaverTailsThumb,
    BBQCarsFull,
    BBQCarsThumb,
    BBQPitchesFull,
    BBQPitchesThumb,
    BBQTableFull,
    BBQTableThumb,
    HawkHacksAtrium,
    HawkHacksFood,
    YachtDeckFull,
    YachtDeckThumb,
    YachtLoungeFull,
    YachtLoungeThumb,
    YachtSkylineFull,
    YachtSkylineThumb,
} from '@assets';
import { Reveal } from './Reveal';

interface Photo {
    thumb: string;
    full: string;
    alt: string;
    event: string;
    portrait?: boolean;
}

// Ordered so each of the three desktop columns mixes events and orientations
const photos: Photo[] = [
    { thumb: YachtDeckThumb, full: YachtDeckFull, alt: 'Guests crowded on the deck of the Collision yacht party', event: 'Collision 2024 yacht after-party' },
    { thumb: HawkHacksFood, full: HawkHacksFood, alt: 'Hackers lining up for food in the atrium at HawkHacks 2024', event: 'HawkHacks 2024', portrait: true },
    { thumb: BBQCarsThumb, full: BBQCarsFull, alt: 'Supercars on display on the lawn at the SPUR BBQ festival', event: 'SPUR Community BBQ Festival' },
    { thumb: BBQPitchesThumb, full: BBQPitchesFull, alt: 'An audience watching pitches at the SPUR BBQ festival', event: 'SPUR Community BBQ Festival', portrait: true },
    { thumb: YachtSkylineThumb, full: YachtSkylineFull, alt: 'The Toronto skyline at night from the yacht', event: 'Collision 2024 yacht after-party' },
    { thumb: HawkHacksAtrium, full: HawkHacksAtrium, alt: 'Teams working at tables during HawkHacks 2024', event: 'HawkHacks 2024' },
    { thumb: BBQTableThumb, full: BBQTableFull, alt: 'Friends sharing a table at the SPUR BBQ festival', event: 'SPUR Community BBQ Festival' },
    { thumb: YachtLoungeThumb, full: YachtLoungeFull, alt: 'Guests smiling on a lounge sofa aboard the yacht', event: 'Collision 2024 yacht after-party' },
    { thumb: BBQBeaverTailsThumb, full: BBQBeaverTailsFull, alt: 'Guests lining up at the BeaverTails truck at the SPUR BBQ festival', event: 'SPUR Community BBQ Festival' },
];

// Distance each desktop column travels across the section's scroll, in px; the middle column runs fastest
const columnTravel: [number, number][] = [
    [60, -60],
    [180, -180],
    [100, -40],
];

const Tile = ({ photo, index, onOpen }: { photo: Photo; index: number; onOpen: (i: number) => void }) => (
    <button
        type="button"
        onClick={() => onOpen(index)}
        aria-haspopup="dialog"
        aria-label={`View photo: ${photo.alt}`}
        className="group block w-full overflow-hidden rounded-xl bg-ink-raised"
    >
        <img
            src={photo.thumb}
            alt=""
            loading="lazy"
            decoding="async"
            className={`w-full object-cover transition-[scale,filter] duration-300 ease-out group-hover:scale-[1.03] ${
                photo.portrait ? 'aspect-[3/4]' : 'aspect-[3/2]'
            }`}
        />
    </button>
);

const Column = ({
    items,
    progress,
    travel,
    onOpen,
    reduceMotion,
}: {
    items: { photo: Photo; index: number }[];
    progress: MotionValue<number>;
    travel: [number, number];
    onOpen: (i: number) => void;
    reduceMotion: boolean;
}) => {
    const transform = useTransform(progress, [0, 1], travel.map((y) => `translateY(${y}px)`));

    return (
        <motion.div className="flex flex-col gap-4" style={reduceMotion ? undefined : { transform }}>
            {items.map(({ photo, index }) => (
                <Tile key={photo.full} photo={photo} index={index} onOpen={onOpen} />
            ))}
        </motion.div>
    );
};

const Viewer = ({ index, onChange, onClose }: { index: number | null; onChange: (i: number) => void; onClose: () => void }) => {
    const ref = useRef<HTMLDialogElement>(null);
    const photo = index === null ? null : photos[index];

    useEffect(() => {
        const dialog = ref.current;
        if (!dialog) return;
        if (index !== null && !dialog.open) dialog.showModal();
        if (index === null && dialog.open) dialog.close();
    }, [index]);

    const step = (delta: number) => {
        if (index === null) return;
        onChange((index + delta + photos.length) % photos.length);
    };

    return (
        <dialog
            ref={ref}
            onClose={onClose}
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
            onKeyDown={(e) => {
                if (e.key === 'ArrowRight') step(1);
                if (e.key === 'ArrowLeft') step(-1);
            }}
            aria-label="Photo viewer"
            className="member-dialog m-auto max-h-none max-w-none bg-transparent p-0 text-paper"
        >
            {photo && (
                <figure className="flex w-[min(72rem,calc(100vw-2rem))] flex-col">
                    <img
                        src={photo.full}
                        alt={photo.alt}
                        className="max-h-[calc(100dvh-9rem)] w-full rounded-xl object-contain"
                    />
                    <figcaption className="mt-4 flex items-center justify-between gap-4">
                        <span className="min-w-0">
                            <span className="block font-medium">{photo.event}</span>
                            <span className="block text-sm text-paper-muted tabular-nums">
                                {index! + 1} of {photos.length}
                            </span>
                        </span>
                        <span className="flex shrink-0 gap-2">
                            <button type="button" onClick={() => step(-1)} aria-label="Previous photo" className="btn btn-ghost size-11 px-0">
                                <ArrowLeft size={18} />
                            </button>
                            <button type="button" onClick={() => step(1)} aria-label="Next photo" className="btn btn-ghost size-11 px-0">
                                <ArrowRight size={18} />
                            </button>
                            <button type="button" onClick={onClose} aria-label="Close viewer" className="btn btn-primary size-11 px-0">
                                <X size={18} />
                            </button>
                        </span>
                    </figcaption>
                </figure>
            )}
        </dialog>
    );
};

const Gallery = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const reduceMotion = useReducedMotion() ?? false;
    const [open, setOpen] = useState<number | null>(null);
    const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });

    const indexed = photos.map((photo, index) => ({ photo, index }));
    const columns = [0, 1, 2].map((c) => indexed.filter((_, i) => i % 3 === c));

    return (
        <section ref={sectionRef} aria-labelledby="gallery-heading" className="overflow-hidden py-24 md:py-36">
            <div className="mx-auto max-w-page px-5 md:px-8">
                <Reveal>
                    <h2 id="gallery-heading" className="font-display text-5xl font-bold tracking-tight md:text-6xl">
                        Gallery
                    </h2>
                    <p className="mt-4 max-w-[48ch] text-lg text-paper-muted">
                        HawkHacks, the Collision yacht after-party and the SPUR Community BBQ Festival.
                    </p>
                </Reveal>

                {/* Mobile: a plain two-column grid */}
                <div className="mt-12 grid grid-cols-2 gap-3 md:hidden">
                    {indexed.map(({ photo, index }) => (
                        <Tile key={photo.full} photo={photo} index={index} onOpen={setOpen} />
                    ))}
                </div>

                {/* Desktop: three columns drifting at different speeds for depth */}
                <div className="mt-20 hidden grid-cols-3 gap-4 md:grid">
                    {columns.map((items, c) => (
                        <Column
                            key={c}
                            items={items}
                            progress={scrollYProgress}
                            travel={columnTravel[c]}
                            onOpen={setOpen}
                            reduceMotion={reduceMotion}
                        />
                    ))}
                </div>
            </div>

            <Viewer index={open} onChange={setOpen} onClose={() => setOpen(null)} />
        </section>
    );
};

export { Gallery };
