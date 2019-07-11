class LandingPage {

  constructor(container) {
    this.container = container;
    this.landingWrapper = createElementAndAppend({
      parentElem: this.container,
      attr: {
        class: "landing-page"
      }
    });
  }

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
        class: "tab active"
      },
      innerHTML: '<a href="#signup">Sign Up</a>'
    });

    this.logInTabBtn = createElementAndAppend({
      parentElem: tabGroup,
      elemType: "li",
      attr: {
        class: "tab"
      },
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
      e.currentTarget.previousSibling.classList.remove("active");

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

    let signUpInputFieldWrapper = createElementAndAppend({
      parentElem: signUpWrapper,
      attr: {
        class: "field-wrap"
      },
      innerHTML: '<label for="signup">User Name :</label>'
    });

    this.signUpInput = createElementAndAppend({
      parentElem: signUpInputFieldWrapper,
      elemType: "input",
      attr: {
        type: "text",
        id: "signup",
        required: true,
        autocomplete: "off",
      }
    })

    this.signUpBtn = createElementAndAppend({
      parentElem: signUpWrapper,
      elemType: "button",
      innerText: "Get Started",
      attr: {
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

    let inputFieldWrapper = createElementAndAppend({
      parentElem: logInWrapper,
      attr: {
        class: "field-wrap"
      },
      innerHTML: '<label for="login">User Name :</label>'
    });

    this.loginInput = createElementAndAppend({
      parentElem: inputFieldWrapper,
      elemType: "input",
      attr: {
        type: "text",
        id: "login",
        required: true,
        autocomplete: "off",
      }
    });

    this.loginBtn = createElementAndAppend({
      parentElem: logInWrapper,
      elemType: "button",
      innerText: "Log In",
      attr: {
        class: "button"
      }
    });

    return this;
  }
  hide() {
    this.landingWrapper && this.landingWrapper.parentElement && this.landingWrapper.parentElement.removeChild(this.landingWrapper);
  }
}
