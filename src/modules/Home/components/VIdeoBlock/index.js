import React from "react";
import { Column } from "ui/Layout";
import video from "statics/video_bg.mp4";
import "./style.scss";

const VideoBlock = () => {
  return (
    <Column className="video-block">
      <video autoPlay muted loop>
        <source src={video} type="video/mp4" />
      </video>
    </Column>
  );
};

export { VideoBlock };
