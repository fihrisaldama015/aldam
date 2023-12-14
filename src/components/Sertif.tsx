function Sertif() {
  return (
    <div className="about my-2.5 sm:mx-5 mx-0 flex justify-center items-center">
      <div
        className="card mx-5 sm:p-16 p-4 text-center bg-white rounded-2xl"
        style={{ filter: "drop-shadow(0 0 0.875rem rgba(15, 23, 42, 0.05))" }}
      >
        <h3 className="mb-5 font-bold text-xl">Certificate</h3>
        <div className="container-sertif flex flex-col items-stretch gap-4">
          {sertif.map((item, id) => (
            <div
              key={id}
              className="sertif flex bg-[#f8fafc] rounded-2xl text-[#0f172a] text-left border border-[#0001] hover:bg-[#f4f4f4]"
            >
              <img
                src={item.img}
                className="rounded-2xl bg-cover"
                alt="progate"
              />
              <div className="sertif-detail p-4">
                <h5 className="mb-1 font-semibold text-sm">{item.name}</h5>
                <p className="text-xs font-normal">{item.issuer}</p>
                <div className="credential mt-4 py-1 px-4 border border-[#0005] hover:border-black rounded-2xl text-sm w-[180px] flex items-center justify-center transition-all">
                  <a
                    className="text-[#0f172a]"
                    href={item.credential}
                    target="_blank"
                  >
                    <span className="flex gap-2">
                      <p className="w-max">Show Credential</p>
                      <img src="/img/credential.svg" alt="arrow" />
                    </span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Sertif;

const sertif = [
  {
    name: "Git Fundamental",
    issuer: "Progate",
    credential: "https://progate.com/course_certificate/ddc975f1qzfeep",
    img: "/img/progate.jpeg",
  },
  {
    name: "Belajar Membuat Front-End Web untuk Pemula",
    issuer: "Dicoding Indonesia",
    credential: "https://www.dicoding.com/certificates/6RPNDN6D5Z2M",
    img: "/img/dicoding.jpeg",
  },
];
