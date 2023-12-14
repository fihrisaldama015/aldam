import Image from "next/image";

function Hero() {
  return (
    <div className="min-h-[50vh] mt-12 mb-36 px-12 flex xl:flex-row flex-col justify-around items-center">
      <div className="flex flex-col gap-8">
        <div className="flex items-center">
          <h1 className="text-6xl">
            Hi, I'm <span className="font-bold text-sky-600">Aldam</span>
          </h1>
          <div
            className="ml-3 text-4xl"
            style={{ animation: "wave 2s linear infinite" }}
          >
            👋
          </div>
        </div>
        <p className="text-slate-700 tracking-wide max-w-md">
          An Informatics student with a passion for software development,
          experienced in developing front-end apps and back-end APIs with Cloud
          Computing. I am a fast learner and a team player who is eager to learn
          new things and always open to new opportunities.
        </p>
      </div>
      <div>
        <div className="elemenFoto relative bg-gradient-to-b from-[#0e749066] to-[#37415100] rounded-tl-full rounded-tr-full translate-y-8">
          <div className="social absolute w-full sm:w-fit flex sm:flex-col flex-row gap-4 [&>a]:p-3 items-center justify-center sm:top-0 bottom-0 sm:bottom-0 sm:-left-[100px] left-0">
            <a href="https://www.instagram.com/muhamadfihris/" target="_blank">
              <img
                src="/img/pngkey.com-instagram-png-775860.png"
                className="opacity-50 hover:opacity-100"
                alt=""
                width="24"
              />
            </a>
            <a href="https://github.com/fihrisaldama015/" target="_blank">
              <img src="/img/github.png" alt="" width="24" />
            </a>
            <a href="https://www.linkedin.com/in/fihrisaldama/" target="_blank">
              <img src="/img/linkedin.png" alt="" width="24" />
            </a>
          </div>
          <Image
            src="/img/foto.png"
            alt="profile-pic"
            width={1000}
            height={1000}
            className="hero-picture w-[300px] -translate-y-16"
            style={{ filter: "drop-shadow(0 0 1rem rgba(0, 0, 0, 0.25))" }}
          />
        </div>
        <div className="info relative flex flex-col justify-center items-center">
          <div className="red absolute -right-[100px] -top-[100px] bg-[#fca5a580] w-[150px] h-[150px] rounded-full blur-2xl"></div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
