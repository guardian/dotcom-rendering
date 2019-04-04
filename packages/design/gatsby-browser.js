exports.onClientEntry = () => {
  class StorybookPreview extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `<div>Storybook preview</div>`
    }
  }
  window.customElements.define("storybook-preview", StorybookPreview)
}
