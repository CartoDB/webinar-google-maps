import { MAP_TYPES } from '@deck.gl/carto';

const IT_OFFICES_SOURCE_ID = 'itOfficesSource';

const source = {
  id: IT_OFFICES_SOURCE_ID,
  type: MAP_TYPES.TABLE,
  connection: 'carto_dw',
  data: `cartobq.public_account.gmaps_carto_webinar_osm_it_offices`,
};

export default source;
