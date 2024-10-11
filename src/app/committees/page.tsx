"use client";

import { useState } from "react";
import { ChevronRight, ChevronDown } from "lucide-react";
import Image from "next/image";

const committeesData = [
  {
    name: "DISEC",
    logo: "/Committee Logos/DISEC.png",
    agenda:
      "Discussing the use of Private Military and Security Companies (PMSCs) and their role in Modern Conflict",
    description:
      "The Disarmament and International Security Committee (DISEC) is the First Committee of the UN General Assembly, dealing with disarmament and international security matters.",
    docsLink:
      "https://1drv.ms/f/c/818b70d81da79c13/Ej7PkgLvkyVBn8_rw7d4E7ABXf0JD0zXIaVMR7KJeG2SHQ?e=zPvKIG",
    obfuscatedTitle: false,
  },
  {
    name: "UNHRC",
    logo: "/Committee Logos/UNHRC.png",
    agenda:
      "Human Rights Violations in Counter-Terrorism Operations with Special Emphasis on Syria and Afghanistan.",
    description:
      "The United Nations Human Rights Council (UNHRC) is responsible for promoting and protecting human rights around the world.",
    docsLink:
      "https://1drv.ms/f/c/818b70d81da79c13/EgeI_arv5FxKlvUvHxgoalwBJdpVO_Wp1HIweZDeZZGSOA?e=a5unvn",
    obfuscatedTitle: false,
  },
  {
    name: "WHO",
    logo: "/Committee Logos/WHO.png",
    agenda:
      "Commercial Determinants of Health - Decoding addictive behaviours, predatory commercial practices and their impact on human wellbeing.",
    description:
      "The World Health Organization (WHO) is a specialized agency of the United Nations responsible for international public health.",
    docsLink:
      "https://1drv.ms/f/c/818b70d81da79c13/EnKlcP5lN_5Fr5Etu9_EMQkBKy8iO-e4RhnHiLtT9Ws0jw?e=LPxPMK",
    obfuscatedTitle: false,
  },
  {
    name: "UNOOSA",
    logo: "/Committee Logos/UNOOSA.png",
    agenda:
      "Ethical Considerations and Regulatory Frameworks for Space Exploration and Sustainable Development",
    description:
      "The United Nations Office for Outer Space Affairs (UNOOSA) works to promote international cooperation in the peaceful use and exploration of space.",
    docsLink:
      "https://1drv.ms/f/c/818b70d81da79c13/Em4ag7lhRF9Om_jAAaKGJUcB46x9521q2rlwq82cxTccaA?e=J8w5pm",
    obfuscatedTitle: false,
  },
  {
    name: "Committee X",
    logo: "/Committee Logos/X.png",
    agenda: "**REDACTED**",
    description: "**REDACTED**",
    docsLink:
      "https://1drv.ms/f/c/818b70d81da79c13/EoZGIS85CaVKhu8b9HTbzZMBpQVerjBmc0KK7YJoOyN6Bw?e=dbaQa1",
    obfuscatedTitle: true,
  },
  {
    name: "Lok Sabha",
    logo: "/Committee Logos/LOK SABHA.png",
    agenda: "Waqf Amendment Bill 2024",
    description:
      "The Lok Sabha is the lower house of India's bicameral Parliament, representing and debating the interests of the Indian people.",
    docsLink:
      "https://1drv.ms/f/c/818b70d81da79c13/EkWgUhNQL-hLgtgHvM0jcqoBdbrkwVoOJRnYV77msGeYYg?e=zfuR3e",
    obfuscatedTitle: false,
  },
  {
    name: "Historical Crisis Committee",
    logo: "/Committee Logos/HCC.png",
    agenda:
      "Yemen Civil War: Freeze Date: March 25, 2015; (A day before the Saudi-led coalition began military airstrikes in Yemen)",
    description:
      "The Historical Crisis Committee simulates past events, allowing delegates to explore alternative outcomes and decision-making in historical contexts.",
    docsLink:
      "https://1drv.ms/f/c/818b70d81da79c13/EhmzSW99VthCi-2VbKbN47EB_dDLkHsurwopmgyj1q7Jkg?e=S1WXhc",
    obfuscatedTitle: false,
  },
  {
    name: "Press Corps",
    logo: "/Committee Logos/PRESS CORPS.png",
    agenda:
      "The Impact of Media Bias on Public Perception and its Role in Shaping Political and Social Narratives.",
    description:
      "The Press Corps simulates the role of journalists in international affairs, reporting on committee proceedings and global events.",
    docsLink:
      "https://1drv.ms/f/c/818b70d81da79c13/EmtaKfKgeHVGtqw36YE55jcB1Iw5WzP4KnCEsUlIkOf43A?e=CQk7Pv",
    obfuscatedTitle: false,
  },
  {
    name: "International Press",
    logo: "/Committee Logos/IP.png",
    agenda: "No Agenda",
    description:
      "The International Press simulates global media coverage, reporting on various committees and international events.",
    docsLink:
      "https://1drv.ms/f/c/818b70d81da79c13/EigfUARxYttBrqSuIcSx56sBt5qBfLTRV0nd59qQuntvpg?e=Zpn4ay",
    obfuscatedTitle: false,
  },
];

export default function Component() {
  const [expandedCommittees, setExpandedCommittees] = useState<
    Record<string, boolean>
  >({});

  const toggleCommittee = (name: string) => {
    setExpandedCommittees((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-black text-gray-200">
      <style jsx global>{`
        @keyframes obfuscate {
          0% {
            content: "!#$&*";
          }
          25% {
            content: "#%^&*)";
          }
          50% {
            content: "^()_";
          }
          75% {
            content: "*_!@#";
          }
          100% {
            content: ")_+!#";
          }
        }
        .obfuscated::before {
          content: attr(data-content);
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          color: #ff6b6b;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: monospace;
          font-weight: bold;
          animation: obfuscate 0.5s infinite;
          pointer-events: none;
        }
      `}</style>
      <h1 className="text-4xl font-bold mb-4 text-red-500">Committees</h1>
      <p className="mb-8 text-gray-300">
        For this year&apos;s edition of our MUN, we have chosen nine committees
        and agendas that are relevant to the present times and current affairs.
        Each simulation is designed to provide delegates and journalists with an
        enthralling and engaging experience.
      </p>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {committeesData.map((committee) => (
          <div
            key={committee.name}
            className="border border-gray-700 rounded-lg overflow-hidden shadow-md bg-gray-900 flex flex-col h-full"
          >
            <div className="p-4 flex-grow flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <Image
                  src={committee.logo}
                  height={128}
                  width={128}
                  alt={`${committee.name} logo`}
                />
                <h2 className="text-2xl font-bold text-red-400 relative">
                  <span
                    className={committee.obfuscatedTitle ? "opacity-0" : ""}
                  >
                    {committee.name}
                  </span>
                  {committee.obfuscatedTitle && (
                    <span
                      className="obfuscated absolute inset-0 flex items-center justify-center"
                      data-content={committee.name}
                    />
                  )}
                </h2>
              </div>
              <p className="text-sm mb-4 text-gray-400">
                {committee.description}
              </p>
              {expandedCommittees[committee.name] && (
                <p className="text-sm mb-4 mt-2 pt-2 border-t border-gray-700 text-gray-300">
                  <strong className="text-red-400">Agenda:</strong>{" "}
                  {committee.agenda}
                </p>
              )}
              <div className="mt-auto pt-4 flex justify-between items-center">
                <a
                  href={committee.docsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-500 hover:text-red-400 transition-colors"
                >
                  Docs
                </a>
                <button
                  onClick={() => toggleCommittee(committee.name)}
                  className="flex items-center text-gray-400 hover:text-gray-200 transition-colors"
                >
                  {expandedCommittees[committee.name] ? (
                    <>
                      <ChevronDown className="w-4 h-4 mr-1" />
                      Hide Agenda
                    </>
                  ) : (
                    <>
                      Show Agenda
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
