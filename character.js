const data = {
  character: '你',
  strokes: [
    'M 272 567 Q 306 613 342 669 Q 370 718 395 743 Q 405 753 400 769 Q 396 782 365 808 Q 337 827 316 828 Q 297 827 305 802 Q 318 769 306 741 Q 267 647 207 560 Q 150 476 72 385 Q 60 375 58 367 Q 54 355 70 358 Q 82 359 109 384 Q 155 421 213 493 Q 226 509 241 527 L 272 567 Z',
    'M 241 527 Q 262 506 258 375 Q 258 374 258 370 Q 254 253 221 135 Q 215 114 224 80 Q 236 44 248 32 Q 267 16 279 44 Q 294 86 294 134 Q 303 420 314 485 Q 321 515 295 543 Q 289 549 272 567 C 251 589 227 553 241 527 Z',
    'M 521 560 Q 561 621 602 708 Q 620 751 638 773 Q 645 786 639 799 Q 633 811 602 830 Q 572 846 554 843 Q 535 839 546 817 Q 561 795 552 757 Q 513 619 407 448 Q 398 436 397 430 Q 394 418 409 423 Q 439 432 503 532 L 521 560 Z',
    'M 503 532 Q 527 510 555 520 Q 795 608 782 549 Q 783 543 743 468 Q 736 458 741 453 Q 745 447 756 459 Q 852 532 894 549 Q 904 552 905 561 Q 906 574 876 592 Q 852 605 828 621 Q 800 637 783 630 Q 686 590 521 560 C 492 555 479 550 503 532 Z',
    'M 568 72 Q 531 81 494 91 Q 482 94 483 86 Q 484 79 494 71 Q 569 7 596 -33 Q 611 -49 626 -36 Q 659 -3 661 82 Q 655 149 655 345 Q 656 382 667 407 Q 676 426 659 439 Q 634 461 604 470 Q 585 477 577 469 Q 571 462 582 447 Q 619 384 603 127 Q 597 82 589 74 Q 582 67 568 72 Z',
    'M 444 320 Q 419 262 385 208 Q 364 180 381 144 Q 388 128 409 139 Q 460 181 468 264 Q 472 295 467 319 Q 463 328 456 328 Q 449 327 444 320 Z',
    'M 738 307 Q 789 249 847 168 Q 860 146 876 139 Q 885 138 893 146 Q 908 159 900 204 Q 891 264 743 338 Q 734 345 731 332 Q 728 319 738 307 Z',
  ],
  medians: [
    [
      [317, 812],
      [342, 786],
      [353, 759],
      [303, 663],
      [249, 577],
      [181, 485],
      [93, 386],
      [68, 367],
    ],
    [
      [273, 558],
      [274, 525],
      [285, 495],
      [284, 441],
      [273, 243],
      [256, 123],
      [260, 41],
    ],
    [
      [556, 828],
      [574, 817],
      [595, 783],
      [584, 746],
      [539, 640],
      [481, 531],
      [428, 453],
      [406, 431],
    ],
    [
      [513, 532],
      [704, 585],
      [796, 597],
      [813, 585],
      [827, 563],
      [798, 519],
      [746, 460],
    ],
    [
      [586, 463],
      [615, 438],
      [632, 412],
      [627, 73],
      [616, 41],
      [604, 30],
      [558, 47],
      [490, 85],
    ],
    [
      [455, 316],
      [437, 243],
      [397, 151],
    ],
    [
      [742, 326],
      [812, 265],
      [856, 216],
      [871, 190],
      [878, 154],
    ],
  ],
};

// utility functions
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

const canvas = document.getElementById('character');
const ctx = canvas.getContext('2d');

// canvas styles
ctx.lineWidth = 6;
ctx.lineCap = 'round';

// resize characters
ctx.scale(0.5, -0.5);
ctx.translate(0, -900);

function drawMedians() {
  ctx.beginPath();
  data.medians.forEach((stroke) => {
    stroke.forEach(([x, y], i) => {
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
  });
  ctx.stroke();
}
function drawResampledMedians() {
  ctx.beginPath();
  data.medians.forEach((stroke) => {
    const resampledStroke = resampleStroke(stroke, 50);
    resampledStroke.forEach(([x, y], i) => {
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
  });
  ctx.stroke();
}
function drawStrokes() {
  ctx.beginPath();
  data.strokes.forEach((stroke) => {
    ctx.fill(new Path2D(stroke));
  });
}

drawMedians();
ctx.strokeStyle = 'blue';
drawResampledMedians();
// drawStrokes();
