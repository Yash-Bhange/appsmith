/* eslint-disable cypress/no-unnecessary-waiting */

const widgetsPage = require("../../../../locators/Widgets.json");
const commonlocators = require("../../../../locators/commonlocators.json");
const publish = require("../../../../locators/publishWidgetspage.json");
const dsl = require("../../../../fixtures/tableNewDsl.json");
const pages = require("../../../../locators/Pages.json");
const testdata = require("../../../../fixtures/testdata.json");

describe("Table Widget property pane feature validation", function() {
  before(() => {
    cy.addDsl(dsl);
  });

  it("Test to validate table pagination is disabled", function() {
    // Verify pagination is disabled
    cy.get(".t--table-widget-prev-page").should("have.attr", "disabled");
    cy.get(".t--table-widget-next-page").should("have.attr", "disabled");
    cy.get(".t--table-widget-page-input input").should("have.attr", "disabled");
  });

  it("Test to validate text allignment", function() {
    // Open property pane
    cy.openPropertyPane("tablewidget");
    // Change the text align to center
    cy.get(widgetsPage.centerAlign)
      .first()
      .click({ force: true });
    // Verify the center text alignment
    cy.readTabledataValidateCSS("1", "0", "justify-content", "center");
    // Change the text align to right
    cy.get(widgetsPage.rightAlign)
      .first()
      .click({ force: true });
    // Verify the right text alignment
    cy.readTabledataValidateCSS("1", "0", "justify-content", "flex-end");
    // Change the text align to left
    cy.get(widgetsPage.leftAlign)
      .first()
      .click({ force: true });
    // verify the left text alignment
    cy.readTabledataValidateCSS("1", "0", "justify-content", "flex-start");
  });

  it("Test to validate column heading allignment", function() {
    // cy.openPropertyPane("tablewidget");
    // Change the text align to center
    cy.get(widgetsPage.centerAlign)
      .first()
      .click({ force: true });
    // Verify the column headings are center aligned
    cy.get(".draggable-header")
      .first()
      .should("have.css", "text-align", "center");
    // Change the text align to right
    cy.get(widgetsPage.rightAlign)
      .first()
      .click({ force: true });
    // Verify the column headings are right aligned
    cy.get(".draggable-header")
      .first()
      .should("have.css", "text-align", "right");
    // Change the text align to left
    cy.get(widgetsPage.leftAlign)
      .first()
      .click({ force: true });
    // Verify the column headings are left aligned
    cy.get(".draggable-header")
      .first()
      .should("have.css", "text-align", "left");
  });

  it("Test to validate text format", function() {
    // Select the bold font style
    cy.get(widgetsPage.bold).click({ force: true });
    // Varify the font style is bold
    cy.readTabledataValidateCSS("1", "0", "font-weight", "700");
    // Change the font style to italic
    cy.get(widgetsPage.italics).click({ force: true });
    // Verify the font style is italic
    cy.readTabledataValidateCSS("1", "0", "font-style", "italic");
  });

  it("Test to validate vertical allignment", function() {
    // Select the top vertical alignment
    cy.get(widgetsPage.verticalTop).click({ force: true });
    // verify vertical alignment is top
    cy.readTabledataValidateCSS("1", "0", "align-items", "flex-start");
    // Change the vertical alignment to center
    cy.get(widgetsPage.verticalCenter)
      .last()
      .click({ force: true });
    // Verify the vertical alignment is centered
    cy.readTabledataValidateCSS("1", "0", "align-items", "center");
    // Change the vertical alignment to bottom
    cy.get(widgetsPage.verticalBottom)
      .last()
      .click({ force: true });
    // Verify the vertical alignment is bottom
    cy.readTabledataValidateCSS("1", "0", "align-items", "flex-end");
    cy.get(commonlocators.editPropCrossButton).click({ force: true });
  });

  it("Table widget toggle test for text alignment", function() {
    // Open property pane
    cy.openPropertyPane("tablewidget");
    // Open property pane of column "id"
    cy.editColumn("id");
    // Click on text align JS
    cy.get(widgetsPage.toggleTextAlign)
      .first()
      .click({ force: true });
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(1000);
    // Change the text align value to right for michael and left for others
    cy.toggleJsAndUpdate("tabledata", testdata.bindingGenAlign);
    // Close propert pane
    cy.get(commonlocators.editPropCrossButton).click({ force: true });
    // Verify the text michael id is right aligned
    cy.readTabledataValidateCSS("0", "0", "justify-content", "flex-end");
    // Verify the 2nd id is left aligned
    cy.readTabledataValidateCSS("1", "0", "justify-content", "flex-start");
  });

  it("Table widget change text size and validate", function() {
    // Verify font size is 14px
    cy.readTabledataValidateCSS("0", "0", "font-size", "14px");
    // Open property pane
    cy.openPropertyPane("tablewidget");
    // Open property pane
    cy.editColumn("id");
    // Click on text size JS
    cy.get(widgetsPage.toggleTextAlign)
      .first()
      .click({ force: true });
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(1000);
    // Open txe size dropdown options
    cy.get(widgetsPage.textSize)
      .last()
      .click({ force: true });
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(1000);
    // Select Heading 1 text size
    cy.selectTextSize("Heading 1");
    // Verify the font size is 24px
    cy.readTabledataValidateCSS("0", "0", "font-size", "24px");
    // close propert pane
    cy.get(commonlocators.editPropCrossButton).click({ force: true });
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(1000);
    // Verify the font size is 24px
    cy.readTabledataValidateCSS("0", "0", "font-size", "24px");
  });

  it("Test to validate open new tab icon shows when URL type data is hovered", function() {
    // Open property pane
    cy.openPropertyPane("tablewidget");
    // Open email property pane
    cy.editColumn("email");
    // Change column type to url
    cy.changeColumnType("URL");
    // Show the url hidden icon in front of first email
    cy.get(
      `.t--widget-tablewidget .tbody .td[data-rowindex=1][data-colindex=1] .hidden-icon`,
    ).invoke("show");
    // Verify the url icon is visible on hover over email
    cy.get(
      `.t--widget-tablewidget .tbody .td[data-rowindex=1][data-colindex=1] .hidden-icon`,
    ).should("be.visible");
    // Close property pane
    cy.get(commonlocators.editPropCrossButton).click();
  });

  it("Edit column name and test for table header changes", function() {
    // Open property pane
    cy.openPropertyPane("tablewidget");
    // Open email property pane
    cy.editColumn("email");
    // CHange the Column email name to Email Address
    cy.editColName("Email Address");
    // verify changed email name is visible
    cy.get(".draggable-header:contains('Email Address')").should("be.visible");
    cy.get(commonlocators.editPropCrossButton).click();
  });

  it("Test to validate text color and text background", function() {
    // Open property pane
    cy.openPropertyPane("tablewidget");
    // Click on text color input field
    cy.get(widgetsPage.textColor)
      .first()
      .click({ force: true });
    // Select green color
    cy.xpath(widgetsPage.greenColor).click();
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(500);
    cy.wait("@updateLayout");
    // Verify the text color is green
    cy.readTabledataValidateCSS("1", "0", "color", "rgb(3, 179, 101)");
    // Change the text color and enter purple in input field
    cy.get(widgetsPage.textColor)
      .clear({ force: true })
      .type("purple", { force: true });
    cy.wait("@updateLayout");
    // Verify the text color is purple
    cy.readTabledataValidateCSS("1", "0", "color", "rgb(128, 0, 128)");
    // Click on cell background color
    cy.get(widgetsPage.backgroundColor)
      .first()
      .click({ force: true });
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(500);
    // select the green color
    cy.xpath(widgetsPage.greenColor)
      .first()
      .click();
    cy.wait("@updateLayout");
    // Verify the cell background color is green
    cy.readTabledataValidateCSS(
      "1",
      "0",
      "background",
      "rgb(3, 179, 101) none repeat scroll 0% 0% / auto padding-box border-box",
    );
    // Change the cell background color and enter purple in input field
    cy.get(widgetsPage.backgroundColor)
      .clear({ force: true })
      .type("purple", { force: true });
    cy.wait("@updateLayout");
    // Verify the cell background color is purple
    cy.readTabledataValidateCSS(
      "1",
      "0",
      "background",
      "rgb(128, 0, 128) none repeat scroll 0% 0% / auto padding-box border-box",
    );
  });
});
