"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const feedbackForm = document.getElementById("feedbackFormId");
feedbackForm === null || feedbackForm === void 0 ? void 0 : feedbackForm.addEventListener("submit", (event) => __awaiter(void 0, void 0, void 0, function* () {
    event.preventDefault();
    const form = event.target;
    let feedbackData = new FormData(form);
    let feedback = () => ({
        rating: Number(feedbackData.get("rating")),
        name: feedbackData.get("name"),
        comments: feedbackData.get("comment"),
    });
    console.log(feedback());
}));
