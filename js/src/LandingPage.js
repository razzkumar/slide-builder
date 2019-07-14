/*
 *A class that create the landing login/signup page of the application
 */

class LandingPage {
  /*
   *@param {*} container  HTML elemet where landing page appended
   */
  constructor(container) {
    this.container = container;
    this.landingWrapper = createElementAndAppend({
      parentElem: this.container,
      attr: {
        class: "landing-page"
      }
    });
  }

  /* 
   * A function that initilization the landing page and 
   */

  init() {

    let tabGroup = createElementAndAppend({
      parentElem: this.landingWrapper,
      elemType: "ul",
      attr: {
        class: "tab-group"
      }
    });

    let signUpTabBtn = createElementAndAppend({
      parentElem: tabGroup,
      elemType: "li",
      attr: {
        class: "active"
      },
      innerHTML: '<a href="#signup">Register</a>'
    });

    this.logInTabBtn = createElementAndAppend({
      parentElem: tabGroup,
      elemType: "li",
      innerHTML: '<a href="#login">Login</a>'
    });

    signUpTabBtn.addEventListener("click", (e) => {
      e.preventDefault();

      e.currentTarget.classList.add("active");
      e.currentTarget.nextSibling.classList.remove("active");

      document.querySelector("#login input").value = ""
      document.querySelector("#login").style.display = "none";

      document.querySelector("#signup").style.display = "block";
    });


    this.logInTabBtn.addEventListener("click", (e) => {

      e.preventDefault();

      e.currentTarget.classList.add("active");
      e.currentTarget.previousSibling.classList.remove("active")
      document.querySelector("#signup").style.display = "none";
      document.querySelector("#signup input").value = "";
      document.querySelector("#login").style.display = "block";
    });

    let tabContent = createElementAndAppend({
      parentElem: this.landingWrapper,
      attr: {
        class: "tab-content"
      }
    });

    // Sign up
    let signUpWrapper = createElementAndAppend({
      parentElem: tabContent,
      attr: {
        id: "signup"
      },
      innerHTML: '<h1>Sign Up for Free</h1>'
    });

    this.signUpForm = createElementAndAppend({
      parentElem: signUpWrapper,
      elemType: "form",
      attr: {
        class: "field-wrap"
      },
      innerHTML: '<label for="signup">User Name :</label>'
    });

    this.signUpInput = createElementAndAppend({
      parentElem: this.signUpForm,
      elemType: "input",
      attr: {
        type: "text",
        id: "signup",
        required: true,
        autocomplete: "off",
      }
    })

    this.signUpBtn = createElementAndAppend({
      parentElem: this.signUpForm,
      elemType: "input",
      attr: {
        type: "submit",
        value: "Get Started",
        name: "signup",
        class: "button"
      }
    });


    // Login

    let logInWrapper = createElementAndAppend({
      parentElem: tabContent,
      attr: {
        id: "login"
      },
      innerHTML: '<h1>Please Enter Your User name</h1>'
    });

    this.loginForm = createElementAndAppend({
      parentElem: logInWrapper,
      elemType: 'form',
      attr: {
        class: "field-wrap"
      },
      innerHTML: '<label for="login">User Name :</label>'
    });

    this.loginInput = createElementAndAppend({
      parentElem: this.loginForm,
      elemType: "input",
      attr: {
        type: "text",
        id: "login",
        required: true,
        autocomplete: "off",
      }
    });

    // loginBtn
    createElementAndAppend({
      parentElem: this.loginForm,
      elemType: "input",
      attr: {
        type: "submit",
        value: "Log In",
        name: "login",
        class: "button"
      }
    });

    return this;
  }
  /* A function that remove the landing page after login success 
   */
  hide() {
    if (this.landingWrapper) {

      let parentElem = this.landingWrapper.parentElement;
      parentElem && parentElem.removeChild(this.landingWrapper);
    }
  }
}
