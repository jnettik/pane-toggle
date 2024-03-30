import { validateConfig } from './utils';
import { Button } from './ui';

export default class PaneBase {

  constructor(config) {
    const emptyConfig = validateConfig(config);

    if (emptyConfig.length) {
      console.error(`Missing required settings for ${emptyConfig.join(', ')}.`);
    }

    this.config = config;
    this.paneGroups = document.querySelectorAll(config.grouping);
  }

  init() {
    this.paneGroups.forEach(group => {
      this.setupUi(group);
      this.setupEvents(group);
    });
  }

  destroty() {
    // @todo: destroy instance.
  }

  setupUi(group) {
    group.querySelectorAll(this.config.pane).forEach(pane => {
      const trigger = pane.querySelector(this.config.trigger);
      const content = pane.querySelector(this.config.content);
      const props = {
        content: trigger.innerHTML,
      };

      trigger.innerHTML = Button(props);
    });

  }

  setupEvents(group) {

  }

}
