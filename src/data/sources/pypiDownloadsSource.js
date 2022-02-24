import { MAP_TYPES } from '@deck.gl/carto';

const PYPI_DOWNLOADS_SOURCE_ID = 'pypiDownloadsSource';

const source = {
  id: PYPI_DOWNLOADS_SOURCE_ID,
  type: MAP_TYPES.TABLE,
  connection: 'carto_dw',
  data: `cartobq.public_account.gmaps_carto_webinar_pypi_downloads`,
};

export default source;
