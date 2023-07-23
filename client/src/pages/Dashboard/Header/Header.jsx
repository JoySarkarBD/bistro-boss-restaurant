import { AiOutlineMenuFold } from "react-icons/ai";
import { Link } from "react-router-dom";

// import Logo from "";
import logoDark from "./../../../assets/logo-dark.png";
import DarkModeSwitcher from "./../DarkModeSwitcher/DarkModeSwitcher";
import DropdownUser from "./../DropdownUser/DropdownUser";

const Header = ({
  // eslint-disable-next-line react/prop-types
  sidebarOpen,
  // eslint-disable-next-line react/prop-types
  setSidebarOpen,
}) => {
  return (
    <header className='sticky top-0 bg-white shadow-lg flex w-full drop-shadow-1 dark:bg-boxDark dark:drop-shadow-none z-[1]'>
      <div className='flex flex-grow items-center justify-between py-4 px-4 shadow-2 md:px-6 2xl:px-11'>
        <div className='flex items-center gap-2 sm:gap-4 lg:hidden'>
          {/* <!-- Hamburger Toggle BTN --> */}
          <button
            aria-controls='sidebar'
            onClick={e => {
              e.stopPropagation();
              setSidebarOpen(!sidebarOpen);
            }}
            className='block rounded-sm border p-1.5 shadow-sm border-slate-400 dark:border-strokedark dark:bg-boxDark lg:hidden'>
            <span className='relative block h-5 w-5.5 cursor-pointer'>
              <AiOutlineMenuFold
                className={`relative top-0 left-0 my-1 block h-5 w-0 rounded-sm text-black  delay-[0] duration-200 ease-in-out dark:text-slate-300 ${
                  !sidebarOpen && "!w-full delay-300"
                }`}
              />
            </span>
          </button>
          {/* <!-- Hamburger Toggle BTN --> */}

          <Link className='block flex-shrink-0 lg:hidden' to='/'>
            <div className='flex items-center gap-4'>
              <img src={logoDark} alt='Logo' />
            </div>
          </Link>
        </div>

        <div className='hidden sm:block'>
          <form>
            <div className='relative'>
              <button className='absolute top-1/2 left-0 -translate-y-1/2'>
                <svg
                  className='fill-body hover:fill-primary dark:fill-bodyDark dark:hover:fill-primary'
                  width='20'
                  height='20'
                  viewBox='0 0 20 20'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'>
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M9.16666 3.33332C5.945 3.33332 3.33332 5.945 3.33332 9.16666C3.33332 12.3883 5.945 15 9.16666 15C12.3883 15 15 12.3883 15 9.16666C15 5.945 12.3883 3.33332 9.16666 3.33332ZM1.66666 9.16666C1.66666 5.02452 5.02452 1.66666 9.16666 1.66666C13.3088 1.66666 16.6667 5.02452 16.6667 9.16666C16.6667 13.3088 13.3088 16.6667 9.16666 16.6667C5.02452 16.6667 1.66666 13.3088 1.66666 9.16666Z'
                    fill=''
                  />
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M13.2857 13.2857C13.6112 12.9603 14.1388 12.9603 14.4642 13.2857L18.0892 16.9107C18.4147 17.2362 18.4147 17.7638 18.0892 18.0892C17.7638 18.4147 17.2362 18.4147 16.9107 18.0892L13.2857 14.4642C12.9603 14.1388 12.9603 13.6112 13.2857 13.2857Z'
                    fill=''
                  />
                </svg>
              </button>

              <input
                type='text'
                placeholder='Type to search...'
                className='w-full text-black bg-transparent pr-4 pl-9 focus:outline-none dark:text-white'
              />
            </div>
          </form>
        </div>
        <div className='flex items-center gap-3 lg:gap-7'>
          <ul className='flex items-center gap-2 lg:gap-4'>
            <DarkModeSwitcher />
          </ul>

          {/* <!-- User Area --> */}
          <DropdownUser />
          {/* <!-- User Area --> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
