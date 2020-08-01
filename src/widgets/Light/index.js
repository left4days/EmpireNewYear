import React from "react";
import im1 from "statics/light/1.png";
import im2 from "statics/light/2.png";
import "./style.scss";

const Light = () => {
  return (
    <div className="light__wrapper">
      <div className="light">
        <img src={im1} className="light_1" alt="" />
        <img src={im2} className="light_2" alt="" />
      </div>
    </div>
  );
};

export { Light };
