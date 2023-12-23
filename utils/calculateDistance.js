function calculateDistance(coords1, coords2) {
  const toRadian = (angle) => (Math.PI / 180) * angle;
  const distance = (a, b) => (Math.PI / 180) * (b - a);
  const RADIUS_OF_EARTH_IN_MILES = 3958.8;

  const dLatitude = distance(coords1.latitude, coords2.latitude);
  const dLongitude = distance(coords1.longitude, coords2.longitude);

  const a =
    Math.sin(dLatitude / 2) * Math.sin(dLatitude / 2) +
    Math.cos(toRadian(coords1.latitude)) *
      Math.cos(toRadian(coords2.latitude)) *
      Math.sin(dLongitude / 2) *
      Math.sin(dLongitude / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return RADIUS_OF_EARTH_IN_MILES * c;
}
