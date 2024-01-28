export default function Navbar() {
  return (
    <nav className='flex justify-between items-center py-8 px-12 relative'>
      <div className="font-bold text-2xl">Wallaxy</div>
      <ul className="flex items-center gap-12 text-sm">
        <li>Shop</li>
        <li>About Us</li>
        <li>Contact Us</li>
      </ul>
      <div className='devider w-[90%] h-[1px] bg-white opacity-10 absolute bottom-0 left-1/2 -translate-x-1/2'></div>
    </nav>
  );
}
