/**
 * Class which is Entry point of the application 
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
   * Initilize the application
   */

  init() {

    this.loader = new Loading(this.container);
    this.notifier = new Notification(this.container);
    this.render();

  }

  render() {

    // checking user is logged in or not
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.loader.hide();
        this.landingPage && this.landingPage.landingWrapper && this.landingPage.landingWrapper.parentElement.removeChild(this.landingPage.landingWrapper);
        this.header = new Header(this.container, BRAND_NAME).init();
        this.slideBuilder = new SlideBuilder(this.container, this.loader, this.notifier, this.header);
        this.slideBuilder.init();

        this.header.logoutBtn.addEventListener("click", (e) => {
          firebase.auth().signOut();
          window.location.reload();
        })
      } else {
        this.loader.hide();
        this.landingPage = new LandingPage(this.container).init();

        this.landingPage.loginInput.addEventListener("input", (e) => {
          this.username = e.target.value;
        });
        this.landingPage.signUpInput.addEventListener("input", (e) => {
          this.username = e.target.value;
        });

        this.landingPage.loginForm.addEventListener("submit", (e) => {

          e.preventDefault();
          // Formating user info for login 
          let name = this.username && this.username.split(" ").join("")
          let userEmail = `${name}-2019@slidebuilder.com`;
          let password = `${name}-2019`;

          // showing loading page
          this.loader.show();

          firebase.auth().signInWithEmailAndPassword(userEmail, password).then(e => {
            // hide loading indicator
            this.loader.hide();
            this.render();
          }).catch(function (error) {
            console.log('error.message:', error.message)
          });
        });

        this.landingPage.signUpForm.addEventListener("submit", (e) => {

          e.preventDefault();

          // Creating fake user email and password

          let name = this.username && this.username.split(" ").join("");
          let userEmail = `${name}-2019@slidebuilder.com`;
          let password = `${name}-2019`;
          if (name && name.length > 2) {
            this.loader.show();
            firebase.auth().createUserWithEmailAndPassword(userEmail, password).then((e) => {
              this.loader.hide();
              this.landingPage.logInTabBtn.click();
              this.render();
            }).catch(error => {
              if (error.message.search("already") > 1) {
                this.landingPage.logInTabBtn.click();
              }
              console.log(error);
            });
          } else {
            alert("Plese enter name greater then 3 char ");
          }

        });
      }
    });

  }
}

new App("app").init();
