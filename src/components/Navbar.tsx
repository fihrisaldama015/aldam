function Navbar() {
  return (
    <nav className="py-4 sm:px-5 px-4 flex justify-between items-center">
      <div className="relative flex gap-4">
        <div className="red-1 absolute right-0 -bottom-[200px] bg-sky-600/20 w-[150px] h-[150px] rounded-full blur-2xl"></div>
        <h1 className="font-semibold text-[#1e293b]">fihrisaldama.com</h1>
      </div>
      <div className="blue-container relative">
        <p className="kelas m-0 text-base font-semibold"></p>
        <hr />
      </div>
    </nav>
  );
}

export default Navbar;
