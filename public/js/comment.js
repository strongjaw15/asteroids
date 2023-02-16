const newComment = document.querySelector(".comment-form");

async function postComment(event) {
  event.preventDefault();

  const content = document.querySelector("#comment-input").value;
//  const user_id = document.querySelector(`#user_id`).value;
  const asteroid_id = document.querySelector("#asteroid_id").value;
  console.log(content);
  console.log(asteroid_id);
  const response = await fetch("/api/comments", {
    method: "POST",
    body: JSON.stringify({ content, asteroid_id }),
    headers: { "Content-Type": "application/json" },
  });
  console.log(response);
  if (response.ok) {
    document.location.reload();
    console.log("ok");
  } else {
    alert(response.statusText);
  }
}

newComment.addEventListener("submit", postComment);
