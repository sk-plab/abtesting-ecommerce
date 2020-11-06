/**
 * A/B Testing library.
 *
 * @see https://abtest.skplanet.com
 */
import plab from 'plab';
import Noty from 'noty';

const ABTest = {
  init() {
    // abtesting debug
    const debug = false;

    // Project Keyname
    // @see https://abtest.skplanet.com/a-b-test-getting-started/#i-2
    const projectKey = 'plab-demo-project';

    // datafile
    // public/index.html 파일에 설정
    // @see https://abtest.skplanet.com/a-b-test-datafile/
    const datafile = window.plabDatafile;

    // cookie sameSite 설정
    // false: localhost
    // true: SSL
    const REACT_APP_SSL = process.env.REACT_APP_SSL;
    const isCrossSite = REACT_APP_SSL === 'true' ? true : false;

    // cookie domain 설정
    const domain = process.env.REACT_APP_DOMAIN;

    plab.init({
      projectKey,
      datafile,
      isCrossSite,
      debug,
      domain,
    });
  },

  start(expKey) {
    const variation = plab.start(expKey);
    const variables = plab.getVariable(expKey);

    return {
      variation,
      variables,
    };
  },

  track(e) {
    plab.track(
      e,
      {},
      {
        success: (res) => {
          new Noty({
            type: 'info',
            text: `[ABTest]<br />${e} event tracked`,
            timeout: 3000,
            layout: 'bottomLeft',
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
