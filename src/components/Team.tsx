import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, X } from '@phosphor-icons/react';
import { Aidan, Amir, Arnav, Colman, Jackie, Juan, Max, Mobi, Nausher, Nish, Shakib, Vincenzo } from '@assets';
import { Reveal } from './Reveal';

interface TeamMember {
    name: string;
    title: string;
    image: string;
    linkedin?: string;
    website?: string;
    bio?: string;
}

const teamMembers: TeamMember[] = [
    {
        name: 'Nausher Rao',
        title: 'Chief Executive Officer',
        image: Nausher,
        linkedin: 'https://www.linkedin.com/in/nausherrao/',
        website: 'http://sherrao.tech/',
    },
    {
        name: 'Arnav Chauhan',
        title: 'Chief Operating Officer',
        image: Arnav,
        linkedin: 'https://www.linkedin.com/in/arnavchauhan/',
        bio: "Hi, I'm Arnav! A business and computer science student with a passion for sales, finance, & entrepreneurship.",
    },
    {
        name: 'Maximus Ghosh',
        title: 'Chief Finance Officer',
        image: Max,
        linkedin: 'https://www.linkedin.com/in/maximus-ghosh-b7234b237/',
        bio: "Hey, I'm Maximus! I'm a CS student with a designer's heart. I love blending my passion for tech and art, and continuously work to build projects that are functional and captivating.",
    },
    {
        name: 'Vincenzo Milano',
        title: 'Chief Strategy Officer',
        image: Vincenzo,
        linkedin: 'https://www.linkedin.com/in/vincenzo-milano/',
        website: 'https://vincenzomilano.tech',
        bio: "Hey, I'm Vincenzo! I'm passionate about building computers and exploring innovative technology. Currently, I'm pursuing a double degree in Business and Computer Science, blending technical expertise with strategic thinking.",
    },
    {
        name: 'Nish Tewari',
        title: 'Chief Admin Officer',
        image: Nish,
        linkedin: 'https://www.linkedin.com/in/nish-tewari/',
    },
    {
        name: 'Shakib Ahmed',
        title: 'Chief Admin Officer',
        image: Shakib,
        linkedin: 'https://www.linkedin.com/in/shakib-ahmed/',
        website: 'https://shakibdotme.wordpress.com',
    },
    {
        name: 'Amir Agassi',
        title: 'VP Engineering',
        image: Amir,
        linkedin: 'https://www.linkedin.com/in/amir-agassi/',
        website: 'https://amiragassi.com',
        bio: 'Tech nerd, hardware enthusiast, and always looking for the next exciting project to dive into!',
    },
    {
        name: 'Juan Wu',
        title: 'VP Engineering',
        image: Juan,
        linkedin: 'https://www.linkedin.com/in/juancwu/',
        website: 'https://juancwu.dev',
        bio: 'Hey, I am Juan. I am CS student at Wilfrid Laurier and also a VP of Engineer at Konfer. I love to code and also tinker with hardware.',
    },
    {
        name: 'Aidan Traboulay',
        title: 'VP Engineering',
        image: Aidan,
        linkedin: 'https://linkedin.com/in/aidan-traboulay',
        website: 'https://aidantraboulay.dev',
        bio: "Yo big dawg! I'm Aidan, a software engineer and wannabe project manager.",
    },
    {
        name: 'Jacqueline Truong',
        title: 'Chief Creative Officer',
        image: Jackie,
        linkedin: 'https://www.linkedin.com/in/jacquellinetruong/',
        website: 'https://jacquelinetruong.dev/',
        bio: "Hi! I'm Jacqueline, a computer science student and designer with a knack for bringing creativity to life. Whether it's crafting digital experiences or turning everyday ideas into art, I'm all about making the world a little more eye-catching.",
    },
    {
        name: 'Colman Tsang',
        title: 'UX/UI Designer',
        image: Colman,
        linkedin: 'https://www.linkedin.com/in/colman-tsang/',
        bio: "Hey, I'm Colman! I enjoy designing digital products with a purpose, In the past I've designed in a variety of industries. In my free time I enjoy skiing, playing tennis, and fishing :).",
    },
    {
        name: 'Mobina Tooranisama',
        title: 'Social Media Coordinator',
        image: Mobi,
        linkedin: 'https://www.linkedin.com/in/mobina-tooranisama/',
        bio: "Hey! I'm Mobina, I'm 22 and have recently graduated from Wilfrid Laurier University with a Bachelor of Science with a major in Computer Science. I am the Social Media Coordinator here at Konfer!",
    },
];

const MemberDialog = ({ member, onClose }: { member: TeamMember | null; onClose: () => void }) => {
    const ref = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        const dialog = ref.current;
        if (!dialog) return;
        if (member && !dialog.open) dialog.showModal();
        if (!member && dialog.open) dialog.close();
    }, [member]);

    return (
        <dialog
            ref={ref}
            onClose={onClose}
            onClick={(e) => {
                // Clicks on the backdrop land on the dialog element itself
                if (e.target === e.currentTarget) onClose();
            }}
            aria-labelledby="member-name"
            className="member-dialog m-auto w-[min(40rem,calc(100vw-2.5rem))] overflow-hidden rounded-2xl border border-ink-line bg-ink-raised p-0 text-paper"
        >
            {member && (
                <div className="grid sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
                    <img
                        src={member.image}
                        alt=""
                        className="aspect-[4/3] w-full object-cover object-[50%_25%] sm:aspect-auto sm:h-full"
                    />
                    <div className="relative flex flex-col p-6 sm:p-8">
                        <button
                            type="button"
                            onClick={onClose}
                            aria-label="Close"
                            className="absolute right-3 top-3 grid size-10 place-items-center rounded-full text-paper-muted transition-colors hover:bg-white/5 hover:text-paper"
                        >
                            <X size={20} />
                        </button>
                        <h3 id="member-name" className="font-display pr-10 text-2xl font-semibold tracking-tight">
                            {member.name}
                        </h3>
                        <p className="mt-1 text-[15px] text-azure-soft">{member.title}</p>
                        <p className="mt-5 leading-relaxed text-paper-muted">
                            {member.bio || 'This person was lazy and will add a bio later!'}
                        </p>
                        <div className="mt-auto flex flex-wrap gap-2 pt-6">
                            {member.linkedin && (
                                <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-ghost h-10 px-4 text-sm">
                                    LinkedIn <ArrowUpRight size={14} aria-hidden="true" />
                                </a>
                            )}
                            {member.website && (
                                <a href={member.website} target="_blank" rel="noopener noreferrer" className="btn btn-ghost h-10 px-4 text-sm">
                                    Website <ArrowUpRight size={14} aria-hidden="true" />
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </dialog>
    );
};

const Team = () => {
    const [selected, setSelected] = useState<TeamMember | null>(null);

    return (
        <section id="team" aria-labelledby="team-heading" className="mx-auto max-w-page px-5 py-24 md:px-8 md:py-32">
            <Reveal>
                <h2 id="team-heading" className="font-display text-5xl font-bold tracking-tight md:text-6xl">
                    Our team
                </h2>
                <p className="mt-4 max-w-[48ch] text-lg text-paper-muted">
                    The people who plan, staff and run every Konfer event.
                </p>
            </Reveal>

            <ul className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 md:mt-16 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-6">
                {teamMembers.map((member, i) => (
                    <Reveal as="li" key={member.name} delay={(i % 4) * 0.05}>
                        <button
                            type="button"
                            onClick={() => setSelected(member)}
                            aria-haspopup="dialog"
                            className="group block w-full rounded-xl text-left"
                        >
                            <span className="block overflow-hidden rounded-xl bg-ink-raised">
                                <img
                                    src={member.image}
                                    alt=""
                                    loading="lazy"
                                    decoding="async"
                                    className="aspect-[4/5] w-full object-cover grayscale-[35%] transition-[scale,filter] duration-300 ease-out group-hover:scale-[1.03] group-hover:grayscale-0"
                                />
                            </span>
                            <span className="mt-4 block text-lg font-medium leading-snug">{member.name}</span>
                            <span className="mt-0.5 block text-[15px] text-paper-muted">{member.title}</span>
                        </button>
                    </Reveal>
                ))}
            </ul>

            <MemberDialog member={selected} onClose={() => setSelected(null)} />
        </section>
    );
};

export { Team };
