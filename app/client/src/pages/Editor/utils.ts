import { getDependenciesFromInverseDependencies } from "components/editorComponents/Debugger/helpers";
import _, { debounce } from "lodash";
import ReactDOM from "react-dom";
import ResizeObserver from "resize-observer-polyfill";

export const draggableElement = (
  id: string,
  element: any,
  onPositionChange: any,
  initPostion?: any,
  renderDragBlockPositions?: {
    left?: string;
    top?: string;
    zIndex?: string;
    position?: string;
  },
  dragHandle?: () => JSX.Element,
) => {
  let newXPos = 0,
    newYPos = 0,
    oldXPos = 0,
    oldYPos = 0;
  let dragHandler = element;
  let isDragged = !!initPostion;

  const setElementPosition = () => {
    element.style.top = initPostion.top + "px";
    element.style.left = initPostion.left + "px";
  };

  const dragMouseDown = (e: MouseEvent) => {
    e = e || window.event;
    oldXPos = e.clientX;
    oldYPos = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  };
  const calculateBoundaryConfinedPosition = (
    calculatedLeft: number,
    calculatedTop: number,
  ) => {
    if (calculatedLeft <= 0) {
      calculatedLeft = 0;
    }
    if (calculatedTop <= 30) {
      calculatedTop = 30;
    }
    if (calculatedLeft >= window.innerWidth - element.clientWidth) {
      calculatedLeft = window.innerWidth - element.clientWidth;
    }
    if (calculatedTop >= window.innerHeight - element.clientHeight) {
      calculatedTop = window.innerHeight - element.clientHeight;
    }
    return {
      left: calculatedLeft,
      top: calculatedTop,
    };
  };

  const elementDrag = (e: MouseEvent) => {
    e = e || window.event;
    e.preventDefault();
    newXPos = oldXPos - e.clientX;
    newYPos = oldYPos - e.clientY;
    oldXPos = e.clientX;
    oldYPos = e.clientY;
    const calculatedTop = element.offsetTop - newYPos;
    const calculatedLeft = element.offsetLeft - newXPos;
    element.style.top = calculatedTop + "px";
    element.style.left = calculatedLeft + "px";
    const validFirstDrag = !isDragged && newXPos !== 0 && newYPos !== 0;
    if (validFirstDrag) {
      resizeObserver.observe(element);
      isDragged = true;
    }
  };

  const calculateNewPosition = () => {
    const { height, left, top, width } = element.getBoundingClientRect();
    const isElementOpen = height && width;
    const {
      left: calculatedLeft,
      top: calculatedTop,
    } = calculateBoundaryConfinedPosition(left, top);

    return {
      updatePosition: isDragged && isElementOpen,
      left: calculatedLeft,
      top: calculatedTop,
    };
  };

  const updateElementPosition = () => {
    const calculatedPositionData = calculateNewPosition();
    if (calculatedPositionData.updatePosition) {
      const { left, top } = calculatedPositionData;
      onPositionChange({
        left: left,
        top: top,
      });
      element.style.top = top + "px";
      element.style.left = left + "px";
    }
  };

  const closeDragElement = () => {
    updateElementPosition();
    document.onmouseup = null;
    document.onmousemove = null;
  };
  const debouncedUpdatePosition = debounce(updateElementPosition, 50);

  const resizeObserver = new ResizeObserver(function() {
    debouncedUpdatePosition();
  });

  if (isDragged) {
    resizeObserver.observe(element);
  }

  const OnInit = () => {
    if (dragHandle) {
      dragHandler = createDragHandler(
        id,
        element,
        dragHandle,
        renderDragBlockPositions,
      );
    }
    if (initPostion) {
      setElementPosition();
    }
    dragHandler.addEventListener("mousedown", dragMouseDown);
    // stop clicks from propogating to widget editor.
    dragHandler.addEventListener("click", (e: any) => e.stopPropagation());
  };

  OnInit();
};

const createDragHandler = (
  id: string,
  el: any,
  dragHandle: () => JSX.Element,
  renderDragBlockPositions?: {
    left?: string;
    top?: string;
    zIndex?: string;
    position?: string;
  },
) => {
  const oldDragHandler = document.getElementById(`${id}-draghandler`);
  const dragElement = document.createElement("div");
  dragElement.setAttribute("id", `${id}-draghandler`);
  dragElement.style.position = renderDragBlockPositions?.position ?? "absolute";
  dragElement.style.left = renderDragBlockPositions?.left ?? "135px";
  dragElement.style.top = renderDragBlockPositions?.top ?? "0px";
  dragElement.style.zIndex = renderDragBlockPositions?.zIndex ?? "3";
  oldDragHandler
    ? el.replaceChild(dragElement, oldDragHandler)
    : el.appendChild(dragElement);
  ReactDOM.render(dragHandle(), dragElement);
  return dragElement;
};

export const useIsWidgetActionConnectionPresent = (
  widgets: any,
  actions: any,
  deps: any,
): boolean => {
  const actionLables = actions.map((action: any) => action.config.name);

  return !!Object.keys(widgets)
    .map((key) => widgets[key])
    .find((widget) => {
      const depsConnections = getDependenciesFromInverseDependencies(
        deps,
        widget.widgetName,
      );
      return !!_.intersection(depsConnections?.directDependencies, actionLables)
        .length;
    });
};
