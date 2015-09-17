/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  AsyncStorage,
  StyleSheet,
  Text,
  View,
} = React;
var AuthForm = require('./auth').Form;
var Toolbar = require('./toolbar');
var Games = require('./games');

class BrdgmeMobile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: null,
      token: null,
      loading: true,
    };
    AsyncStorage.multiGet(['email', 'token'])
      .then((values) => {
        var newState = {
          loading: false,
        };
        values.forEach((pair) => {
          newState[pair[0]] = pair[1];
        });
        this.setState(newState);
      });
  }
  onAuthenticate(email, token) {
    this.setState({
      email: email,
      token: token,
    });
    AsyncStorage.multiSet([
      ['email', email],
      ['token', token],
    ]);
  }
  logout() {
    this.setState({
      token: null,
    });
    AsyncStorage.removeItem('token');
  }
  fetch(input, init) {
    if (!init) {
      init = {};
    }
    if (!init.headers) {
      init.headers = {};
    }
    if (!init.headers.Authorization) {
      init.headers.Authorization = 'token ' + this.state.token;
    }
    return fetch(input, init).then((response) => {
      if (response.status === 401) {
        this.logout();
        throw('logged out');
      }
      return response;
    });
  }
  render() {
    return (
      <View
        style={{
          flex: 1,
        }}
      >
        { this.state.loading || !this.state.token ?
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                fontSize: 50,
                textAlign: 'center',
                marginBottom: 5,
              }}
              onPress={() => this.setState({showConfirmation: true})}
            >
              brdg.me
            </Text>
            <Text
              style={{
                textAlign: 'center',
                marginBottom: 50,
              }}
            >
              board games with friends by email
            </Text>
            { !this.state.loading ?
              <View
                style={{
                  marginLeft: 40,
                  marginRight: 40,
                }}
              >
                <AuthForm
                  initialEmail={this.state.email}
                  onAuthenticate={(email, token) => this.onAuthenticate(email, token)}
                />
              </View> : null
            }
          </View> :
          <Games
            fetch={(input, init) => this.fetch(input, init)}
            logout={() => this.logout()}
          />
        }
      </View>
    );
  }
}

AppRegistry.registerComponent('BrdgmeMobile', () => BrdgmeMobile);
