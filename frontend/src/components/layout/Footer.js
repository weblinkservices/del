import React, { Fragment } from "react";

const footer = () => {

  return (
    <Fragment>
      <footer className="py-1 bg-footer">
        <p></p>
        <span className="text-center mt-1">
          <div className="copyright">
            Copyrights &copy;{new Date().getFullYear()}
            {" "}
            by {" "}
            <a href="https://weblinkservices.net/" target="_blank" rel="noreferrer" className="copy">
              Web Link Services Pvt. Ltd.
            </a>
            {" "}
            All Rights Reserved.
          </div>
        </span>
        <p></p>
      </footer>
    </Fragment>
  );
};

export default footer;
