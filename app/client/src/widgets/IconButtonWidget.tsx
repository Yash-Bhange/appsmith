import * as React from "react";
import * as Sentry from "@sentry/react";
import { IconName } from "@blueprintjs/icons";

import BaseWidget, { WidgetProps, WidgetState } from "./BaseWidget";
import { WidgetType, WidgetTypes } from "constants/WidgetConstants";
import { ValidationTypes } from "constants/WidgetValidation";
import { EventType } from "constants/AppsmithActionConstants/ActionConstants";

import IconButtonComponent, {
  ButtonBorderRadius,
  ButtonBoxShadow,
  ButtonStyle,
  ButtonVariant,
} from "components/designSystems/appsmith/IconButtonComponent";

export interface IconButtonWidgetProps extends WidgetProps {
  iconName?: IconName;
  buttonStyle: ButtonStyle;
  buttonVariant: ButtonVariant;
  borderRadius: ButtonBorderRadius;
  boxShadow: ButtonBoxShadow;
  boxShadowColor: string;
  isDisabled: boolean;
  isVisible: boolean;
  onClick?: string;
}

class IconButtonWidget extends BaseWidget<IconButtonWidgetProps, WidgetState> {
  static getPropertyPaneConfig() {
    return [
      {
        sectionName: "General",
        children: [
          {
            propertyName: "iconName",
            label: "Icon",
            helpText: "Sets the icon to be used for the icon button",
            controlType: "ICON_SELECT",
            isBindProperty: false,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.TEXT },
          },
          {
            propertyName: "buttonStyle",
            label: "Button Style",
            controlType: "DROP_DOWN",
            helpText: "Sets the style of the icon button",
            options: [
              {
                label: "Primary",
                value: "PRIMARY",
              },
              {
                label: "Warning",
                value: "WARNING",
              },
              {
                label: "Danger",
                value: "DANGER",
              },
              {
                label: "Info",
                value: "INFO",
              },
              {
                label: "Secondary",
                value: "SECONDARY",
              },
            ],
            isBindProperty: false,
            isTriggerProperty: false,
          },
          {
            propertyName: "buttonVariant",
            label: "Button Variant",
            controlType: "DROP_DOWN",
            helpText: "Sets the variant of the icon button",
            options: [
              {
                label: "Solid",
                value: "SOLID",
              },
              {
                label: "Outline",
                value: "OUTLINE",
              },
              {
                label: "Ghost",
                value: "GHOST",
              },
            ],
            isBindProperty: false,
            isTriggerProperty: false,
          },
          {
            propertyName: "borderRadius",
            label: "Border Radius",
            helpText:
              "Rounds the corners of the icon button's outer border edge",
            controlType: "BORDER_RADIUS_OPTIONS",
            isBindProperty: false,
            isTriggerProperty: false,
            validation: {
              type: ValidationTypes.TEXT,
              params: {
                allowedValues: ["CIRCLE", "SHARP", "ROUNDED"],
              },
            },
          },
          {
            propertyName: "boxShadow",
            label: "Box Shadow",
            helpText:
              "Enables you to cast a drop shadow from the frame of the widget",
            controlType: "BOX_SHADOW_OPTIONS",
            isBindProperty: false,
            isTriggerProperty: false,
            validation: {
              type: ValidationTypes.TEXT,
              params: {
                allowedValues: [
                  "NONE",
                  "VARIANT1",
                  "VARIANT2",
                  "VARIANT3",
                  "VARIANT4",
                  "VARIANT5",
                ],
              },
            },
          },
          {
            propertyName: "boxShadowColor",
            helpText: "Sets the shadow color of the widget",
            label: "Shadow Color",
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
        sectionName: "Actions",
        children: [
          {
            helpText: "Triggers an action when the button is clicked",
            propertyName: "onClick",
            label: "onClick",
            controlType: "ACTION_SELECTOR",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: true,
          },
        ],
      },
    ];
  }

  getPageView() {
    const {
      borderRadius,
      boxShadow,
      boxShadowColor,
      buttonStyle,
      buttonVariant,
      iconName,
      isDisabled,
      isVisible,
      widgetId,
    } = this.props;

    return (
      <IconButtonComponent
        borderRadius={borderRadius}
        boxShadow={boxShadow}
        boxShadowColor={boxShadowColor}
        buttonStyle={buttonStyle}
        buttonVariant={buttonVariant}
        height={
          (this.props.bottomRow - this.props.topRow) * this.props.parentRowSpace
        }
        iconName={iconName}
        isDisabled={isDisabled}
        isVisible={isVisible}
        onClick={this.handleClick}
        widgetId={widgetId}
        width={
          (this.props.rightColumn - this.props.leftColumn) *
          this.props.parentColumnSpace
        }
      />
    );
  }

  getWidgetType(): WidgetType {
    return WidgetTypes.ICON_BUTTON_WIDGET;
  }

  handleClick = () => {
    const { onClick } = this.props;

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
}

export default IconButtonWidget;
export const ProfiledIconButtonWidget = Sentry.withProfiler(IconButtonWidget);
