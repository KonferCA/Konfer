import { motion } from 'motion/react';
import type { ReactNode } from 'react';

interface RevealProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    as?: 'div' | 'li';
}

/*
 *
 * @description Fades content up once as it enters the viewport.
 * Uses full transform strings so the animation stays on the compositor.
 *
 */
const Reveal = ({ children, className, delay = 0, as = 'div' }: RevealProps) => {
    const Component = as === 'li' ? motion.li : motion.div;

    return (
        <Component
            className={className}
            initial={{ opacity: 0, transform: 'translateY(20px)' }}
            whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay, ease: [0.23, 1, 0.32, 1] }}
        >
            {children}
        </Component>
    );
};

export { Reveal };
