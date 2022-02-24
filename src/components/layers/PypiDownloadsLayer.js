import { useSelector, useDispatch } from 'react-redux';
import { CartoLayer } from '@deck.gl/carto';
import { LEGEND_TYPES } from "@carto/react-ui";
import { updateLayer } from "@carto/react-redux";
import { selectSourceById } from '@carto/react-redux';
import { useCartoLayerProps } from '@carto/react-api';
import htmlForFeature from 'utils/htmlForFeature';
import * as d3 from 'd3';

export const PYPI_DOWNLOADS_LAYER_ID = 'pypiDownloadsLayer';


const COLORS = [[44, 123, 182], [171, 217, 233], [243, 243, 93], [241, 138, 40], [215, 25, 28]];
const LABELS = ['0', '5', '50', '1500'];
const colorScale = d3.scaleQuantile().range(COLORS).domain([0, 6]);
const layerConfig = {
  title: 'PyPI Downloads by Country',
  visible: true,
  legend: {
    //attr: 'downloads_per1000',
    type: LEGEND_TYPES.BINS,
    labels: LABELS,
    colors: COLORS,
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
      getFillColor: d => colorScale(Math.log(d.properties.downloads_per1000)),
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
