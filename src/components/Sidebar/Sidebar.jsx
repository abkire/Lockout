import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Icon from "@material-ui/core/Icon";
// core components
import AdminNavbarLinks from "components/Navbars/AdminNavbarLinks.jsx";
import RTLNavbarLinks from "components/Navbars/RTLNavbarLinks.jsx";

import sidebarStyle from "assets/jss/material-dashboard-react/components/sidebarStyle.jsx";

const Sidebar = ({ ...props }) => {

  // verifies if routeName is the one active (in browser input)
  function activeRoute(routeName) {

    return props.location.pathname.indexOf(routeName) > -1 ? true : false;
  }
  const { classes, color, logo, image, logoText, routes } = props;
  var links = (
   //localStorage.clear('user'),

    <List className={classes.list}>
      {routes.map((prop, key) => {
        var activePro = " ";
        var listItemClasses;
        //Only load sidebar for correct role based on routes prop
        //testing admin as default...
        let user;
        if(!localStorage.getItem('user'))
        {
          localStorage.setItem('user', JSON.stringify({
            "username": "test",
            "level": 4
          }) );
          user = JSON.parse(localStorage.getItem('user'));
          console.log("logged in as: "+user.username+" with role: "+user.level);
        }



     // user = JSON.parse(localStorage.getItem('user'));

      //user.level = 3;  HIDES THE SIDEBARS FROM THE INNAPRORIATE USERS
      if(localStorage.getItem('user')!=null)
      {
      if(JSON.parse(localStorage.getItem('user')).level===3){
        if(!prop.admin)
          return null;}
      else if(JSON.parse(localStorage.getItem('user')).level===2){
        if(!prop.trainer)
          return null;}
      else if(JSON.parse(localStorage.getItem('user')).level===1){
        if(!prop.user)
           return null;}
      else if(JSON.parse(localStorage.getItem('user')).level===0){
        if(!prop.noAuth)
          return null;}
        
     }
     /*   else    // if level of role is undefined go here...
        {
          if(!prop.noAuth)
            return null;
        }*/

        /*
       let user = JSON.stringify(localStorage.getItem('user'));
        if(user && user.level===1) // role = user
        {
          if(prop.path === "/logs")
            return null;
          else if(prop.path === "/trainers")
            return null;
          else if(prop.path === "/users")
            return null;
          else if(prop.path === "/adminCommands")
            return null;
            else if(prop.path === "/trainerCommands")
            return null;
          else if(prop.path === "/login")
            return null;
          else if(prop.path === "/register")
            return null;
          else
          {

          }
        }
        else if(user && user.level===2)// role = trainer
        {
          if(prop.path === "/logs")
            return null;
          else if(prop.path === "/trainers")
            return null;
          else if(prop.path === "/users")
            return null;
          else if(prop.path === "/adminCommands")
            return null;
          else if(prop.path === "/login")
            return null;
          else if(prop.path === "/register")
            return null;
          else
          {

          }

        }
        else if(user && user.level ===3) // role = admin
        {
          if(prop.path === "/trainerCommands")
           return null;
          else if(prop.path === "/userCommands")
            return null;
          else if(prop.path === "/login")
            return null;
          else if(prop.path === "/register")
            return null;
          else
            {
              
            }
        }
        else // not signed in
        {
          //don't load sidebar for non login / registers
          if(!(prop.path === "/login" || prop.path === "/register"))
            return null;
        }*/


       
        if (prop.path === "/upgrade-to-pro") {
          activePro = classes.activePro + " ";
          listItemClasses = classNames({
            [" " + classes[color]]: true
          });
        } else {
          listItemClasses = classNames({
            [" " + classes[color]]: activeRoute(prop.layout + prop.path)
          });
        }
        const whiteFontClasses = classNames({
          [" " + classes.whiteFont]: activeRoute(prop.layout + prop.path)
        });
        return (
          <NavLink
            to={prop.layout + prop.path}
            className={activePro + classes.item}
            activeClassName="active"
            key={key}
          >
            <ListItem button className={classes.itemLink + listItemClasses}>
              {typeof prop.icon === "string" ? (
                <Icon
                  className={classNames(classes.itemIcon, whiteFontClasses, {
                    [classes.itemIconRTL]: props.rtlActive
                  })}
                >
                  {prop.icon}
                </Icon>
              ) : (
                <prop.icon
                  className={classNames(classes.itemIcon, whiteFontClasses, {
                    [classes.itemIconRTL]: props.rtlActive
                  })}
                />
              )}
              <ListItemText
                primary={
                  props.rtlActive ? prop.rtlName : prop.name
                }
                className={classNames(classes.itemText, whiteFontClasses, {
                  [classes.itemTextRTL]: props.rtlActive
                })}
                disableTypography={true}
              />
            </ListItem>
          </NavLink>
        );
      })}
    </List>
  );
  var brand = (
    <div className={classes.logo}>
      <a
        href="https://blog.uta.edu/cseseniordesign/2019/04/16/lockout/"
        className={classNames(classes.logoLink, {
          [classes.logoLinkRTL]: props.rtlActive
        })}
      >
        <div className={classes.logoImage}>
          <img src={logo} alt="logo" className={classes.img} />
        </div>
        {logoText}
      </a>
    </div>
  );
  return (
    <div>
      <Hidden mdUp implementation="css">
        <Drawer
          variant="temporary"
          anchor={props.rtlActive ? "left" : "right"}
          open={props.open}
          classes={{
            paper: classNames(classes.drawerPaper, {
              [classes.drawerPaperRTL]: props.rtlActive
            })
          }}
          onClose={props.handleDrawerToggle}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>
            {props.rtlActive ? <RTLNavbarLinks /> : <AdminNavbarLinks />}
            {links}
          </div>
          {image !== undefined ? (
            <div
              className={classes.background}
              style={{ backgroundImage: "url(" + image + ")" }}
            />
          ) : null}
        </Drawer>
      </Hidden>
      <Hidden smDown implementation="css">
        <Drawer
          anchor={props.rtlActive ? "right" : "left"}
          variant="permanent"
          open
          classes={{
            paper: classNames(classes.drawerPaper, {
              [classes.drawerPaperRTL]: props.rtlActive
            })
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>{links}</div>
          {image !== undefined ? (
            <div
              className={classes.background}
              style={{ backgroundImage: "url(" + image + ")" }}
            />
          ) : null}
        </Drawer>
      </Hidden>
    </div>
  );
};

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(sidebarStyle)(Sidebar);
