'use strict';

var React = require('react-native');
var {
  ToolbarAndroid,
} = React;


class Toolbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  actions() {
    var actions = [];
    if (this.props.actions) {
      actions = this.props.actions;
    }
    return actions.concat([
      {
        icon: require('image!ic_local_pizza_white_24dp'),
        title: 'Log out',
        onActionSelected: () => this.props.logout(),
      }
    ]);
  }
  onActionSelected(position) {
    var action = this.actions()[position];
    if (action.onActionSelected) {
      action.onActionSelected();
    }
  }
  render() {
    return (
      <ToolbarAndroid
        title="brdg.me"
        actions={this.actions()}
        onActionSelected={(position) => this.onActionSelected(position)}
        navIcon={require('image!ic_local_pizza_white_24dp')}
        onIconClicked={() => console.log('moo')}
        style={{
          height: 56,
          backgroundColor: '#607D8B',
        }}
      />
    )
  }
}
Toolbar.propTypes = {
  logout: React.PropTypes.func.isRequired,
  actions: React.PropTypes.array,
};

module.exports = Toolbar;
