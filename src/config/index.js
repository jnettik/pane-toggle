import merge from 'deepmerge';

const defaults = {
  grouping: '',
  pane: '',
  trigger: '',
  content: '',
  defaultOpen: false,
  closeAll: false,
};

export const accordionDefaults = defaults;
export const tabsDefaults = merge.all([defaults, { defaultOpen: 0 }])
