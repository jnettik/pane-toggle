import merge from 'deepmerge';
import { defaults } from './config';
import { validateConfig } from './utils';
import { Button } from './ui';

export default class PaneBase {

  constructor(config) {
    const emptyConfig = validateConfig(config);

    if (emptyConfig.length) {
      console.error(`Missing required settings for ${emptyConfig.join(', ')}.`);
    }

    this.config = merge.all([defaults, config]);
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
      content.setAttribute('aria-expanded', false);
    });

  }

  setupEvents(group) {
    group.addEventListener('click', this.handleClick);
  }

  handleClick(event) {
    console.log(event);
  }

}
