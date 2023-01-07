import { Terminal } from "./terminal.js";

/* https://github.com/msfpt/password-list-generator
   License: MIT License
*/

// taking care of forEach object problem in FireFox, Internet Explorer, WaterFox
if (typeof NodeList.prototype.forEach !== 'function') NodeList.prototype.forEach = Array.prototype.forEach;


String.prototype.reverse = function () {
  var str = this + '';

  // Check the input is invalid
  if (!str || str.length < 2 ||
    typeof str !== 'string') {
    return str;
  }

  // Take empty array revArray 
  const revArray = [];
  const length = str.length - 1;

  // Looping from the end 
  for (let i = length; i >= 0; i--) {
    revArray.push(str[i]);
  }

  // Joining the array elements 
  return revArray.join('');
}

const existIn = (data, _data) => { return data.indexOf(_data) !== -1; }

const multiply_text = (text = "", number = 1) => {
  let new_text = "";
  for (let index = 0; index < (number); index++) {
    new_text += text;
  }
  return new_text;
}

const isNumber = data => {
  if (typeof data === "string") {
    if ((data = data.trim()) === '') return false;
    const
      NUMBERS_CHARS = "0123456789".split(''),
      TEXT_CHARS = data.split('');
    let result = true;
    TEXT_CHARS.forEach(char => { if (!NUMBERS_CHARS.includes(char)) return (result = false); });
    return result;
  }
  else if (typeof data === "number") return true;
  else return false;
}

const subsets_of_max_2 = (data = []) => {
  let new_data = [];
  for (let i_1 = 0; i_1 < data.length; i_1++) {
    new_data.push(data[i_1]);
    for (let i_2 = 0; i_2 < data.length; i_2++) {
      new_data.push(data[i_1] + data[i_2]);
    }
  }
  return new_data;
}

const chars_modeler = (word, extra_chars, repeat = 1) => {
  extra_chars = extra_chars.split('');
  let words = [word];
  for (var i_1 = 0; i_1 < (word.length + 1); i_1++) {
    for (let i_2 = 0; i_2 < repeat; i_2++) {
      extra_chars.forEach(
        extra_char => words.push(
          word.slice(0, i_1) +
          multiply_text(extra_char, (i_2 + 1)) +
          word.slice(i_1, word.length)
        )
      );
    }
  }
  return words;
}

const remove_duplicates = _array => {
  let unique = [];
  _array.forEach(element => {
    if (!unique.includes(element)) unique.push(element);
  });
  return unique;
}

// Get language
const language = (window.navigator.languages
  ? window.navigator.languages.join(", ")
  : (window.navigator.lasubsets_of_max_2nguage || window.navigator.userLanguage)
).toLowerCase();

const getBase64 = file => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

const createTextFile = (fileName, content) => {
  fileName = `${fileName ? fileName : "file"}.txt`;
  const blobToFile = (theBlob, fileName) => {
    return new File([theBlob], fileName, {
      lastModified: new Date().getTime(),
      type: theBlob.type
    });
  }
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  return blobToFile(blob, fileName);
}

const main = (event) => {
  
  const reStart = () => {
    try { main(); }
    catch (error) {
      if (window.navigator.onLine) window.location.reload();
    }
  }
  
  const terminal = new Terminal();

  terminal.run();

  const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

  const Persian = "fa", Arabic = "ar";
  const jalali_date = (existIn(language, Persian) || existIn(language, Arabic));

  const banner = ` 
${multiply_text(" ", ((width / 200 | 0) * 5) + 5)}<code class="color-purple bold">Password</code>  <code class="color-purple bold">List</code>
${multiply_text(" ", ((width / 200 | 0) * 5) + 9)}<code class="color-purple bold">Generator</code>
                      
${multiply_text(" ", (width / 200 | 0) * 3)}<a class="color-blue bold" href="https://t.me/msfpt" target="_blank">[Telegram]</a>${multiply_text(" ", (width / 200 | 0) * 5)}<a class="color-gray" href="https://github.com/msfpt" target="_blank">[GitHub]</a>
\n‌\n‌
${multiply_text(" ", (width / 200 | 0))}<code class="color-pink bold">Skip & Next</code> <code class="color-pink">=></code> <code class="color-pink bold">Type</code> <code class="color-pink bold italic">N</code> <code class="color-pink bold">& press</code> <code class="color-pink bold italic">Enter</code>
\n‌
${multiply_text(" ", (width / 200 | 0))}<code class="color-pink bold">Only unnecessary items can be ignored!</code>
\n‌\n‌`
  
  terminal.echo(banner);

  let values = {};
  values["phone_numbers"] = [];
  values["emails"] = [];
  values["more"] = [];

  const generatePasswordList = data => {
    const createPasswords = (data = {}) => {
      let content = [];
      if (data.name === undefined || data.lastName === undefined || data.age === undefined) return false;
      content.push(data.name);
      content.push(data.lastName);
      content.push(data.age.toString());
      if (!(data.nickName == undefined || data.nickName == null)) content.push(data.nickName);
      if (!(data.birthday == undefined || data.birthday == null)) [data.birthday.year, data.birthday.month, data.birthday.day].forEach(date => content.push(date.toString()));
      if (!(data.phone_numbers == undefined || data.phone_numbers == null)) data.phone_numbers.forEach(phone_number => content.push(phone_number.toString()));
      if (!(data.emails == undefined || data.emails == null)) data.emails.forEach(email => content.push(email, email.split("@")[0]));
      if (!(data.more == undefined || data.more == null)) data.more.forEach(more_data => content.push(more_data));
      content = remove_duplicates(content);
      content = subsets_of_max_2(content);
      let new_content = [];
      content.forEach(_content => chars_modeler(_content, "@_-.$?#!&^%'+*", 3).forEach(element => new_content.push(element)));
      return remove_duplicates(content = new_content).join("\n");
    }
    let _res_w = (width / 200 | 0) * 20;
    _res_w = _res_w <= 60 ? _res_w : 60;
    terminal.echo(`‌\n <code class="color-red bold x2">${multiply_text('-', _res_w)}</code>`, 20);
    setTimeout(() => {
      terminal.echo("‌\n <code class='color-green bold'>Analyzing information ...</code>", 50);
      setTimeout(() => {
        terminal.echo("‌\n <code class='color-green bold'>Generating passwords ...</code>", 45);
        setTimeout(() => {
          const error = error => {
            terminal.echo("‌\n");
            terminal.dialog("‌ <code class='color-orange bold'>There is a problem : </code>", {
              "Try again": {
                event: event => {
                  terminal.echo(`‌\n <code class="color-yellow bold">Try again :</code>`, 5);
                  (event.srcElement || event.target).disabled = true;
                  generatePasswordList(data);
                },
                class: ["try-again"],
              }
            });
            terminal.echo(`‌\n <code class="color-red bold x2">${multiply_text('-', _res_w)}</code>`, 20);
          }
          const success = link => {
            terminal.echo(`\n‌\n <a class="color-l-blue bold" href="${link ? link : '#'}" download="password-list.txt" target="_blank">Click to save “password-list.txt” .</a>`);
            setTimeout(() => {
              terminal.echo(`‌\n <code class="color-red bold x2">${multiply_text('-', _res_w)}</code>`, 20);
              setTimeout(() => {
                terminal.echo("‌\n");
                terminal.dialog("‌ <code class='color-white'>Do you want it again?</code>", {
                  "Yes": {
                    event: event => reStart(),
                    id: "restart",
                  }
                });
              }, 3000);
            }, 4000);
          }
          const content = createPasswords(data);
          console.log(content);
          if (content !== false) {
            const file = createTextFile("password-list", content);
            getBase64(file)
              .then(success)
              .catch(error);
          } else error(false);
        }, 2000);
      }, 2000);
    }, 3000);
  }

  setTimeout(() =>
  // Get name target
  terminal.input("text", `<code class="color-green">Name <code class="bold">:</code> </code>`, "Target name", true, (value, stop_input) => {
    stop_input()
    values["name"] = value; 
    // Get last name target
    terminal.input("text", `<code class="color-green">Last Name <code class="bold">:</code> </code>`, "Target last name", true, (value, stop_input) => {
      stop_input()
      values["lastName"] = value; 
      // Get age target
      terminal.input("number", `<code class="color-green">Age <code class="bold">:</code> </code>`, "Target age", true, (value, stop_input) => {
        var _age = (+value | 0);
        if (_age > 0 && _age < 300 && value.length <= 3) {
          stop_input();
          values["age"] = _age; 
          // Get nick name target
          terminal.input("text", `<code class="color-green">Nick Name<code class="bold">:</code> </code>`, "Target nick name", false, (value, stop_input) => {
            stop_input()
            values["nickName"] = value;
            // Get birthday target
            terminal.input("text", `<code class="color-green">Birthday (${jalali_date ? "1371" : "2000"}/01/01)<code class="bold">:</code> </code>`, "Target birthday", false, (value, stop_input) => {
              /**
               * @param {String} date format = YYYY/MM/DD
               * @return {Boolean} 
               */
              const dateIsValid = date => {
                let isValid = false;
                let data = date.split("/");
                let year = data[0];
                let month = data[1];
                let day = data[2];
                if (data.length === 3) {
                  if (isNumber(year) && isNumber(month) && isNumber(day)) {
                    year = (+data[0] | 0);
                    month = (+data[1] | 0);
                    day = (+data[2] | 0);
                    if (
                      (year  >= 1200 && year  <= 3000) &&
                      (month >= 0    && month <= 12  ) &&
                      (day   >= 0    && day   <= 31  )
                    ) isValid = true;
                  }
                }
                return isValid;
              }
              // Get phone numbers target
              const inputPhoneNumbers = () => {
                // Get emails target
                const inputEmails = () => {
                  const inputMore = () => {
                    const more_event = (value, stop_input) => {
                      if (value === null) [stop_input(), generatePasswordList(values)];
                      else {
                        if (value.length >= 3 && value.length <= 50) {
                          let more = values.more;
                          if (!existIn(more, value)) {
                            more.push(value);
                            values["more"] = more;
                            stop_input();
                            terminal.input("text", `<code class="color-green">Add More<code class="bold">:</code> </code>`, "more info", false, more_event);
                          }
                        }
                      }
                    }
                    terminal.input("text", `<code class="color-green">Add More<code class="bold">:</code> </code>`, "more info", false, more_event);
                  }
                  /** @param {String} mail email text */
                  const ValidateEmail = mail => {
                    const regexp = /(?:[a-z0-9+!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/gi;
                    return !!mail.match(regexp);
                  }
                  const email_event = (value, stop_input) => {
                    if (value === null) [stop_input(), inputMore()];
                    else {
                      if (ValidateEmail(value)) {
                        let emails = values.emails;
                        var email = value;
                        if (!existIn(emails, email)) {
                          emails.push(email);
                          values["emails"] = emails;
                          stop_input();
                          terminal.input("email", `<code class="color-green">Email<code class="bold">:</code> </code>`, "Target email", false, email_event);
                        }
                      }
                    }
                  }
                  terminal.input("email", `<code class="color-green">Email<code class="bold">:</code> </code>`, "Target email", false, email_event);
                }
                const getPhoneNumber = phone_number => phone_number.split(' ').join('');
                const isPhoneNumber = phone_number => { return isNumber(phone_number) ? ((phone_number.length >= 4 && phone_number.length <= 20) ? true : false) : false; }
                const phone_number_event = (value, stop_input) => {
                  if (value === null) [stop_input(), inputEmails()];
                  else {
                    let phone_number = getPhoneNumber(value);
                    if (isPhoneNumber(phone_number)) {
                      let phone_numbers = values.phone_numbers;
                      phone_number = phone_number | 0;
                      if (!existIn(phone_numbers, phone_number)) {
                        phone_numbers.push(phone_number);
                        values["phone_numbers"] = phone_numbers;
                        stop_input();
                        terminal.input("text", `<code class="color-green">Phone Number<code class="bold">:</code> </code>`, "Target phone number", false, phone_number_event);
                      }
                    }
                  }
                }
                terminal.input("text", `<code class="color-green">Phone Number<code class="bold">:</code> </code>`, "Target phone number", false, phone_number_event);
              }

              if (value == null) {
                values["birthday"] = null;
                stop_input();
                inputPhoneNumbers();
              } else {
                const isValid = dateIsValid(value);
                if (isValid) {
                  let _birthday = value.split("/");
                  _birthday = {
                    year: (_birthday[0] | 0),
                    month: (_birthday[1] | 0),
                    day: (_birthday[2] | 0),
                  }
                  values["birthday"] = _birthday;
                  stop_input();
                  inputPhoneNumbers();
                }
              }

            });
          });
        }
      });
    });
  }), 3200);
}

// DOM fully loaded and parsed
window.addEventListener('DOMContentLoaded', main);