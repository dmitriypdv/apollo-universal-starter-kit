import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Picker, ScrollView, View, Text, Platform, TouchableOpacity } from 'react-native';
import { SwipeAction } from '../../common/components/native';
import translate from '../../../i18n';
import StandardView from '../components/StandardView.native';
import RelayView from '../components/RelayView.native';

@translate('pagination')
export default class Pagination extends React.Component {
  static propTypes = {
    t: PropTypes.func,
    data: PropTypes.object,
    loadData: PropTypes.func
  };

  state = { pagination: 'standard' };

  onPickerChange = itemValue => {
    const { loadData, data } = this.props;
    this.setState({ pagination: itemValue }, loadData(0, data.limit));
  };

  handlePageChange = (pagination, pageNumber) => {
    const { loadData, data } = this.props;
    if (pagination === 'relay') {
      loadData(data.pageInfo.endCursor + 1, 'add');
    } else {
      loadData((pageNumber - 1) * data.limit, 'replace');
    }
  };

  renderPagination = () => {
    const { data } = this.props;
    const { pagination } = this.state;
    const renderItem = Platform.OS === 'android' ? this.renderItemAndroid : this.renderItemIOS;
    return pagination === 'standard' ? (
      <View>
        <StandardView data={data} handlePageChange={this.handlePageChange} renderItem={renderItem} />
      </View>
    ) : (
      <View>
        <RelayView data={data} handlePageChange={this.handlePageChange} renderItem={renderItem} />
      </View>
    );
  };

  renderItemIOS = ({
    item: {
      node: { title }
    }
  }) => {
    return <SwipeAction>{title}</SwipeAction>;
  };

  renderItemAndroid = ({
    item: {
      node: { title }
    }
  }) => {
    return (
      <TouchableOpacity style={styles.postWrapper}>
        <Text style={styles.text}>{title}</Text>
      </TouchableOpacity>
    );
  };

  render() {
    const { t } = this.props;
    const { pagination } = this.state;
    return (
      <ScrollView style={styles.container}>
        <Picker selectedValue={pagination} onValueChange={this.onPickerChange}>
          <Picker.Item label={t('list.title.standard')} value="standard" />
          <Picker.Item label={t('list.title.relay')} value="relay" />
        </Picker>
        {this.renderPagination()}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  text: {
    fontSize: 18
  },
  postWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomColor: '#000',
    borderBottomWidth: 0.3,
    height: 48,
    paddingLeft: 7
  }
});