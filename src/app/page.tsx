import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin, Users, Globe, Award } from "lucide-react";

const Countdown = dynamic(() => import("@/components/countdown"), {
  ssr: false,
});

export default function Home() {
  const committees = [
    {
      name: "DISEC",
      message:
        "Discussing the use of Private Military and Security Companies (PMSCs) and their role in Modern Conflict",
    },
    {
      name: "UNHRC",
      message:
        "Human Rights Violations in Counter-Terrorism Operations with Special Emphasis on Syria and Afghanistan.",
    },
    {
      name: "WHO",
      message:
        "Commercial Determinants of Health - Decoding addictive behaviours, predatory commercial practices and their impact on human wellbeing.",
    },
    {
      name: "UNOOSA",
      message:
        "Ethical Considerations and Regulatory Frameworks for Space Exploration and Sustainable Development",
    },
    {
      name: "Lok Sabha",
      message: "Waqf Amendment Bill 2024",
    },
    {
      name: "Historical Crisis Committee",
      message:
        "Yemen Civil War: Freeze Date: March 25, 2015; (A day before the Saudi-led coalition began military airstrikes in Yemen)",
    },
    {
      name: "Press Corps",
      message:
        "The Impact of Media Bias on Public Perception and its Role in Shaping Political and Social Narratives.",
    },
    {
      name: "Internationl Press",
      message: "No Agenda",
    },
  ];

  return (
    <main className="w-full flex flex-col items-center justify-start min-h-screen bg-gradient-to-b from-black to-gray-900 text-white">
      <section className="w-full max-w-7xl px-4 lg:px-48 py-16 sm:py-24">
        <div className="flex flex-col lg:flex-row items-center gap-16 justify-between">
          <div className="space-y-6 text-center lg:text-left lg:w-1/2">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-thin">
              SO<span className="font-bold text-red-600">MUN&apos;24</span>
            </h1>
            <p className="text-xl sm:text-2xl lg:text-3xl text-red-600 font-semibold">
              15th - 17th November
            </p>
            <p className="text-lg sm:text-xl text-gray-300">
              Shaping the Future, One Debate at a Time
            </p>
            <div className="space-y-4 sm:space-y-0 sm:space-x-4 flex flex-col sm:flex-row justify-center lg:justify-start">
              <Link href="/register">
                <Button
                  size="lg"
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  Register Now
                </Button>
              </Link>
              <Link href="/our-team">
                <Button size="lg" variant="outline" className="border-2">
                  Meet Our Team
                </Button>
              </Link>
            </div>
          </div>
          <div className="w-full max-w-sm lg:w-1/2 lg:max-w-md">
            <Image
              src="/logos/SOMUN Logo (Red, Transparent BG).png"
              alt="SOMUN Logo"
              width={500}
              height={500}
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>

      <section className="w-full max-w-4xl px-4 mb-24">
        <h2 className="font-bold text-3xl sm:text-4xl lg:text-5xl mb-8 text-center text-red-600">
          Countdown to SOMUN 2024
        </h2>
        <div className="bg-gray-800 rounded-lg p-6 sm:p-8 shadow-lg">
          <Countdown />
        </div>
      </section>

      <section className="w-full px-4 py-16 bg-red-600">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-center">
            About SOMUN 2024
          </h2>
          <div className="grid md:grid-cols-2 gap-8 items-center lg:pl-11">
            <div>
              <p className="text-lg mb-4">
                Welcome to the 6th Edition of Silver Oaks Model United Nations!
              </p>
              <p className="text-lg mb-4">
                SOMUN&apos;24 is an exceptional platform designed for students
                to engage in dynamic, high-level debates, refine their public
                speaking abilities, and deepen their understanding of
                international relations. Over three days, participants will
                engage in intense negotiations, thought-provoking talks, and
                collaborative problem-solving.
              </p>
              <p className="text-lg mb-4">
                SOMUN&apos;24 also integrates exciting socials and fun
                activities, creating a balanced experience where delegates can
                connect, unwind, and enjoy a spirited atmosphere.
              </p>
              <p className="text-lg">
                Join us for the event to forge meaningful connections with
                like-minded peers and be part of a transformative experience
                that shapes future leaders!
              </p>
            </div>

            <div className="flex justify-center">
              <Image
                src="/logos/SOMUN Logo (Black, Transparent BG).png"
                alt="SOMUN Logo"
                width={300}
                height={300}
                className="max-w-xs"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="w-full px-4 py-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center">
            Conference Highlights
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center">
              <Calendar className="w-12 h-12 mb-4 text-red-600" />
              <h3 className="text-xl font-semibold mb-2">
                3 Days of Diplomacy
              </h3>
              <p>Engage in intense debates and negotiations</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <Users className="w-12 h-12 mb-4 text-red-600" />
              <h3 className="text-xl font-semibold mb-2">300+ Delegates</h3>
              <p>Network with peers from diverse backgrounds</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <Globe className="w-12 h-12 mb-4 text-red-600" />
              <h3 className="text-xl font-semibold mb-2">8 Committees</h3>
              <p>Address pressing global issues</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <Award className="w-12 h-12 mb-4 text-red-600" />
              <h3 className="text-xl font-semibold mb-2">Huge Rewards</h3>
              <p>Win exciting cash prizes and mementos</p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full px-4 py-16 bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center text-white">
            Committees
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {committees.map((committee) => (
              <div
                key={committee.name}
                className="bg-gray-700 rounded-lg p-6 text-center"
              >
                <h3 className="text-xl font-semibold mb-2 text-white">
                  {committee.name}
                </h3>
                <p className="text-gray-300">{committee.message}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full px-4 py-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-center">
            Venue
          </h2>
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="w-full md:w-1/2 h-72">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4908.172558010149!2d78.38153857607556!3d17.56899259754634!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb8d056effe5cb%3A0x853430af8f2f930c!2sSilver%20Oaks%20International%20School-%20Bowrampet%20Campus!5e1!3m2!1sen!2sin!4v1728297588894!5m2!1sen!2sin"
                className="w-full h-full rounded-lg"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="eager"
                referrerPolicy="no-referrer-when-downgrade"
                title="Event Location Map"
              ></iframe>
            </div>
            <div className="w-full md:w-1/2 text-center md:text-left">
              <h3 className="text-2xl font-semibold mb-4">
                Silver Oaks International School
              </h3>
              <p className="text-lg mb-4">
                Bowrampet Campus, Hyderabad, Telangana 500043
              </p>
              <Link
                href="https://maps.app.goo.gl/EsQtjG6wfggezZLu9"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center sm:justify-start"
              >
                <div className="flex items-center justify-center md:justify-start text-red-600 hover:text-red-300 transition-colors duration-200">
                  <MapPin className="w-6 h-6 mr-2" />

                  <span>Get Directions</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full px-4 py-16 bg-red-600">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Make Your Mark?
          </h2>
          <p className="text-xl mb-8">
            Join us at SOMUN&apos;24 and be part of shaping the future of global
            diplomacy.
          </p>
          <Link href="/register">
            <Button
              size="lg"
              className="bg-white text-red-600 hover:bg-gray-100"
            >
              Register Now
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
