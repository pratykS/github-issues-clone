import * as React from "react";
import Labels from "../Labels/Labels";

const Issue = (props) => (
  <div className="issue">
    <div className="issue__icon">
      {props.state === "open" ? (
        <span className="status-icon open-icon"></span>
      ) : (
        <span className="status-icon closed-icon"></span>
      )}
    </div>
    <div className="issue__details">
      <div className="issue__details__title">
        <div className="issue__details__title--text">{props.title}</div>
        {props.labels.length > 0
          ? props.labels.map((l, i) => <Labels key={i} {...l} />)
          : null}
      </div>
      <div className="issue__details__meta">
        <div>#{props.number}</div>
        <div>opened {props.created_at} ago by</div>
        {props.user && props.user.login ? <div>{props.user.login}</div> : null}
      </div>
    </div>
    {/* <div className="issue__assignees">
      <Assignees {...props.assignees} />
    </div> */}
    {/* <div className="issue__comments">
      {props.comments.totalCount > 0 ? (
        <div className="issue__comments__counter">
          <div className="material-icons">chat_bubble_outline</div>
          <div>{props.comments.totalCount}</div>
        </div>
      ) : (
        ""
      )}
    </div> */}
  </div>
);

export default Issue;
