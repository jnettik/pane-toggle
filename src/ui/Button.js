const html = String.raw;

export const Button = ({ content, controls, isOpen = false }) => html`
  <button
    type="button"
    aria-controls="${controls}"
    aria-expanded="${isOpen}"
    class="pane-trigger"
  >${content}</button>
`;
