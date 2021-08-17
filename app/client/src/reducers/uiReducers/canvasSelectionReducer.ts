import { createImmerReducer } from "utils/AppsmithUtils";
import { ReduxAction, ReduxActionTypes } from "constants/ReduxActionConstants";
import { MAIN_CONTAINER_WIDGET_ID } from "constants/WidgetConstants";
import { XYCoord } from "react-dnd";

const initialState: CanvasSelectionState = {
  isDraggingForSelection: false,
  widgetId: "",
  outOfCanvasStartPositions: undefined,
};

export const canvasSelectionReducer = createImmerReducer(initialState, {
  [ReduxActionTypes.START_CANVAS_SELECTION]: (
    state: CanvasSelectionState,
    action: ReduxAction<{ widgetId?: string }>,
  ) => {
    state.isDraggingForSelection = true;
    state.widgetId = action.payload.widgetId;
  },
  [ReduxActionTypes.STOP_CANVAS_SELECTION]: (state: CanvasSelectionState) => {
    state.isDraggingForSelection = false;
    state.widgetId = "";
    state.outOfCanvasStartPositions = undefined;
  },
  [ReduxActionTypes.START_CANVAS_SELECTION_FROM_EDITOR]: (
    state: CanvasSelectionState,
    action: ReduxAction<{ startPoints?: XYCoord }>,
  ) => {
    state.isDraggingForSelection = true;
    state.widgetId = MAIN_CONTAINER_WIDGET_ID;
    state.outOfCanvasStartPositions = action.payload.startPoints;
  },
  [ReduxActionTypes.STOP_CANVAS_SELECTION_FROM_EDITOR]: (
    state: CanvasSelectionState,
  ) => {
    state.isDraggingForSelection = false;
    state.widgetId = "";
    state.outOfCanvasStartPositions = undefined;
  },
});

export type CanvasSelectionState = {
  isDraggingForSelection: boolean;
  widgetId?: string;
  outOfCanvasStartPositions?: XYCoord;
};

export default canvasSelectionReducer;
