import React from 'react';

// import Timer from './Timer';

const CurrentActivity = props => {
  if (!props.activity) {
    return <div>Select an activity to begin.</div>;
  }
  return (
    <div>
      <div>{props.activity.name}</div>
      {/* Put edit current activity button here with props.updateActivity callback */}
      {/* <Timer
        token={props.token}
        activity={props.activity}
        readActivities={props.readActivities}
        getTimeSegments={props.getTimeSegments}
      /> */}
    </div>
  );
};

export default CurrentActivity;
