export function isInsideRadius(userLat, userLng, classLat, classLng) {
  const R = 6371e3;
  const φ1 = (userLat * Math.PI) / 180;
  const φ2 = (classLat * Math.PI) / 180;
  const Δφ = ((classLat - userLat) * Math.PI) / 180;
  const Δλ = ((classLng - userLng) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) ** 2 +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return distance <= 100; // 100 meters
}