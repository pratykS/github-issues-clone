import * as React from "react";

const Assignee = ({ index, login, avatarUrl }) => (
  <div className={`assignee assignee--${index}`}>
    <img src={avatarUrl} alt={login} />
  </div>
);

const Assignees = (props) => {
  if (!props.edges || props.edges.length < 1) return null;
  return props.edges.map(({ node }, i) => (
    <Assignee key={node.id} index={i} {...node} />
  ));
};

export default Assignees;
