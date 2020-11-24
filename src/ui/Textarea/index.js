import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import style from "./style.scss";

function Textarea({
  value,
  mask,
  onBlur,
  onClick,
  onFocus,
  onChange,
  disabled,
  readonly,
  extraClass,
  placeholder,
  type,
  name,
  id,
  autoComplete,
  ...props
}) {
  const className = cx(
    style["ux-textarea"],
    { [style["ux-textarea_disabled"]]: disabled },
    extraClass
  );

  return (
    <textarea
      id={id}
      name={name}
      value={value}
      onBlur={onBlur}
      onClick={onClick}
      onFocus={onFocus}
      disabled={disabled}
      className={className}
      autoComplete={autoComplete}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
}

Textarea.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  readonly: PropTypes.bool,
  autoComplete: PropTypes.string,
  id: PropTypes.string
};

Textarea.defaultProps = {
  readonly: false,
  disabled: false,
  autoComplete: "",
  id: null,
  onClick: i => i,
  onChange: i => i,
  placeholder: "",
  value: ""
};

export { Textarea };
