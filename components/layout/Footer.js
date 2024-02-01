export default function Footer() {
  return (
    <footer className='py-8 px-12 relative flex items-center justify-between'>
      <div className='devider w-[90%] h-[1px] bg-white opacity-10 absolute top-0 left-1/2 -translate-x-1/2'></div>
      <p className='copyright text-sm opacity-70'>
        2024 All rights reserved for Fjallraven
      </p>
      <ul className='links flex items-center gap-12 text-sm'>
        <li>Shop</li>
        <li>About Us</li>
        <li>Contact Us</li>
      </ul>
    </footer>
  );
}
