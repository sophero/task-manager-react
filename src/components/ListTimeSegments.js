import React from 'react';

const ListTimeSegments = props => {
  let display = props.timeSegments.map(segment => {
    let startTime = new Date(segment.startTime).toString();
    let stopTime = new Date(segment.stopTime).toString();
    let mins = Math.floor((segment.startTime - segment.stopTime) / (1000 * 60));
    let length = `${mins} mins`;
    if (mins >= 60) {
      length = `${Math.floor(mins / 60)} hours ${length}`;
    }
    return (
      <div key={segment._id}>
        <div>Activity: {segment.activity_name}</div>
        <div>Start time: {startTime}</div>
        <div>Stop time: {stopTime}</div>
        <div>Total duration: {length}</div>
      </div>
    );
  });

  return <div>{display}</div>;
};

export default ListTimeSegments;
