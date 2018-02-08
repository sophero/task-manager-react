import React from 'react';

const ActivityListItem = props => {
  let itemClass = 'activity-list__item';
  if (props.selected) {
    itemClass += '--selected';
  }
  return (
    <li
      onClick={() => props.selectActivity(props.activity._id)}
      className={itemClass}
    >
      <div>{props.activity.name}</div>
    </li>
  );
};

export default ActivityListItem;
