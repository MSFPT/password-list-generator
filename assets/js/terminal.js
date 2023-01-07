/* https://github.com/msfpt/password-list-generator
   License: MIT License
*/

// taking care of forEach object problem in FireFox, Internet Explorer, WaterFox
if (typeof NodeList.prototype.forEach !== 'function') NodeList.prototype.forEach = Array.prototype.forEach;

const str_includes = (string, substring) => string.includes(substring);

const replaceAll = (text, string, substring) => {
    let _array = text.split(string);
    for (var i = 0; i < (_array.length - 1); i++) {
        text = text.replace(string, substring);
    }
    return text
}

document.setTitle = (title = '') => {
  if (document.title != title) document.title = title;
}

const scrollToBottom = (element = document.body) => window.scrollTo(0, element.scrollHeight);

/* View in fullscreen */
const openFullscreen = element => {
  if (element.requestFullscreen) element.requestFullscreen();
  /* Safari */
  else if (element.webkitRequestFullscreen) element.webkitRequestFullscreen();
  /* IE11 */
  else if (element.msRequestFullscreen) element.msRequestFullscreen();
}

/* Close fullscreen */
const closeFullscreen = () => {
  if (document.exitFullscreen) document.exitFullscreen();
  /* Safari */
  else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
  /* IE11 */
  else if (document.msExitFullscreen) document.msExitFullscreen();
}

/* Toggle fullscreen */
const toggleFullscreen = element => {
  if (document.fullscreen == false) openFullscreen(document.querySelector(element));
  else closeFullscreen();
}

const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;

const getRandomItem = (arr) => {

  // get random index value
  const randomIndex = Math.floor(Math.random() * arr.length);

  // get random item
  const item = arr[randomIndex];

  return item;
}

export class Terminal {
  constructor() {
    
    this.terminal = document.querySelector("#terminal > #commands");
    
    window.onfocus = () => this.terminal.classList.add("active");
    
    window.onblur = () => this.terminal.classList.remove("active");
    
    delete this.createElementFromHTML;
    
    return this;
  }
  run() {
    
    this.clear();

    document.querySelectorAll(`link[type="image/x-icon"]`).forEach(
      icon => icon.href = "data:image/png;base64,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"
    );
    
    document.setTitle("Terminal");

    const _closeFullscreen = () => {
      if (document.fullscreen !== false) closeFullscreen();
    }

    document.querySelector("#terminal_header div.close")
      .addEventListener("click", event => _closeFullscreen());

    document.querySelector("#terminal_header div.fullscreen")
      .addEventListener("click", event => toggleFullscreen("#terminal"));

    document.querySelector("#terminal_header div.minimize")
      .addEventListener("click", event => _closeFullscreen());
    
  }
  echo(string = '', speed_typing = 64) {

    const typed = (
      element,
      speed = 60
    ) => {
      var element = element;
      var index = 0;
      var text = element.innerText;

      element.innerHTML = ''

      function typeWriter() {
        if (index < text.length) {
          element.innerText += text.charAt(index);
          index++;
          setTimeout(typeWriter, speed);
        }
      }

      typeWriter();

    }
    
    const echo = (str = '') => {
      // if (str.trim(" ").length < 1) return;
      let li = document.createElement("li");
      let pre = document.createElement("pre");
      var _elm = this.createElementFromHTML(str);

      pre.append(_elm);
      li.append(pre);

      this.terminal.append(li);
      pre.querySelectorAll("*").forEach(element => typed(element, speed_typing));
    
      scrollToBottom(this.terminal);
    }
    
    // replace br tags to \n
    string = replaceAll(string, /<br>/i, "\n");
    string = replaceAll(string, /<br\/>/i, "\n");

    if (str_includes(string, "\n")) {
      var lines = string.split("\n");
      lines.forEach(line => echo(line));
    } else echo(string);
    
  }
  input(type, text, placeholder = "", required = false, func = (value, func) => {}) {

    const getAction = () => {

      let action = `action_`;

      const EN_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      const NUMBERS = "0123456789";
      const keys = EN_ALPHABET + NUMBERS;

      for (let index = 0; index < random(20, (9 ** 9)); index++) {
        let new_key = getRandomItem(keys.split(''));
        new_key = getRandomItem([true, false]) ? new_key.toLowerCase() : new_key.toUpperCase();
        action += new_key;
      }

      return action;

    }

    const action = getAction();

    let li = document.createElement("li");
    let label = document.createElement("label");
    label.setAttribute("for", action)
    let pre = document.createElement("pre");
    pre.classList.add("input");
    var _elm = this.createElementFromHTML(text);

    let input = document.createElement("input");
    input.id = action;
    input.name = action;
    input.type = type ? type : "text";
    input.dir = "ltr";
    input.placeholder = placeholder;
    input.translate = false;
    input.spellcheck = false;

    let div = document.createElement("div");
    div.classList.add("before");

    pre.append(_elm);
    pre.append(input);
    pre.append(div);
    label.append(pre);
    li.append(label);

    this.terminal.append(li);

    input.addEventListener("keydown", event => {
      const _input = (input || event.srcElement || event.target);
      const _func = () => {
        _input.disabled = true;
        _input.readOnly = true;
        _input.classList.add("active");
        this.echo(" ‌")
      }
      const _value = _input.value.trim(" ");
      if (event.key === "Enter" && _value.length > 0) {
        if (required) {
          if (_value.toUpperCase() !== "N") func(_value, _func);
        } else {
          const _new_value = _value.toUpperCase() !== "N" ? _value : null;
          func(_new_value, _func);
        }
      }
    });

    input.focus();

    scrollToBottom(this.terminal);

  }

  /**
   * @param {String} text Dialog text
   * @param {Object{}} buttons Dialog buttons
   */
  dialog(text, buttons) {
    const isObject = obj => {
      var type = typeof obj;
      return type === 'function' || (type === 'object' && !!obj);
    }

    text = text ? text : '<span></span>';

    let li = document.createElement("li");
    let pre = document.createElement("pre");
    pre.classList.add("dialog");
    var _elm = this.createElementFromHTML(text);

    let buttonBox = document.createElement("div");
    buttonBox.classList.add("button-box");

    if (isObject(buttons)) {
      let buttons_length = Object.keys(buttons).length;
      if (buttons_length <= 3 && buttons_length > 0) {
        let text_buttons = Object.keys(buttons)
        text_buttons.forEach(text_button => {
          let button = document.createElement("button");
          button.textContent = button.innerText = text_button;
          let button_class = buttons[text_button].class;
          if (isObject(button_class)) button_class.forEach(class_name => button.classList.add(class_name));
          let button_id = buttons[text_button].id;
          if (typeof button_id === "string") button.id = button_id;
          let button_event = buttons[text_button].event;
          if (isObject(button_event)) button.onclick = event => button_event(event);
          buttonBox.appendChild(button);
        });
      }
    }

    pre.append(_elm);
    pre.append(buttonBox);
    li.append(pre);

    this.terminal.append(li);

    scrollToBottom(this.terminal);

  }
  clear() {
    this.terminal.innerHTML = '';
  }
  
  /**
   * @param {String} HTML representing any number of sibling elements
   * @return {NodeList} 
   */
  createElementFromHTML(htmlString = "") {
    var template = document.createElement('template');
   
    template.innerHTML = htmlString;
    
    return template.content;
  }
}
