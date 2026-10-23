import {
    AvalancheBrand,
    BlockchainFuturist,
    ETHTorontoLogo,
    ETHWomenLogo,
    HawkHacksBrand,
    LCSLogo,
    NEARTorontoBrand,
    SPURBrand,
    WaterlooBlockchain,
} from '@assets';

interface Partner {
    name: string;
    website: string;
    logo: string;
    // Tailwind height class; square marks need more height than wordmarks to read at the same weight
    size: string;
    // How the logo is pushed to monochrome:
    // flatten: single-colour art on transparency, rendered solid white
    // invert: sticker art with a white outline, which inverts away against the dark background
    // gray: badge marks that already read on dark
    tone: 'flatten' | 'invert' | 'gray';
}

const partners: Partner[] = [
    { name: 'HawkHacks', website: 'https://hawkhacks.ca', logo: HawkHacksBrand, size: 'h-8', tone: 'flatten' },
    { name: 'Avalanche', website: 'https://www.avax.network', logo: AvalancheBrand, size: 'h-6', tone: 'flatten' },
    { name: 'NEAR Toronto', website: 'https://near.org', logo: NEARTorontoBrand, size: 'h-11', tone: 'flatten' },
    { name: 'SPUR Innovation Centre', website: 'https://spurinnovation.com', logo: SPURBrand, size: 'h-11', tone: 'flatten' },
    { name: 'Laurier Computing Society', website: 'https://lauriercs.ca', logo: LCSLogo, size: 'h-12', tone: 'gray' },
    { name: 'Waterloo Blockchain', website: 'https://www.waterlooblockchain.ca/', logo: WaterlooBlockchain, size: 'h-10', tone: 'flatten' },
    { name: 'Blockchain Futurist', website: 'https://www.futuristconference.com/', logo: BlockchainFuturist, size: 'h-11', tone: 'invert' },
    { name: 'ETH Toronto', website: 'https://www.ethtoronto.ca', logo: ETHTorontoLogo, size: 'h-14', tone: 'flatten' },
    { name: 'ETH Women', website: 'https://ethwomen.com', logo: ETHWomenLogo, size: 'h-10', tone: 'flatten' },
];

const toneClass: Record<Partner['tone'], string> = {
    flatten: 'brightness-0 invert',
    invert: 'grayscale invert',
    gray: 'grayscale',
};

const LogoRow = ({ hidden = false }: { hidden?: boolean }) => (
    <ul
        aria-hidden={hidden || undefined}
        className="flex shrink-0 items-center gap-16 pr-16 motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-y-10 motion-reduce:pr-0 md:gap-24 md:pr-24"
    >
        {partners.map((partner) => (
            <li key={partner.name} className="shrink-0">
                <a
                    href={partner.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    tabIndex={hidden ? -1 : undefined}
                    className="group block rounded-md"
                >
                    <img
                        src={partner.logo}
                        alt={hidden ? '' : partner.name}
                        loading="lazy"
                        decoding="async"
                        className={`${partner.size} w-auto object-contain opacity-55 transition-opacity duration-200 group-hover:opacity-100 ${toneClass[partner.tone]}`}
                    />
                </a>
            </li>
        ))}
    </ul>
);

const Partners = () => {
    return (
        <section id="partners" aria-labelledby="partners-heading" className="border-y border-ink-line py-14 md:py-16">
            <h2 id="partners-heading" className="mx-auto max-w-page px-5 text-[15px] text-paper-muted md:px-8">
                Partners and communities we’ve worked with
            </h2>

            {/* Two identical rows translate by -50% for a seamless loop; hovering pauses so logos can be clicked */}
            <div className="group/marquee mt-10 overflow-hidden mask-x-from-85% mask-x-to-100%">
                <div className="flex w-max animate-[marquee_45s_linear_infinite] group-hover/marquee:[animation-play-state:paused] motion-reduce:w-auto motion-reduce:animate-none motion-reduce:justify-center motion-reduce:px-5">
                    <LogoRow />
                    <div className="contents motion-reduce:hidden">
                        <LogoRow hidden />
                    </div>
                </div>
            </div>
        </section>
    );
};

export { Partners };
