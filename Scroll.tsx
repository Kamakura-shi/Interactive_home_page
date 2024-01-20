import {
  Youtube,
  Video,
  Share,
  ArrowDown,
  ArrowUp,
  Film,
  Users,
} from "lucide-react";
import { Children, ElementType, ReactNode, useState } from "react";
import { Button, buttonStyles } from "./components/Button";
import { twMerge } from "tailwind-merge";
import { save } from "./components/save";
import { friends } from "./components/friends";
import { Message } from "./components/option";
import { ComponentMenu } from "./component";

export function Scroll() {
  const { big, short, idle } = Message();

  return (
    <>
      <aside
        className={`sticky top-0 overflow-hidden pb-4 flex flex-col ml-1 ${
          big ? "lg: hidden" : "lg:flex"
        }`}
      >
        <ScrollElement Img={Youtube} name="Menu" link="/" />
        <ScrollElement Img={Video} name="Record" link="/" />
        <ScrollElement Img={Share} name="Share" link="/" />
      </aside>
      {short && (
        <div
          onClick={idle}
          className="lg:hidden fixed inset-0 z-[999] bg-secondary-dark opacity-50"
        />
      )}
      <aside
        className={`w-56 lg:sticky absolute top-0 overflow-y-auto scrollbar-hidden pb-4 flex-col gap-2 px-2 ${
          big ? "lg:flex" : "lg:hidden"
        } ${short ? "flex z-[999] bg-white max-h-screen" : "hidden"}`}
      >
        <div className="lg:hidden pt-2 pb-4 px-2 sticky top-0 bg-white">
          <ComponentMenu />
        </div>
        <BigZone>
          <BigElement show Img={Youtube} name="Menu" link="/" />
          <BigElement Img={Video} name="Record" link="/" />
        </BigZone>
        <hr />
        <BigZone seeElement={4}>
          <BigElement show Img={Share} name="Share" link="/" />
          <BigElement Img={Video} name="Record" link="/" />
          {save.map((saved) => (
            <BigElement
              key={saved.num}
              Img={Film}
              name={saved.name}
              link={`/video?folder=${saved.num}`}
            />
          ))}
        </BigZone>
        <hr />
        <BigZone name="Friends">
          {friends.map((friend) => (
            <BigElement
              key={friend.num}
              Img={friend.img}
              name={friend.name}
              link={`/@${friend.num}`}
            />
          ))}
        </BigZone>
        <hr />
        <BigZone name="Social">
          <BigElement Img={Users} name="Social" link="/" />
        </BigZone>
      </aside>
    </>
  );
}

type ScrollElementProps = {
  Img: ElementType | string;
  name: string;
  link: string;
};

function ScrollElement({ Img, name, link }: ScrollElementProps) {
  return (
    <a
      href={link}
      className={twMerge(
        buttonStyles({ variant: "ghost" }),
        "py-4 px-1 flex flex-col items-center rounded-lg gap-1"
      )}
    >
      <Img className="w-6 h-6" />
      <div className="text-sm">{name}</div>
    </a>
  );
}

type BigZoneProps = {
  children: ReactNode;
  name?: string;
  seeElement?: number;
};

function BigZone({
  children,
  name,
  seeElement = Number.POSITIVE_INFINITY,
}: BigZoneProps) {
  const [isMore, setMore] = useState(false);
  const childrenArr = Children.toArray(children).flat();
  const more = childrenArr.length > seeElement;
  const seeChildren = isMore ? childrenArr : childrenArr.slice(0, seeElement);
  const ButtonImg = isMore ? ArrowUp : ArrowDown;

  return (
    <div>
      {name && <div className="m1-4 mt-2 text-lg mb-1">{name}</div>}
      {seeChildren}
      {more && (
        <Button
          onClick={() => setMore((e) => !e)}
          variant="ghost"
          className="w-full flex items-center rounded-lg gap-4 p-3"
        >
          <ButtonImg className="w-6 h-6" />
          <div>{isMore ? "Collpase" : "Expand"}</div>
        </Button>
      )}
    </div>
  );
}

type BigElementProps = {
  Img: ElementType | string;
  name: string;
  link: string;
  show?: boolean;
};

function BigElement({ Img, name, link, show = false }: BigElementProps) {
  return (
    <a
      href={link}
      className={twMerge(
        buttonStyles({ variant: "ghost" }),
        `w-full flex items-center rounded-lg gap-4 p-3 ${
          show ? "font-bold bg-neutral-100 hover:bg-secondary" : undefined
        }`
      )}
    >
      {typeof Img === "string" ? (
        <img src={Img} className="w-6 h-6 rounded-full" />
      ) : (
        <Img className="w-6 h-6" />
      )}
      <div className="whitespace-nowrap overflow-hidden text-ellipsis">
        {name}
      </div>
    </a>
  );
}
