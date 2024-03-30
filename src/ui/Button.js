const html = String.raw;

export const Button = ({ content, isOpen = false }) => html`
  <button
    type="button"
    aria-expanded="${isOpen}"
    class="pane-trigger"
  >${content}</button>
`;
