import { useSelector, useDispatch } from 'react-redux';
import { CartoLayer } from '@deck.gl/carto';
import { updateLayer } from "@carto/react-redux";
import { selectSourceById } from '@carto/react-redux';
import { useCartoLayerProps } from '@carto/react-api';
import htmlForFeature from 'utils/htmlForFeature';
import GL from '@luma.gl/constants';

export const IT_OFFICES_LAYER_ID = 'itOfficesLayer';

export default function ItOfficesLayer() {
  const { itOfficesLayer } = useSelector((state) => state.carto.layers);
  const source = useSelector((state) => selectSourceById(state, itOfficesLayer?.source));
  const cartoLayerProps = useCartoLayerProps({ source });
  const dispatch = useDispatch();

  const layerConfig = {
    title: 'OSM IT Offices',
    visible: false,
    legend: {}
  };

  if (itOfficesLayer && source) {
    return new CartoLayer({
      ...cartoLayerProps,
      id: IT_OFFICES_LAYER_ID,
      visible: itOfficesLayer.visible,
      getFillColor: [99, 199, 99],
      pointRadiusMinPixels: 0.5,
      getLineColor: [99, 199, 99],
      lineWidthMinPixels: 1,
      pickable: true,
      parameters: {
        blendFunc: [GL.SRC_ALPHA, GL.DST_ALPHA],
        blendEquation: GL.FUNC_ADD
      },
      onHover: (info) => {
        if (info?.object) {
          info.object = {
            html: htmlForFeature({ feature: info.object }),
            style: {},
          };
        }
      },
      onDataLoad: (data) => {
        dispatch(
          updateLayer({
            id: IT_OFFICES_LAYER_ID,
            layerAttributes: { ...layerConfig },
          })
        );
        cartoLayerProps.onDataLoad(data);
      }
    });
  }
}