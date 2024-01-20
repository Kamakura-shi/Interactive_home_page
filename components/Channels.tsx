import { useEffect, useRef, useState } from "react";
import { convert } from "../convert";
import { elapsed } from "../elapsed";

type ChannelsProps = {
  num: string;
  name: string;
  page: {
    num: string;
    tag: string;
    link: string;
  };
  count: string | number;
  time: Date;
  seconds: number;
  imageLink: string;
  openLink: string;
};

const COUNT_CONV = Intl.NumberFormat(undefined, { notation: "compact" });

export function Channels({
  num,
  name,
  page,
  count,
  time,
  seconds,
  imageLink,
  openLink,
}: ChannelsProps) {
  const [run, setRun] = useState(false);
  const info = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (info.current == null) return;

    if (run) {
      info.current.currentTime = 0;
      info.current.play();
    } else {
      info.current.pause();
    }
  }, [run]);

  return (
    <div
      className="flex flex-col gap-2 w-[50%]"
      onMouseEnter={() => setRun(true)}
      onMouseLeave={() => setRun(false)}
    >
      <a href={`/watch=?v=${num}`} className="relative aspect-video">
        <img
          src={imageLink}
          className={`block w-full h-full object-cover transition-[border-radius] duration-200 ${
            run ? "rounded-none" : "rounded-x1"
          }`}
        />
        <div className="absolute bottom-1 right-1 bg-secondary-dark text-secondary text-sm px-0.5 rounded">
          {convert(seconds)}
        </div>
        <img
          className={`block h-full object-cover absolute inset-0 transition-opacity: duration-200 ${
            run ? "opacity-100" : "opacity-0"
          }`}
          // // ref={info}
          // muted
          // playsInline
          src={openLink}
        />
      </a>
      <div className="flex gap-2">
        <a href={`/@${page.num}`} className="flex-shrink-0">
          <img className="w-12 h-12 rounded-full" src={page.link} />
        </a>
        <div className="flex flex-col">
          <a href={`/watch=${num}`} className="font-bold">
            {name}
          </a>
          <a href={`/@${page.num}`} className="text-secondary-text text-sm">
            {page.tag}
          </a>
          <div className="text-secondary-text text-sm">
            {COUNT_CONV.format(count)} Watched ∻ {elapsed(time)}
          </div>
        </div>
      </div>
    </div>
  );
}
