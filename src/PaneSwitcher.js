import { switcherDefaults as defaultConfig } from './config';


/**
 * Class for swapping out Pane interfaces.
 */
export default class PaneSwitcher {

  /**
   * Constructor class
   *
   * @param {object} config
   *   The config object for a switcher.
   */
  constructor(config) {
    this.config = merge.all([defaultConfig, config]);
  }

  init() {
    this.config.breakpoints.forEach(breakpoint => {
      const { query, component } = breakpoint;
      const mq = window.matchMedia(query);

      this.switch(mq.matches, component);
      mq.addEventListener('change', event => this.switch(event.matches, component));
    });
  }

  switch(state, component) {
    state ? component.init() : component.destroy();
  }

}
