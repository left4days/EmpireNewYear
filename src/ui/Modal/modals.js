import React from "react";
import { Auth } from "widgets/Auth";
import { InfoModal } from "widgets/InfoModal";

export function getModal(type, handleModal) {
  switch (type) {
    case "auth":
      return <Auth authType="auth" handleModal={handleModal} />;
    case "login":
      return <Auth authType="login" handleModal={handleModal} />;
    case "reset":
      return <Auth authType="reset" handleModal={handleModal} />;
    case "info":
      return <InfoModal handleModal={handleModal} />;
    default:
      return null;
  }
}
