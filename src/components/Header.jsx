import { Link } from "react-router-dom";
export const Header = (props) => {
  const logout = (e) => {
    localStorage.clear();
  };

  return (
    <div className="d-flex justify-content-between p-3 shadow">
      <div>
        <Link className="btn btn-sm btn-outline-primary me-2" to="/users">
          Users
        </Link>
        <Link className="btn btn-sm btn-outline-primary" to="/form-builder">
          Form Builder
        </Link>
      </div>
      <div>
        <button className="btn btn-sm btn-outline-primary" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
};
