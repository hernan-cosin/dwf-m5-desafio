import { initHome } from "./pages/home";
import { initGame } from "./pages/game";
import { initResultLoose } from "./pages/result/loose";
import { initResultWin } from "./pages/result/win";
import { initInstructions } from "./pages/instructions";

const routes = [
  {
    path: /\/home/,
    page: initHome,
  },
  {
    path: /\/dwf-m5-desafio\/home/,
    page: initHome,
  },
  {
    path: /\/dwf-m5-desafio\/instructions/,
    page: initInstructions,
  },
  {
    path: /\/dwf-m5-desafio\/game/,
    page: initGame,
  },
  {
    path: /\/dwf-m5-desafio\/result\/loose/,
    page: initResultLoose,
  },
  {
    path: /\/dwf-m5-desafio\/result\/win/,
    page: initResultWin,
  },
];

export function initRouter(container: Element) {
  function goTo(path) {
    history.pushState({}, "", path);
    handleRoute(path);
  }

  function handleRoute(route) {
    for (const r of routes) {
      if (r.path.test(route)) {
        const el = r.page({ goTo: goTo });
        container.firstChild?.remove();
        container.appendChild(el);
      }
    }
  }

  if (location.host.includes("github.io")) {
    goTo("/dwf-m5-desafio/home");
  }
  if (location.pathname == "/") {
    goTo("/home");
  } else {
    handleRoute(location.pathname);
  }
  window.onpopstate = function () {
    handleRoute(location.pathname);
  };
}
