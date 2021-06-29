/*** Handler that uses various data-* attributes to trigger specific actions, mimicing bootstrap's collapse.js ***/

/* Grabs all of the elements that control toggles and places them into an array */
const controllers = Array.from(
  document.querySelectorAll('[data-toggle-role="controller"]')
);

/* Grabs the Expand All / Collapse all button */
const toggleAllController = document.querySelector(
  '[data-toggle-role="control-all"]'
);

/* Grabs the true/false state of Expand All / Collapse all button */
const toggleAllState = toggleAllController.getAttribute(
  "data-main-toggle-active"
);

/* Grabs all of the elements that toggle and places them into an array */
const collapsibles = Array.from(
  document.querySelectorAll('[data-toggle-role="collapsible"]')
);

/* Grabs all of the carets that rotate */
const carets = Array.from(document.querySelectorAll("[data-lesson-caret"));

/* This provides available actions to the function */
const triggerMap = {
  toggle: "toggle",
  show: "add",
  hide: "remove",
};

/* Collapse function, controls the class toggle */
const collapse = (selector, cmd) => {
  const targets = Array.from(document.querySelectorAll(selector));
  targets.forEach((target) => {
    target.classList[triggerMap[cmd]]("hidden");
  });
};

// const rotate = (a, b, c) => {
//   if (a === "false") {
//     targetCaret.classList.remove("-rotate-90");
//     targetCaret.setAttribute("data-is-active", "true");
//   } else if (e === "true") {
//     elm.classList.add("-rotate-90");
//     elm.setAttribute("data-is-active", "false");
//   }
// };

/* Code block for the Expand/Collapse All button */
const toggleAll = function () {
  const activateMainToggle = () => {
    if (toggleAllState === "true") {
      collapsibles.forEach((e) => {
        e.classList.add("hidden");
      });
      carets.forEach((e) => {
        e.classList.add("-rotate-90");
        e.setAttribute("data-is-active", "false");
      });
      toggleAllController.setAttribute("data-main-toggle-active", "false");
    } else if (toggleAllState === "false") {
      collapsibles.forEach((e) => {
        e.classList.remove("hidden");
      });
      carets.forEach((e) => {
        e.classList.remove("-rotate-90");
        e.setAttribute("data-is-active", "true");
      });
      toggleAllController.setAttribute("data-main-toggle-active", "true");
    }
  };
  const swapButtonText = () => {
    const icon = document.querySelector("[data-button-text='icon']");
    const expand = document.querySelector("[data-button-text='expand']");
    const collapse = document.querySelector("[data-button-text='collapse']");
    if (toggleAllState === "false") {
      expand.classList.add("hidden");
      collapse.classList.remove("hidden");
      icon.classList.add("-rotate-90");
    } else {
      collapse.classList.add("hidden");
      expand.classList.remove("hidden");
      icon.classList.remove("-rotate-90");
    }
  };
  swapButtonText();
  activateMainToggle();
};

/* Runs the function for the expand/collapse all button */
toggleAllController.addEventListener("click", toggleAll);

/* onClick handler */
controllers.forEach((trigger) => {
  trigger.addEventListener("click", (e) => {
    const elm = e.target;

    if (controllers.includes(elm)) {
      const selector = elm.getAttribute("data-lesson-target");
      const findCaret = elm.getAttribute("data-lesson-caret");
      const targetCaret = document.querySelector(findCaret);
      const isActive = targetCaret.getAttribute("data-is-active");
      // rotate(isActive);
      collapse(selector, "toggle");
      if (isActive === "false") {
        targetCaret.classList.remove("-rotate-90");
        targetCaret.setAttribute("data-is-active", "true");
      } else if (isActive === "true") {
        targetCaret.classList.add("-rotate-90");
        targetCaret.setAttribute("data-is-active", "false");
      }
    }
  }),
    false;
});
