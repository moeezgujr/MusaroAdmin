import React, { useEffect, useState } from "react";
import { useSpring, animated } from "react-spring";
import styled from "styled-components";
import "./Slider.css";
import { getRatings } from "Apis/Customer";
import { ReactComponent as Staricon } from "../../assets/img/star.svg";
import { ReactComponent as DotIcon } from "../../assets/img/dot.svg";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
`;

const FullScreenWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end; /* Align to the right */
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  visibility: ${({ isOpen }) => (isOpen ? "visible" : "hidden")};
`;

const SliderWrapper = styled.div`
  position: relative;
  top: 20%; /* Leave space from the top */
  left: 17%; /* Leave space from the left */
  width: 82%; /* Cover 3 quarters of the screen width */
  height: 80%; /* Cover 3 quarters of the screen height */
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 20px 20px 0 0; /* Rounded corners at the top */
`;

const Content = styled.div`
  padding: 20px;
  height: 100%;
  overflow-y: auto;
`;

const OpenButton = styled.button`
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  z-index: 1000;
  &:hover {
    background-color: #0056b3;
  }
`;

const CloseButton = styled.button`
  position: fixed;
  top: 100px;
  right: 10px;
  color: white;
  padding: 10px;
  background-color: transparent;
  border: none;
  font-size: 24px;
  cursor: pointer;
  z-index: 1000;
  &:hover {
    color: red;
  }
`;

const Slider = ({ open, callback, id }) => {
  const [isOpen, setIsOpen] = useState(open);

  const ratings = async (id) => {
    await getRatings(id);
  };

  useEffect(() => {
    setIsOpen(open);
    if (open) {
      ratings(id);
    }
  }, [open]);

  const slideStyles = useSpring({
    transform: isOpen ? "translateY(0%)" : "translateY(100%)",
    from: { transform: "translateY(100%)" },
  });

  const RatingCard = () => (
    <div className="ratingcard mt-3">
      <div className="d-flex">
        <img
          className="rating-img"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6tWkfCJfejkeaq78A0p6L5CZWFFVwxyz0DA&s"
        />
        <div
          className="d-flex mt-2"
          style={{ width: "1130px", justifyContent: "space-between" }}
        >
          <div>
            <p className="ratingname">Ahmad Bandooq</p>
            <p className="raatingstartext">
              <Staricon style={{ marginTop: "-5px" }} /> 4.5/5
            </p>
            <p className="raatingstartext">
              Lorem ipsum dolor sit amet consectetur.{" "}
            </p>
          </div>
          <div>
            <p className="verified_text">
              <DotIcon /> Verified
            </p>
            <div className="experience_text">
              <p>4 years experience</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <FullScreenWrapper isOpen={isOpen}>
        <CloseButton
          onClick={() => {
            setIsOpen(false);
            callback();
          }}
        >
          &times;
        </CloseButton>
        <animated.div
          style={{
            ...slideStyles,
            width: "100%",
            height: "100%",
          }}
        >
          <SliderWrapper>
            <Content
              style={{
                background: "#f6f9fc",
                borderRadius: "20px",
              }}
            >
              <h2 className="rating_heading">Ratings</h2>
              <p className="heading_text">
                You are viewing the latest 10 reviews of the service provider
              </p>
              {Array.from({ length: 7 }).map((_, index) => (
                <RatingCard key={index} />
              ))}
            </Content>
          </SliderWrapper>
        </animated.div>
      </FullScreenWrapper>
    </>
  );
};

export default Slider;