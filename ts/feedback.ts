interface FeedbackType {
  rating?: number;
  name: string;
  comments: string;
}
let stars = Array.from(
  document.getElementsByClassName("star") as HTMLCollectionOf<HTMLElement>
);
let feedbackRating = document.getElementById(
  "feedbackRating"
) as HTMLInputElement;

getSelectedStarsCount();

function getSelectedStarsCount() {
  
  stars.forEach((star) => {
    star.addEventListener("click", function () {
      validation.innerText="";
      const dataValue = star.getAttribute("data-value");
      if (dataValue !== null) {
        const rating = parseInt(dataValue);
        removeSelectedStars();
        for (let i = 0; i < rating; i++) {
          stars[i].classList.add("selected");
        }
        feedbackRating.value = rating.toString();
      } else {
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
const validation= document.getElementById("validation") as HTMLParagraphElement;

feedbackForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const form = event.target as HTMLFormElement;
  let feedbackData = new FormData(form);

  let feedback = {
    rating: Number(feedbackData.get("rating")) as number,
    name: feedbackData.get("name") as string,
    comments: feedbackData.get("comment") as string,
  }
  if (feedback.rating !== 0) {
      
    console.log(feedback);
  } else {
    validation.innerText="Please rate us";
    

  }
});
