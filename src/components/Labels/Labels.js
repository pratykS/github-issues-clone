import * as React from "react";

const Labels = (props) => {
  const { name, color } = props;

  return (
    <div
      className="label"
      style={{ backgroundColor: `#${color}`, color: "black" }}
    >
      {name}
    </div>
  );
};

export default Labels;
