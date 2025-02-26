import * as React from "react";
import * as Sentry from "@sentry/react";
import { Alignment } from "@blueprintjs/core";
import { IconName } from "@blueprintjs/icons";

import BaseWidget, { WidgetProps, WidgetState } from "./BaseWidget";
import { WidgetType, WidgetTypes } from "constants/WidgetConstants";
import { EventType } from "constants/AppsmithActionConstants/ActionConstants";
import { ValidationTypes } from "constants/WidgetValidation";
import MenuButtonComponent from "components/designSystems/appsmith/MenuButtonComponent";

export interface MenuButtonWidgetProps extends WidgetProps {
  label?: string;
  textColor?: string;
  isDisabled?: boolean;
  isVisible?: boolean;
  isCompact?: boolean;
  menuItems: Record<
    string,
    {
      widgetId: string;
      id: string;
      index: number;
      isVisible?: boolean;
      isDisabled?: boolean;
      label?: string;
      backgroundColor?: string;
      textColor?: string;
      iconName?: IconName;
      iconColor?: string;
      iconAlign?: Alignment;
      onClick?: string;
    }
  >;
  iconName?: IconName;
  iconColor?: string;
  iconAlign?: Alignment;
}

class MenuButtonWidget extends BaseWidget<MenuButtonWidgetProps, WidgetState> {
  static getPropertyPaneConfig() {
    return [
      {
        sectionName: "General",
        children: [
          {
            propertyName: "label",
            helpText: "Sets the label of a menu",
            label: "Label",
            controlType: "INPUT_TEXT",
            placeholderText: "Enter label",
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.TEXT },
          },
          {
            propertyName: "backgroundColor",
            helpText: "Sets the background color of the widget",
            label: "Background color",
            controlType: "COLOR_PICKER",
            isBindProperty: false,
            isTriggerProperty: false,
          },
          {
            propertyName: "textColor",
            helpText: "Sets the text color of the widget",
            label: "Text color",
            controlType: "COLOR_PICKER",
            isBindProperty: false,
            isTriggerProperty: false,
          },
          {
            propertyName: "isDisabled",
            helpText: "Disables input to the widget",
            label: "Disabled",
            controlType: "SWITCH",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
          {
            propertyName: "isVisible",
            helpText: "Controls the visibility of the widget",
            label: "Visible",
            controlType: "SWITCH",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
          {
            propertyName: "isCompact",
            helpText: "Decides if menu items will consume lesser space",
            label: "Compact",
            controlType: "SWITCH",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
        ],
      },
      {
        sectionName: "Menu Items",
        children: [
          {
            helpText: "Menu items",
            propertyName: "menuItems",
            controlType: "MENU_ITEMS",
            label: "",
            isBindProperty: false,
            isTriggerProperty: false,
            panelConfig: {
              editableTitle: true,
              titlePropertyName: "label",
              panelIdPropertyName: "id",
              updateHook: (
                props: any,
                propertyPath: string,
                propertyValue: string,
              ) => {
                return [
                  {
                    propertyPath,
                    propertyValue,
                  },
                ];
              },
              children: [
                {
                  sectionName: "General",
                  children: [
                    {
                      propertyName: "label",
                      helpText: "Sets the label of a menu item",
                      label: "Label",
                      controlType: "INPUT_TEXT",
                      placeholderText: "Enter label",
                      isBindProperty: true,
                      isTriggerProperty: false,
                      validation: { type: ValidationTypes.TEXT },
                    },
                    {
                      propertyName: "backgroundColor",
                      helpText: "Sets the background color of a menu item",
                      label: "Background color",
                      controlType: "COLOR_PICKER",
                      isBindProperty: false,
                      isTriggerProperty: false,
                    },
                    {
                      propertyName: "textColor",
                      helpText: "Sets the text color of a menu item",
                      label: "Text color",
                      controlType: "COLOR_PICKER",
                      isBindProperty: false,
                      isTriggerProperty: false,
                    },
                    {
                      propertyName: "isDisabled",
                      helpText: "Disables input to the widget",
                      label: "Disabled",
                      controlType: "SWITCH",
                      isJSConvertible: true,
                      isBindProperty: true,
                      isTriggerProperty: false,
                      validation: { type: ValidationTypes.BOOLEAN },
                    },
                    {
                      propertyName: "isVisible",
                      helpText: "Controls the visibility of the widget",
                      label: "Visible",
                      controlType: "SWITCH",
                      isJSConvertible: true,
                      isBindProperty: true,
                      isTriggerProperty: false,
                      validation: { type: ValidationTypes.BOOLEAN },
                    },
                  ],
                },
                {
                  sectionName: "Icon Options",
                  children: [
                    {
                      propertyName: "iconName",
                      label: "Icon",
                      helpText: "Sets the icon to be used for a menu item",
                      controlType: "ICON_SELECT",
                      isBindProperty: false,
                      isTriggerProperty: false,
                      validation: { type: ValidationTypes.TEXT },
                    },
                    {
                      propertyName: "iconColor",
                      helpText: "Sets the icon color of a menu item",
                      label: "Icon color",
                      controlType: "COLOR_PICKER",
                      isBindProperty: false,
                      isTriggerProperty: false,
                    },
                    {
                      propertyName: "iconAlign",
                      label: "Icon alignment",
                      helpText: "Sets the icon alignment of a menu item",
                      controlType: "ICON_ALIGN",
                      isBindProperty: false,
                      isTriggerProperty: false,
                      validation: { type: ValidationTypes.TEXT },
                    },
                  ],
                },
                {
                  sectionName: "Actions",
                  children: [
                    {
                      helpText:
                        "Triggers an action when the menu item is clicked",
                      propertyName: "onClick",
                      label: "onClick",
                      controlType: "ACTION_SELECTOR",
                      isJSConvertible: true,
                      isBindProperty: true,
                      isTriggerProperty: true,
                    },
                  ],
                },
              ],
            },
          },
        ],
      },
      {
        sectionName: "Icon Options",
        children: [
          {
            propertyName: "iconName",
            label: "Icon",
            helpText: "Sets the icon to be used in the menu button",
            controlType: "ICON_SELECT",
            isBindProperty: false,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.TEXT },
          },
          {
            propertyName: "iconColor",
            helpText: "Sets the icon color of a menu item",
            label: "Icon color",
            controlType: "COLOR_PICKER",
            isBindProperty: false,
            isTriggerProperty: false,
          },
          {
            propertyName: "iconAlign",
            label: "Icon alignment",
            helpText: "Sets the icon alignment of a menu item",
            controlType: "ICON_ALIGN",
            isBindProperty: false,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.TEXT },
          },
        ],
      },
    ];
  }

  menuItemClickHandler = (onClick: string | undefined) => {
    if (onClick) {
      super.executeAction({
        triggerPropertyName: "onClick",
        dynamicString: onClick,
        event: {
          type: EventType.ON_CLICK,
        },
      });
    }
  };

  getPageView() {
    return (
      <MenuButtonComponent
        {...this.props}
        onItemClicked={this.menuItemClickHandler}
      />
    );
  }

  getWidgetType(): WidgetType {
    return WidgetTypes.MENU_BUTTON_WIDGET;
  }
}

export default MenuButtonWidget;
export const ProfiledMenuButtonWidget = Sentry.withProfiler(MenuButtonWidget);
