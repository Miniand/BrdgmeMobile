'use strict';

var React = require('react-native');
var {
  Navigator,
  ProgressBarAndroid,
  ScrollView,
  Text,
  TextInput,
  View,
} = React;
var Toolbar = require('./toolbar');

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      game: null,
    };
    this.fetchGame();
  }
  fetchGame() {
    return this.props.fetch('https://api.brdg.me/game/' + this.props.id + '?renderer=raw')
      .then((response) => response.json())
      .then((responseJSON) => {
        this.setState({
          loading: false,
          game: responseJSON,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }
  render() {
    return (
      <View
        style={{
          flex: 1,
        }}
      >
        { this.state.loading ?
          <View style={{flex: 1}}>
            <Toolbar
              logout={() => this.props.logout()}
            />
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <ProgressBarAndroid />
            </View>
          </View> :
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
            }}
          >
            <ScrollView
              centerContent={true}
            >
              <Toolbar
                logout={() => this.props.logout()}
              />
              <Text
                style={{
                  fontFamily: 'monospace',
                }}
              >{this.state.game.game}</Text>
            </ScrollView>
            <TextInput
              placeholder="Command"
            />
          </View>
        }
      </View>
    );
  }
}
Game.propTypes = {
  id: React.PropTypes.string.isRequired,
  fetch: React.PropTypes.func.isRequired,
  logout: React.PropTypes.func.isRequired,
  navigator: React.PropTypes.instanceOf(Navigator).isRequired,
};

module.exports = Game;
