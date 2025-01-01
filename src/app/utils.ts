export function calculateSpeed(
  mousePosition: { x: number; y: number },
  prevPosRef: any,
  prevTimeRef: any
) {
  const maxDistanceSquared = 3000; // e.g., max distance of 500 pixels
  const maxSpeed = 0.75; // Maximum speed cap
  const currentTime = Date.now();

  // Calculate squared distance between current and previous positions
  const dx = mousePosition.x - prevPosRef.current.x;
  const dy = mousePosition.y - prevPosRef.current.y;
  // const distanceSquared = dx * dx + dy * dy; // Squared distance
  const distanceSquared = Math.sqrt(dx * dx + dy * dy); // Euclidean distance

  // Calculate time difference in seconds
  const timeDiff = (currentTime - prevTimeRef.current) / 1000;

  // Calculate speed: squared distance / time
  let currentSpeed = timeDiff > 0 ? distanceSquared / timeDiff : 0;

  // Normalize speed to a range of [0, maxSpeed] and cap it
  return Math.min(maxSpeed, (currentSpeed / maxDistanceSquared) * maxSpeed);
}
