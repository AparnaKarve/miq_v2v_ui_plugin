import URI from 'urijs';
import API from '../../../API';
import {
  FETCH_V2V_SOURCE_CLUSTERS,
  FETCH_V2V_SOURCE_CLUSTERS_FULFILLED
} from '../../consts';
import { requestData } from './mappingWizard.fixtures';

const _getSourceClustersActionCreator = url => dispatch =>
  dispatch({
    type: FETCH_V2V_SOURCE_CLUSTERS,
    payload: API.get(url)
  }).catch(error => {
    // redux-promise-middleware will automatically send:
    // FETCH_V2V_SOURCE_CLUSTERS_PENDING, FETCH_V2V_SOURCE_CLUSTERS_FULFILLED, FETCH_V2V_SOURCE_CLUSTERS_REJECTED

    // to enable UI development without the backend ready, i'm catching the error
    // and passing some mock data thru the FULFILLED action after the REJECTED action is finished.
    dispatch({
      type: FETCH_V2V_SOURCE_CLUSTERS_FULFILLED,
      payload: requestData.response
    });
  });

export const fetchSourceClusters = url => {
  const uri = new URI(url);

  return _getSourceClustersActionCreator(uri.toString());
};
