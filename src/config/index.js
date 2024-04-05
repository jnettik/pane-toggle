import merge from 'deepmerge';
import { Button, TabList } from '../ui';

const defaults = {
  grouping: '',
  pane: '',
  trigger: '',
  content: '',
  defaultOpen: false,
  closeAll: false,
  templates: {
    button: Button,
  },
};

export const accordionDefaults = defaults;
export const tabsDefaults = merge.all([defaults, {
  defaultOpen: 0,
  templates: {
    tabs: TabList,
  },
}]);
