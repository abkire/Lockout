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

class RegisterDashboard extends React.Component {
  state = {
    value: 0,
    pin: '',
    username: ''
    

    };
    
    


    handleRegister = () => {
      console.log("handleRegister: "+this.state.username+ " PW: "+this.state.pin);
          //if successfull login @said do the below code 
          // api call getrole(username,pin); replace level 1 : with =>role
/*
    localStorage.setItem('user', JSON.stringify({
      "username": this.username,
      "level": 1
    }) );    




    let user = JSON.parse(localStorage.getItem('user'));
    console.log("Logged in as "+user.username +" with role: "+user.level);
    //UPDATE JSON USER HERE WHEN LOGGING IN!&&&&
     window.location.reload();*/
    };

   

  handleChange = (event, value) => {
    console.log("Login Dash handlechange: "+event.target.value);
    console.log("Login Dash handlechange event target: "+event.target.id);
    
    if(event.target.id === 'username')
    {
      this.setState({username: event.target.value});
    }
    else if(event.target.id ==='pin')
    {
      this.setState({pin: event.target.value});
    }
    else{}
  
    console.log("State: "+this.state.username + " : "+this.state.pin);
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
  
      <div></div>
      <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Register Profile</h4>
              <p className={classes.cardCategoryWhite}>Complete your profile</p>
            </CardHeader>
            <CardBody>
              <GridContainer>
                
                <GridItem xs={12} sm={12} md={3}>
                  <CustomInput
                    labelText="Username"
                    id="username"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Email address"
                    id="email-address"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                <CustomInput
                    labelText="User ID"
                    id="username"
                    formControlProps={{
                            fullWidth: true,
                            onChange: (event) => this.handleChange(event),
                            type: "text"                            
                      
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="First Name"
                    id="first-name"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Last Name"
                    id="last-name"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
              </GridContainer>
             
              
            </CardBody>
            <CardFooter>
            <Button color="primary" handleLogoutClick={this.handleRegister} >Register</Button>
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

RegisterProfile.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(RegisterProfile);
