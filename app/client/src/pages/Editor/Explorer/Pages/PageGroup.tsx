import React, { memo, useCallback } from "react";
import Entity from "../Entity";
import { pageGroupIcon, settingsIcon } from "../ExplorerIcons";
import { useDispatch, useSelector } from "react-redux";
import { getNextEntityName } from "utils/AppsmithUtils";
import { createPage } from "actions/pageActions";
import { useParams, useHistory } from "react-router";
import { ExplorerURLParams } from "../helpers";
import { Page } from "constants/ReduxActionConstants";
import ExplorerPageEntity from "./PageEntity";
import { AppState } from "reducers";
import { CanvasStructure } from "reducers/uiReducers/pageCanvasStructureReducer";
import { Datasource } from "entities/Datasource";
import { Plugin } from "api/PluginApi";
import { extractCurrentDSL } from "utils/WidgetPropsUtils";
import { PAGE_LIST_EDITOR_URL } from "constants/routes";

type ExplorerPageGroupProps = {
  searchKeyword?: string;
  step: number;
  widgets?: Record<string, CanvasStructure>;
  actions: Record<string, any[]>;
  datasources: Record<string, Datasource[]>;
  plugins: Plugin[];
  showWidgetsSidebar: (pageId: string) => void;
};

const pageGroupEqualityCheck = (
  prev: ExplorerPageGroupProps,
  next: ExplorerPageGroupProps,
) => {
  return (
    prev.widgets === next.widgets &&
    prev.actions === next.actions &&
    prev.datasources === next.datasources &&
    prev.searchKeyword === next.searchKeyword
  );
};

export const ExplorerPageGroup = memo((props: ExplorerPageGroupProps) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const params = useParams<ExplorerURLParams>();

  const pages = useSelector((state: AppState) => {
    return state.entities.pageList.pages;
  });
  const createPageCallback = useCallback(() => {
    const name = getNextEntityName(
      "Page",
      pages.map((page: Page) => page.pageName),
    );
    // Default layout is extracted by adding dynamically computed properties like min-height.
    const defaultPageLayouts = [
      { dsl: extractCurrentDSL(), layoutOnLoadActions: [] },
    ];
    dispatch(createPage(params.applicationId, name, defaultPageLayouts));
  }, [dispatch, pages, params.applicationId]);

  const pageEntities = pages.map((page) => {
    const pageWidgets = props.widgets && props.widgets[page.pageId];
    const pageActions = props.actions[page.pageId] || [];
    const datasources = props.datasources[page.pageId] || [];
    if (!pageWidgets && pageActions.length === 0 && datasources.length === 0)
      return null;
    return (
      <ExplorerPageEntity
        actions={pageActions}
        datasources={datasources}
        key={page.pageId}
        page={page}
        plugins={props.plugins}
        searchKeyword={props.searchKeyword}
        showWidgetsSidebar={props.showWidgetsSidebar}
        step={props.step + 1}
        widgets={pageWidgets}
      />
    );
  });

  if (pageEntities.filter(Boolean).length === 0) return null;

  return (
    <Entity
      action={() =>
        history.push(PAGE_LIST_EDITOR_URL(params.applicationId, params.pageId))
      }
      alwaysShowRightIcon
      className="group pages"
      disabled
      entityId="Pages"
      icon={pageGroupIcon}
      isDefaultExpanded
      name="Pages"
      onClickRightIcon={() => {
        history.push(PAGE_LIST_EDITOR_URL(params.applicationId, params.pageId));
      }}
      onCreate={createPageCallback}
      rightIcon={settingsIcon}
      searchKeyword={props.searchKeyword}
      step={props.step}
    >
      {pageEntities}
    </Entity>
  );
}, pageGroupEqualityCheck);

ExplorerPageGroup.displayName = "ExplorerPageGroup";

(ExplorerPageGroup as any).whyDidYouRender = {
  logOnDifferentValues: false,
};

export default ExplorerPageGroup;
