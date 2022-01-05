import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import BRASAO from "./assets/BRASAO.png";
import { makeStyles } from "@material-ui/core/styles";
import "moment/locale/pt-br";
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
    width: 240,
    alignItems: "center",
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

  let date = new Date(props.dado[9] * 1000);
  let dateFormatado = new Date(date).toLocaleString("pt-BR");

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardContent className={classes.content}>
        <div className={classes.header}>
          <Avatar alt="Brasão" className={classes.avatar} src={BRASAO}></Avatar>
          <div>
            <Link color="textPrimary" noWrap to="#" variant="h5">
              Projeto de Incêndio
            </Link>
            <Typography variant="body2">CBMDF</Typography>
          </div>
        </div>
        <div className={classes.stats}>
          <Typography variant="h6">{props.dado[1]}</Typography>
          <Typography variant="body2">Número do processo SCIP:</Typography>
        </div>
        <div className={classes.stats}>
          <Typography variant="h6">{props.dado[2]}</Typography>
          <Typography variant="body2">Endereço da Edificação:</Typography>
        </div>
        <div className={classes.stats}>
          <Typography variant="h6">{props.dado[3]}</Typography>
          <Typography variant="body2">Proprietário / CPF / CNPJ:</Typography>
        </div>
        <div className={classes.stats}>
          <Typography variant="h6">{props.dado[4]}</Typography>
          <Typography variant="body2">Altura do último pavimento:</Typography>
        </div>
        <div className={classes.stats}>
          <Typography variant="h6">{props.dado[5]}</Typography>
          <Typography variant="body2">
            Número de pavimentos acima e abaixo do logradouro:
          </Typography>
        </div>
        <div className={classes.stats}>
          <Typography variant="h6">{props.dado[6]}</Typography>
          <Typography variant="body2"> Medidas aprovadas:</Typography>
        </div>
        <div className={classes.stats}>
          <Typography variant="h6">
            <a
              href={props.dado[7].replace(/['"]+/g, "")}
              target="_blank"
              rel="noopener noreferrer"
            >
              Clique aqui
            </a>
          </Typography>
          <Typography variant="body2"> Link para as pranchas</Typography>
        </div>
        <div className={classes.stats}>
          <Typography variant="h6">{props.dado[8]}</Typography>
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
