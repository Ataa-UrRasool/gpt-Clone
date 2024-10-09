const API_KEY = "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";
const submitButton = document.querySelector("#submit");
const outputElement = document.querySelector("#output");
const inputElement = document.querySelector("input");
const historyElement = document.querySelector(".history");
const buttonElement = document.querySelector("button");

function changeInput(value) {
  const inputElement1 = document.querySelector("input");
  inputElement1.value = value;
}

async function getMessage() {
  console.log("CLICKED");
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: inputElement.value }],
    }),
  };

  try {
    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      options
    );
    const data = await response.json();
    outputElement.textContent = data.choices[0].message.content;
    if (data.choices[0].message.content && inputElement.value) {
      const pElement = document.createElement("p");
      pElement.textContent = inputElement.value;
      pElement.addEventListener("click", () =>
        changeInput(pElement.textContent)
      );
      historyElement.append(pElement);
    }

    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

submitButton.addEventListener("click", getMessage);

function clearInput() {
  inputElement.value = "";
  outputElement.textContent = "";
}

buttonElement.addEventListener("click", clearInput);
