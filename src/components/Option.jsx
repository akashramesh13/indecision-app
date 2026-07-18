import React from "react";
import { FiTrash2 } from "react-icons/fi";

const Option = (props) => (
  <div className="option">
    <p className="option__text">
      {props.count}. {props.optionText}
    </p>
    <button
      className="button button--link button--icon"
      onClick={(e) => {
        props.handleDeleteOption(props.optionText);
      }}
      aria-label="Remove option"
    >
      <FiTrash2 />
    </button>
  </div>
);
export default Option;
