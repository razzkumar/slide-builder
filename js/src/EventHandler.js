let thumbnails = document.querySelectorAll(".slide-list .slide-body");

thumbnails.forEach(thumbnail => {
  thumbnail.addEventListener("click", (e) => {
    let id = e.currentTarget.getAttribute("dataslideindex");
    let activeSlide = document.querySelector(".activeSlide");
    activeSlide.classList.remove("activeSlide")
    document.querySelector(`#slide-${id}`).classList.add("activeSlide")
  })
})
