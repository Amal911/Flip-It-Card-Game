interface FeedbackType {
  rating?: number;
  name: string;
  comments: string;
}

const feedbackForm = document.getElementById("feedbackFormId");

feedbackForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const form = event.target as HTMLFormElement;
  let feedbackData = new FormData(form);

  let feedback = (): FeedbackType => ({
    rating: Number(feedbackData.get("rating")) as number,
    name: feedbackData.get("name") as string,
    comments: feedbackData.get("comment") as string,
  });

  console.log(feedback());
});
