import { XLogo, InstagramLogo, LinkedinLogo } from '@phosphor-icons/react';

const CONTACT_EMAIL = 'hello@konfer.ca';
const CONTACT_HREF = `mailto:${CONTACT_EMAIL}`;

// Section anchors are kept stable from the previous site for existing links
const NAV_LINKS = [
    { label: 'Partners', href: '#partners' },
    { label: 'Our Work', href: '#featured' },
    { label: 'About Us', href: '#about-us' },
    { label: 'Team', href: '#team' },
];

const SOCIAL_LINKS = [
    { label: 'Konfer on X', href: 'https://x.com/Konferca', Icon: XLogo },
    { label: 'Konfer on Instagram', href: 'https://instagram.com/konfer.ca/', Icon: InstagramLogo },
    { label: 'Konfer on LinkedIn', href: 'https://linkedin.com/company/konferca/', Icon: LinkedinLogo },
];

export { CONTACT_EMAIL, CONTACT_HREF, NAV_LINKS, SOCIAL_LINKS };
