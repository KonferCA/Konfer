import { useRef, type PointerEvent } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react';
import { ArrowUpRight } from '@phosphor-icons/react';
import { CONTACT_EMAIL, CONTACT_HREF, NAV_LINKS, SOCIAL_LINKS } from '@utils/site';
import { Reveal } from './Reveal';

/*
 *
 * @description Round CTA that leans toward the cursor. Springs keep the pull soft,
 * and it only engages on fine pointers so touch users get a plain button.
 *
 */
const MagneticButton = () => {
    const ref = useRef<HTMLAnchorElement>(null);
    const reduceMotion = useReducedMotion();
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springX = useSpring(x, { stiffness: 180, damping: 16, mass: 0.4 });
    const springY = useSpring(y, { stiffness: 180, damping: 16, mass: 0.4 });
    const transform = useTransform(() => `translate3d(${springX.get()}px, ${springY.get()}px, 0)`);
    const labelTransform = useTransform(() => `translate3d(${springX.get() * 0.35}px, ${springY.get() * 0.35}px, 0)`);

    const onPointerMove = (e: PointerEvent<HTMLAnchorElement>) => {
        if (reduceMotion || e.pointerType !== 'mouse' || !ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        x.set((e.clientX - (rect.left + rect.width / 2)) * 0.3);
        y.set((e.clientY - (rect.top + rect.height / 2)) * 0.3);
    };

    const reset = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.a
            ref={ref}
            href={CONTACT_HREF}
            onPointerMove={onPointerMove}
            onPointerLeave={reset}
            style={{ transform }}
            className="group grid size-40 shrink-0 place-items-center rounded-full bg-azure text-lg font-semibold text-ink transition-colors duration-200 hover:bg-azure-soft active:scale-[0.97] md:size-48 md:text-xl"
        >
            <motion.span style={{ transform: labelTransform }} className="flex items-center gap-1.5">
                Get in Touch
                <ArrowUpRight
                    size={18}
                    weight="bold"
                    aria-hidden="true"
                    className="transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
            </motion.span>
        </motion.a>
    );
};

const Footer = () => {
    return (
        <footer className="relative overflow-hidden border-t border-ink-line">
            <div className="mx-auto max-w-page px-5 pt-24 md:px-8 md:pt-36">
                <Reveal className="flex flex-col gap-12 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <h2 className="font-display-wide text-[clamp(2.75rem,8vw,7rem)] leading-[0.9] font-extrabold tracking-[-0.02em] uppercase">
                            Ready to
                            <br />
                            <span className="text-azure-soft">innovate?</span>
                        </h2>
                        <a
                            href={CONTACT_HREF}
                            className="group mt-8 inline-flex items-center gap-2 text-xl text-paper-muted transition-colors duration-200 hover:text-paper md:text-2xl"
                        >
                            {CONTACT_EMAIL}
                        </a>
                    </div>
                    <MagneticButton />
                </Reveal>

                <div className="mt-24 grid gap-10 border-t border-ink-line pt-10 md:grid-cols-[1fr_auto_auto] md:gap-16">
                    <a
                        href="https://maps.app.goo.gl/eYvWwuUKGzNMUVyMA"
                        target="_blank"
                        rel="noreferrer"
                        className="link-muted self-start text-[15px] leading-relaxed"
                    >
                        283 Duke St West
                        <br />
                        Kitchener, ON N2H 5C2
                    </a>

                    <nav aria-label="Footer">
                        <ul className="grid grid-cols-2 gap-x-10 gap-y-3 text-[15px] md:grid-cols-1">
                            {NAV_LINKS.map((link) => (
                                <li key={link.href}>
                                    <a href={link.href} className="link-muted">
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <ul className="-ml-3 flex gap-1 md:-mr-3 md:ml-0 md:self-start">
                        {SOCIAL_LINKS.map(({ label, href, Icon }) => (
                            <li key={href}>
                                <a
                                    href={href}
                                    target="_blank"
                                    rel="noreferrer"
                                    aria-label={label}
                                    className="grid size-11 place-items-center rounded-full text-paper-muted transition-colors duration-200 hover:bg-white/5 hover:text-paper"
                                >
                                    <Icon size={22} />
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                <p className="mt-12 text-sm text-paper-muted">
                    &copy; {new Date().getFullYear()} Konfer Inc. All rights reserved.
                </p>
            </div>

            {/* Oversized wordmark as a sign-off; it sits partly below the fold of the footer */}
            <p
                aria-hidden="true"
                className="font-display-wide pointer-events-none mt-10 -mb-[0.22em] text-center text-[18.5vw] leading-none font-extrabold tracking-[-0.04em] text-ink-raised uppercase select-none"
            >
                Konfer
            </p>
        </footer>
    );
};

export { Footer };
