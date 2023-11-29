import { useEffect, useRef, useState } from "react";


// todo : export useRef ไปใช้ที่หน้าอื่น เพื่อเวลาเปลี่ยน state หน้า เส้นด้านล่างก็จะทำงานด้วย
export let activeTabLineRef;
export let ActiveTabRef;

// todo : รับ route มาจาก home.jsx
const InPageNavigation = ({
  routes,
  defaultActiveIndex = 0,
  defaultHidden = [],
  children,
}) => {

  let [inPageNavIndex, setInPageNavIndex] = useState(defaultActiveIndex);
  activeTabLineRef = useRef();
  ActiveTabRef = useRef();

  //todo : เปลี่ยน state หน้าตามที่คลิก แล้วเปลี่ยนเส้นด้านล่างตัวอักษร
  const changePageState = (btn, i) => {
    let { offsetWidth, offsetLeft } = btn;
    activeTabLineRef.current.style.width = offsetWidth + "px";
    activeTabLineRef.current.style.left = offsetLeft + "px";
    setInPageNavIndex(i);
  };

  useEffect(() => {
    changePageState(ActiveTabRef.current, defaultActiveIndex);
  }, []);

  return (
    <>
      <div className="relative  mb-8 bg-white w-full border-b border-grey flex flex-nowrap overflow-x-auto">
        {/* //todo : map route ที่ถูกส่งมาจาก home.jsx */}
        {routes.map((route, i) => (
          <button
            key={i}
            ref={i == defaultActiveIndex ? ActiveTabRef : null}
            className={`p-4 px-5 capitalize" + ${ inPageNavIndex == i ? "text-black" : "text-dark-grey"} ${defaultHidden.includes(route) ? "md:hidden" : ""}`}
            onClick={(e) => {
              changePageState(e.target, i);
            }}
          >
            {route}
          </button>
        ))}
        {/* //todo : change เส้นด้านล่างตาม state หน้า */}
        <hr ref={activeTabLineRef} className="absolute bottom-0 duration-300" />
      </div>
      {Array.isArray(children) ? children[inPageNavIndex] : children}
    </>
  );
};

export default InPageNavigation;
