import React, { useState } from "react";
import { ListItem, ListItemIcon } from "@mui/material";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import RateReviewIcon from "@mui/icons-material/RateReview";
import HotelIcon from "@mui/icons-material/Hotel";
import { Link } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ExploreIcon from "@mui/icons-material/Explore";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import AssignmentIcon from "@mui/icons-material/Assignment";

const Accordion = () => {
  const [expanded, setExpanded] = useState("");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
  ))(({ theme }) => ({
    "&:before": {
      display: "none",
    },
  }));

  const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
      expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
      {...props}
    />
  ))(({ theme }) => ({
    backgroundColor:
      theme.palette.mode === "light"
        ? "rgba(255, 255, 255, .05)"
        : "rgba(0, 0, 0, .03)",
    flexDirection: "row-reverse",
    transition: "1s ease-in-out",
    "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
      transform: "rotate(90deg)",
    },
    "& .MuiAccordionSummary-content": {
      marginLeft: theme.spacing(1),
    },
  }));

  const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: "1px solid rgba(0, 0, 0, .125)",
  }));

  return (
    <div>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header" s>
          <div
            style={{ color: "#424180", display: "flex", alignItems: "center" }}
          >
            <ListItemIcon>
              <PersonIcon sx={{ width: "34.28px" }} color="primary" />
            </ListItemIcon>
            마이페이지
          </div>
        </AccordionSummary>
        <AccordionDetails style={{ backgroundColor: "rgba(177,191,249, 0.2)" }}>
          {localStorage.getItem("isLoggedIn") == 1 ? (
            <ListItem>
              <Link
                to={"/profile"}
                style={{
                  color: "#424180",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <ListItemIcon>
                  <ManageAccountsIcon color="primary" />
                </ListItemIcon>
                프로필 수정
              </Link>
            </ListItem>
          ) : null}
          <ListItem>
            <Link
              to={"/reservationCheck"}
              style={{
                color: "#424180",
                display: "flex",
                alignItems: "center",
              }}
            >
              <ListItemIcon>
                <FactCheckIcon sx={{ width: "34.28px" }} color="primary" />
              </ListItemIcon>
              예약 정보 확인
            </Link>
          </ListItem>
          <ListItem>
            <Link
              to={"/myfreeBoardList"}
              style={{
                color: "#424180",
                display: "flex",
                alignItems: "center",
              }}
            >
              <ListItemIcon>
                <RateReviewIcon sx={{ width: "34.28px" }} color="primary" />
              </ListItemIcon>
              나의 여행 후기
            </Link>
          </ListItem>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <div
            style={{ color: "#424180", display: "flex", alignItems: "center" }}
          >
            <ListItemIcon>
              <CalendarMonthIcon sx={{ width: "34.28px" }} color="primary" />
            </ListItemIcon>
            나의 여행 계획하기
          </div>
        </AccordionSummary>
        <AccordionDetails style={{ backgroundColor: "rgba(177,191,249, 0.2)" }}>
          <ListItem>
            <Link
              to={"/hotels"}
              style={{
                color: "#424180",
                display: "flex",
                alignItems: "center",
              }}
            >
              <ListItemIcon>
                <HotelIcon sx={{ width: "34.28px" }} color="primary" />
              </ListItemIcon>
              호텔 예약하기
            </Link>
          </ListItem>
          <ListItem>
            <Link
              to={"/now_playing"}
              style={{
                color: "#424180",
                display: "flex",
                alignItems: "center",
              }}
            >
              <ListItemIcon>
                <ExploreIcon sx={{ width: "34.28px" }} color="primary" />
              </ListItemIcon>
              영화 촬영지 둘러보기
            </Link>
          </ListItem>
        </AccordionDetails>
      </Accordion>
      {localStorage.getItem("ROLE") === "관리자" && (
        <>
          <Accordion
            expanded={expanded === "panel3"}
            onChange={handleChange("panel3")}
          >
            <AccordionSummary
              aria-controls="panel2d-content"
              id="panel2d-header"
            >
              <ListItemIcon>
                <HotelIcon sx={{ width: "34.28px" }} color="primary" />
              </ListItemIcon>
              관리자 페이지
            </AccordionSummary>
            <AccordionDetails>
              <ListItem>
                <Link
                  to={"/hotelCheck"}
                  style={{
                    color: "#424180",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <ListItemIcon>
                    <LockOutlinedIcon color="primary" />
                  </ListItemIcon>
                  호텔 관리
                </Link>
              </ListItem>
              <ListItem>
                <Link
                  to={"/hotelJoin"}
                  style={{
                    color: "#424180",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <ListItemIcon>
                    <AssignmentIcon color="primary" />
                  </ListItemIcon>
                  호텔 등록
                </Link>
              </ListItem>
            </AccordionDetails>
          </Accordion>
        </>
      )}
    </div>
  );
};

export default Accordion;
