import PypiDownloadsLayer from './PypiDownloadsLayer';
import ItOfficesLayer from './ItOfficesLayer';
// [hygen] Import layers

export const getLayers = () => {
  return [
    PypiDownloadsLayer(),
    ItOfficesLayer(),
    // [hygen] Add layer
  ];
};
