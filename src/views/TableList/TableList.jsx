import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Table from "components/Table/Table.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};

function TableList(props) {
  const { classes } = props;
  let user = JSON.parse(localStorage.getItem('user'));
  if(user.level ===3)
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Trainer Section A</h4>
            <p className={classes.cardCategoryWhite}>
              Trainer information for machine A
            </p>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={["First name", "Last Name", "Email", "Requests", "Added"]}
              tableData={[
                ["TestF1", "TestL1", "TestEmail1", "1","1"],
                ["TestF2", "TestL2", "TestEmail2", "0","0"]
                
              ]}
            />
          </CardBody>
        </Card>
      </GridItem>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Trainer Section B</h4>
            <p className={classes.cardCategoryWhite}>
              Trainer information for machine B
            </p>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={["First name", "Last Name", "Email", "Requests", "Added"]}
              tableData={[
                ["TestF1", "TestL1", "TestEmail1", "1","1"]
                
              ]}
            />
          </CardBody>
        </Card>
      </GridItem>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Trainer Section D</h4>
            <p className={classes.cardCategoryWhite}>
              Trainer information for machine C
            </p>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={["First name", "Last Name", "Email", "Requests", "Added"]}
              tableData={[
                
              ]}
            />
          </CardBody>
        </Card>
      </GridItem>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Trainer Section D</h4>
            <p className={classes.cardCategoryWhite}>
              Trainer information for machine D
            </p>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={["First name", "Last Name", "Email", "Requests", "Added"]}
              tableData={[
                
                
              ]}
            />
          </CardBody>
        </Card>
      </GridItem>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Trainer Section E</h4>
            <p className={classes.cardCategoryWhite}>
              Trainer information for machine E
            </p>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={["First name", "Last Name", "Email", "Requests", "Added"]}
              tableData={[
                
              ]}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
  else
      return (<div>You are not logged in as an admin: {user.username}
         </div>);
}

export default withStyles(styles)(TableList);
