// find the distance between two points
function dist(a, b) {
  const dx = a[0] - b[0];
  const dy = a[1] - b[1];
  return Math.hypot(dx, dy);
}

// find stroke length
function strokeLength(points) {
  let len = 0;
  for (let i = 1; i < points.length; i++) {
    len += dist(points[i - 1], points[i]);
  }
  return len;
}

// resample strokes to n even points
function resampleStroke(points, n = 4) {
  const interval = strokeLength(points) / (n - 1); // interval length between new points
  let newPoints = [points[0]];

  let distTraveledInLastSegment = 0;
  for (let i = 0; i < points.length - 1; i++) {
    // find the next point on the start interval direction
    const startPoint = points[i];
    const nextPoint = points[i + 1];
    // console.log('start point', startPoint);
    // console.log('next point', nextPoint);

    const distBetweenGivenPoints = Math.hypot(
      nextPoint[0] - startPoint[0],
      nextPoint[1] - startPoint[1]
    );

    let distTraveledInSegment = 0;
    let currentPoint = startPoint;

    while (distTraveledInSegment < distBetweenGivenPoints) {
      const distFromLastNewPoint = Math.hypot(
        nextPoint[0] - currentPoint[0],
        nextPoint[1] - currentPoint[1]
      );

      const newPoint = [
        currentPoint[0] +
          ((interval - distTraveledInLastSegment) *
            (nextPoint[0] - currentPoint[0])) /
            distFromLastNewPoint,
        currentPoint[1] +
          ((interval - distTraveledInLastSegment) *
            (nextPoint[1] - currentPoint[1])) /
            distFromLastNewPoint,
      ];

      distTraveledInLastSegment = 0;

      const distToNewPoint = Math.hypot(
        newPoint[0] - currentPoint[0],
        newPoint[1] - currentPoint[1]
      );

      if (distToNewPoint <= distFromLastNewPoint) {
        newPoints.push(newPoint);
        distTraveledInSegment += distToNewPoint;
        currentPoint = newPoint;
      } else if (i == points.length - 1) {
        // if on the last point and the next point still extends, just use the last point
        newPoints.push(points[points.length - 1]);
        return newPoints;
      } else {
        // else, find the distance left on current segment
        distTraveledInLastSegment = distFromLastNewPoint;
        break;
      }
    }
  }

  return newPoints;
}

let newPoints = resampleStroke(testPoints, 8);
console.log('Test points', testPoints);
console.log('New points', newPoints);
console.log(strokeLength(testPoints));
