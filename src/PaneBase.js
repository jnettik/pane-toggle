import merge from 'deepmerge';
import { defaults } from './config';
import { randomId, validateConfig } from './utils';
import { Button } from './ui';

export default class PaneBase {

  constructor(config) {
    const emptyConfig = validateConfig(config);

    if (emptyConfig.length) {
      console.error(`Missing required settings for ${emptyConfig.join(', ')}.`);
    }

    this.controller = new AbortController();
    this.config = merge.all([defaults, config]);
    this.paneGroups = document.querySelectorAll(config.grouping);
  }

  init() {
    this.paneGroups.forEach(group => {
      this.setupUi(group);
      this.setupEvents(group);
    });
  }

  destroy() {
    this.controller.abort();
  }

  setupUi(group) {
    group.querySelectorAll(this.config.pane).forEach(pane => {
      const id = randomId();
      const trigger = pane.querySelector(this.config.trigger);
      const content = pane.querySelector(this.config.content);
      const contentId = content.getAttribute('id');
      const isOpen = this.isOpen(trigger);
      const props = {
        content: trigger.innerHTML,
        controls: id,
        isOpen,
      };

      trigger.innerHTML = Button(props);
      content.setAttribute('aria-hidden', true);
      content.setAttribute('id', contentId ? `${contentId}-${id}` : id);
    });
  }

  setupEvents(group) {
    group.addEventListener('click', event => {
      this.handleClick(event, group);
      event.preventDefault();
    }, { signal: this.controller.signal });
  }

  handleClick(event, group) {
    const trigger = event.target.closest('.pane-trigger');

    if (!trigger) return;
    if (!group.contains(trigger)) return;

    const targetId = trigger.getAttribute('aria-controls');
    const target = group.querySelector(`#${targetId}`);
    const isOpen = this.isOpen(trigger);

    trigger.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
    target.setAttribute('aria-hidden', isOpen ? 'true' : 'false');
  }

  isOpen(trigger) {
    return trigger.getAttribute('aria-expanded') === 'true';
  }

}
