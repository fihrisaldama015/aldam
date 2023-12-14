import Image from "next/image";

function Highlight() {
  return (
    <div className="mt-8 mx-auto py-6 w-full flex flex-col items-center">
      <div className="flex flex-row gap-16 justify-center">
        <div className="px-8 text-center">
          <span className="font-bold text-4xl text-sky-600">2+</span>
          <p className="mt-4 max-w-[15ch] text-slate-600 text-sm">
            years of experience
          </p>
        </div>
        <div className="px-8 text-center">
          <span className="font-bold text-4xl text-sky-600">3+</span>
          <p className="mt-4 max-w-[15ch] text-slate-600 text-sm">
            projects completed yearly
          </p>
        </div>
      </div>
      <div className="my-16 flex flex-col items-center">
        <span className="flex gap-2 text-xl font-semibold">
          <Image src={"/icons/code.svg"} width={16} height={16} alt="code" />
          Skills
        </span>
        <div className="p-8 mt-8 flex gap-3 justify-center flex-wrap">
          {SKILLS.map((skill: Skill, id: number) => (
            <div
              key={id}
              className="py-4 px-8 rounded-full shadow-md shadow-slate-100 hover:shadow-slate-600/10 bg-white flex gap-2 items-center transition-all cursor-pointer"
            >
              <Image
                src={skill.img}
                width={100}
                height={100}
                className="h-[32px] w-auto"
                alt="gcp"
              />
              <span className="text-base font-semibold text-slate-800">
                {skill.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Highlight;

type Skill = {
  img: string;
  name: string;
};

const SKILLS: Skill[] = [
  {
    img: "/icons/gcp.svg",
    name: "Google Cloud Platform",
  },
  {
    img: "/icons/Next.js.svg",
    name: "Next.js",
  },
  {
    img: "/icons/tailwind.png",
    name: "Tailwind CSS",
  },
  {
    img: "/icons/react.svg",
    name: "React.js",
  },
  {
    img: "/icons/php.svg",
    name: "PHP",
  },
  {
    img: "/icons/js.svg",
    name: "JavaScript",
  },
  {
    img: "/icons/html.svg",
    name: "HTML",
  },
  {
    img: "/icons/css.svg",
    name: "CSS",
  },
  {
    img: "/icons/codeigniter.svg",
    name: "CodeIgniter",
  },
  {
    img: "/icons/mysql.svg",
    name: "MySQL",
  },
  {
    img: "/icons/WordPress.com.svg",
    name: "WordPress",
  },
  {
    img: "/icons/figma.svg",
    name: "Figma",
  },
  {
    img: "/icons/mongodb.svg",
    name: "MongoDB",
  },
  {
    img: "/icons/typescript.svg",
    name: "TypeScript",
  },
  {
    img: "/icons/express.svg",
    name: "Express.js",
  },
  {
    img: "/icons/node-js.svg",
    name: "Node.js",
  },
  {
    img: "/icons/vercel.svg",
    name: "Vercel",
  },
  {
    img: "/icons/firebase.svg",
    name: "Firebase",
  },
  {
    img: "/icons/docker.svg",
    name: "Docker",
  },
  {
    img: "/icons/github.svg",
    name: "GitHub",
  },
];
