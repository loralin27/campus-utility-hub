import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <Link className="navbar-brand" to="/">
        Campus Hub
      </Link>

      <div className="collapse navbar-collapse">
        {user && (
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Resources
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/borrow">
                Borrow
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/lost">
                Lost & Found
              </Link>
            </li>
          </ul>
        )}
      </div>

      <div>
        {user ? (
          <>
            <span className="text-white me-3">
              Hi {user.name || user.email}
            </span>

            <button className="btn btn-danger" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link className="btn btn-light me-2" to="/login">
              Login
            </Link>
            <Link className="btn btn-success" to="/register">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;