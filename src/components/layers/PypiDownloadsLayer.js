import { useSelector, useDispatch } from 'react-redux';
import { CartoLayer, colorContinuous } from '@deck.gl/carto';
import { LEGEND_TYPES } from "@carto/react-ui";
import { updateLayer } from "@carto/react-redux";
import { selectSourceById } from '@carto/react-redux';
import { useCartoLayerProps } from '@carto/react-api';
import htmlForFeature from 'utils/htmlForFeature';
import * as d3 from 'd3';


export const PYPI_DOWNLOADS_LAYER_ID = 'pypiDownloadsLayer';


const colorRamp = 'Teal';
const domain = [0, 5, 30, 300, 1500];

const layerConfig = {
  title: 'PyPI Downloads by Country',
  visible: true,
  legend: {
    //attr: 'downloads_per1000',
    type: LEGEND_TYPES.CONTINUOUS_RAMP,
    labels: domain,
    colors: colorRamp,
  },
};

export default function PypiDownloadsLayer() {
  const { pypiDownloadsLayer } = useSelector((state) => state.carto.layers);
  const source = useSelector((state) => selectSourceById(state, pypiDownloadsLayer?.source));
  const cartoLayerProps = useCartoLayerProps({ source });
  const dispatch = useDispatch();

  if (pypiDownloadsLayer && source) {
    return new CartoLayer({
      ...cartoLayerProps,
      id: PYPI_DOWNLOADS_LAYER_ID,
      visible: pypiDownloadsLayer.visible,
      getFillColor: colorContinuous({
        attr: 'downloads_per1000',
        domain: domain,
        colors: colorRamp,
      }), 
      pointRadiusMinPixels: 2,
      opacity: 0.7,
      stroke: false,
      getLineWidth: 0.1,
      lineWidthMinPixels: 1,
      pickable: true,
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
            id: PYPI_DOWNLOADS_LAYER_ID,
            layerAttributes: { ...layerConfig },
          })
        );
        cartoLayerProps.onDataLoad(data);
      }
    });
  }
}
