import React from "react";
import List from "../List";
import ListGroup from "../../ListGroup/ListGroup";
import ListItem from "../../ListItem/ListItem";
import Avatar from "../../Avatar/Avatar";
import Switch from "../../Switch/Switch";
import Button from "../../Button/Button";
import renderer from "react-test-renderer";

describe("Test List component", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(
        <List border>
          <ListGroup title="Dinosaurs">
            <ListItem leftItem={<Avatar title="Blue" />} rightItem={<Switch />}>
              <Button link>Blue</Button>
            </ListItem>
            <ListItem leftItem={<Avatar title="Earl" />} rightItem={<Switch />}>
              <Button link>Earl Sinclair</Button>
            </ListItem>
          </ListGroup>
        </List>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
