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

class RegisterProfile extends React.Component {
  state = {
    pin: '',
    username: '',
    emailAddress: '',
    userId: '',
    firstName: '',
    lastName: '',
    level: 1,
    value: 0

    

    };
    
    


    handleRegister = () => {
      console.log("handleRegister: "+JSON.stringify(this.state));
          //if successfull login @said do the below code 
          // api call getrole(username,pin); replace level 1 : with =>role

    //this.setState({level: 1};
      


    console.log("Logged in as "+this.state.username +" with role: "+this.state.level);
    //input validation for now ...
    if(this.state.username!=''&&this.state.emailAddress!=''&&this.state.userId!=''&&this.state.firstName!=''&&this.state.lastName!='')
    {
  
        //Check if user exists if not create user

  
         localStorage.clear('user');
        var numPin = Math.floor(Math.random()*9000.0)+1000;

        this.setState({
          pin: ''+numPin
        }, () => {
        localStorage.setItem('user', JSON.stringify(this.state));   
        window.location.reload();
        });

        /*  this.setState({pin: ''+numPin});
        localStorage.setItem('user', JSON.stringify(this.state)); */  

        //UPDATE JSON USER HERE WHEN LOGGING IN!&&&&
        //window.location.reload();
        }
        else // form validation
        {
              if(this.state.value==0) {
                this.setState({value: !this.state.value});
                setTimeout(function(){
                    this.setState({value: 0});
                }.bind(this),1000);  // wait 5 seconds, then reset to false
          }
        }
    };
  

   

  handleChange = (event, value) => {
    console.log("Login Dash handlechange: "+event.target.value);
    console.log("Login Dash handlechange event target: "+event.target.id);
    
    if(event.target.id === 'username')
    {
      this.setState({username: event.target.value});
    }
    else if(event.target.id ==='userId')
    {
      this.setState({userId: event.target.value});
    }
    else if(event.target.id ==='username')
    {
      this.setState({username: event.target.value});
    }
    else if(event.target.id ==='emailAddress')
    {
      this.setState({emailAddress: event.target.value});
    }
    else if(event.target.id ==='firstName')
    {
      this.setState({firstName: event.target.value});
    }
    else if(event.target.id ==='lastName')
    {
      this.setState({lastName: event.target.value});
    }
    else{}
  
    console.log("State: "+JSON.stringify(this.state));
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
    console.log("handlechangeindex: "+index);

  };

  
  render() {
    const { classes } = this.props;
//    let user = JSON.parse(localStorage.getItem('user'));
    if(localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')).level===0)
    return (
  
   <div>
    <GridContainer>
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
                      fullWidth: true,
                      required: true,
                      onChange: (event) => this.handleChange(event),
                      type: "text"                            
                
              }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Email address"
                    id="emailAddress"
                    formControlProps={{
                      fullWidth: true,
                      required: true,
                      onChange: (event) => this.handleChange(event),
                      type: "text"                            
                
              }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                <CustomInput
                    labelText="UTA ID Number"
                    id="userId"
                    formControlProps={{
                            fullWidth: true,
                            required: true,
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
                    id="firstName"
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
                    labelText="Last Name"
                    id="lastName"
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
            {this.state.value ?  <Button  color="alert" handleLogoutClick={this.handleRegister} >Bad Credentials</Button>
                :  <Button  color="primary" handleLogoutClick={this.handleRegister} >Register</Button> }
       {/*     <Button color="primary" handleLogoutClick={this.handleRegister} >Register</Button>*/}
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
    );
    else
    if(localStorage.getItem('user')!=null)
      return (
          <div>
            <h1>>
          You are logged in as: {JSON.parse(localStorage.getItem('user')).username} Your pin is {JSON.parse(localStorage.getItem('user')).pin} You will need to remember this to login so write it down!
           </h1>
         </div>
         );
    else
    return (<div>Youlogged in as: ERROR USER UNDEFINED // 
    </div>
    );
  }
}

RegisterProfile.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(RegisterProfile);
