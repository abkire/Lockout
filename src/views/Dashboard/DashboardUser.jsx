import React from "react";
import PropTypes from "prop-types";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
import InputLabel from "@material-ui/core/InputLabel";


// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Table from "components/Table/Table.jsx";
import Tasks from "components/Tasks/Tasks.jsx";
import CustomTabs from "components/CustomTabs/CustomTabs.jsx";
import Danger from "components/Typography/Danger.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CardAvatar from "components/Card/CardAvatar.jsx";

import avatar from "assets/img/faces/marc.jpg";

import { bugs, website, server } from "variables/general.jsx";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "variables/charts.jsx";

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

class DashboardUser extends React.Component {
  state = {
    value: 0
  };
  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };
  render() {
    const { classes } = this.props;
    let user = JSON.parse(localStorage.getItem('user'));
    if(user.level === 2 || user.level ===1) // only trainers / users should see this
    return (
      <div>


<GridContainer>
  <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Your authorized Sections</h4>
            <p className={classes.cardCategoryWhite}>
            To get authorized contact the email of a trainer from the section you want. 
            </p>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={["Section", "Usage Level","Last used"]}
              tableData={[
                ["3d Printers", "Not AUthorized" ,"08/05/2019 6:33 pm"],
                ["Power drills", "Authorized User","08/06/2019 2:12 pm"]
                
              ]}
            />
          </CardBody>
        </Card>
      </GridItem>
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

       {/*



      <GridContainer>
      
      
        
        <GridItem xs={12} sm={12} md={4}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Delete User</h4>
              <p className={classes.cardCategoryWhite}>Deletes the user's profile</p>
            </CardHeader>
            <CardBody>
              
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="User ID"
                    id="user-id"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Pin"
                    id="pin"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
              </GridContainer>
              
              
            </CardBody>
            <CardFooter>
              <Button color="primary">Delete User</Button>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Request Training on a Machine Section</h4>
              <p className={classes.cardCategoryWhite}>Adds your  </p>
            </CardHeader>
            <CardBody>
              
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="User ID"
                    id="user-id"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Section ID"
                    id="machine-id"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Pin"
                    id="pin"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
              </GridContainer>
              
              
            </CardBody>
            <CardFooter>
              <Button color="primary">Add Trainer</Button>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Add Admin</h4>
              <p className={classes.cardCategoryWhite}>Add a user as an admin to the system</p>
            </CardHeader>
            <CardBody>
              
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="User ID"
                    id="user-id"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Section ID"
                    id="machine-id"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Pin"
                    id="pin"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
              </GridContainer>
              
              
            </CardBody>
            <CardFooter>
              <Button color="primary">Add Admin</Button>
            </CardFooter>
          </Card>
        </GridItem>
                  </GridContainer> */}
    </div>
    );
    else
      return (<div>You not logged in as an User or trainer: {user.username}
        </div>); 
  }
}

DashboardUser.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(DashboardUser);
