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
import { pink } from "@material-ui/core/colors";

class LoginDashboard extends React.Component {
  state = {
    value: 0
  };
  handleChange = (event, value) => {
    console.log(`value changed!!!! value is ${event.target.value}`);

    this.setState({ value: event.target.value });

  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  

  handleChange = e => {
    console.log(`value changed!!!! value is ${e.target.value}`);
  };
  /*handleClick (event) {
    alert('A login was attempted: '+event.value);
    event.preventDefault();
  };*/
  handleUserInput = userid => {
    this.setState({ userid: userid });
  };
  onUserInputChange = (event) => {
    console.log("User id entry ..." + event.target.value)
    if (event.target.value) {
        this.setState({userId: event.target.value})
    } else {
        this.setState({userId: ''})
    }
}
onPinInputChange = (event) => {
  console.log("Pin id entry ..." + event.target.value)
  if (event.target.value) {
      this.setState({pinId: event.target.value})
  } else {
      this.setState({pinId: ''})
  }
}

onLoginButtonPress = (event) => {
  console.log("Login pressed ..." + event.target.value)
  if (event.target.value) {
    console.log("Login pressed ..." + this.state["pinId"]+" :"+this.state.userId)
  } else {
      this.setState({login: ''})
  }
}

handleChange = e => {
  console.log(`vvvvs ${e.target.value}`);
  return e;
};

  render() {
    const { classes } = this.props;
    
    return (
      <div>
      <GridContainer>
      
      
      
        <GridItem xs={12} sm={12} md={10}>
          <Card >
            
            
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Login User</h4>
              <p className={classes.cardCategoryWhite}>Login to your acccount, if you have not created one click register on the sidebar.</p>
            </CardHeader>
            <CardBody>
              
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                 //   handleChange={this.handleChange}
                 //   onSubmit={() => {console.log('userid changed')}}
                    labelText="User ID"
                    id="userId"
                    formControlProps={{
                      fullWidth: true
                    }}
                      
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                  //  onChange={this.onPinInputChange}
                    labelText="Pin"
                    id="pinId"
                    
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
              </GridContainer>
              
              
            </CardBody>
            <CardFooter>
              <Button color="primary"
               onClick={this.onLoginButtonPress}
              >
              Login
              </Button>
            </CardFooter>
          </Card>
        </GridItem>
        
      </GridContainer>
    </div>
    );
  }
}

LoginDashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(LoginDashboard);
