import React from "react";
import Img from "gatsby-image";
import { useStaticQuery, graphql } from "gatsby";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import Images from "../data/images.yaml";

export default () => {
  const { allFile } = useStaticQuery(
    graphql`
      query {
        allFile(
          sort: { fields: name, order: DESC }
          filter: {
            sourceInstanceName: { eq: "images" }
            absolutePath:{ regex: "/\/featured\//" }
            extension: { regex: "/(jpg)|(jpeg)|(png)/" }
          }
        ) {
          edges {
            node {
              id
              name
              childImageSharp {
                fluid(maxHeight: 500) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    `,
  );
  const images = allFile.edges;
  return (
    <Carousel
      dynamicHeight={false}
      showThumbs={false}
      showArrows={false}
      showStatus={false}
      showIndicators={true}
      autoPlay={true}
      infiniteLoop={true}
      interval={5000}
    >
      {images.map(({ node }, index) => (
        <a href={Images[index].href} title={Images[index].title}>
          <Img
            fluid={node.childImageSharp.fluid}
            key={node.id}
            alt={node.name}
          />
          <div className="cta-info-wrapper">
            <h3>{Images[index].description}</h3>
          </div>
        </a>
      ))}
    </Carousel>
  );
};
