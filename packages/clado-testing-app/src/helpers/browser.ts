const currentLocation = () => window.location.pathname + window.location.search;
const currentOrigin = () => window.location.origin;
const localStorage = () => window.localStorage;

export { currentLocation, currentOrigin, localStorage };
