import React, { Component } from 'react';
import { ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import api from '../../services/api';

import {
  Container,
  Header,
  Avatar,
  Name,
  Bio,
  Stars,
  Starred,
  OwnerAvatar,
  Info,
  Title,
  Author,
  Page,
  PageText,
  RepoButton,
  RepoButtonText,
} from './styles';

export default class User extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('user').name,
  });

  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
    }).isRequired,
  };

  state = {
    stars: [],
    loading: false,
    page: 1,
    refreshing: false,
  };

  async componentDidMount() {
    this.loadStars();
  }

  loadStars = async (page = 1) => {
    const { navigation } = this.props;
    this.setState({ loading: true });

    const user = navigation.getParam('user');

    const response = await api.get(`/users/${user.login}/starred?page=${page}`);

    this.setState({
      stars: response.data,
      loading: false,
      page,
      refreshing: false,
    });
  };

  loadMore = page => {
    // const page = this.state;
    const pageNumber = page + 1;

    this.setState({ page: pageNumber });
    this.loadStars(pageNumber);
  };

  refreshList = page => {
    // const page = this.state;
    this.setState({ refreshing: true });
    if (page === 1) return;

    const pageNumber = page - 1;
    // const pageNumber = 1; /** como proposto pelo desafio, deve voltar para a primeira página */
    this.setState({ page: pageNumber });
    this.loadStars(pageNumber);
    this.setState({ refreshing: false });
  };

  handleNavigate = item => {
    const { navigation } = this.props;

    navigation.navigate('Repo', { item });
  };

  render() {
    const { navigation } = this.props;
    const { stars, loading, refreshing, page } = this.state;
    const user = navigation.getParam('user');
    /**
     *
     * a fazer:
     * ao carregar os repositorios, mostrar um loading
     * ao chegar no fim da lista carregar mais items, a lista tem uma funcao 'onEndReached', mudar as paginas na chamada da api
     * ao clicar em um repositorio abrir uma webview carregando a pagina(react-native-community/react-native-webview)
     */
    return (
      <Container>
        <Header>
          <Avatar source={{ uri: user.avatar }} />
          <Name>{user.name}</Name>
          <Bio>{user.bio}</Bio>
        </Header>
        {loading || refreshing ? (
          <ActivityIndicator size="large" color="#7159c1" />
        ) : (
          <Stars
            onRefresh={() => this.refreshList(page)} // Função dispara quando o usuário arrasta a lista pra baixo
            refreshing={refreshing} // Variável que armazena um estado true/false que representa se a lista está atualizando
            onEndReachedThreshold={0.2} // Carrega mais itens quando chegar em **20%** do fim
            onEndReached={stars.length >= 30 ? () => this.loadMore(page) : ''}
            data={stars}
            keyExtractor={star => String(star.id)}
            renderItem={({ item }) => (
              <Starred>
                <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
                <Info>
                  <Title>{item.name}</Title>
                  <Author>{item.owner.login}</Author>
                </Info>
                <RepoButton onPress={() => this.handleNavigate(item)}>
                  <RepoButtonText>Ver Repositório</RepoButtonText>
                </RepoButton>
              </Starred>
            )}
          />
        )}
        <Page loading={loading}>
          <PageText>{page}</PageText>
        </Page>
      </Container>
    );
  }
}
