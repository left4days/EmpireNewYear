import React from "react";
import { Column } from "ui/Layout";
import video from "statics/smoke.mp4";
import "./style.scss";

const SmokeBlock = () => {
  return (
    <Column className="smoke-block">
      <video autoPlay muted loop>
        <source src={video} type="video/mp4" />
      </video>
    </Column>
  );
};

export { SmokeBlock };
