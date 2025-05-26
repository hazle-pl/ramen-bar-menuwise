import Link from "next/link";
import Image from "next/image";

const Sidebar = () => {
  const handleLogout = () => {
    localStorage.removeItem("admin-session");
    window.location.reload();
  };

  return (
    <aside className="admin-sidebar">
        <Link href="/"><Image className="logo" width={100} height={50} alt={'Hazle logotyp'} src="/assets/logo-hazle-white.png"/></Link>
      <nav>
        <ul>
          <li>
            <Link href="/admin/"><i className="fa-solid fa-grip-vertical"/>Dashboard</Link>
          </li>
          <li>
            <Link href="/admin/messages"><i className="fa-solid fa-envelope"></i>Wiadomości</Link>
          </li>
          <li>
            <Link href="/admin/blog"><i className="fa-solid fa-list"></i>Blog</Link>
          </li>
        </ul>
      </nav>
      <button onClick={handleLogout}>Wyloguj</button>
    </aside>
  );
};

export default Sidebar;
