import { motion } from 'motion/react';
import { BrandLogo } from '@assets';
import { Reveal } from './Reveal';

const sides = [
    {
        title: 'For companies',
        body: 'Put your brand in front of ambitious students through sponsorships, workshops and recruiting events.',
        tags: ['Sponsorships', 'Workshops', 'Recruiting'],
    },
    {
        title: 'For students',
        body: 'Build, compete and meet the companies shaping your industry.',
        tags: ['Hackathons', 'Case competitions', 'Networking'],
    },
];

const Side = ({ side, delay }: { side: (typeof sides)[number]; delay: number }) => (
    <Reveal delay={delay} className="w-full rounded-2xl border border-ink-line bg-ink-raised p-6 md:max-w-sm md:p-8">
        <h3 className="font-display text-2xl font-semibold tracking-tight">{side.title}</h3>
        <p className="mt-3 leading-relaxed text-paper-muted">{side.body}</p>
        <ul className="mt-6 flex flex-wrap gap-2">
            {side.tags.map((tag) => (
                <li key={tag} className="rounded-full border border-white/12 px-3 py-1 text-sm text-paper/90">
                    {tag}
                </li>
            ))}
        </ul>
    </Reveal>
);

/*
 *
 * @description A connector that draws itself in, then carries pulses both ways.
 * `origin` is the end nearest the Konfer mark, so lines grow out from the middle.
 *
 */
const Track = ({ origin }: { origin: 'start' | 'end' }) => {
    const horizontalOrigin = origin === 'start' ? 'origin-left' : 'origin-right';
    const verticalOrigin = origin === 'start' ? 'origin-top' : 'origin-bottom';

    return (
        <div aria-hidden="true" className="shrink-0 self-center md:min-w-16 md:flex-1">
            {/* Vertical on small screens */}
            <div className="relative h-14 w-px overflow-hidden [container-type:size] md:hidden">
                <motion.div
                    className={`absolute inset-0 bg-white/20 ${verticalOrigin}`}
                    initial={{ transform: 'scaleY(0)' }}
                    whileInView={{ transform: 'scaleY(1)' }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3, ease: [0.77, 0, 0.175, 1] }}
                />
                <span className="absolute -left-[2.5px] size-1.5 rounded-full bg-azure-soft motion-reduce:hidden [animation:flow-y_2.4s_linear_infinite]" />
                <span className="absolute -left-[2.5px] size-1.5 rounded-full bg-paper/70 motion-reduce:hidden [animation:flow-y_2.4s_linear_infinite_reverse_1.2s]" />
            </div>

            {/* Horizontal from md up */}
            <div className="relative hidden h-px w-full overflow-hidden [container-type:inline-size] md:block">
                <motion.div
                    className={`absolute inset-0 bg-white/20 ${horizontalOrigin}`}
                    initial={{ transform: 'scaleX(0)' }}
                    whileInView={{ transform: 'scaleX(1)' }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, delay: 0.3, ease: [0.77, 0, 0.175, 1] }}
                />
            </div>
            <div className="relative -mt-[3.5px] hidden h-1.5 overflow-hidden [container-type:inline-size] md:block">
                <span className="absolute size-1.5 rounded-full bg-azure-soft motion-reduce:hidden [animation:flow-x_3s_linear_infinite]" />
                <span className="absolute size-1.5 rounded-full bg-paper/70 motion-reduce:hidden [animation:flow-x_3s_linear_infinite_reverse_1.5s]" />
            </div>
        </div>
    );
};

const Bridge = () => {
    return (
        <section aria-labelledby="bridge-heading" className="mx-auto max-w-page px-5 py-24 md:px-8 md:py-36">
            <Reveal className="max-w-4xl">
                <h2 id="bridge-heading" className="font-display text-5xl leading-[0.95] font-bold tracking-tight md:text-7xl">
                    We bridge innovation.
                </h2>
                <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-paper-muted md:text-xl">
                    By organizing high-impact events that connect innovative businesses to ambitious students and young
                    professionals.
                </p>
            </Reveal>

            <div className="mt-16 flex flex-col items-center md:mt-24 md:flex-row md:items-stretch">
                <Side side={sides[0]} delay={0} />
                <Track origin="end" />
                <motion.div
                    className="grid size-20 shrink-0 place-items-center self-center rounded-full border border-white/15 bg-ink md:size-24"
                    initial={{ opacity: 0, transform: 'scale(0.9)' }}
                    whileInView={{ opacity: 1, transform: 'scale(1)' }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
                >
                    <img src={BrandLogo} alt="Konfer" width={101} height={101} className="size-9 md:size-11" />
                </motion.div>
                <Track origin="start" />
                <Side side={sides[1]} delay={0.08} />
            </div>
        </section>
    );
};

export { Bridge };
