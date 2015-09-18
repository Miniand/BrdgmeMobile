'use strict';

var React = require('react-native');
var {
  ListView,
  Navigator,
  ProgressBarAndroid,
  Text,
  TouchableNativeFeedback,
  View,
} = React;
var Toolbar = require('./toolbar');


class Games extends React.Component {
  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      loading: true,
      games: ds.cloneWithRows([]),
    };
    this.props.fetch('https://api.brdg.me/game/summary?renderer=raw')
      .then((response) => response.json())
      .then((responseJSON) => {
        this.setState({
          loading: false,
          games: this.state.games.cloneWithRows(responseJSON.otherActive),
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }
  renderRow(rowData, sectionID, rowID) {
    return (
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.SelectableBackground()}
        onPress={() => this.props.navigator.push({name: 'Game', id: rowData.id})}
      >
        <View>
          <Text
            style={{
              margin: 10,
              fontSize: 15,
              fontWeight: 'bold',
            }}
          >{rowData.name}</Text>
        </View>
      </TouchableNativeFeedback>
    );
  }
  render() {
    return (
      <View
        style={{
          flex: 1,
        }}
      >
        <Toolbar
          logout={() => this.props.logout()}
        />
        { this.state.loading ?
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <ProgressBarAndroid />
          </View> :
          <ListView
            dataSource={this.state.games}
            renderRow={(rowData) => this.renderRow(rowData)}
          /> }
      </View>
    );
  }
}
Games.propTypes = {
  fetch: React.PropTypes.func.isRequired,
  logout: React.PropTypes.func.isRequired,
  navigator: React.PropTypes.instanceOf(Navigator).isRequired,
};

module.exports = Games;
