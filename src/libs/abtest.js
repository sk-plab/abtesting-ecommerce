/**
 * A/B Testing library.
 *
 */
import plab from 'plab';
import Noty from 'noty';

const projectKey = 'plab-demo-project';

export default {
  init(params = {}) {
    plab.init({
      projectKey,
      datafile: params.datafile,
      isCrossSite: false, // false: localhost, true: SSL
      debug: false,
    });
  },

  /*async init() {
    return await plab.init({
      projectKey,
      isCrossSite: true,
      debug: true
    });
  },*/

  start(expKey) {
    const variation = plab.start(expKey);
    const variables = plab.getVariable(expKey);

    return {
      variation,
      variables,
    };
  },

  async getDatafile() {
    const res = await fetch(`https://api-plab.skplanet.com/v1/project/${projectKey}`);
    const datafile = await res.json();

    return datafile;
  },

  track(e) {
    plab.track(
      e,
      {},
      {
        success: (res) => {
          new Noty({
            type: 'success',
            text: `${e} event tracked`,
            timeout: 3000,
          }).show();
        },
        error: (e) => console.error(e),
      }
    );
  },

  debug() {
    plab.devtool(); // for debugging
    window.plab = plab; // for debugging
  },
};
