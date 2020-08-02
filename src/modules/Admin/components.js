import React from "react";
import { Column } from "ui/Layout";
import { Button } from "ui/Button";

import { UserHeading } from "./UserHeading";
import { UserRow } from "./UserRow";

function stateText(currentState) {
  switch (currentState) {
    case "DEV":
      return "Начать акцию";
    case "ACTIVE":
      return "Закончить акцию";
    case "FINISHED":
      return "В режим разработки";
    default:
      return currentState;
  }
}

export function SwitchActionStateButton({ actionState, onClick }) {
  return <Button onClick={onClick}>{stateText(actionState)}</Button>;
}

export function Table({ text, onClick, buttonText, data }) {
  return (
    <Column>
      <UserHeading text={text} onClick={onClick} buttonText={buttonText} />
      <Column ai="flex-start">
        <UserRow
          user={{
            login: "NAME",
            steamLogin: "LOGIN",
            email: "EMAIL",
            registerBy: "REGISTERED BY"
          }}
        />
        {data.map((user, i) => (
          <UserRow withLink key={user.login} idx={i + 1} user={user} />
        ))}
      </Column>
    </Column>
  );
}
