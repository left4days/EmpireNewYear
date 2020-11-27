import React from "react";
import Masonry from "react-masonry-css";
import { Column, Row } from "ui/Layout";
import { Description } from "ui/Description";
import { Title } from "ui/Title";
import "./style.scss";

function checkLength(attr, max) {
  if (attr.length > max) {
    return `${attr.substring(0, max)}...`;
  }
  return attr;
}

const breakpointColumnsObj = {
    default: 3,
    992: 2,
    700: 1,
    500: 1
};

const StoryBlock = ({ stories }) => {
  return (
    <Column className="story">
      <Column className="story__container">
          <Title size="l">Лучшие истории</Title>
          <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {stories.map(item => {
            return (
              <Column className="story__item">
                <Title>{checkLength(item.name, 30)}</Title>
                <Description className="story__attr">
                  {checkLength(item.email, 30)}
                </Description>
                <Description className="story__message">
                  {checkLength(item.text, 3000)}
                </Description>
              </Column>
            );
          })}
        </Masonry>
      </Column>
    </Column>
  );
};

export { StoryBlock };
