class DialogOffCanvas extends HTMLElement {
  private dialog: HTMLDialogElement;

  constructor() {
    super();

    this.dialog = document.createElement("dialog");
  }

  get heading() {
    return this.getAttribute("heading");
  }

  set heading(value: string | null) {
    if (value) {
      this.setAttribute("heading", value);
    }
  }

  get open() {
    return this.getAttribute("open");
  }

  set open(value: string | null) {
    if (value) {
      this.setAttribute("open", "true");
    } else {
      this.removeAttribute("open");
    }
  }

  connectedCallback() {
    this._render();
    this._attachEventHandlers();
  }

  _render() {
    this.dialog.innerHTML = `
      <style>
        dialog {
          position: fixed;
          top: 0;
          transition: .3s;
          margin: 0;
          margin-left: auto;
          min-height: 100vh;
          width: 400px;
          max-width: 80%;
          transform: translateX(100%);
        }

        dialog[open] {
          display: flex;
          margin: 0;
          margin-left: auto;
          flex-direction: column;
          transform: translateX(0);
          transition: .3s;
          border: 0;
        }

        dialog::backdrop {
          background: rgba(#000, 0.2);
          backdrop-filter: blur(4px);
        }
      </style>
      <div>
        <h1>${this.heading}</h1>
        <slot></slot>
      </div>`;

    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.appendChild(this.dialog);
  }

  _attachEventHandlers() {
    if (this.getAttribute("open") === "true") {
      this.dialog.showModal();
    }
  }
}

customElements.define("dialog-off-canvas", DialogOffCanvas);
