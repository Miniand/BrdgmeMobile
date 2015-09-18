'use strict';

var React = require('react-native');
var {
  ProgressBarAndroid,
  Text,
  TextInput,
  View,
} = React;
var queryString = require('query-string');

let
  ModeEnteringEmail = 0,
  ModeRequestingConfirmation = 1,
  ModeEnteringConfirmation = 2,
  ModeRequestingToken = 3;

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: ModeEnteringEmail,
      email: props.initialEmail,
      confirmation: props.initialConfirmation,
    };
  }
  requestConfirmation() {
    this.setState({mode: ModeRequestingConfirmation});
    fetch('https://api.brdg.me/auth/request', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: queryString.stringify({
        email: this.state.email,
      }),
    })
      .then((response) => {
        this.setState({
          mode: ModeEnteringConfirmation,
          confirmation: '',
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState({mode: ModeEnteringEmail});
      });
  }
  requestToken() {
    this.setState({mode: ModeRequestingConfirmation});
    fetch('https://api.brdg.me/auth/confirm', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: queryString.stringify({
        email: this.state.email,
        confirmation: this.state.confirmation,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.props.onAuthenticate(this.state.email, responseJson);
        this.setState({
          mode: ModeEnteringEmail,
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState({mode: ModeEnteringConfirmation});
      });
  }
  render() {
    return (
      <View
        style={{
          alignItems: 'center',
        }}
      >
        <TextInput
          placeholder="email address"
          autoCorrect={false}
          keyboardType="email-address"
          editable={this.state.mode === ModeEnteringEmail}
          onChangeText={(text) => this.setState({email: text})}
          onSubmitEditing={() => this.requestConfirmation()}
          value={this.state.email}
          textAlign='center'
        />
        { this.state.mode === ModeRequestingConfirmation ?
          <ProgressBarAndroid />
          : null
        }
        { this.state.mode === ModeEnteringConfirmation ||
          this.state.mode === ModeRequestingToken ?
          <View>
            <Text
              style={{
                textAlign: 'center',
                marginLeft: 20,
                marginRight: 20,
              }}
            >
              You have been emailed a confirmation code, please enter it below
            </Text>
            <TextInput
              placeholder="confirmation code"
              keyboardType="numeric"
              onChangeText={(text) => this.setState({confirmation: text})}
              onSubmitEditing={() => this.requestToken()}
              value={this.state.confirmation}
              textAlign='center'
            />
          </View>
          : null
        }
      </View>
    );
  }
}
Form.propTypes = {
  initialEmail: React.PropTypes.string,
  initialConfirmation: React.PropTypes.string,
  onAuthenticate: React.PropTypes.func.isRequired,
};
exports.Form = Form;
