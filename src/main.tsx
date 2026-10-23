import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { MotionConfig } from 'motion/react';

import '@fontsource-variable/geist';
import '@fontsource-variable/archivo/wdth.css';

import { Router } from '@utils';

import './index.css';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        {/* "user" drops transform animations for reduced-motion users, keeps opacity */}
        <MotionConfig reducedMotion="user">
            <Router />
        </MotionConfig>
    </StrictMode>
);
