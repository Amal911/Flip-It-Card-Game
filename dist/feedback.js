"use strict";
let stars = Array.from(document.getElementsByClassName("star"));
let feedbackRating = document.getElementById("feedbackRating");
let selectedStarsCount = document.getElementById("selectedStars");
getSelectedStarsCount();
function getSelectedStarsCount() {
    stars.forEach(star => {
        star.addEventListener("click", function () {
            const dataValue = star.getAttribute("data-value");
            if (dataValue !== null) {
                const rating = parseInt(dataValue);
                removeSelectedStars();
                for (let i = 0; i < rating; i++) {
                    stars[i].classList.add("selected");
                }
                feedbackRating.value = rating.toString();
                console.log(feedbackRating.value);
                //   selectedStarsCount.innerText = rating.toString();
            }
            else {
                console.error("Data value is null or undefined.");
            }
        });
    });
}
function removeSelectedStars() {
    stars.forEach(star => {
        star.classList.remove("selected");
    });
}
