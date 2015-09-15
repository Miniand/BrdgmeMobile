/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} = React;
var AuthForm = require('./auth').Form;

class BrdgmeMobile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showConfirmation: false,
    };
  }
  render() {
    return (
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
        <View
          style={{
            marginLeft: 40,
            marginRight: 40,
          }}
        >
          <AuthForm
            showConfirmation={this.state.showConfirmation}
          />
        </View>
      </View>
    );
  }
}

AppRegistry.registerComponent('BrdgmeMobile', () => BrdgmeMobile);
