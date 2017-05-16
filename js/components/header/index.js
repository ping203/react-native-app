import React, {Component} from 'react';
import {Image, Platform, AsyncStorage, TouchableHighlight, View} from 'react-native';
import {connect} from 'react-redux';
import {Actions, ActionConst} from 'react-native-router-flux';
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  List,
  ListItem,
  Text,
  Footer,
  Left,
  Right,
  Body,
  Item,
  Input
} from 'native-base';

import {openDrawer} from '../../actions/drawer';
import FooterComponent from './../footer';
import styles from './styles';
import {logout} from '../../actions/auth';


const headerBg = require('../../../images/layout/header-bg.png');
const defaultAvatar = require('../../../images/avatars/default.png');

class HeaderComponent extends Component {

  changeFooterState(target) {

  }

  render() {

    const {isActived, username, gold, mobile} = this.props;

    return (
      <View style={styles.headerContainer}>
        <Image source={headerBg} resizeMode='cover' style={styles.headerBg}/>
        <View style={styles.headerInner}>

          <Button transparent onPress={this.props.openDrawer}>
            <Icon active name="menu" style={{fontSize: 30, lineHeight: 32}}/>
          </Button>
          <View style={styles.headerLeft}>
            <Text style={{color: '#c4e1ff',}}>{username}</Text>
            <Text style={{color: '#ffde00',}}>{gold}V</Text>
          </View>

          <Image source={defaultAvatar} resizeMode='cover' style={styles.headerAvatar}></Image>
          <View style={styles.headerRight}>
            {!isActived &&
            <Button style={{backgroundColor: "#ddd", height: 30}}>
              <Text style={{color: '#999'}}>Xác thực</Text>
            </Button>}
            {isActived && <Icon active name="ios-arrow-dropdown-circle" style={{width: 30, color: "#add329"}}/>}
            {isActived &&
            < Text style={{
              color: "#add329", flex: 1, flexDirection: 'row', justifyContent: "center", alignItems: "center"
            }}>
              {mobile}
            </Text>}
          </View>
        </View>
      </View>


    );
  }
}

function bindAction(dispatch) {
  return {
    openDrawer: () => dispatch(openDrawer()),
  };
}

const mapStateToProps = state => {
  const {loginInfo} = state.auth;
  return {
    isActived: loginInfo.isTelephoneVerified,
    username: loginInfo.username,
    gold: loginInfo.gold || 0,
  }
};

export default connect(mapStateToProps, bindAction)(HeaderComponent);
