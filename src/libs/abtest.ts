/**
 * A/B Testing library.
 *
 * @see https://abtest.skplanet.com
 */
import plab from 'plab';
import Noty from 'noty';

class ABTest {
  private static instance: ABTest;

  static getInstance(): ABTest {
    if (!ABTest.instance) {
      ABTest.instance = new ABTest();
    }

    return ABTest.instance;
  }

  init(): void {
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
  }

  start(
    expKey: string
  ): { variation: string; variables: Record<string, unknown> } {
    const variation = plab.start(expKey);
    const variables = plab.getVariable(expKey);

    return {
      variation,
      variables,
    };
  }

  track(e: string): void {
    plab.track(
      e,
      {},
      {
        success: () => {
          new Noty({
            type: 'info',
            text: `[A/B Testing]<br />${e} event tracked`,
            timeout: 3000,
            layout: 'bottomLeft',
          }).show();
        },
        error: (e: string) => console.error(e),
      }
    );
  }

  debug() {
    plab.devtool(); // for debugging
    window.plab = plab; // for debugging
  }
}

const instance = ABTest.getInstance();

export default instance;
