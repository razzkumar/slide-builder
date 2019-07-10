window.addEventListener("click", (e) => {
  let dropdownElem = document.querySelector(".show");
  if (!e.target.classList.contains("btn") && dropdownElem) {
    dropdownElem.classList.remove("show");
  }

  let modal = document.querySelector('#modal');

  if (e.target == modal) {
    modal.style.display = "none";
  }

})

// Global events that delete selected 
let counter = 0;
window.addEventListener("keydown", e => {
  let activeElem = document.querySelector("[datatoolbaractive = 'true']");
  if (e.key === "Delete" && activeElem) {
    let deleteAbleElem = activeElem.parentElement;
    deleteAbleElem.parentNode.removeChild(deleteAbleElem);
  }

  let presentationSideWrapper = document.querySelector(".fullscreen .presentation-slide");

  if (e.key === "ArrowRight" && presentationSideWrapper) {

    let slides = presentationSideWrapper.children;

    if (counter >= slides.length - 1) return;
    counter++;

    let nextSlide = presentationSideWrapper.querySelector(`[dataslideindex='${counter}']`);
    if (nextSlide) {
      presentationSideWrapper.style.transition = "transform 0.4s ease-in-out";
      presentationSideWrapper.style.transform = `translateX(${-100 * counter}vw)`;
    } else {
      console.log("END of slde");
    }
  }

  if (e.key === "ArrowLeft" && presentationSideWrapper) {

    if (counter <= 0) return
    counter--;

    let prevSlide = presentationSideWrapper.querySelector(`[dataslideindex='${counter}']`);
    if (prevSlide) {
      presentationSideWrapper.style.transition = "transform 0.5s ease-in-out";
      presentationSideWrapper.style.transform = `translateX(${-100 * counter}vw)`;
    } else {
      presentationSideWrapper.style.transform = `translateX(0)`;
      console.log("FIRST SLIDE")
    }
  }

}, false);
