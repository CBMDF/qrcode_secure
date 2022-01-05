import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import { makeStyles } from "@material-ui/core/styles";

import {
  Avatar,
  Button,
  Card,
  CardContent,
  Link,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    marginBottom: theme.spacing(1),
  },
  content: {
    padding: theme.spacing(1),
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      flexWrap: "wrap",
    },
    "&:last-child": {
      paddingBottom: theme.spacing(1),
    },
  },
  header: {
    maxWidth: "100%",
    alignItems: "center",
    width: 240,
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      marginBottom: theme.spacing(1),
      flexBasis: "100%",
    },
  },
  avatar: {
    marginRight: theme.spacing(2),
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  stats: {
    padding: theme.spacing(1),
    [theme.breakpoints.down("sm")]: {
      flexBasis: "50%",
    },
  },
  actions: {
    padding: theme.spacing(1),
    [theme.breakpoints.down("sm")]: {
      flexBasis: "50%",
    },
  },
}));

const ProjectCard = (props) => {
  const { className, ...rest } = props;

  const classes = useStyles();

  let date = new Date(props.dado[11] * 1000);
  let dateFormatado = new Date(date).toLocaleString("pt-BR");

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardContent className={classes.content}>
        <div className={classes.header}>
          <Avatar
            alt="Foto"
            className={classes.avatar}
            src={"data:image/jpeg;base64, " + props.dado[8]}
          ></Avatar>
          <div>
            <Link color="textPrimary" noWrap to="#" variant="h5">
              Identidade - CBMDF
            </Link>
            <Typography variant="body2">Em fase EXPERIMENTAL</Typography>
          </div>
        </div>
        <div className={classes.stats}>
          <Typography variant="h6">{props.dado[3]}</Typography>
          <Typography variant="body2">Portador</Typography>
        </div>
        <div className={classes.stats}>
          <Typography variant="h6">{props.dado[1]}</Typography>
          <Typography variant="body2">Matrícula</Typography>
        </div>
        <div className={classes.stats}>
          <Typography variant="h6">{props.dado[6]}</Typography>
          <Typography variant="body2">Posto/Graduação</Typography>
        </div>
        <div className={classes.stats}>
          <Typography variant="h6">{props.dado[7]}</Typography>
          <Typography variant="body2">Registro</Typography>
        </div>
        <div className={classes.stats}>
          <Typography variant="h6">{props.dado[4]}</Typography>
          <Typography variant="body2">Data de nascimento</Typography>
        </div>
        <div className={classes.stats}>
          <Typography variant="h6">{props.dado[2]}</Typography>
          <Typography variant="body2">Data de inclusão</Typography>
        </div>
        <div className={classes.stats}>
          <Typography variant="h6">{props.dado[5]}</Typography>
          <Typography variant="body2"> Tipo sanguíneo</Typography>
        </div>
        <div className={classes.stats}>
          <Typography variant="h6">{props.dado[9]}</Typography>
          <Typography variant="body2"> Data de expedição</Typography>
        </div>
        <div className={classes.stats}>
          <Typography variant="h6">{props.dado[10]}</Typography>
          <Typography variant="body2"> Hash</Typography>
        </div>
        <div className={classes.stats}>
          <Typography variant="h6">{dateFormatado}</Typography>
          <Typography variant="body2"> Data do selo de Autenticação</Typography>
        </div>
        <div className={classes.actions}>
          <Button
            color="primary"
            size="small"
            variant="outlined"
            onClick={() => props.setDado()}
          >
            QRCODE
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

ProjectCard.propTypes = {
  className: PropTypes.string,
  project: PropTypes.object.isRequired,
};

export default ProjectCard;
