import { List, Map, Bell, User, Mic, Search, ArrowLeft } from "lucide-react";
import logo from "../src/assets/logo.svg";
import { Button } from "./components/Button";
import { useState } from "react";
import { Message } from "./components/option";

export function Component() {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <div className="flex gap-10 lg:gap-20 justify-between pt-2 mb-6 mx-4">
      <ComponentMenu none={showSearch} />
      <form
        className={`md:flex hidden gap-4 flex-grow justify-center ${
          showSearch ? "flex" : "hidden"
        }`}
      >
        {showSearch && (
          <Button
            onClick={() => setShowSearch(false)}
            type="button"
            size="icon"
            variant="ghost"
            className="flex-shrink-0"
          >
            <ArrowLeft />
          </Button>
        )}
        <div className="flex flex-grow max-w-[600px]">
          <input
            type="search"
            placeholder="Search"
            className="rounded-1-full border border-secondary-border shadow-inner shadow-secondary py-1 px-4 text-lg w-full focus:border-blue-500 outline-none"
          />
          <Button className="py-2 px-4 rounded-r-full border-secondary-border border border-1-0 flex-shrink-0">
            <Search />
          </Button>
        </div>
        <Button type="button" size="icon" className="flex-shrink-0">
          <Mic />
        </Button>
      </form>
      <div
        className={`flex-shrink-0 md:gap-2 ${showSearch ? "hidden" : "flex"}`}
      >
        <Button
          onClick={() => setShowSearch(true)}
          size="icon"
          variant="ghost"
          className="md:hidden"
        >
          <Search />
        </Button>
        <Button size="icon" variant="ghost" className="md:hidden">
          <Mic />
        </Button>
        <Button size="icon" variant="ghost">
          <Map />
        </Button>
        <Button size="icon" variant="ghost">
          <Bell />
        </Button>
        <Button size="icon" variant="ghost">
          <User />
        </Button>
      </div>
    </div>
  );
}

type ComponentMenuProps = {
  none?: boolean;
};

export function ComponentMenu({ none = false }: ComponentMenuProps) {
  const { active } = Message();

  return (
    <div
      className={`gap-4 items-center flex-shrink-0 ${none ? "hidden" : "flex"}`}
    >
      <Button onClick={active} variant="ghost" size="icon">
        <List />
      </Button>
      <a href="/">
        <img src={logo} className="h-6" />
      </a>
    </div>
  );
}
