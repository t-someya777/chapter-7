import { Outlet, NavLink } from "react-router-dom";

export default function Header() {
  return (
    <>
      <header>
        <ul  className="px-8 bg-gray-800 h-20 flex justify-between items-center">
          <li><NavLink className='text-white font-bold' to='/'>Blog</NavLink></li>
          <li><NavLink className='text-white font-bold' to='/contact'>お問合せ</NavLink></li>
        </ul>
      </header>
      <Outlet />
    </>
  )
}