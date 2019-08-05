import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Hidden from "@material-ui/core/Hidden";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Table from "components/Table/Table.jsx";

import iconsStyle from "assets/jss/material-dashboard-react/views/iconsStyle.jsx";

function Icons(props) {
  const { classes } = props;
  let user = JSON.parse(localStorage.getItem('user'));
  if(user.level === 3)
  return (
    <GridContainer>
       <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Logs Table</h4>
            <p className={classes.cardCategoryWhite}>
              A list jobs that have ran on our system.
            </p>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={["Job ID", "User ID", "Machine ID", "Time in", "Time out"]}
              tableData={[
                ["1", "1000000000", "A", "August 9th: 1:05 PM","August 9th: 10:05 PM"],
                ["2", "1000000001", "B", "August 10th: 2:05 PM","August 10th: 5:05 PM"]
                
              ]}
            />
          </CardBody>
        </Card>
      </GridItem>
      {/*<GridItem xs={12} sm={12} md={12}>
        <Card plain>
          <CardHeader plain color="primary">
            <h4 className={classes.cardTitleWhite}>Material Design Icons</h4>
            <p className={classes.cardCategoryWhite}>
              Handcrafted by our friends from{" "}
              <a
                href="https://design.google.com/icons/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google
              </a>
            </p>
          </CardHeader>
          <CardBody>
            <Hidden only={["sm", "xs"]}>
              <iframe
                className={classes.iframe}
                src="https://material.io/icons/"
                title="Icons iframe"
              >
                <p>Your browser does not support iframes.</p>
              </iframe>
            </Hidden>
            <Hidden only={["lg", "md"]}>
              <GridItem xs={12} sm={12} md={6}>
                <h5>
                  The icons are visible on Desktop mode inside an iframe. Since
                  the iframe is not working on Mobile and Tablets please visit
                  the icons on their original page on Google. Check the
                  <a
                    href="https://design.google.com/icons/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Material Icons
                  </a>
                </h5>
              </GridItem>
            </Hidden>
          </CardBody>
        </Card>
            </GridItem>*/}
    </GridContainer>
  );
  else
      return (<div>You are not logged in as an admin: {user.username}
         </div>);
}

Icons.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(iconsStyle)(Icons);
