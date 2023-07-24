import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const DashboardLoader = () => {
  return (
    <div className="dark:bg-boxDark-2 dark:text-bodyDark">
      {/* <!-- ===== Page Wrapper Start ===== --> */}
      <div className="flex h-screen overflow-hidden">
        {/* <!-- ===== Sidebar Start ===== --> */}
        <aside
          className="absolute left-0 top-0 z-10 flex h-screen w-72 flex-col overflow-y-hidden 
      
          dark:bg-boxDark shadow-lg duration-300 ease-linear  lg:static lg:translate-x-0 "
        >
          {/* <!-- SIDEBAR HEADER --> */}
          <div className="px-6 py-6 lg:py-6">
            <div className="">
              <h3>
                <Skeleton count={1} height="56px" />
              </h3>
            </div>
          </div>
          {/* <!-- SIDEBAR HEADER --> */}

          <div className="sidebar-head">
            {/* <!-- Sidebar Menu --> */}
            <nav className="sidebar-nav">
              {/* <!-- Menu Group --> */}
              <div>
                <ul className="mb-6 flex flex-col gap-1.5">
                  {/* <!-- Dashboard submenu --> */}
                  <li>
                      <Skeleton count={15} height="40px" />
                  </li>
                </ul>
              </div>
            </nav>
            {/* <!-- Sidebar Menu --> */}
          </div>
        </aside>
        {/* <!-- ===== Sidebar End ===== --> */}

        {/* <!-- ===== Content Area Start ===== --> */}
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          {/* <!-- ===== Header Start ===== --> */}
          <div className="py-4 bg-white shadow-lg flex gap-x-5 px-5">
            <Skeleton count={1} height="40px" containerClassName="flex-1" />
            <div className="w-10">
              <h2>
                <Skeleton
                  count={1}
                  circle
                  height="40px"
                  width="40px"
                  containerClassName="flex-1"
                />
              </h2>
            </div>
          </div>
          {/* <!-- ===== Header End ===== --> */}

          {/* <!-- ===== Main Content Start ===== --> */}
          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              {/* <h3>Content</h3> */}
            </div>
          </main>
          {/* <!-- ===== Main Content End ===== --> */}
        </div>
        {/* <!-- ===== Content Area End ===== --> */}
      </div>
      {/* <!-- ===== Page Wrapper End ===== --> */}
    </div>
  );
};

export default DashboardLoader;
