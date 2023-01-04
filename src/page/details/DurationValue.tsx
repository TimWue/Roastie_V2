import * as React from "react";
import { FunctionComponent, useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { msToMS } from "../shared/Utils";
import { Status } from "../../infrastructure/MeasurementContext";

interface Props {
  status: Status;
}

export const DurationValue: FunctionComponent<Props> = ({ status }) => {
  const [time, setTime] = useState<number>();
  const [timer, setTimer] = useState<NodeJS.Timer>();

  const start = () => {
    const timer = setInterval(() => {
      setTime((oldTime) => (oldTime ? oldTime + 1000 : 1000));
    }, 1000);
    setTimer(timer);
  };

  useEffect(() => {
    switch (status) {
      case Status.IDLE:
        setTime(0);
        timer && clearInterval(timer);
        break;
      case Status.RUNNING:
        setTime(0);
        start();
        break;
      case Status.PAUSED:
        timer && clearInterval(timer);
    }
  }, [status]);

  return (
    <Grid
      item
      bgcolor={"rgb(240,240,240)"}
      borderRadius={"4px"}
      p={"8px"}
      height={"70px"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Typography component="p" variant="h4">
        {time ? msToMS(time) : "00:00"}
      </Typography>
    </Grid>
  );
};
