import React, { useState } from "react";
import QrReader from "@cbmdf/react-qr-scanner";
import crypto from "crypto-browserify";
import { makeStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import BRASAO from "./assets/BRASAO.png";
import DetalheIdentidade2 from "./DetalheIdentidade2";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Typography";
import ProjetoIncendio20 from "./ProjetoIncendio2.0";
import ProjetoIncendio21 from "./ProjetoIncendio2.1";
var ascii85 = require("ascii85");

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(1),
    maxWidth: "360px",
    width: "360px",
  },
}));

const { publicKey } = require("./public_key");


export default () => {
  const classes = useStyles();

  const [dado, setDado] = useState(false);
  const [showDoc, setShowDoc] = useState();

  function isJson(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

  const decryptString = (encrypted, simular = false) => {
    try {
      let decrypted;
      if (simular) {
        decrypted = encrypted;
      } else {
        let encrypted2;
        if (isJson(encrypted)) {
          let jsonDecrypted = decryptV1(encrypted);

          decrypted =
            jsonDecrypted.d + ";" + jsonDecrypted.h + ";" + jsonDecrypted.t;
        } else {
          encrypted2 = ascii85.decode(encrypted);
          decrypted = crypto.publicDecrypt(publicKey, encrypted2);
        }
      }

      let meuNovoDadoQRCODE = decrypted.toString().split(";");

      setShowDoc(meuNovoDadoQRCODE[0]);

      setDado(meuNovoDadoQRCODE);
    } catch (e) {
      console.error(e);
    }
  };
  const handleScan = (data, data2) => {
     console.log("data", Math.random() + " - " + data);
    if (data) {
      decryptString(data);
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  const decryptV1 = (input) => {
    // var replaced = input.split(" ").join("+"); // tratamento para URL encode.

    const jsonInput = JSON.parse(input);

    const data = jsonInput.data;

    // Cria um array a partir do data CSV
    var arrCrypt = data.split(",");

    // Decriptografa cada parte
    let output = "";
    // eslint-disable-next-line array-callback-return
    arrCrypt.map((chunk) => {
      let encrypted = Buffer.from(chunk, "base64");
      console.log(publicKey);
      const decrypted = crypto.publicDecrypt(publicKey, encrypted);
      output = output.concat(decrypted);
    });

    return JSON.parse(output);
  };

  const returnQRCODE = () => {
    const previewStyle = {
      height: 340,
      width: 340,
    };
    if (!dado) {
      var pjson = require('../package.json');
      return (
        <div className={classes.root}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={3}>
              <img
                className={classes.img}
                alt="Brasão"
                src={BRASAO}
                width="75%"
              />
            </Grid>
            <Grid item xs={9}>
              <Typography variant="h5" align="center">
                Certificador de Autenticidade do CBMDF {pjson.version}
              </Typography>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={6} className={classes.qrcode}>
              <QrReader
                style={previewStyle}
                delay={500}
                onError={handleError}
                onScan={handleScan}
                facingMode="environment"
                maxImageSize={3000}
              />
            </Grid>
          </Grid>

           <Grid
            container
            direction="row"
            spacing={3}
            justify="center"
            alignItems="center"
          >
            <Grid item xs>
              <Button
                variant="contained"
                color="secondary"
                onClick={() =>
                  decryptString(
                    "3;1568728;23/12/2008;LUCAS ARAÚJO PEREIRA;22/05/1982;AB+;MAJ;17453;UklGRpoBAABXRUJQVlA4II4BAACwCgCdASo8ADwAPsFOoUunpCMhs/gNUPAYCWkAAR71ncKh4/rgAJv4+cxUw7baK+d3gf1suTxKqDwiD85+Z1Y0nrqatM7MxjF/R30WkRraKNPdtfS9GICRuwv0wNcAAP78dzmjtjTUxxbJ0dIpl/A7lcZedcKO82Q66XRZLBMDSHnCxrVpCZSBlUiH2XfOrL29Katv2Yqdo5gaw2UqfvX8b7FzHKy1p72q+WJAfNPyjOsH6HKFe75pX2SqHki4z82XEkDN0TaRV0J7eZXUwXFBT0x1f5Za0fYxuERGtPcGe3iaYBANjMIesFNjl9XwXZbkNTeW3kfN799giLxJyZ1jX0A88fCeg0NuOazWyllVnXjwc0M+h8EVONti07x3qZohcBYpWcWvCB4ub5p2yY0AtJm3e9g9i6a6lVttawDjB2htnJdVMOmM+Su3eIj8Su33HxC0mBOKvhKOWaO5Xi7bQxYGuO8xx2WUtsTdjJmS3OliWKmrls0Q28Hwn6CTBn/hcswGKmtQYiIHQAAAAA==;25/05/2010;80ad9d7745e876986965671bd1289b74;1592511537",
                    true
                  )
                }
              >
                Simular Identidade
              </Button>
            </Grid>
            <Grid item xs>
              <Button
                variant="contained"
                color="secondary"
                onClick={() =>
                  decryptString(
                    "2.0;123;Qna 21 ;92861561563168;15mts;sem risco/100mts;10mts;Comercial;medidas;https://www.google.com/;80ad9d7745e876986965671bd1289b74;1592511537",
                    true
                  )
                }
              >
                Simular Projeto Incêncio
              </Button>
            </Grid>

          
          </Grid> 
        </div>
      );
    } else {
      //removendo as aspas
      const tipo = showDoc.replace(/"/g, "");

      switch (tipo) {
        case "2.0":
          return <ProjetoIncendio20 dado={dado} setDado={setDado} />;
        // break;
        case "2.1":
          return <ProjetoIncendio21 dado={dado} setDado={setDado} />;
        // break;
        case "3":
          return <DetalheIdentidade2 dado={dado} setDado={setDado} />;
        // break;
        default:
          alert("Documento não reconhecido.");
          break;
      }
      // if (showDoc === 3) {
      //   return <DetalheIdentidade2 dado={dado} setDado={setDado} />;
      // } else if (showDoc === 2.0) {
      //   return <ProjetoIncendio dado={dado} setDado={setDado} />;
      // }
    }
  };

  return <div className={classes.root}>{returnQRCODE()}</div>;
};
