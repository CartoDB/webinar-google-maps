import { useEffect } from 'react';
import { setError } from 'store/appSlice';
import itOfficesSource from 'data/sources/itOfficesSource';
import { IT_OFFICES_LAYER_ID } from 'components/layers/ItOfficesLayer';
import pypiDownloadsSource from 'data/sources/pypiDownloadsSource';
import { PYPI_DOWNLOADS_LAYER_ID } from 'components/layers/PypiDownloadsLayer';
import { useDispatch } from 'react-redux';
import { addLayer, removeLayer, addSource, removeSource } from '@carto/react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import { HistogramWidget, FormulaWidget, TableWidget } from '@carto/react-widgets';
import { AggregationTypes } from '@carto/react-core';
import { Divider } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  downloads: {},
  description: {
    padding: theme.spacing(1.5, 1.5, 1.5),
  }
}));

export default function Downloads() {
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(addSource(itOfficesSource));

    dispatch(
      addLayer({
        id: IT_OFFICES_LAYER_ID,
        source: itOfficesSource.id,
      }),
    );

    return () => {
      dispatch(removeLayer(IT_OFFICES_LAYER_ID));
      dispatch(removeSource(itOfficesSource.id));
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(addSource(pypiDownloadsSource));

    dispatch(
      addLayer({
        id: PYPI_DOWNLOADS_LAYER_ID,
        source: pypiDownloadsSource.id,
      }),
    );

    return () => {
      dispatch(removeLayer(PYPI_DOWNLOADS_LAYER_ID));
      dispatch(removeSource(pypiDownloadsSource.id));
    };
  }, [dispatch]);

  // [hygen] Add useEffect
  const onTableWidgetError = (error) => {
    dispatch(setError(`Error obtaining revenue and storetype: ${error.message}`));
  };
  
  return (
    <Grid container direction='column' className={classes.downloads}>
      <Grid item> 
      <Typography className={classes.description}>
        Geospatial PyPI downloads per country on a React Application with interactive widgets.
    </Typography>
    <Divider /> 
    <FormulaWidget 
        id="ITOfficesCount"
        title="IT Offices Count"
        dataSource={itOfficesSource.id}
        column="osm_id"
        operation={AggregationTypes.COUNT}

        onError={console.error}
      />
    <Divider /> 
      <HistogramWidget
    id="downloadsHistogram"
    title="Histogram of Downloads per 1000 Pop"
    dataSource={pypiDownloadsSource.id}
    operation={AggregationTypes.COUNT}
    column="downloads_per1000"
    ticks={[3, 10, 30, 300]}
    onError={console.error}
    />     
    <TableWidget
      id='tableWidget'
      title='Data Table'
      dataSource={pypiDownloadsSource.id}
      initialPageSize={3}
      columns={[
        { field: 'name', headerName: 'Name', align: 'left' },
        { field: 'downloads_per1000', headerName: 'Downloads per 1k', align: 'left' },
      ]}
      onError={onTableWidgetError}
    />
  <Divider />  
      </Grid>
    </Grid>
  );
}
