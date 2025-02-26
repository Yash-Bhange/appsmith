import { get } from "lodash";
import { useDispatch } from "react-redux";
import styled, { useTheme } from "styled-components";
import React, { useCallback } from "react";

import {
  updatePage,
  clonePageInit,
  deletePage,
  setPageAsDefault,
} from "actions/pageActions";
import EditName from "./EditName";
import ContextMenu from "./ContextMenu";
import { FormIcons } from "icons/FormIcons";
import { ControlIcons } from "icons/ControlIcons";

import { Page } from "constants/ReduxActionConstants";
import AnalyticsUtil from "utils/AnalyticsUtil";

export const Container = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  cursor: grab;

  &:focus,
  &:active {
    cursor: grabbing;
  }
`;

export const ListItem = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  padding: 10px;
  background-color: ${(props) => props.theme.colors.appBackground};
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
`;

export const Action = styled.button`
  cursor: pointer;
  height: 28px;
  width: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  border: none;
  background: transparent;
  margin-left: 8px;

  &:hover,
  &:active,
  &.active {
    background: ${(props) => (props.disabled ? "initial" : "#e1e1e1")};
  }

  &:focus {
    outline: none;
  }
`;

const HomeIcon = FormIcons.HOME_ICON;
const DeleteIcon = FormIcons.DELETE_ICON;
const CopyIcon = ControlIcons.COPY_CONTROL;
const DragIcon = ControlIcons.DRAG_CONTROL;
const HideIcon = ControlIcons.HIDE_COLUMN;

const DefaultPageIcon = styled(HomeIcon)`
  margin-right: 5px;
`;

export interface PageListItemProps {
  item: Page;
  applicationId: string;
}

function PageListItem(props: PageListItemProps) {
  const theme = useTheme();
  const { applicationId, item } = props;
  const dispatch = useDispatch();

  /**
   * clones the page
   *
   * @return void
   */
  const clonePageCallback = useCallback((): void => {
    dispatch(clonePageInit(item.pageId, true));
  }, [dispatch]);

  /**
   * delete the page
   *
   * @return void
   */
  const deletePageCallback = useCallback((): void => {
    dispatch(deletePage(item.pageId));

    AnalyticsUtil.logEvent("DELETE_PAGE", {
      pageName: item.pageName,
    });
  }, [dispatch]);

  /**
   * sets the page as default
   *
   * @return void
   */
  const setPageAsDefaultCallback = useCallback((): void => {
    dispatch(setPageAsDefault(item.pageId, props.applicationId));
  }, [dispatch]);

  /**
   * sets the page hidden
   *
   * @return void
   */
  const setPageHidden = useCallback(() => {
    return dispatch(updatePage(item.pageId, item.pageName, !item.isHidden));
  }, [dispatch]);

  return (
    <Container>
      <ListItem>
        <DragIcon
          color={get(theme, "colors.pagesEditor.iconColor")}
          cursor="move"
          height={20}
          width={20}
        />
        <EditName applicationId={applicationId} page={item} />
        <Actions>
          {item.isDefault && (
            <Action disabled title="Default page">
              <DefaultPageIcon
                color={get(theme, "colors.primaryOld")}
                height={16}
                width={16}
              />
            </Action>
          )}
          {item.isHidden && (
            <Action disabled title="Hidden">
              <HideIcon
                color={get(theme, "colors.pagesEditor.iconColor")}
                height={16}
                width={16}
              />
            </Action>
          )}
          <ContextMenu
            applicationId={applicationId}
            onCopy={clonePageCallback}
            onDelete={deletePageCallback}
            onSetPageDefault={setPageAsDefaultCallback}
            onSetPageHidden={setPageHidden}
            page={item}
          />
          <Action title="Clone" type="button">
            <CopyIcon
              color={get(theme, "colors.pagesEditor.iconColor")}
              height={16}
              onClick={clonePageCallback}
              width={16}
            />
          </Action>
          <Action title="Delete" type="button">
            <DeleteIcon
              color={
                item.isDefault
                  ? get(theme, "colors.propertyPane.deleteIconColor")
                  : get(theme, "colors.pagesEditor.iconColor")
              }
              disabled={item.isDefault}
              height={16}
              onClick={deletePageCallback}
              width={16}
            />
          </Action>
        </Actions>
      </ListItem>
    </Container>
  );
}
export default PageListItem;
