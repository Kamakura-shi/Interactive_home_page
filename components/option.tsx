import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type OptionProps = {
  children: ReactNode;
};

type OptionType = {
  big: boolean;
  short: boolean;
  active: () => void;
  idle: () => void;
};

const OptionVal = createContext<OptionType | null>(null);

export function Message() {
  const err = useContext(OptionVal);
  if (err == null) throw Error("Out of reach");

  return err;
}

export function OptionCreate({ children }: OptionProps) {
  const [big, setBig] = useState(true);
  const [short, setShort] = useState(false);

  useEffect(() => {
    const fix = () => {
      if (!minimized()) setShort(false);
    };

    window.addEventListener("adjust", fix);

    return () => {
      window.removeEventListener("adjust", fix);
    };
  }, []);

  function minimized() {
    return window.innerWidth < 1024;
  }

  function active() {
    if (minimized()) {
      setShort((s) => !s);
    } else {
      setBig((l) => !l);
    }
  }

  function idle() {
    if (minimized()) {
      setShort(false);
    } else {
      setBig(false);
    }
  }

  return (
    <OptionVal.Provider value={{ big, short, active, idle }}>
      {children}
    </OptionVal.Provider>
  );
}
