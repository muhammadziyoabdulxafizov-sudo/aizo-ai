
"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const chat = document.getElementById("chat");
  const form = document.getElementById("chatForm");
  const input = document.getElementById("message");
  const newChatButton = document.getElementById("newChat");

  let conversation = [];

  if (!chat || !form || !input || !newChatButton) {
    console.error(
      "AIZO AI: HTML elementlari topilmadi. index.html dagi ID nomlarini tekshiring."
    );
    return;
  }

  function addMessage(text, sender) {
    const message = document.createElement("div");
    message.className = `message ${sender}`;

    const label = document.createElement("div");
    label.className = "message-label";
    label.textContent = sender === "user" ? "SEN" : "AIZO AI";

    const content = document.createElement("div");
    content.className = "message-content";
    content.textContent = text;

    message.appendChild(label);
    message.appendChild(content);
    chat.appendChild(message);

    chat.scrollTop = chat.scrollHeight;

    return message;
  }

  function getReply(question) {
    const q = question.toLowerCase();

    if (q.includes("salom")) {
      return "Salom! Men AIZO AI. Senga qanday yordam bera olaman?";
    }

    if (q.includes("kim") && q.includes("yarat")) {
      return "Men AIZO AI — sen yaratayotgan sun'iy intellekt loyihasiman.";
    }

    if (q.includes("python")) {
      return "Python — dasturlash tili. U orqali o'yinlar, saytlar va AI loyihalarini yaratish mumkin.";
    }

    if (q.includes("sayt") || q.includes("html")) {
      return "HTML sayt tuzilishini, CSS dizaynini, JavaScript esa interaktivligini boshqaradi.";
    }

    if (q.includes("biznes")) {
      return "Biznes boshlash uchun g'oyani tanla, xaridorlar ehtiyojini o'rgan va kichik sinovdan boshla.";
    }

    return "Savolingni oldim! Hozircha men sinov rejimidaman. Haqiqiy AI javoblari uchun modelga ulanishimiz kerak.";
  }

  function showWelcome() {
    chat.replaceChildren();

    const welcome = document.createElement("div");
    welcome.className = "welcome";

    const symbol = document.createElement("div");
    symbol.className = "symbol";
    symbol.textContent = "✦";

    const heading = document.createElement("h1");
    heading.appendChild(document.createTextNode("Kelajakni "));

    const highlight = document.createElement("span");
    highlight.textContent = "birga yaratamiz.";

    heading.appendChild(highlight);

    const paragraph = document.createElement("p");
    paragraph.textContent = "Menga istalgan savolingni yoz.";

    welcome.append(symbol, heading, paragraph);
    chat.appendChild(welcome);
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const question = input.value.trim();

    if (question.length === 0) {
      return;
    }

    const welcome = chat.querySelector(".welcome");

    if (welcome) {
      welcome.remove();
    }

    addMessage(question, "user");
    conversation.push({
      role: "user",
      content: question
    });

    input.value = "";

    const reply = getReply(question);

    addMessage(reply, "ai");

    conversation.push({
      role: "assistant",
      content: reply
    });

    input.focus();
  });

  newChatButton.addEventListener("click", () => {
    conversation = [];
    showWelcome();
    input.focus();
  });
});
