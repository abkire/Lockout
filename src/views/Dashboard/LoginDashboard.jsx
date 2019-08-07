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
    value: 0,
    pin: '',
    username: ''

    };
    
    


    handleLoginClick1 = () => {
      console.log("handleLoginClick1: "+this.state.username+ " PW: "+this.state.pin);
      if(this.state.username === 'admin' && this.state.pin ==='1234')
      {
        localStorage.setItem('user', JSON.stringify({
          "username": this.state.username,
          "level": 3
        }) );
        window.location.reload();


      }
      else if(this.state.username === 'trainer' && this.state.pin ==='1234')
      {
        localStorage.setItem('user', JSON.stringify({
          "username": this.state.username,
          "level": 2
        }) );
        window.location.reload();

      }
      else if(this.state.username === 'user' && this.state.pin ==='1234')
      {
        localStorage.setItem('user', JSON.stringify({
          "username": this.state.username,
          "level": 1
        }) );
        window.location.reload();

      }
      else
      {// bad login

        if(this.state.value==0) {
          this.setState({value: !this.state.value});
          setTimeout(function(){
               this.setState({value: 0});
          }.bind(this),1000);  // wait 5 seconds, then reset to false
     }

        
      }
       //UPDATE JSON USER HERE WHEN LOGGING IN!&&&&*/
          //if successfull login @said do the below code 
          // api call getrole(username,pin); replace level 1 : with =>role
/*
    localStorage.setItem('user', JSON.stringify({
      "username": this.username,
      "level": 1
    }) );    




    let user = JSON.parse(localStorage.getItem('user'));
    console.log("Logged in as "+user.username +" with role: "+user.level);
    //UPDATE JSON USER HERE WHEN LOGGING IN!&&&&*/
    // window.location.reload();

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
     console.log("Logged in as "+user.username +" with role: "+user.level);

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
    if(localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')).level===0)
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
                    id="username"
                    formControlProps={{
                            fullWidth: true,
                            required: true,
                            onChange: (event) => this.handleChange(event),
                            type: "text"                            
                      
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Pin"
                    id="pin"
                    formControlProps={{
                      fullWidth: true,
                      required: true,
                      onChange: (event) => this.handleChange(event),
                      type: "text"                            
                
                    }}
                  />
                </GridItem>
              </GridContainer>
              
              
            </CardBody>
            <CardFooter>
              {/*}  <Button color="primary" onClick={this.myClick}>Login</Button>*/}
                {this.state.value ?  <Button  color="alert" handleLogoutClick={this.handleLoginClick1} >Bad Login</Button>
                :  <Button  color="primary" handleLogoutClick={this.handleLoginClick1} >Login User</Button> }
          {/*<Button  color="primary" handleLogoutClick={this.handleLoginClick1} >Login User</Button>
            <Button color="primary" handleLogoutClick={this.handleLoginClick2}>Login Trainer</Button>
            <Button color="primary" handleLogoutClick={this.handleLoginClick3}>Login Admin</Button>*/}

            </CardFooter>
          </Card>
        </GridItem>
        
      </GridContainer>
    </div>
    );
    else{
      if(localStorage.getItem('user'))
      return (<div>
        You are already logged in as: {JSON.parse(localStorage.getItem('user')).username}
        </div>);
      else
      return (<div>
        USER IS UNDEFINED ERROR 
        </div>);
    }
  }
}

LoginDashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(LoginDashboard);
