import React from 'react';
import ActivityListItem from './ActivityListItem';

const ActivityList = props => {
  const activityItems = props.activityList.map(activity => {
    let selected = false;
    if (props.currentActivity && activity._id === props.currentActivity._id) {
      selected = true;
    }
    return (
      <ActivityListItem
        activity={activity}
        selectActivity={props.selectActivity}
        selected={selected}
        key={activity._id}
      />
    );
  });
  return <ul className="activity-list">{activityItems}</ul>;
};

export default ActivityList;
