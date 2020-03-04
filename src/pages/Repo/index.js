import React, { Component } from 'react';
import { ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import PropTypes from 'prop-types';

export default class Repo extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('item').name,
  });

  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
    }).isRequired,
  };

  state = {
    repository: {},
  };

  async componentDidMount() {
    const { navigation } = this.props;

    const repository = navigation.getParam('item');

    this.setState({
      repository,
    });
  }

  displaySpinner = () => {
    return <ActivityIndicator size="large" color="#7159c1" />;
  };

  render() {
    const { repository } = this.state;

    return (
      <WebView
        startInLoadingState
        renderLoading={() => this.displaySpinner()}
        source={{ uri: repository.html_url }}
        style={{ flex: 1 }}
      />
    );
  }
}
