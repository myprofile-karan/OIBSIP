const Header = () => {
  
    const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <header className="flex justify-between bg-gradient-to-br from-purple-700 font-serif to-blue-700 py-4 px-10">
    <h1 className="text-white text-3xl font-bold text-center">POSTS</h1>
    <button
      onClick={handleLogout}
      className="px-6 text-white bg-blue-900 rounded-lg"
    >
      Logout
    </button>
  </header>
  );
};

export default Header;
