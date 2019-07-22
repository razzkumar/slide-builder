/**
 * Class which is Entry point of the application 
 * 
 * @example 
 * new App({containerId:"app"}).init();
 */

class App {
  /**
   * @param {String} containerId Id of the container whare app is created 
   */

  constructor(containerId) {
    this.id = containerId;
    this.container = document.querySelector(`#${this.id}`);
    this.username = ""
  }

  /**
   * Initilize the application which check user login status and render view 
   */

  init() {

    this.loadingState = new Loading(this.container);
    this.notifier = new Notification(this.container);
    this.render();
    
  }

  render() {
    
    // checking user is logged in or not
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        
        this.username = getUsernameFromEmail(user.email);
        window.localStorage.setItem("username", this.username);
        this.loadingState.hide();
        if (this.landingPage && this.landingPage.landingWrapper) {
          let landingElemPrent = this.landingPage.landingWrapper.parentElement;
          landingElemPrent && landingElemPrent.removeChild(this.landingPage.landingWrapper);
        }
        if(!this.slideBuilder){
          this.slideBuilder = new SlideBuilder(this.container, this.loadingState, this.notifier);
          this.slideBuilder.init();
        }

      } else {

        this.loadingState.hide();

        this.landingPage = new LandingPage(this.container).init();

        // taking username for login
        this.landingPage.loginInput.addEventListener("input", (e) => {
          this.username = e.target.value;
        });

        // taking username for signup
        this.landingPage.signUpInput.addEventListener("input", (e) => {
          this.username = e.target.value;
        });

        // handle login 
        this.landingPage.loginForm.addEventListener("submit", (e) => {

          e.preventDefault();
          // Formating user info for login 
          let name = this.username && this.username.split(" ").join("")
          let userEmail = `${name}-2019@slidebuilder.com`;
          let password = `${name}-2019`;

          // showing loading page
          this.loadingState.show();

          firebase.auth().signInWithEmailAndPassword(userEmail, password).then(e => {
            // hide loading indicator
            window.localStorage.setItem("username", this.username);
            this.loadingState.hide();
            this.notifier.init(`Welcome :${this.username}`, 3500);
            this.render();
          }).catch(error => {
            this.notifier.init(`User ${this.username} is not Registered`, 3000, "error");
            this.username = "";
            this.landingPage.hide();
            this.render();
          });
        });


        this.landingPage.signUpForm.addEventListener("submit", (e) => {

          e.preventDefault();

          // Creating fake user email and password

          let name = this.username && this.username.split(" ").join(""); //removing spaces
          let userEmail = `${name}-2019@slidebuilder.com`;
          let password = `${name}-2019`;

          if (name && name.length > 2) {
            this.loadingState.show();
            firebase.auth().createUserWithEmailAndPassword(userEmail, password).then((e) => {
              this.loadingState.hide();
              this.landingPage.logInTabBtn.click();
              this.render();
            }).catch(error => {
              if (error.message.search("already") > 1) {
                this.landingPage.hide();
                this.landingPage.logInTabBtn.click();
                this.render()
                this.notifier.init("You have already registered <br/> Please login", 3000, "error");
              }
            });
          } else {
            this.notifier.init("Username must contain at least 3  char", 3000, "error");
          }
        });
      }
    });

  }
}

new App("app").init();
