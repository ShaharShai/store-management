import { Link } from "react-router-dom";

function Navbar() {
  return (
    <>

      <nav className="bg-gray-800">
        <div className="relative flex h-16 items-center justify-between p-5">

          <Link to={"/"} className="text-white font-bold">Home</Link>

          <Link to={"/products"} className="text-white font-bold">Products</Link>

          <Link to={"/customers"} className="text-white font-bold">Customers</Link>

          <Link to={"/purchases"} className="text-white font-bold">Purchases</Link>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
