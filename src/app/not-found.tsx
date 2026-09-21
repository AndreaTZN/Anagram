"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import CaseNavReset from "@/components/CaseNavReset";

gsap.registerPlugin(useGSAP);

const CLOCK_HOURS = Array.from({ length: 12 }, (_, index) => index + 1);
const CLOCK_ZONES = [
  { id: "paris", timeZone: "Europe/Paris" },
  { id: "new-york", timeZone: "America/New_York" },
] as const;
const COLOR_PAIRS = [
  ["#03c8ff", "#e3cefc"],
  ["#c3bd9a", "#ff331b"],
  ["#9feb4a", "#f3ff65"],
  ["#8b7759", "#f981fe"],
] as const;

type ClockBody = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  spin: number;
};

type Surface = { width: number; height: number; size: number };

const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value));
const randomBetween = (min: number, max: number) =>
  min + Math.random() * (max - min);

function createBody(): ClockBody {
  return { x: 0, y: 0, vx: 0, vy: 0, rotation: 0, spin: 0 };
}

function stepBody(body: ClockBody, surface: Surface, dt: number) {
  const floor = surface.height - surface.size;
  const rightWall = Math.max(0, surface.width - surface.size);

  // Simulation distances use rem so the motion follows the site's fluid type scale.
  body.vy += 96.875 * dt;
  body.x += body.vx * dt;
  body.y += body.vy * dt;
  body.rotation = (body.rotation + body.spin * dt) % 360;
  body.spin = clamp(body.spin * Math.pow(0.42, dt), -45, 45);

  if (body.x < 0 || body.x > rightWall) {
    body.x = clamp(body.x, 0, rightWall);
    body.vx *= -0.58;
  }

  if (body.y > floor) {
    body.y = floor;
    body.vy = Math.abs(body.vy) > 2.875 ? body.vy * -0.28 : 0;
    body.vx *= 0.94;
    body.spin *= 0.55;
  }
}

function resolveCollision(bodies: ClockBody[], surface: Surface) {
  const [first, second] = bodies;
  const rightWall = Math.max(0, surface.width - surface.size);
  const floor = surface.height - surface.size;

  // Repeated position corrections prevent the large clock faces from nesting.
  for (let pass = 0; pass < 4; pass += 1) {
    const dx = second.x - first.x;
    const dy = second.y - first.y;
    const distance = Math.hypot(dx, dy);
    if (distance >= surface.size) break;

    const normalX = distance > 0 ? dx / distance : 1;
    const normalY = distance > 0 ? dy / distance : 0;
    const overlap = surface.size - distance;

    first.x -= normalX * overlap * 0.5;
    first.y -= normalY * overlap * 0.5;
    second.x += normalX * overlap * 0.5;
    second.y += normalY * overlap * 0.5;

    const relativeVelocity =
      (second.vx - first.vx) * normalX +
      (second.vy - first.vy) * normalY;

    if (pass === 0 && relativeVelocity < -0.375) {
      const restitution = Math.abs(relativeVelocity) > 15 ? 0.48 : 0.3;
      const impulse = (-(1 + restitution) * relativeVelocity) / 2;

      first.vx -= impulse * normalX;
      first.vy -= impulse * normalY;
      second.vx += impulse * normalX;
      second.vy += impulse * normalY;

      const tangentialVelocity =
        (second.vx - first.vx) * -normalY +
        (second.vy - first.vy) * normalX;
      const angularKick = clamp(tangentialVelocity * 0.24, -8, 8);
      first.spin = clamp(first.spin * 0.75 + angularKick, -45, 45);
      second.spin = clamp(second.spin * 0.75 + angularKick, -45, 45);
    }

    first.x = clamp(first.x, 0, rightWall);
    second.x = clamp(second.x, 0, rightWall);
    first.y = Math.min(floor, first.y);
    second.y = Math.min(floor, second.y);
  }
}

function getClockAngles(formatter: Intl.DateTimeFormat, date: Date) {
  const values = Object.fromEntries(
    formatter.formatToParts(date).map(({ type, value }) => [type, value]),
  );
  const hours = Number(values.hour);
  const minutes = Number(values.minute);
  const seconds = Number(values.second);

  return [
    ((hours % 12) + minutes / 60 + seconds / 3600) * 30,
    (minutes + seconds / 60) * 6,
    seconds * 6,
  ];
}

export default function NotFound() {
  const surfaceRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const surface = surfaceRef.current;
      if (!surface) return;

      const media = gsap.matchMedia();
      media.add(
        {
          all: "(min-width: 0rem)",
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const still = context.conditions?.reduceMotion;
          const clocks = Array.from(
            surface.querySelectorAll<HTMLDivElement>("[data-clock]"),
          );
          const bodies = clocks.map(createBody);
          let dimensions: Surface = { width: 0, height: 0, size: 0 };
          let paletteIndex = 0;

          gsap.set(clocks, {
            x: 0,
            y: 0,
            rotation: 0,
            autoAlpha: 1,
            willChange: still ? "auto" : "transform",
          });

          const setters = clocks.map((clock) => ({
            x: gsap.quickSetter(clock, "x", "rem"),
            y: gsap.quickSetter(clock, "y", "rem"),
            rotation: gsap.quickSetter(clock, "rotation", "deg"),
            color: gsap.quickSetter(clock, "backgroundColor"),
          }));

          const clockHands = clocks.map((clock, index) => {
            const formatter = new Intl.DateTimeFormat("en-GB", {
              timeZone: CLOCK_ZONES[index].timeZone,
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
              hourCycle: "h23",
            });
            const angles = getClockAngles(formatter, new Date());
            const hands = Array.from(
              clock.querySelectorAll<SVGLineElement>("[data-hand]"),
            );
            gsap.set(hands, {
              svgOrigin: "312 312",
              rotation: (handIndex: number) => angles[handIndex],
            });

            return {
              formatter,
              angles,
              rotate: still
                ? []
                : hands.map((hand) =>
                    gsap.quickTo(hand, "rotation", {
                      duration: 0.12,
                      ease: "power2.out",
                    }),
                  ),
            };
          });

          function renderBodies() {
            bodies.forEach((body, index) => {
              setters[index].x(body.x);
              setters[index].y(body.y);
              setters[index].rotation(body.rotation);
            });
          }

          function respawn() {
            bodies.forEach((body, index) => {
              const { width, height, size } = dimensions;
              body.x = still
                ? index * Math.max(0, width - size)
                : randomBetween(0, Math.max(0, width - size));
              body.y = still
                ? Math.max(0, height - size * (index === 0 ? 1.65 : 1))
                : -size * randomBetween(0.25, 0.75);
              body.vx = randomBetween(-6.875, 6.875);
              body.vy = randomBetween(5, 16.25);
              body.rotation = still ? 0 : randomBetween(-15, 15);
              body.spin = randomBetween(-24, 24);
              setters[index].color(COLOR_PAIRS[paletteIndex][index]);
            });
            renderBodies();
          }

          function measure() {
            const rem = parseFloat(
              getComputedStyle(document.documentElement).fontSize,
            );
            // Cache geometry on resize; the animation loop only writes transforms.
            dimensions = {
              width: surface!.clientWidth / rem,
              height: surface!.clientHeight / rem,
              size: clocks[0].offsetWidth / rem,
            };
            respawn();
          }

          measure();
          const observer = new ResizeObserver(measure);
          observer.observe(surface);
          observer.observe(clocks[0]);

          if (still) return () => observer.disconnect();

          gsap
            .timeline({
              repeat: -1,
              repeatDelay: 0.32,
              onRepeat: () => {
                // Advance by a nonzero offset so consecutive palettes always differ.
                paletteIndex =
                  (paletteIndex + 1 + Math.floor(Math.random() * 3)) %
                  COLOR_PAIRS.length;
                respawn();
              },
            })
            .fromTo(clocks, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.18 })
            .to(clocks, { autoAlpha: 0, duration: 0.18 }, 3);

          let previousSecond = Math.floor(Date.now() / 1000);
          const animate = (_time: number, deltaTime: number) => {
            const dt = Math.min(deltaTime / 1000, 0.032);
            bodies.forEach((body) => stepBody(body, dimensions, dt));
            resolveCollision(bodies, dimensions);
            renderBodies();

            const date = new Date();
            const second = Math.floor(date.getTime() / 1000);
            if (second === previousSecond) return;
            previousSecond = second;

            clockHands.forEach(({ formatter, angles, rotate }) => {
              getClockAngles(formatter, date).forEach((angle, index) => {
                // Accumulate turns to keep the hands moving forward across midnight.
                angles[index] += (angle - (angles[index] % 360) + 360) % 360;
                rotate[index](angles[index]);
              });
            });
          };

          gsap.ticker.add(animate);
          return () => {
            gsap.ticker.remove(animate);
            observer.disconnect();
          };
        },
        surface,
      );

      return () => media.revert();
    },
    { scope: surfaceRef },
  );

  return (
    <main
      ref={surfaceRef}
      id="not-found-root"
      aria-labelledby="not-found-title"
      className="relative isolate h-dvh min-h-[24rem] w-full overflow-hidden bg-[#f4f4f4] text-[#0c0c0c]"
    >
      <CaseNavReset />

      {CLOCK_ZONES.map((zone, index) => (
        <div
          key={zone.id}
          id={`not-found-clock-${zone.id}`}
          data-clock
          aria-hidden="true"
          className="pointer-events-none absolute top-0 left-0 aspect-square w-[min(39rem,90%,69svh)] rounded-full opacity-0 select-none max-[62rem]:w-[min(39rem,90%,47svh)]"
          style={{ backgroundColor: COLOR_PAIRS[0][index] }}
        >
          <svg viewBox="0 0 624 624" className="h-full w-full" fill="currentColor">
            {CLOCK_HOURS.map((hour) => {
              const angle = (hour * 30 * Math.PI) / 180;
              return (
                <text
                  key={hour}
                  x={(312 + Math.sin(angle) * 257).toFixed(3)}
                  y={(312 - Math.cos(angle) * 257).toFixed(3)}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontSize="50"
                  fontWeight="400"
                >
                  {hour}
                </text>
              );
            })}
            <g stroke="currentColor" strokeLinecap="round">
              <line data-hand x1="312" y1="312" x2="312" y2="156" strokeWidth="6" />
              <line data-hand x1="312" y1="312" x2="312" y2="125" strokeWidth="6" />
              <line data-hand x1="312" y1="312" x2="312" y2="75" strokeWidth="3" opacity="0.55" />
            </g>
            <circle cx="312" cy="312" r="11" />
          </svg>
        </div>
      ))}

      <div
        id="not-found-message"
        className="absolute top-1/2 left-1/2 z-10 flex w-[min(33.75rem,calc(100%-2rem))] -translate-x-1/2 -translate-y-1/2 items-center justify-between gap-6 rounded-full bg-[#0c0c0c]/20 px-[1.625rem] py-[1.125rem] text-base leading-none text-white backdrop-blur-[5rem]"
      >
        <h1 id="not-found-title" className="font-normal">Error 404</h1>
        <p className="text-white/70">Missing Page</p>
      </div>

    </main>
  );
}
