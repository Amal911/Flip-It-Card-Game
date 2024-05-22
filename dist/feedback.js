var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let stars = Array.from(document.getElementsByClassName("star"));
let feedbackRating = document.getElementById("feedbackRating");
getSelectedStarsCount();
function getSelectedStarsCount() {
    stars.forEach((star) => {
        star.addEventListener("click", function () {
            validation.innerText = "";
            const dataValue = star.getAttribute("data-value");
            if (dataValue !== null) {
                const rating = parseInt(dataValue);
                removeSelectedStars();
                for (let i = 0; i < rating; i++) {
                    stars[i].classList.add("selected");
                }
                feedbackRating.value = rating.toString();
            }
            else {
                console.error("Data value is null or undefined.");
            }
        });
    });
}
function removeSelectedStars() {
    stars.forEach((star) => {
        star.classList.remove("selected");
    });
}
const feedbackForm = document.getElementById("feedbackFormId");
const validation = document.getElementById("validation");
feedbackForm === null || feedbackForm === void 0 ? void 0 : feedbackForm.addEventListener("submit", (event) => __awaiter(void 0, void 0, void 0, function* () {
    event.preventDefault();
    const form = event.target;
    let feedbackData = new FormData(form);
    let feedback = {
        rating: Number(feedbackData.get("rating")),
        name: feedbackData.get("name"),
        comments: feedbackData.get("comment"),
    };
    if (feedback.rating !== 0) {
        console.log(feedback);
    }
    else {
        validation.innerText = "Please rate us";
    }
}));
export {};
