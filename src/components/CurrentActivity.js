import React from 'react';

import Timer from './Timer';

const CurrentActivity = props => {
  if (!props.activity) {
    return <div>Select an activity to begin.</div>;
  }
  return (
    <div>
      <div>{props.activity.name}</div>
      <Timer token={props.token} activity={props.activity} />
    </div>
  );
};

export default CurrentActivity;
