'use strict';

var React = require('react-native');
var {
  Text,
  TextInput,
  View,
} = React;

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: props.email,
      confirmation: props.confirmation,
      showConfirmation: props.showConfirmation,
    };
  }
  render() {
    return (
      <View>
        <TextInput
          placeholder="email address"
          autoCorrect={false}
          autoFocus={false}
          keyboardType="email-address"
          editable={!this.state.showConfirmation}
          onChangeText={(text) => this.setState({email: text})}
          onSubmitEditing={() => this.setState({showConfirmation: true})}
          value={this.state.email}
        />
        { this.state.showConfirmation ?
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
              autoFocus={false}
              keyboardType="numeric"
              onChangeText={(text) => this.setState({confirmation: text})}
              value={this.state.confirmation}
            />
          </View> : null }
      </View>
    );
  }
}
Form.propTypes = {
  email: React.PropTypes.string,
  confirmation: React.PropTypes.string,
  showConfirmation: React.PropTypes.bool,
};
exports.Form = Form;
