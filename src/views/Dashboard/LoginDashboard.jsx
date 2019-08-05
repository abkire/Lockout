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

class LoginDashboard extends React.Component {
  state = {
    value: 0 /*,
    loggedIn: 0*/

    };
    handleLoginClick1 = () => {
      console.log("handleLoginClick1");
    //  this.setState({ loggedIn: 1 });

    localStorage.setItem('user', JSON.stringify({
      "username": "User Login",
      "level": 1
    }) );    

    let user = JSON.parse(localStorage.getItem('user'));
    console.log("Logged in as "+user.username +" with role: "+user.level);
    //UPDATE JSON USER HERE WHEN LOGGING IN!&&&&
     window.location.reload();

    };

    handleLoginClick2 = () => {
      console.log("handleLoginClick2");
    //  this.setState({ loggedIn: 1 });

    localStorage.setItem('user', JSON.stringify({
      "username": "Trainer Login",
      "level": 2
    }) );    

    let user = JSON.parse(localStorage.getItem('user'));
    console.log("Logged in as "+user.username +" with role: "+user.level);
    //UPDATE JSON USER HERE WHEN LOGGING IN!&&&&
     window.location.reload();

    };

    handleLoginClick3 = () => {
      console.log("handleLoginClick3");
    //  this.setState({ loggedIn: 1 });

    localStorage.setItem('user', JSON.stringify({
      "username": "Admin Login",
      "level": 3
    }) );    

    let user = JSON.parse(localStorage.getItem('user'));
    console.log("Logged in as "+user.username +" with role: "+user.level);
    //UPDATE JSON USER HERE WHEN LOGGING IN!&&&&
     window.location.reload();

    };

  handleChange = (event, value) => {
    console.log("handlechange: "+event.target.value);
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
    console.log("handlechangeindex: "+index);

  };

  
  render() {
    const { classes } = this.props;
    let user = JSON.parse(localStorage.getItem('user'));
    if(user.level === 0)
    return (
    /* { 
        if(this.user.level === 3){
            return null;}
        else if(this.user.level === 2){
            return null;}
        else if(this.user.level === 1){
             return null;}
        else
            return null;
  }*/
  
      <div>
      
      
      <GridContainer>

      
      
        <GridItem xs={12} sm={12} md={10}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Login User</h4>
              <p className={classes.cardCategoryWhite}>Login to your acccount, if you have not created one click register on the sidebar.</p>
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
            {/*}  <Button color="primary" onClick={this.myClick}>Login</Button>*/}
            <Button color="primary" handleLogoutClick={this.handleLoginClick1}>Login User</Button>
            <Button color="primary" handleLogoutClick={this.handleLoginClick2}>Login Trainer</Button>
            <Button color="primary" handleLogoutClick={this.handleLoginClick3}>Login Admin</Button>

            </CardFooter>
          </Card>
        </GridItem>
        
      </GridContainer>
    </div>
    );
    else
      return (<div>You are already logged in as: {user.username}
         </div>);
  }
}

LoginDashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(LoginDashboard);
