import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react';
import { List, X } from '@phosphor-icons/react';
import { CONTACT_HREF, NAV_LINKS, SOCIAL_LINKS } from '@utils/site';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [hidden, setHidden] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const { scrollY } = useScroll();

    // Only re-renders when crossing the threshold, not on every scroll frame
    useMotionValueEvent(scrollY, 'change', (y) => {
        const next = y > 24;
        if (next !== scrolled) setScrolled(next);

        // Tuck away while reading down the page, come back on any upward scroll
        const previous = scrollY.getPrevious() ?? 0;
        const nextHidden = y > 400 && y > previous;
        if (Math.abs(y - previous) > 4 && nextHidden !== hidden) setHidden(nextHidden);
    });

    useEffect(() => {
        if (!isOpen) return;

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setIsOpen(false);
            if (e.key !== 'Tab' || !menuRef.current) return;

            // Keep keyboard focus inside the open menu
            const focusable = menuRef.current.querySelectorAll<HTMLElement>('a[href], button');
            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        };

        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', onKeyDown);

        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', onKeyDown);
        };
    }, [isOpen]);

    const close = () => setIsOpen(false);

    return (
        <>
            <header
                // Header stays put on keyboard focus so tabbing never lands on an off-screen link
                onFocusCapture={() => setHidden(false)}
                className={`fixed inset-x-0 top-0 z-40 border-b transition-[background-color,border-color,translate] duration-300 ease-out ${
                    hidden ? '-translate-y-full' : 'translate-y-0'
                } ${
                    scrolled
                        ? 'border-ink-line bg-ink/80 backdrop-blur-md'
                        : 'border-transparent bg-transparent'
                }`}
            >
                <div className="mx-auto flex h-16 max-w-page items-center justify-between px-5 md:px-8">
                    <a href="#hero" aria-label="Konfer, back to top" className="rounded-md">
                        <img src="/konfer_logo.svg" alt="" width={190} height={39} className="h-7 w-auto" />
                    </a>

                    <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
                        {NAV_LINKS.map((link) => (
                            <a key={link.href} href={link.href} className="link-muted rounded-sm text-[15px]">
                                {link.label}
                            </a>
                        ))}
                        <a href={CONTACT_HREF} className="btn btn-primary h-10 px-4">
                            Get in Touch
                        </a>
                    </nav>

                    <button
                        type="button"
                        onClick={() => setIsOpen(true)}
                        aria-label="Open menu"
                        aria-expanded={isOpen}
                        aria-controls="mobile-menu"
                        className="-mr-2 grid size-11 place-items-center rounded-full text-paper md:hidden"
                    >
                        <List size={24} />
                    </button>
                </div>
            </header>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        ref={menuRef}
                        id="mobile-menu"
                        role="dialog"
                        aria-modal="true"
                        aria-label="Menu"
                        className="fixed inset-0 z-50 flex flex-col bg-ink md:hidden"
                        initial={{ opacity: 0, transform: 'translateY(-12px)' }}
                        animate={{
                            opacity: 1,
                            transform: 'translateY(0px)',
                            transition: { duration: 0.35, ease: [0.32, 0.72, 0, 1] },
                        }}
                        exit={{
                            opacity: 0,
                            transform: 'translateY(-8px)',
                            transition: { duration: 0.18, ease: [0.23, 1, 0.32, 1] },
                        }}
                    >
                        <div className="flex h-16 items-center justify-between px-5">
                            <a href="#hero" onClick={close} aria-label="Konfer, back to top">
                                <img src="/konfer_logo.svg" alt="" width={190} height={39} className="h-7 w-auto" />
                            </a>
                            <button
                                type="button"
                                onClick={close}
                                aria-label="Close menu"
                                autoFocus
                                className="-mr-2 grid size-11 place-items-center rounded-full text-paper"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <nav aria-label="Mobile" className="flex flex-1 flex-col gap-1 px-5 pt-10">
                            {NAV_LINKS.map((link, i) => (
                                <motion.a
                                    key={link.href}
                                    href={link.href}
                                    onClick={close}
                                    className="font-display py-2 text-4xl font-semibold tracking-tight"
                                    initial={{ opacity: 0, transform: 'translateY(12px)' }}
                                    animate={{ opacity: 1, transform: 'translateY(0px)' }}
                                    transition={{ duration: 0.4, delay: 0.08 + i * 0.05, ease: [0.23, 1, 0.32, 1] }}
                                >
                                    {link.label}
                                </motion.a>
                            ))}
                        </nav>

                        <div className="flex items-center justify-between gap-4 border-t border-ink-line px-5 py-6 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
                            <a href={CONTACT_HREF} className="btn btn-primary">
                                Get in Touch
                            </a>
                            <div className="flex gap-1">
                                {SOCIAL_LINKS.map(({ label, href, Icon }) => (
                                    <a
                                        key={href}
                                        href={href}
                                        target="_blank"
                                        rel="noreferrer"
                                        aria-label={label}
                                        className="grid size-11 place-items-center rounded-full text-paper-muted"
                                    >
                                        <Icon size={22} />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export { Header };
