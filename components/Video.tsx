import { MoveLeft, MoveRight } from "lucide-react";
import { Button } from "./Button";
import { useEffect, useRef, useState } from "react";

type VideoProps = {
  genres: string[];
  select: string;
  onSelect: (genre: string) => void;
};

const TRANSITION_VALUE = 200;

export function Video({ genres, select, onSelect }: VideoProps) {
  const [transition, setTransition] = useState(0);
  const [appearLeft, setAppearLeft] = useState(true);
  const [appearRight, setAppearRight] = useState(true);
  const sizeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sizeRef.current == null) return;

    const check = new ResizeObserver((data) => {
      const size = data[0]?.target;

      if (size == null) return;

      setAppearLeft(transition > 0);
      setAppearRight(transition + size.clientWidth < size.scrollWidth);
    });

    check.observe(sizeRef.current);

    return () => {
      check.disconnect();
    };
  }, [genres, transition]);

  return (
    <div ref={sizeRef} className="overflow-x-hidden relative">
      <div
        className="flex whitespace-nowrap gap-3 transition-trnsform w-[max-content]"
        style={{ transform: `translateX(-${transition}px` }}
      >
        {genres.map((genre) => (
          <Button
            key={genre}
            onClick={() => onSelect(genre)}
            variant={select === genre ? "dark" : "default"}
            className="py-1 px-3 rounded-1g whitespace-nowrap"
          >
            {genre}
          </Button>
        ))}
      </div>
      {appearLeft && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 bg-gradient-to-r from-white from-50% to-transparent w-24 h-full">
          <Button
            variant="ghost"
            size="icon"
            className="h-full aspect-square w-auto p-0.75"
            onClick={() => {
              setTransition((transition) => {
                const nextTransition = transition - TRANSITION_VALUE;
                if (nextTransition <= 0) return 0;
                return nextTransition;
              });
            }}
          >
            <MoveLeft />
          </Button>
        </div>
      )}
      {appearRight && (
        <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-gradient-to-l from-white from-50% to-transparent w-24 h-full flex justify-end">
          <Button
            variant="ghost"
            size="icon"
            className="h-full aspect-square w-auto p-0.75"
            onClick={() => {
              setTransition((transition) => {
                if (sizeRef.current == null) {
                  return transition;
                }
                const nextTransition = transition + TRANSITION_VALUE;
                const end = sizeRef.current.scrollWidth;
                const length = sizeRef.current.clientWidth;
                if (nextTransition + length >= end) {
                  return end - length;
                }
                return nextTransition;
              });
            }}
          >
            <MoveRight />
          </Button>
        </div>
      )}
    </div>
  );
}
