import { Link } from "react-router-dom";

export const FormBuilder = (props) => {
  return (
    <div className="container">
      <div className="mt-3 d-flex justify-content-between">
        <div className="display-4">Forms</div>
        <div>
          <Link
            to={"/form-builder/create"}
            className="btn btn-sm btn-outline-primary"
          >
            Create
          </Link>
        </div>
      </div>
    </div>
  );
};
