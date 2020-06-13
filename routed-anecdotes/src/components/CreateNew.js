import React from "react";

import { useHistory } from "react-router-dom";

import { useField } from "../hooks";

const CreateNew = (props) => {
  const contentField = useField("text", "content");
  const authorField = useField("text", "author");
  const infoField = useField("text", "info");

  /* eslint-disable no-redeclare */
  // excluding reset handler and createing <input> props
  var { reset, ...contentInputProps } = contentField;
  var { reset, ...authorInputProps } = authorField;
  var { reset, ...infoInputProps } = infoField;
  /* eslint-enable no-redeclare */

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addNew({
      content: contentField.value,
      author: authorField.value,
      info: infoField.value,
      votes: 0,
    });
    history.push("/anecdotes");
  };

  const handleReset = () => {
    contentField.reset();
    authorField.reset();
    infoField.reset();
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...contentInputProps} />
        </div>
        <div>
          author
          <input {...authorInputProps} />
        </div>
        <div>
          url for more info
          <input {...infoInputProps} />
        </div>
        <button type="submit">create</button>
        <button type="reset" onClick={handleReset}>
          reset
        </button>
      </form>
    </div>
  );
};

export default CreateNew;
