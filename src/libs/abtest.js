/**
 * A/B Testing library.
 *
 * @see https://abtest.skplanet.com
 */
import plab from 'plab';
import Noty from 'noty';

// @see https://plab.skplanet.com/projects/29/experiments
const projectKey = 'plab-demo-project';

const ABTest = {
  init(params = {}) {
    plab.init({
      projectKey,
      datafile: window.plabDatafile, // @see index.html datafile
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
    const res = await fetch(
      `https://api-plab.skplanet.com/v1/project/${projectKey}`
    );
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

export default ABTest;
