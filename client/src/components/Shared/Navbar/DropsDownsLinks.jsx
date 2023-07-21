import { nanoid } from "@reduxjs/toolkit";
import { useState } from "react";
import { Link } from "react-router-dom";
import { links } from "./DropLink";

const DropsDownsLinks = () => {
  const [heading, setHeading] = useState("");
  const [subHeading, setSubHeading] = useState("");

  return (
    <>
      {links.map(link => (
        <div key={nanoid()}>
          <div className='px-0 text-left md:cursor-pointer group'>
            <h1
              className='py-0 flex justify-between items-center md:pr-0 pr-5 group'
              onClick={() => {
                heading !== link.name ? setHeading(link.name) : setHeading("");
                setSubHeading("");
              }}>
              {link.name}
              <span className='text-xl md:hidden inline'>
                <ion-icon
                  name={`${
                    heading === link.name ? "chevron-up" : "chevron-down"
                  }`}></ion-icon>
              </span>
              <span className='text-xl md:mt-1 md:ml-2  md:block hidden group-hover:rotate-180 group-hover:-mt-2'>
                <ion-icon name='chevron-down'></ion-icon>
              </span>
            </h1>
            {link.submenu && (
              <div>
                <div className='absolute top-20 hidden group-hover:md:block hover:md:block'>
                  <div className='py-3'>
                    <div
                      className='w-4 h-4 left-3 absolute
                    mt-1 bg-white rotate-45'></div>
                  </div>
                  <div className='bg-white p-5 grid grid-cols-3 gap-10'>
                    {link.sublinks.map(mysublinks => (
                      <div key={nanoid()}>
                        <h1 className='text-lg font-semibold'>
                          {mysublinks.Head}
                        </h1>
                        {mysublinks.sublink.map(slink => (
                          <li
                            key={nanoid()}
                            className='text-sm text-gray-600 my-2.5'>
                            <Link
                              to={slink.link}
                              className='hover:text-primary'>
                              {slink.name}
                            </Link>
                          </li>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* Mobile menus */}
          <div
            className={`
            ${heading === link.name ? "md:hidden" : "hidden"}
          `}>
            {/* sublinks */}
            {link.sublinks.map(slinks => (
              <div key={nanoid()}>
                <div>
                  <h1
                    onClick={() =>
                      subHeading !== slinks.Head
                        ? setSubHeading(slinks.Head)
                        : setSubHeading("")
                    }
                    className='py-4 pl-7 font-semibold md:pr-0 pr-5 flex justify-between items-center md:pe-0 pe-5'>
                    {slinks.Head}

                    <span className='text-xl md:mt-1 md:ml-2 inline'>
                      <ion-icon
                        name={`${
                          subHeading === slinks.Head
                            ? "chevron-up"
                            : "chevron-down"
                        }`}></ion-icon>
                    </span>
                  </h1>
                  <div
                    className={`${
                      subHeading === slinks.Head ? "md:hidden" : "hidden"
                    }`}>
                    {slinks.sublink.map(slink => (
                      <li key={nanoid()} className='py-3 pl-14'>
                        <Link to={slink.link}>{slink.name}</Link>
                      </li>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default DropsDownsLinks;
