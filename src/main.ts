import "./style.css";

const app = document.querySelector<HTMLDivElement>("#app");
const btn = document.querySelector<HTMLButtonElement>("#btn")!;

const swapCells = (fElem: HTMLCanvasElement, sElem: HTMLCanvasElement) => {
  const fNext = fElem.nextElementSibling;
  sElem.parentNode?.insertBefore(fElem, sElem);
  fElem.parentNode?.insertBefore(sElem, fNext);
};

const swapCellsWithAnimation = (
  fElem: HTMLCanvasElement,
  sElem: HTMLCanvasElement,
) => {
  const fNext = fElem.nextElementSibling;
  sElem.animate(
    {
      transform: "scale(1.2)",
      boxShadow: "0 0 15px 3px rgba(0, 0, 0, 1)",
      border: "1px #222",
    },
    { duration: 200, fill: "forwards", easing: "ease" },
  ).onfinish = () => {
    fElem.animate(
      {
        transform: "scale(0)",
        boxShadow: "0px 0px 0px 0px rgba(0, 0, 0, 0)",
        border: "0px",
      },
      { duration: 400, fill: "forwards", easing: "ease" },
    );
    sElem.animate(
      {
        transform: "scale(0)",
        boxShadow: "0px 0px 0px 0px rgba(0, 0, 0, 0)",
        border: "0px",
      },
      { duration: 400, fill: "forwards", easing: "ease" },
    ).onfinish = () => {
      sElem.parentNode?.insertBefore(fElem, sElem);
      fElem.parentNode?.insertBefore(sElem, fNext);
      sElem.animate(
        {
          transform: "scale(1)",
        },
        { duration: 400, fill: "forwards", easing: "ease" },
      );
      fElem.animate(
        {
          transform: "scale(1)",
        },
        { duration: 400, fill: "forwards", easing: "ease" },
      );
    };
  };
};

btn.onclick = () => {
  const iter = Math.round((xL * yL) / 4);
  for (let i = 0; i < iter; i++) {
    const x = Math.floor(Math.random() * xL);
    const y = Math.floor(Math.random() * yL);
    const fElem = arr[y][x];
    const sElem =
      arr[Math.floor(Math.random() * yL)][Math.floor(Math.random() * xL)];
    swapCellsWithAnimation(fElem, sElem);
  }
};

const imageObj = new Image();

const xL = 24;
const yL = 13;
const wh = 50;

let isOneSelected: boolean = false;
let selectedCell: HTMLCanvasElement = null;

const arr: Array<Array<HTMLCanvasElement>> = [];

const onClick = (e: MouseEvent) => {
  const cell = e.target as HTMLCanvasElement;
  if (!isOneSelected) {
    cell.animate(
      {
        transform: "scale(1.2)",
        boxShadow: "0 0 15px 3px rgba(0, 0, 0, 1)",
        border: "1px #222",
      },
      {
        duration: 200,
        easing: "ease",
        fill: "forwards",
      },
    );
    isOneSelected = true;
    selectedCell = cell;
  } else {
    swapCellsWithAnimation(selectedCell, cell);
    isOneSelected = false;
  }
};

imageObj.onload = () => {
  for (let y = 0; y < yL; y++) {
    arr[y] = [];
    for (let x = 0; x < xL; x++) {
      const canvas = document.createElement("canvas");
      arr[y][x] = canvas;
      canvas.onclick = onClick;
      const ctx = canvas.getContext("2d");
      const cfX = imageObj.width / xL;
      const cfY = imageObj.height / yL;
      ctx?.drawImage(
        imageObj,
        x * cfX,
        y * cfY,
        cfX,
        cfY,
        0,
        0,
        wh * 6,
        wh * 3,
      );
      canvas.classList.add("card");
      canvas.style.width = `${wh}px`;
      canvas.style.height = `${wh}px`;

      app.appendChild(canvas);
    }
  }
};

imageObj.src =
  "https://opis-cdn.tinkoffjournal.ru/mercury/oshi-no-ko-in.iuz4lttpehvx..jpg";
