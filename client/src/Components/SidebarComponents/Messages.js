import React, { useState } from "react";
import { useMessage } from "../../Contexts/MessagesProvider";

const Messages = () => {
  const { messages, selectedMessageIndex } = useMessage();
  const [searchText, setSearchText] = useState("");

  const spans = document.querySelectorAll(".user-Message");
  const spanArray = Array.from(spans);

  if (spanArray.length === 0) {
    console.log("empty");
  } else {
    spanArray.forEach((span) => {
      if (searchText !== "") {
        if (span.innerText === "") {
          span.classList.add("remove");
        } else {
          span.classList.remove("remove");
        }
      } else {
        span.classList.remove("remove");
      }
    });
  }

  return (
    <div className="messages-Container">
      <section className="search-Container">
        <input
          type="text"
          placeholder="Search Messages"
          onChange={(e) => setSearchText(e.target.value)}
          value={searchText}
        />
      </section>
      <section className="m-Container">
        {messages.map((message, i) => (
          <span
            className="user-Message"
            key={i}
            onClick={() => selectedMessageIndex(i)}
            id={message.selected ? "true" : "false"}
          >
            {message.receivers
              .filter((item) => {
                return searchText === ""
                  ? item
                  : item.name.includes(searchText);
              })
              .map((r) => r.name)
              .join(", ")}
          </span>
        ))}
      </section>
    </div>
  );
};

export default Messages;
