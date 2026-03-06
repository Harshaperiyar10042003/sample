import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import heroImg from "../assets/img/hero_1.png";

const Hero = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="pt-5 md:pt-24 pb-1 md:pb-12 relative w-full min-h-[80vh] overflow-hidden">


      {/* CONTENT */}
      <div
        className={`relative z-10 max-w-3xl px-6 pt-28 md:pt-20 md:pl-20
        text-center md:text-left transition-all duration-1000 ${
          show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <span className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-700 text-sm px-4 py-1 rounded-full mb-6">
          ⭐ For your Future
        </span>

        <h1 className="text-[34px] md:text-[56px] font-extrabold leading-tight mb-6 text-gray-900">
          Transforming <span className="text-yellow-500">Learning</span>
          <br />
          Building <span className="text-blue-600">Careers</span>
        </h1>

        <p className="text-gray-700 max-w-xl mx-auto md:mx-0 mb-10 text-base md:text-lg">
          From classroom to career, equipping tomorrow’s leaders with{" "}
          <span className="font-semibold text-yellow-600">
            essential industry skills
          </span>{" "}
          and real-world experience.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center md:justify-start">
          <button
            onClick={() => navigate("/courses")}
            className="bg-blue-600 hover:bg-blue-700 hover:scale-105 transition-all duration-300 text-white px-7 py-3 rounded-full font-medium shadow-md"
          >
            Explore Courses →
          </button>

          <button
            onClick={() =>
              document.getElementById("about")?.scrollIntoView({
                behavior: "smooth",
              })
            }
            className="bg-white hover:bg-gray-100 px-7 py-3 rounded-full font-medium shadow-sm"
          >
            Learn More →
          </button>
        </div>
      </div>

      {/* HERO IMAGE – 4 PART CUBE */}
      <div
  className="
    relative mt-12
    md:absolute md:top-20 md:right-[-2%]
    w-full md:w-[60%]
    flex justify-center
  "
>

        <div className="grid grid-cols-2 gap-3 md:gap-8">

          <div
            className="cube-tile animate-float1"
            style={{
              backgroundImage: `url(${heroImg})`,
              backgroundPosition: "0% 0%",
            }}
          />

          <div
            className="cube-tile animate-float2"
            style={{
              backgroundImage: `url(${heroImg})`,
              backgroundPosition: "100% 0%",
            }}
          />

          <div
            className="cube-tile animate-float3"
            style={{
              backgroundImage: `url(${heroImg})`,
              backgroundPosition: "0% 100%",
            }}
          />

          <div
            className="cube-tile animate-float4"
            style={{
              backgroundImage: `url(${heroImg})`,
              backgroundPosition: "100% 100%",
            }}
          />

        </div>
      </div>

      {/* STYLES */}
      <style>{`
        .cube-tile {
          width: 370px;
          height: 230px;
          border-radius: 26px;
          background-size: 740px 460px;
          background-repeat: no-repeat;
          box-shadow:
            0 0px 0px rgba(0,0,0,0.18),
            inset 0 0 0 1px rgba(255,255,255,0.45);
        }

        @media (max-width: 640px) {
          .cube-tile {
            width: 140px;
            height: 90px;
            border-radius: 14px;
            background-size: 280px 180px;
          }
        }

        @keyframes float1 {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-14px); }
        }
        @keyframes float2 {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes float3 {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        @keyframes float4 {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-18px); }
        }

        .animate-float1 { animation: float1 6s ease-in-out infinite; }
        .animate-float2 { animation: float2 7s ease-in-out infinite; }
        .animate-float3 { animation: float3 6.5s ease-in-out infinite; }
        .animate-float4 { animation: float4 7.5s ease-in-out infinite; }
      `}</style>

    </section>
  );
};

export default Hero;
