import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900  to-[#111] text-white flex justify-center px-4 py-12 font-mono">
      <article className="prose prose-lg md:prose-xl prose-white max-w-5xl w-full">
        <header className="mb-12 text-center">
          <h1 className="text-3xl font-extrabold tracking-wide font-sans">
            About This Project
          </h1>
        </header>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-blue-400 hover:text-blue-600 transition-all">
            Why I Built This
          </h2>
          <p>
            I built this website to simulate how communication between Earth and
            Mars works. In real space missions, sending messages isn't
            instantaneous — it takes time due to the vast distance between the
            planets. Through this project, you can experience the challenges of
            communication across millions of kilometers in space.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-blue-400 hover:text-blue-600 transition-all">
            About Earth, Mars, and Space
          </h2>
          <p>
            Earth is our home planet, full of oceans, forests, and life. It
            orbits at an average distance of approximately 149.6 million
            kilometers from the Sun.
          </p>
          <p>
            Mars, often referred to as the "Red Planet," is located at an
            average distance of 227.9 million kilometers from the Sun. It is a
            cold, arid planet with the potential to have supported life in the
            past.
          </p>
          <p>
            The vastness of space, the nearly empty region between celestial
            bodies, makes the time taken for communication even more
            significant. Space is silent, mysterious, and seemingly infinite,
            and it provides a backdrop to every message sent across it.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-blue-400 hover:text-blue-600 transition-all">
            Message Delay Time
          </h2>
          <p>
            When Earth and Mars are closest (about 56 million kilometers apart),
            a message takes approximately 3 minutes to travel one-way.
          </p>
          <p>
            At their farthest (about 401 million kilometers apart), the delay
            can exceed 22 minutes for a one-way message.
          </p>
          <p>
            A simple "Hello" from Earth to Mars and back can take as long as 44
            minutes when the planets are at their most distant.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-blue-400 hover:text-blue-600 transition-all">
            The Goal
          </h2>
          <p>
            This project serves as a tribute to the patience, wonder, and
            engineering required for interplanetary communication. Whether you
            are on Earth or Mars, every message is significant and requires a
            reminder of how vast the universe truly is.
          </p>
        </section>
        <p className="text-center"><a href="/" className="text-blue-500">Click here</a> to go back to home</p>

        <footer className="pt-10 text-gray-400 text-sm text-center">
          Thank you for visiting.
        </footer>
      </article>
    </div>
  );
};

export default About;
