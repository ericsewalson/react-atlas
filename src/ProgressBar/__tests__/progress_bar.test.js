import React from "react";
import ProgressBar from "../index";

import renderer from "react-test-renderer";

describe("Test correct render", () => {
  it("Test correct render", function() {
    const tree = renderer
      .create(<ProgressBar>ProgressBar</ProgressBar>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
