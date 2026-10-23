import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react';
import { Reveal } from './Reveal';

const statement =
    'We source, organize and execute high-impact initiatives for companies and groups. Yacht parties, case competitions, hackathons, workshops or networking events: we handle sponsorship, marketing, operations and logistics at every stage.';

// Words that carry the pitch get the accent once lit
const accentWords = new Set(['high-impact', 'initiatives']);

const pillars = [
    {
        title: 'Expertise',
        body: 'We’ve executed some of the largest initiatives in Canada, from high-energy hackathons and case competitions to exclusive yacht parties and networking events.',
    },
    {
        title: 'Culture',
        body: 'We take pride in having fun with our work while delivering outstanding results. Our team is fueled by a passion for helping people grow.',
    },
    {
        title: 'Values',
        body: 'Precision, creativity and professionalism guide everything we do. Building lasting relationships between companies, talent and communities is at our core.',
    },
    {
        title: 'Resources',
        body: 'Our network spans top universities, premier venues and influential organizations, giving us access to the people and spaces that make events work.',
    },
];

const Word = ({ word, range, progress }: { word: string; range: [number, number]; progress: MotionValue<number> }) => {
    const opacity = useTransform(progress, range, [0.18, 1]);
    const accent = accentWords.has(word.replace(/[.,:]/g, ''));

    return (
        <motion.span style={{ opacity }} className={accent ? 'text-azure-soft' : undefined}>
            {word}{' '}
        </motion.span>
    );
};

const About = () => {
    const statementRef = useRef<HTMLParagraphElement>(null);
    const reduceMotion = useReducedMotion();
    // Lights words in reading order while the paragraph travels up through the viewport
    const { scrollYProgress } = useScroll({ target: statementRef, offset: ['start 0.85', 'end 0.45'] });
    const words = statement.split(' ');

    return (
        <section id="about-us" aria-labelledby="about-heading" className="mx-auto max-w-page px-5 py-24 md:px-8 md:py-36">
            <Reveal>
                <h2 id="about-heading" className="text-lg text-paper-muted">
                    About Konfer
                </h2>
            </Reveal>

            <p
                ref={statementRef}
                className="font-display mt-6 max-w-[24ch] text-[clamp(2rem,4.6vw,4.25rem)] leading-[1.08] font-semibold tracking-tight"
            >
                {reduceMotion
                    ? statement
                    : words.map((word, i) => (
                          <Word
                              key={i}
                              word={word}
                              range={[i / words.length, (i + 1) / words.length]}
                              progress={scrollYProgress}
                          />
                      ))}
            </p>

            <dl className="mt-20 grid gap-x-8 gap-y-12 sm:grid-cols-2 md:mt-28 lg:grid-cols-4">
                {pillars.map((pillar, i) => (
                    <Reveal key={pillar.title} delay={i * 0.06} className="border-t border-white/15 pt-6">
                        <dt className="font-display text-2xl font-semibold tracking-tight">{pillar.title}</dt>
                        <dd className="mt-3 leading-relaxed text-paper-muted">{pillar.body}</dd>
                    </Reveal>
                ))}
            </dl>
        </section>
    );
};

export { About };
