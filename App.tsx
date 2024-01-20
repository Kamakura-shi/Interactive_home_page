import { useState } from "react";
import { channels, genres } from "./components/genres";
import { Component } from "./component";
import { Video } from "./components/Video";
import { Channels } from "./components/Channels";
import { Scroll } from "./Scroll";
import { OptionCreate } from "./components/option";

export default function App() {
  const [select, setSelect] = useState(genres[0]);

  return (
    <OptionCreate>
      <div className="max-h-screen flex flex-col">
        <Component />
        <div className="grid grid-cols-[auto,1fr] flex-grow-1 overflow-auto">
          <Scroll />
          <div className="overflow-x-hidden px-8 pb-4">
            <div className="sticky top-0 bg-white z-10 pb-4">
              <Video genres={genres} select={select} onSelect={setSelect} />
            </div>
            <div className="grid gap-4 grid-cols-[repeat(auto-fill, minmax(300px,1fr))]">
              {channels.map((channel) => (
                <Channels key={channel.num} {...channel} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </OptionCreate>
  );
}
